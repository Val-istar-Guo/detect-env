import normalize from '../src/normalize';
import { expect } from 'chai';

describe('Module: normalize', function () {
  const table = {
    prod: /^production$/,
    dev: /^develop(ment)?$/,
    local: (raw) => raw === undefined || raw === null || /(local)|(^$)/.test(raw),
  };

  it("'prod' and 'production' should normalize to stirng 'prod'", function () {
    expect(normalize('prod', table)).to.equal('prod');
    expect(normalize('production', table)).to.equal('prod');
  });

  it("'develop' and 'development' should normalize to string 'dev'", function () {
    expect(normalize('develop', table)).to.equal('dev');
    expect(normalize('development', table)).to.equal('dev');
  });

  it("null, undefined, empty string, 'local' should be normalize to string 'local'", function () {
    expect(normalize(null, table)).to.equal('local');
    expect(normalize(undefined, table)).to.equal('local');
    expect(normalize('', table)).to.equal('local');
    expect(normalize('locale', table)).to.equal('local');
  });

})
