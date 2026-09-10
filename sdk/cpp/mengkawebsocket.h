#pragma once
#include <QObject>
#include <QWebSocket>
#include <QWebSocketServer>
#include <QHostAddress>
#include <QNetworkProxy>
#include <QNetworkRequest>

namespace Mengka {
// Standalone forward/reverse transport. Tokens are never written to logs or URLs.
class WebSocket final : public QObject {
    Q_OBJECT
public:
    explicit WebSocket(QObject *parent = nullptr) : QObject(parent), server(QStringLiteral("Mengka plugin"), QWebSocketServer::NonSecureMode, this) {
        forward.setProxy(QNetworkProxy::NoProxy);
        wire(&forward);
        connect(&server, &QWebSocketServer::newConnection, this, [this] {
            while (server.hasPendingConnections()) {
                auto *candidate = server.nextPendingConnection();
                const auto request = candidate->request();
                auto supplied = request.rawHeader("Authorization");
                if (supplied.startsWith("Bearer ")) supplied = supplied.mid(7);
                else supplied = request.rawHeader("X-Mengka-Token");
                unsigned char difference = 0;
                if (supplied.size() == secret.size())
                    for (qsizetype i = 0; i < supplied.size(); ++i) difference |= static_cast<unsigned char>(supplied[i] ^ secret[i]);
                const bool busy = socket != &forward && socket->state() == QAbstractSocket::ConnectedState;
                if (secret.isEmpty() || supplied.size() != secret.size() || difference || busy || request.url().path() != QStringLiteral("/")) {
                    candidate->close(QWebSocketProtocol::CloseCodePolicyViolated, QStringLiteral("Connection rejected"));
                    connect(candidate, &QWebSocket::disconnected, candidate, &QObject::deleteLater);
                    continue;
                }
                socket = candidate;
                wire(candidate);
                connect(candidate, &QWebSocket::disconnected, candidate, &QObject::deleteLater);
                emit connected();
            }
        });
    }
    void open(const QUrl &url, const QString &token, bool reverse) {
        if (!reverse) { server.close(); socket = &forward; forward.open(url); return; }
        secret = token.toUtf8();
        if (server.isListening()) return;
        QHostAddress address;
        if (!address.setAddress(url.host()) || !server.listen(address, quint16(url.port()))) {
            lastError = QStringLiteral("反向 WS 监听失败，请检查本机 IP 和端口占用");
            emit errorOccurred(QAbstractSocket::AddressInUseError);
        }
    }
    void setProxy(const QNetworkProxy &proxy) { forward.setProxy(proxy); }
    void close() { server.close(); socket->close(); }
    // Retain the reverse listener while the caller waits/retries the framework connection.
    void abort() { socket->abort(); }
    void ping(const QByteArray &data) { socket->ping(data); }
    void sendTextMessage(const QString &text) { socket->sendTextMessage(text); }
    auto state() const { return socket->state(); }
    QString errorString() const { return lastError.isEmpty() ? socket->errorString() : lastError; }
signals:
    void connected();
    void disconnected();
    void textFrameReceived(const QString &frame, bool last);
    void errorOccurred(QAbstractSocket::SocketError error);
    void pong(quint64 elapsed, const QByteArray &payload);
private:
    void wire(QWebSocket *value) {
        connect(value, &QWebSocket::connected, this, &WebSocket::connected);
        connect(value, &QWebSocket::textFrameReceived, this, &WebSocket::textFrameReceived);
#if QT_VERSION >= QT_VERSION_CHECK(6, 5, 0)
        connect(value, &QWebSocket::errorOccurred, this, &WebSocket::errorOccurred);
#else
        connect(value, qOverload<QAbstractSocket::SocketError>(&QWebSocket::error), this, &WebSocket::errorOccurred);
#endif
        connect(value, &QWebSocket::pong, this, &WebSocket::pong);
        connect(value, &QWebSocket::disconnected, this, [this, value] {
            if (socket != value) return;
            lastError = value->errorString();
            socket = &forward;
            emit disconnected();
        });
    }
    QWebSocket forward;
    QWebSocket *socket = &forward;
    QWebSocketServer server;
    QByteArray secret;
    QString lastError;
};
}
