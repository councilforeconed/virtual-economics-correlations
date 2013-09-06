var lessons = require('./lessons');
var applyConcepts = require('./concepts');
var correlateToVirtualEconomics = require('./standards/virtual-economics');
var correlateToNCEE = require('./standards/ncee-database');
var matchConceptsToStandards = require('./standards/concepts-to-standards');
var fetchStandards = require('./standards/format-standards');
var couchStream = require('couch-stream');

module.exports = function () {
  lessons
    .pipe(applyConcepts())
    .pipe(matchConceptsToStandards())
    .pipe(correlateToVirtualEconomics())
    .pipe(correlateToNCEE())
    .pipe(fetchStandards())
    .pipe(couchStream('cee_portfolio')).on('data', console.log);
}