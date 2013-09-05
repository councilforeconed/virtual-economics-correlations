var format = require('../lessons/format-lesson');
var connection = require('../database');
var _ = require('lodash');

var statement = 
" SELECT concepts.id, concepts.concept FROM concepts, lessons_concepts_join " + 
" WHERE concepts.id = lessons_concepts_join.concept_id AND lessons_concepts_join.lesson_id = ? "

module.exports = function (lesson, callback) {
  connection.query(statement, [lesson._id], function (err, concepts) {
    if (err) callback(err);
    
    lesson = format(lesson);
    
    concepts.forEach(function (concept) {
      lesson.concepts.push(concept);
    });
    
    callback(null, lesson);
  });
};