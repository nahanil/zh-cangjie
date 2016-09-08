var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./cangjie.db');

var cangjie = {
  A: "日",
  B: "月",
  C: "金",
  D: "木",
  E: "水",
  F: "火",
  G: "土",
  H: "竹",
  I: "戈",
  J: "十",
  K: "大",
  L: "中",
  M: "一",
  N: "弓",
  O: "人",
  P: "心",
  Q: "手",
  R: "口",
  S: "尸",
  T: "廿",
  U: "山",
  V: "女",
  W: "田",
  X: "重",
  Y: "卜",
  Z: "Z"
}

function ZHCangjie() {}

ZHCangjie.prototype.toCangjie = function(string) {
  var out = [];
  if (!string) { return; }
  string.toUpperCase().split("").forEach(function(l){
    out.push( cangjie[l] || l );  
  });
  return out.join("");
}

ZHCangjie.prototype.fromCangjie = function(string) {
  var out = [];
  if (!string) { return; }
  string.split("").forEach(function(l){
    for (key in cangjie) {
      if (cangjie[key] == l) {
        return out.push( key );  
      }
    }
    out.push(l);
  });
  return out.join("");
}

// Find the cangjie equivalent of a given character
ZHCangjie.prototype.forCharacter = function(string, callback){
  var $this = this;
  var query = "SELECT * FROM cangjie WHERE character = ?";

  db.get(query, string, function(err, chr) {
    if (err) {
      return callback(err);
    }

    if (!chr) {
      return callback();
    }

    callback(null, chr.cangjie, $this.toCangjie(chr.cangjie));
  });
}

// Find a list of characters that fully match given cangjie string
ZHCangjie.prototype.__doLookupMulti = function(query, string, callback) {

  if (string && !string.match(/^[A-Z]$/i)) {
    string = this.fromCangjie(string);
  }

  db.all(query, string, function(err, found) {
    if (err) {
      return callback(err);
    }

    if (!found) {
      return callback();
    }

    var chars = [];
    found.forEach(function(f){
      chars.push( f.character );  
    });

    callback(null, chars);
  });

}

ZHCangjie.prototype.findCharacter = function(string, callback){
  var $this = this;
  var query = "SELECT * FROM cangjie WHERE cangjie = UPPER(?) "
            + "ORDER BY frequency ASC";

  this.__doLookupMulti(query, string, callback);
}

ZHCangjie.prototype.search = function(string, callback) {
  var query = "SELECT * FROM cangjie WHERE cangjie LIKE UPPER(?) "
            + "ORDER BY frequency ASC";
            
  if (string && string.substr(-1) != "%") {
    string += "%";
  }

  this.__doLookupMulti(query, string, callback);
}

module.exports = new ZHCangjie();
