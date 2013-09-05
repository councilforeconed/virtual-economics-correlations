var format = require('../../lessons/format-lesson');
var connection = require('../../database');
var _ = require('lodash');

var statement = 
" SELECT standard_id AS standard, concept_id AS concept, concept_weight AS weight " +
" FROM standards_concepts_join WHERE (standards_concepts_join.standard_id BETWEEN 1 AND 20 " +
" OR (standards_concepts_join.standard_id BETWEEN 144230 AND 144318) " +
" OR (standards_concepts_join.standard_id BETWEEN 148397 AND 148540)) " +
" AND standards_concepts_join.concept_id = ?"

module.exports = function (lesson, callback) {
  var ids = lesson.concepts.map(function (concept) {
    return concept.id;
  });
  var concepts = "(" + ids.join(',') + ")";
  
  connection.query(statement, [concepts], function (err, standards) {
    if (err) callback(err);
    
    lesson = format(lesson);
    
    standards.forEach(function (standard) {
      lesson.standards.push(standard.standard);
    });
    
    lesson.standards = _(lesson.standards).flatten().uniq().value();
    lesson.concepts = lesson.concepts.map(function (concept) {
      return concept.concept;
    });
    
    callback(null, lesson);
  });
};