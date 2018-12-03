var should  = require('chai').should(),
    cangjie = require('../index');


describe('#toCangjie', function() {
  it('should convert MGILG to 一土戈中土', function() {
    cangjie.toCangjie('MGILG').should.equal('一土戈中土');
  });

  it('should be case insensitive', function() {
    cangjie.toCangjie('MgilG').should.equal('一土戈中土');
  });

  it('should convert I to 戈', function() {
    cangjie.toCangjie('I').should.equal('戈');
  });

  it('should convert ONF to 人弓火', function() {
    cangjie.toCangjie('ONF').should.equal('人弓火');
  });

  it('should ignore unknown characters', function(){
    cangjie.toCangjie('O!NF?').should.equal('人!弓火?');
  });

  it('should return nothing when given nothing', function(){
    should.not.exist(cangjie.toCangjie());
  });
});

describe('#fromCangjie', function() {
  it('should convert 一土戈中土 to MGILG', function() {
    cangjie.fromCangjie('一土戈中土').should.equal('MGILG');
  });

  it('should convert 戈 to I', function() {
    cangjie.fromCangjie('戈').should.equal('I');
  });

  it('should convert 人弓火 to ONF', function() {
    cangjie.fromCangjie('人弓火').should.equal('ONF');
  });

  it('should ignore unknown characters', function(){
    cangjie.fromCangjie('人!弓火?').should.equal('O!NF?');
  });

  it('should return nothing when given nothing', function(){
    should.not.exist(cangjie.fromCangjie());
  });
});

describe('#forCharacter', function() {
  it('should convert 雨 to MLBY/一中月卜 (async)', async function() {
    let found = await cangjie.forCharacter('雨');
    found.alpha.should.equal('MLBY');
    found.cangjie.should.equal('一中月卜');
  });

  it('should convert 雨 to MLBY (exec)', function(done) {
    return cangjie.forCharacter('雨').exec((err, found) => {
      should.not.exist(err);
      found.alpha.should.equal('MLBY');
      found.cangjie.should.equal('一中月卜');
      done();
    });
  });

  it('should also convert 雨 to 一中月卜 (async)', async function() {
    let found = await cangjie.forCharacter('雨');
    found.alpha.should.equal('MLBY');
    found.cangjie.should.equal('一中月卜');
  });

  it('should also convert 雨 to 一中月卜 (exec)', function(done) {
    cangjie.forCharacter('雨').exec(function(err, found){
      should.not.exist(err);
      found.alpha.should.equal('MLBY');
      found.cangjie.should.equal('一中月卜');
      done();
    })
  });

  it('should not return anything when it can\'t find given string (async)', async function() {
    let found = await cangjie.forCharacter('thisshouldfail');
    should.not.exist(found);
  });

  it('should not return anything when it can\'t find given string (exec)', function(done) {
    cangjie.forCharacter('thisshouldfail').exec(function(err, found){
      should.not.exist(err);
      should.not.exist(found);
      done();
    });
  });

});

describe('#findCharacters', function() {
 it('should return [\'雨\'] when given \'MLBY\' (await)', async function() {
   let found = await cangjie.findCharacters('MLBY');
   found.length.should.equal(1);
   // So apparently .eql is 'deep compare'?
   found.should.eql(['雨']);
 });

 it('should return [\'雨\'] when given \'MLBY\' (exec)', function(done) {
   cangjie.findCharacters('MLBY').exec(function(err, found){
     should.not.exist(err);
     found.length.should.equal(1);
     found.should.eql(['雨']);
     done();
   });
 });

 it('should also return [\'雨\'] when given \'一中月卜\'', async function() {
   let found = await cangjie.findCharacters('一中月卜');
   found.length.should.equal(1);
   found.should.eql(['雨']);
 });

 it ('should be case insensitive if given roman alphabet', async function(){
   let found = await cangjie.findCharacters('Mlby');
   found.length.should.equal(1);
   found.should.eql(['雨']);
 });

 it ('should return an empty array if nothing was found', async function(){
   let found = await cangjie.findCharacters('QWERTYUIOP');
   found.should.eql([]);
 });

 it ('return an empty array if nothing was given', async function(){
   var nothing;
   let found = await cangjie.findCharacters(nothing);
   found.should.eql([]);
 });

 it ('looks like it\'ll also handle hybrid strings (M中月y) - don\'t do this though', async function(){
   let found = await cangjie.findCharacters('M中月y');
   found.length.should.equal(1);
   found.should.eql(['雨']);
 });

 it ('may sometimes return multiple characters (YWLV)', async function(){
   let found = await cangjie.findCharacters('YWLV');
   found.length.should.equal(2);
   found.should.contain('還');
   found.should.contain('褱');
 });

 it ('return multiple results for ambiguous queries', async function(){
   let found = await cangjie.findCharacters('一中');
   found.length.should.equal(14);

   // Check that this returns the expected characters
   [ '工', '更', '雨', '兩', '亞', '丌', '丏',
     '両', '丣', '帀', '㓚', '㧭', '厞', '覀'
   ].forEach(function(c) {
     found.should.contain(c);
   });
 });

 it ('should allow disabling "partial" matching', async function(){
   let found = await cangjie.findCharacters('一中', false);
   found.length.should.equal(1);

   // Check that this returns the expected characters
   found.should.contain('丌');
 });

  /*
  it ('maybe should have have pagination/result limiting implemented', function() {
   should.exist(undefined);
  });
  */

});
