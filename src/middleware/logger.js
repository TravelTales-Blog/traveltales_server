const fs = require('fs');
const path = require('path');

const logDirPath = path.join(__dirname, '../../logs');
const logFilePath = path.join(logDirPath, 'requests.log');

if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath, { recursive: true });
}

const writeLog = (logEntry) => {
    const logString = JSON.stringify(logEntry) + '\n';
    fs.appendFile(logFilePath, logString, (err) => {
        if (err) console.error('Failed to write log:', err);
    });
};

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logEntry = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress
        };

        if (res.locals.error) {
            logEntry.errorMessage = res.locals.error.message;
            logEntry.stack = res.locals.error.stack;

            console.error(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${logEntry.status} (${logEntry.errorMessage})`);
            if (logEntry.stack) console.error(logEntry.stack);
        } else {
            console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${logEntry.status} (${logEntry.duration})`);
        }

        writeLog(logEntry);
    });

    res.on('error', (err) => {
        const errorEntry = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            error: err.message,
            ip: req.ip || req.connection.remoteAddress
        };

        console.error(`[${errorEntry.timestamp}] ERROR ${errorEntry.method} ${errorEntry.url} - ${errorEntry.error}`);
        writeLog(errorEntry);
    });

    next();
};

module.exports = requestLogger;
