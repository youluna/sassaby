'use strict';

var sassafras = require('./sassafras');

describe('sample.scss', function() {
  sassafras.setFile('src/sample.scss');
  
  describe('#appearance', function() {
    it('should return 3 declarations', function() {
      sassafras.includedMixin("appearance(button)").hasNDeclarations(3);
    });

    it('should have a webkit prefixed declaration', function() {
      sassafras.includedMixin("appearance(button)").includesDeclaration("-webkit-appearance", "button");
    });

    it('should have the correct entire output', function() {
      var result = "-webkit-appearance: button; -moz-appearance: button; appearance: button;";
      sassafras.includedMixin("appearance(button)").equals(result);
    });
  });

  describe('#make-column', function() {
    it('should define the correct class', function() {
      sassafras.standaloneMixin("make-column(md, 6)").createsSelector(".col-md-6");
    });

    it('should return 2 declarations', function() {
      sassafras.standaloneMixin("make-column(md, 6)").hasNDeclarations(2);
    });

    it('should have a webkit prefixed declaration', function() {
      sassafras.standaloneMixin("make-column(md, 6)").includesDeclaration("max-width", "50%");
    });

    it('should have the correct entire output', function() {
      var result = ".col-md-6 { flex-basis: 50%; max-width: 50%; }";
      sassafras.standaloneMixin("make-column(md, 6)").equals(result);
    });
  });

  describe('#remy', function() {
    it('convert to px units to rem units', function() {
      sassafras.fnction("remy(32px, 16px)").equals("2rem");
    });
  });

  describe('#boolean-switch', function() {
    it('should return true if passed true', function() {
      sassafras.fnction("boolean-switch(true)").isTrue();
    });

    it('should return false if passed false', function() {
      sassafras.fnction("boolean-switch(false)").isFalse();
    });

    it('testing truthy', function() {
      sassafras.fnction("return-self(true)").isTruthy();
      sassafras.fnction("return-self(1)").isTruthy();
      sassafras.fnction("return-self('a')").isTruthy();
      sassafras.fnction("return-self('')").isTruthy();
    });

    it('testing falsey', function() {
      sassafras.fnction("return-self(false)").isFalsey();
      sassafras.fnction("return-self(null)").isFalsey();
    });
  });
});
