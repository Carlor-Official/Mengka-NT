#include "mengkawebsocket.h"
#include "managedruntime.h"
#include <QCoreApplication>
#include <QTimer>
#include <QDebug>

int main(int argc, char **argv) {
    QCoreApplication app(argc, argv);
    bool reverse = qgetenv("DEMO_WS_MODE") == "reverse";
    auto host = qEnvironmentVariable("DEMO_WS_HOST", "127.0.0.1");
    int port = qEnvironmentVariableIntValue("DEMO_WS_PORT");
    auto token = qEnvironmentVariable("DEMO_WS_TOKEN");
    if (qgetenv("MENGKA_MANAGED_V1") == "1") {
        const auto managed = Mengka::loadManagedConnection(qEnvironmentVariable("MENGKA_PLUGIN_CONNECTION_FILE"));
        if (!managed.valid) return 2;
        reverse = false; host = managed.host; port = managed.port; token = managed.token;
    } else if (qEnvironmentVariableIsSet("MENGKA_PLUGIN_CONNECTION_FILE") || qEnvironmentVariableIsSet("MENGKA_MANAGED_V1")) return 2;
    if (token.isEmpty() || port < 1 || port > 65535) { qCritical() << "Configure DEMO_WS_HOST, DEMO_WS_PORT and DEMO_WS_TOKEN"; return 2; }
    Mengka::WebSocket ws;
    QObject::connect(&ws, &Mengka::WebSocket::connected, [&] {
        if (!reverse) ws.sendTextMessage(QString::fromUtf8(QJsonDocument(QJsonObject{
            {"type", "auth"}, {"token", token}, {"name", "demo-plugin"}, {"version", "1.0.0"}, {"author", "Demo Developer"}, {"permissions", QJsonObject{}}
        }).toJson(QJsonDocument::Compact)));
    });
    QString frame;
    QObject::connect(&ws, &Mengka::WebSocket::textFrameReceived, [&](const QString &part, bool last) {
        frame += part; if (!last) return;
        const auto object = QJsonDocument::fromJson(frame.toUtf8()).object(); frame.clear();
        const auto type = object.value("type").toString();
        if ((!reverse && type == "auth_ok") || (reverse && type == "ready")) qInfo() << "Framework connected";
        if (type == "auth_failed") { qWarning() << "Framework authentication failed"; ws.close(); }
    });
    QUrl endpoint; endpoint.setScheme("ws"); endpoint.setHost(host); endpoint.setPort(port); endpoint.setPath("/");
    QObject::connect(&ws, &Mengka::WebSocket::errorOccurred, [&] { qWarning() << "WS transport error; check address, port and service availability"; });
    QObject::connect(&ws, &Mengka::WebSocket::disconnected, [&] {
        frame.clear();
        if (!reverse) QTimer::singleShot(5000, &ws, [&] { ws.open(endpoint, token, false); });
    });
    ws.open(endpoint, token, reverse);
    return app.exec();
}
