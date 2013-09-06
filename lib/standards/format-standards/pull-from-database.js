var connection = require('../../database');
var correlate = require('./jumpstart-correlations');
var async = require('async');
var _ = require('lodash');

var statement = 
" SELECT id, content_area AS subject, state AS source, " + 
" standard1 AS topic FROM standards_new WHERE standards_new.id = ?";

module.exports = function (lesson, callback) {
  var standards = lesson.standards;

  async.map(standards, fetch, function (err, standards) {
    lesson.standards = standards;

    standards.forEach(function (standard) {
      standard = parseInt(standard.id);

      if (standard <= 20) {
        lesson.economicsStandards.push(standard);
      } else if (standard >= 144290 || standard <= 144319) {
        lesson.personalFinanceStandards.push(correlate(standard));
      }
      
    });
    
    lesson.economicsStandards = _.uniq(lesson.economicsStandards);
    lesson.personalFinanceStandards = _.uniq(lesson.personalFinanceStandards);
    
    callback(null, lesson);
  });
};

function fetch(standard, callback) { 
  connection.query(statement, [standard], function (err, standard) {
    callback(null, standard[0]);
  });
}