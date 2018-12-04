var should  = require('chai').should(),
    cangjie = require('../index');

describe('#forCharacter.exec()', function() {
  it('should convert 雨 to MLBY', function(done) {
    return cangjie.forCharacter('雨').exec((err, found) => {
      should.not.exist(err);
      found.alpha.should.equal('MLBY');
      found.cangjie.should.equal('一中月卜');
      done();
    });
  });

  it('should also convert 雨 to 一中月卜', function(done) {
    cangjie.forCharacter('雨').exec(function(err, found){
      should.not.exist(err);
      found.alpha.should.equal('MLBY');
      found.cangjie.should.equal('一中月卜');
      done();
    })
  });

  it('should not return anything when it can\'t find given string', function(done) {
    cangjie.forCharacter('thisshouldfail').exec(function(err, found){
      should.not.exist(err);
      should.not.exist(found);
      done();
    });
  });

});

describe('#findCharacters.exec()', function() {
 it('should return [\'雨\'] when given \'MLBY\'', function(done) {
   cangjie.findCharacters('MLBY').exec(function(err, found){
     should.not.exist(err);
     found.length.should.equal(1);
     found.should.eql(['雨']);
     done();
   });
 });

});
