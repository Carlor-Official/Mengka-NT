#pragma once

#include <QByteArray>
#include <QObject>

#include <cstdio>
#include <mutex>
#include <thread>
#include <utility>

namespace Mengka {

// Process-wide newline-delimited JSON bridge used by native-ipc-v1. The
// reader owns no plugin objects, so controller restarts can safely replace an
// SDKClient while the anonymous stdin pipe remains attached to the process.
class NativeIpc final : public QObject {
    Q_OBJECT

public:
    static NativeIpc *instance()
    {
        static NativeIpc *bridge = new NativeIpc;
        return bridge;
    }

    void start()
    {
        std::call_once(m_started, [this] {
            std::thread([this] {
                QByteArray line;
                for (;;) {
                    const int value = std::fgetc(stdin);
                    if (value == EOF) break;
                    if (value == '\n') {
                        if (!line.isEmpty() && line.endsWith('\r')) line.chop(1);
                        const QByteArray message = std::exchange(line, {});
                        QMetaObject::invokeMethod(this, [this, message] { emit messageReceived(message); }, Qt::QueuedConnection);
                        continue;
                    }
                    line.append(static_cast<char>(value));
                    if (line.size() > 8 * 1024 * 1024) {
                        QMetaObject::invokeMethod(this, [this] { emit inputClosed(); }, Qt::QueuedConnection);
                        return;
                    }
                }
                QMetaObject::invokeMethod(this, [this] { emit inputClosed(); }, Qt::QueuedConnection);
            }).detach();
        });
    }

    bool write(const QByteArray &message)
    {
        std::lock_guard lock(m_writeMutex);
        QByteArray frame = message;
        if (!frame.endsWith('\n')) frame.append('\n');
        return std::fwrite(frame.constData(), 1, static_cast<size_t>(frame.size()), stdout)
                == static_cast<size_t>(frame.size())
            && std::fflush(stdout) == 0;
    }

signals:
    void messageReceived(const QByteArray &message);
    void inputClosed();

private:
    NativeIpc() = default;

    std::once_flag m_started;
    std::mutex m_writeMutex;
};

inline bool nativeIpcEnabled()
{
    return qEnvironmentVariable("MENGKA_PLUGIN_TRANSPORT").trimmed().compare(
               QStringLiteral("native-ipc-v1"), Qt::CaseInsensitive)
        == 0;
}

} // namespace Mengka
