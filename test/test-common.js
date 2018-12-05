var should  = require('chai').should(),
    cangjie = require('../index');

describe('Synchronous methods', function() {
  describe('cangjie.toCangjie()', function() {
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

  describe('cangjie.fromCangjie()', function() {
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
});
