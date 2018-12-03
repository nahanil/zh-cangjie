module.exports = {

  friendlyName: 'From cangjie',
  description: 'Convert cangjie characters (一土戈中土) into alpha string (MGILG)',

  sync: true,

  inputs: {
    text: {
      type: 'string',
      example: '一土戈中土',
    },
  },

  exits: {
    success: {
      variableName: 'result',
      description: 'Done.',
      outputExample: 'MGILG',
    },
  },

  fn: function(inputs, exits) {
    let cangjie = require('../private/map');
    let out = [];

    if (!inputs.text) { return exits.success(null); }

    inputs.text.split('').forEach(function(l){
      for (let key in cangjie) {
        if (cangjie[key] == l) {
          return out.push( key );
        }
      }
      out.push(l);
    });

    return exits.success(out.join(''));
  },

};
