var should  = require('chai').should(),
    cangjie = require('../index');


describe('#toCangjie', function() {
  it('should convert MGILG to 一土戈中土', function() {
    cangjie.toCangjie("MGILG").should.equal("一土戈中土");
  });

  it('should be case insensitive', function() {
    cangjie.toCangjie("MgilG").should.equal("一土戈中土");
  });

  it('should convert I to 戈', function() {
    cangjie.toCangjie("I").should.equal("戈");
  });

  it('should convert ONF to 人弓火', function() {
    cangjie.toCangjie("ONF").should.equal("人弓火");
  });

  it('should ignore unknown characters', function(){
    cangjie.toCangjie("O!NF?").should.equal("人!弓火?");
  });

  it('should return nothing when given nothing', function(){
    should.not.exist(cangjie.toCangjie());
  });

});

describe('#fromCangjie', function() {
  it('should convert 一土戈中土 to MGILG', function() {
    cangjie.fromCangjie("一土戈中土").should.equal("MGILG");
  });

  it('should convert 戈 to I', function() {
    cangjie.fromCangjie("戈").should.equal("I");
  });

  it('should convert 人弓火 to ONF', function() {
    cangjie.fromCangjie("人弓火").should.equal("ONF");
  });

  it('should ignore unknown characters', function(){
    cangjie.fromCangjie("人!弓火?").should.equal("O!NF?");
  });

  it('should return nothing when given nothing', function(){
    should.not.exist(cangjie.fromCangjie());
  });

});

describe('#forCharacter', function() {
  it('should convert 雨 to MLBY', function(done) {
    cangjie.forCharacter("雨", function(err, alpha, cangjie){
      should.not.exist(err);
      alpha.should.equal("MLBY");
      done();
    })
  });

  it('should also convert 雨 to 一中月卜', function(done) {
    cangjie.forCharacter("雨", function(err, alpha, cangjie){
      should.not.exist(err);
      cangjie.should.equal("一中月卜");
      done();
    })
  });

  it('should not return anything when it can\'t find given string', function(done) {
    cangjie.forCharacter("thisshouldfail", function(err, alpha, cangjie){
      should.not.exist(err);
      should.not.exist(alpha);
      should.not.exist(cangjie);
      done();
    })
  });
});

describe('#findCharacter', function() {
  it('should return [\'雨\'] when given \'MLBY\'', function(done) {
    cangjie.findCharacter("MLBY", function(err, characters){
      should.not.exist(err);
      // So apparently .eql is "deep compare"?
      characters.length.should.equal(1);
      characters.should.eql(["雨"]);
      done();
    });
  });

  it('should also return [\'雨\'] when given \'一中月卜\'', function(done) {
    cangjie.findCharacter("一中月卜", function(err, characters){
      should.not.exist(err);
      characters.length.should.equal(1);
      characters.should.eql(["雨"]);
      done();
    });
  });

  it ('should be case insensitive if given roman alphabet', function(done){
    cangjie.findCharacter("Mlby", function(err, characters){
      should.not.exist(err);
      characters.length.should.equal(1);
      characters.should.eql(["雨"]);
      done();
    });
  });

  it ('should return an empty array if nothing was found', function(done){
    cangjie.findCharacter("QWERTYUIOP", function(err, characters){
      should.not.exist(err);
      characters.should.eql([]);
      done();
    });
  });

  it ('return an empty array if nothing was given', function(done){
    var nothing;
    cangjie.findCharacter(nothing, function(err, characters){
      should.not.exist(err);
      characters.should.eql([]);
      done();
    });
  });

  it ('looks like it\'ll also handle hybrid strings (M中月y) - don\'t do this though', function(done){
    cangjie.findCharacter("M中月y", function(err, characters){
      should.not.exist(err);
      characters.should.eql(["雨"]);
      characters.length.should.equal(1);
      characters[0].should.equal("雨");
      done();
    });
  });

  it ('may sometimes return multiple characters (YWLV)', function(done){
    cangjie.findCharacter("YWLV", function(err, characters){
      should.not.exist(err);
      characters.length.should.equal(2);
      characters.should.contain("還");
      characters.should.contain("褱");
      done();
    });
  });

});


describe('#search', function() {
  // Add more tests for this guy
  it ('should accept partial lookup strings', function(done){
    cangjie.search("一中", function(err, characters){
      should.not.exist(err);
      characters.length.should.equal(14);

      // Check that this returns the expected characters
      [ '工', '更', '雨', '兩', '亞', '丌', '丏',
        '両', '丣', '帀', '㓚', '㧭', '厞', '覀'
      ].forEach(function(c) {
        characters.should.contain(c);
      });

      done();
    });
  });

  it ('needs to have pagination/result limiting implemented', function() {
    should.exist(undefined);
  });

});



