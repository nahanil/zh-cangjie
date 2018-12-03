const semver = require('semver');

require('./test-common');
require('./test-callback');

if (semver.gte(process.version, '8.0.0')) {
  require('./test-async');
}
