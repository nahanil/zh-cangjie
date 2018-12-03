module.exports = {

  friendlyName: 'For Character',
  description: 'Find the cangjie representation of a given 漢字',

  sync: false,

  inputs: {
    searchTerm: {
      type: 'string',
      example: '雨',
    },
  },

  exits: {
    success: {
      variableName: 'result',
      description: 'Done.',
      outputExample: '一中月卜',
    },
  },

  fn: function(inputs, exits) {
    let toCangjie = require('machine').buildWithCustomUsage({
      arginStyle: 'serial',
      execStyle: 'natural',
      def: require('./to-cangjie')
    });

    let db = require('../private/db').get();

    var query = "SELECT * FROM `cangjie` WHERE character = ?";

    db.get(query, inputs.searchTerm, function(err, chr) {
      if (err) {
        return exits.error(err);
      }

      if (!chr) {
        return exits.success();
      }

      return exits.success({
        alpha: chr.cangjie,
        cangjie: toCangjie(chr.cangjie)
      });
    });

  },

};
