const fs = require('fs');
const path = require('path');

const logDirPath = path.join(__dirname, '../../logs');
const userLogFilePath = path.join(logDirPath, 'user.log');

if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath, { recursive: true });
}

const logUserActivity = (email, username, role, action) => {
    const timestamp = new Date().toISOString();
    const line = `${email}| ${username} | ${role} | ${action} | ${timestamp}\n`;

    fs.appendFile(userLogFilePath, line, (err) => {
        if (err) {
            console.error('Failed to write user log:', err);
        }
    });
};

module.exports = logUserActivity;
