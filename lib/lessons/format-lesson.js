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
  
  if (!Array.isArray(lesson.grades)) {
    lesson.grades = normalizeGrades(lesson.grades);
  }
  
  lesson.format = 'print';
  
  return lesson;
};

function normalizeGrades(grades) {
  var gradeBands = {
    "2-4": ["K-2", "3-5"],
    "3-4": ["3-5"],
    "3-5": ["3-5"],
    "4-5": ["3-5"],
    "4-8": ["3-5", "6-8"],
    "5-6": ["3-5", "6-8"],
    "5-8": ["3-5", "6-8"],
    "6-12": ["6-8", "9-12"],
    "6-8": ["6-8"],
    "7-13": ["6-8", "9-12"],
    "7-8": ["6-8"],
    "9-10": ["9-12"],
    "9-12": ["9-12"],
    "College": ["College"],
    "K-12": ["K-2", "3-5", "6-8", "9-12"],
    "K-2": ["K-2"],
    "K-5": ["K-2", "3-5"],
    "K-8": ["K-2", "3-5", "6-8"]
  }
  
  return gradeBands[grades];
}