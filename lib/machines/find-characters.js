module.exports = {

  friendlyName: 'Find Characters',
  description: 'Search for character (雨) that match a given search query (ML)',

  sync: false,

  inputs: {
    searchTerm: {
      type: 'string',
      example: 'MGILG',
    },

    partial: {
      type: 'boolean',
      defaultsTo: true,
      description: 'If true return partial that start with the given searchTerm'
    }
  },

  exits: {
    success: {
      variableName: 'result',
      description: 'An array of search results',
      outputType: ['string'],
      outputExample: ['工', '更', '雨', '兩', '亞', '丌', '丏'],
    },
  },


  fn: function(inputs, exits) {
    let db = require('../private/db').get();
    let fromCangjie = require('machine').buildWithCustomUsage({
      arginStyle: 'serial',
      execStyle: 'natural',
      def: require('./from-cangjie')
    });

    var query = 'SELECT character FROM cangjie WHERE cangjie LIKE UPPER(?) '
              + 'ORDER BY frequency ASC';

    let search = inputs.searchTerm;

    if (search && !search.match(/^[A-Z]$/i)) {
      search = fromCangjie(search);
    }

    if (inputs.partial) {
      search += "%";
    }

    db.all(query, search, function(err, found) {
      if (err) {
        return exits.error(err);
      }

      var chars = [];
      found.forEach(function(f){
        chars.push( f.character );
      });

      return exits.success(chars);
    });
  },

};
