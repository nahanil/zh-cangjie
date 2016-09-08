# zh-cangjie
Node.js package to convert strings to/from cangjie chars (人弓火 -> ONF / ONF -> 人弓火)

# Usage
````javascript
var cangjie = require('zh-cangjie');

// Convert alpha string into cangjie characters
cangjie.toCangjie("MGILG")
// "一土戈中土"

// Convert cangjie string into alpha
cangjie.fromCangjie("一土戈中土")
// "MGILG"

/*
 * From v0.1.0
 */
// Get the cangjie equivalent of a given character
cangjie.forCharacter("雨", function(err, alpha, cangjie){
  console.log(alpha);
  // MLBY

  console.log(cangjie);
  // 一中月卜
});

// Search for characters based on cangjie string
// Sometimes this will return multiple characters
cangjie.findCharacter("MLBY", function(err, found) {
  console.log(found);  
  // ['雨']
});

cangjie.findCharacter("一中月卜", function(err, found) {
  console.log(found);  
  // ['雨']
});

cangjie.findCharacter("YWLV", function(err, found) {
  console.log(found);  
  // ['褱', '還']
});


// Search for characters whos cangjie equivalent begins with the given string
// This could be used, for example, in a character prediction widget for
// a soft cangjie keyboard
cangjie.search("一中", function(err, found) {
  console.log(found);
  // [ '工', '更', '雨', '兩', '亞', '丌', '丏', '両', '丣', '帀', '㓚', '㧭', '厞', '覀' ]
});
````

# Changes
### 9 September 2016 - 0.1.0
  - Added ability to lookup cangjie for a given Chinese character (based on data from Unihan/Unicode Character Database
  - Added ability to search for characters based on a full or partial cangjie string (as either [A-Z]+ or cangjie 'radicals')

### 23 August 2015 - 0.0.2
Inital release

# TODO
  - Ideally paginate results returned by `search()`


# Notes
This is currently under development. API may/likely will grow and change.

Character <-> cangjie data was compiled from the Unicode Character Database.
````
Unicode Character Database
Copyright © 1991-2016 Unicode, Inc. All rights reserved.
Distributed under the Terms of Use in http://www.unicode.org/copyright.html.
````
