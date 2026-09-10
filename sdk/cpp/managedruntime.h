#pragma once
#include <QFile>
#include <QFileInfo>
#include <QDir>
#include <QJsonDocument>
#include <QJsonObject>
#include <QRegularExpression>
#include <QUrl>
#include <QHostAddress>
#include <QHash>

namespace Mengka {
struct ManagedConnection { QString host; int port = 0; QString token; bool valid = false; };
inline ManagedConnection loadManagedConnection(const QString &path) {
    const QFileInfo info(path);
    if (!info.isAbsolute() || info.size() > 98304) return {};
    QFile file(path);
    if (!file.open(QIODevice::ReadOnly)) return {};
    const auto object = QJsonDocument::fromJson(file.readAll()).object();
    const QUrl url(object.value(QStringLiteral("websocket_url")).toString());
    const QFileInfo tokenInfo(object.value(QStringLiteral("token_file")).toString());
    if (object.value(QStringLiteral("schema")).toInt() != 1
        || !QRegularExpression(QStringLiteral("^[a-zA-Z0-9._-]+$")).match(object.value(QStringLiteral("instance_id")).toString()).hasMatch()
        || url.scheme() != QStringLiteral("ws") || url.host() != QStringLiteral("127.0.0.1") || url.port() < 1
        || !url.userInfo().isEmpty() || url.hasQuery() || url.hasFragment() || (!url.path().isEmpty() && url.path() != QStringLiteral("/"))
        || !tokenInfo.isAbsolute() || tokenInfo.size() > 4096 || tokenInfo.canonicalFilePath().isEmpty()
        || QFileInfo(tokenInfo.canonicalFilePath()).absolutePath() != QFileInfo(info.canonicalFilePath()).absolutePath()) return {};
    QFile tokenFile(tokenInfo.absoluteFilePath());
    if (!tokenFile.open(QIODevice::ReadOnly)) return {};
    const auto token = QString::fromUtf8(tokenFile.readAll()).trimmed();
    if (token.size() < 24) return {};
    return {url.host(), url.port(), token, true};
}
inline bool gatewayCredential(const QHash<QByteArray, QByteArray> &headers, const QHostAddress &peer, const QByteArray &token) {
    const auto supplied = headers.value("x-mengka-managed-token");
    if (!peer.isLoopback() || token.size() < 24 || supplied.size() != token.size()) return false;
    unsigned char difference = 0;
    for (qsizetype i = 0; i < token.size(); ++i) difference |= static_cast<unsigned char>(supplied[i] ^ token[i]);
    return difference == 0;
}
struct ManagedAdmin { QByteArray token; QHostAddress host; quint16 port = 0; QByteArray origin; bool valid = false; };
inline ManagedAdmin loadManagedAdmin() {
    if (qgetenv("MENGKA_MANAGED_V1") != "1") return {};
    const QFileInfo connection(qEnvironmentVariable("MENGKA_PLUGIN_CONNECTION_FILE"));
    const QFileInfo tokenInfo(qEnvironmentVariable("MENGKA_PLUGIN_ADMIN_TOKEN_FILE"));
    const QUrl origin(qEnvironmentVariable("MENGKA_PLUGIN_ADMIN_ORIGIN"));
    bool ok = false;
    const int port = qEnvironmentVariable("MENGKA_PLUGIN_ADMIN_PORT").toInt(&ok);
    if (!loadManagedConnection(connection.filePath()).valid || !tokenInfo.isAbsolute() || tokenInfo.size() > 4096
        || tokenInfo.canonicalFilePath().isEmpty() || QFileInfo(tokenInfo.canonicalFilePath()).absolutePath() != QFileInfo(connection.canonicalFilePath()).absolutePath()
        || qgetenv("MENGKA_PLUGIN_ADMIN_HOST") != "127.0.0.1" || !ok || port < 1 || port > 65535
        || !origin.isValid() || origin.host().isEmpty() || (origin.scheme() != QStringLiteral("http") && origin.scheme() != QStringLiteral("https"))
        || !origin.userInfo().isEmpty() || origin.hasQuery() || origin.hasFragment() || (!origin.path().isEmpty() && origin.path() != QStringLiteral("/"))) return {};
    QFile file(tokenInfo.filePath());
    if (!file.open(QIODevice::ReadOnly)) return {};
    const auto token = file.readAll().trimmed();
    if (token.size() < 24) return {};
    return {token, QHostAddress(QHostAddress::LocalHost), quint16(port), qgetenv("MENGKA_PLUGIN_ADMIN_ORIGIN"), true};
}
inline bool gatewayOrigin(const QHash<QByteArray, QByteArray> &headers, const QString &path, const QByteArray &origin) {
    const QUrl url(QString::fromUtf8(origin));
    if ((url.scheme() != QStringLiteral("http") && url.scheme() != QStringLiteral("https")) || url.host().isEmpty()) return false;
    const bool control = path == QStringLiteral("/api/managed/health") || path == QStringLiteral("/api/managed/control");
    return (control || headers.value("x-mengka-managed-origin") == origin)
        && (!headers.contains("origin") || headers.value("origin") == origin);
}
}
