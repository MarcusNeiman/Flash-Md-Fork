const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1lTVExWUxsZTZwaDhkVVpmTnhWcllNUHVCRUtJTHpGamNWMjNOYisxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWZvTWI4Sm5lcjhHajhrQ3c4ZlAweW1MT2djY1l2bUVaWVF4Z1NsLzVYVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTU9EYUx1VWhIOUdwYUFGbGZmb0tsbTRtYS9mZmJRZDZpUHEzem5HbldJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIydWZRMVNBcjhvNEI0Q3E0aFBRbHNBd0Q5ZHdIOFZ2NEErcWN5NnBhd1ZFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNDUW95ZGthV3BmejFqSkdZK2kwZGI2cGVad21HWG44TERsTnVpRkFqVXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZhQy96bUdqVFVYZVZxbjBKNUwrczQzeEZYV2hpcHh1R2p5VStvNEwrbUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9vVHBhUWdxOVVEbElYU0g5L21PR3p3RzBINEErRHpBQ2k4RGJyN1VFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXlLSDgvb1RVZFB0Nk5WWnVsZ0ZQZXdkeU5GNytEMU8wTW81Z1Vxa2FTVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRWNXlweVBlQXJRb2FDRGt3Ti91NmE4Z01sT3ZFVFBaYVBNYlBwRDlxNVdnbGdyWS9NRGV3czJRTGNHZS9kYUFmUVZRMkZOTm5ieEtVYnJ4SjZ0T0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6IlZmZWNVUmVzRW8xZHJGTGtLbUJsVlR3eHlVZ2lsRE45NysraVFqeldSU1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzI1NjkzMzA2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk0NjkwQjAxNEVGMjBFNzQ2ODBFNTJFNDg2MkZCRjc4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzQzOTE0ODN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBiRUtTTGw1VHlxR1dTbV9rVWpYNVEiLCJwaG9uZUlkIjoiMDI4ODVlYjktNWEyYy00ZjhlLTk5ODktZDNlMjA1Y2FmZjIxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJUeFB1VTNLRXFMajR4aVVXbXpuRjZYVzR0OD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJscWRRVjdWZ1ZNS0ZFMnYyWU9TR0NDZnFlZUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNEE1VENHQzkiLCJtZSI6eyJpZCI6IjI1NDcyNTY5MzMwNjo2NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJOZWltYW4gTWFyY3VzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOMzVycHdHRUtudGdyc0dHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5UERUTVY4eFpNbCtEY2RVSWdYRG9rbEQrdDJmbTBQVVF3Mld6YllQaGhvPSIsImFjY291bnRTaWduYXR1cmUiOiJRMXkrRUszSjNLZTRUOFNIN2cvMkdXQzY2MGlMVlY0b1EwUXFMbm5CZ3N3TFduMFhmd3FJb0I3b3JDTUNMRjh3N2FwT01IL0tIYU1xWEJySyt0aXlBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieER5TTBnTUZVT1YrNEhXSzQxdWpzQTBnV24zVlh5aktCdGZoRTNSOXpIaEloaEdVWnhIL3ZqalJIVEpWaU51aXRBcnliNXhqNkRkclZWZlpQSFZSQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MjU2OTMzMDY6NjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2p3MHpGZk1XVEpmZzNIVkNJRnc2SkpRL3JkbjV0RDFFTU5sczIyRDRZYSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNDM5MTQ3OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFamcifQ==',
    PREFIXES: (process.env.PREFIX || '').split('$').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Neiman Marcus",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254725693306",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'typing',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
