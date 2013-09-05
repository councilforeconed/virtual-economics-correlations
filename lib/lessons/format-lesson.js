var _ = require('lodash');

module.exports = function (lesson) {
  if (!lesson._id) throw new Error('Lesson does not have an ID.')
  
  if (_.isString(lesson.standards)) {
    lesson.standards = lesson
      .standards.split(',')
      .map(function (el) {
        return parseInt('cs1'.match(/\d+/));
      });
  }
  
  if (!lesson.standards) lesson.standards = [];
  if (!lesson.concepts) lesson.concepts = [];
  if (!lesson.economicsStandards) lesson.economicsStandards = [];
  if (!lesson.personalFinanceStandards) lesson.personalFinanceStandards = [];
  
  lesson.format = 'print';
  
  return lesson;
};