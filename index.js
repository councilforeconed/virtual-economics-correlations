var lessons = require('./lib/lessons');
var applyConcepts = require('./lib/concepts');
var correlateToVirtualEconomics = require('./lib/standards/virtual-economics');
var correlateToNCEE = require('./lib/standards/ncee-database');
var matchConceptsToStandards = require('./lib/standards/concepts-to-standards')
var fetchStandards = require('./lib/standards/format-standards')

lessons
  .pipe(applyConcepts())
  .pipe(matchConceptsToStandards())
  .pipe(correlateToVirtualEconomics())
  .pipe(correlateToNCEE())
  .pipe(fetchStandards())
  .on('data', console.log);