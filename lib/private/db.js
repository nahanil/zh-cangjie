var db = null;

module.exports = {
  get: () => {
    if (!db) {
      let path = require('path');
      let sqlite3 = require('sqlite3').verbose();
      db = new sqlite3.Database(path.join(__dirname, 'cangjie.db'));
    }

    return db;
  }
};
