var format = require('../../lessons/format-lesson');
var connection = require('../../database');
var _ = require('lodash');

var statement = 
"SELECT standard_id AS standard FROM lessons_standards_join WHERE lessons_standards_join.lesson_id = ?";

module.exports = function (lesson, callback) {
  connection.query(statement, [lesson._id], function (err, standards) {
    if (err) callback(err);
    
    lesson = format(lesson);
    
    standards.forEach(function (standard) {
      lesson.standards.push(standard.standard);
    });
    
    lesson.standards = _(lesson.standards).flatten().uniq().value();
    
    callback(null, lesson);
  });
};