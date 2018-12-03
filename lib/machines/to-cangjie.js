module.exports = {

  friendlyName: 'To cangjie',
  description: 'Convert an alpha string (MGILG) to cangjie chars (一土戈中土)',

  sync: true,

  inputs: {
    text: {
      type: 'string',
      example: 'MGILG',
    },
  },

  exits: {
    success: {
      variableName: 'result',
      description: 'Done.',
      outputExample: '一土戈中土',
    },
  },

  fn: function(inputs, exits) {
    let cangjie = require('../private/map');
    let out = [];

    if (!inputs.text) { return exits.success(null); }

    inputs.text
          .split('')
          .forEach((l) => out.push(cangjie[l.toUpperCase()] || l));

    return exits.success(out.join(''));
  },

};
