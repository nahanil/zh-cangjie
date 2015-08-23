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

function toCangjie(string) {
  var out = [];
  if (!string) { return; }
  string.toUpperCase().split("").forEach(function(l){
    out.push( cangjie[l] || l );  
  });
  return out.join("");
}

function fromCangjie(string) {
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

module.exports.toCangjie   = toCangjie;
module.exports.fromCangjie = fromCangjie;
