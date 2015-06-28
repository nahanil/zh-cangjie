# zh-cangjie
Node.js package to convert strings to/from cangjie chars (人弓火 -> ONF / ONF -> 人弓火)

# Usage
    var cangjie = require('zh-cangjie');
  
    // Convert alpha string into cangjie characters
    cangjie.toCangjie("MGILG")
    // "一土戈中土"
  
    // Convert cangjie string into alpha
    cangjie.fromCangjie("一土戈中土")
    // "MGILG"

# Notes
This is currently under development. API may/likely will grow and change.
