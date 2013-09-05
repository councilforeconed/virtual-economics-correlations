var format = require('../../lessons/format-lesson');
var inherits = require('util').inherits;
var Transform = require('stream').Transform;
var _ = require('lodash');

var standards = require('./ve-correlations');
  
function applyStandardsFromVE(options) {
  if (!(this instanceof applyStandardsFromVE)) {
    return new applyStandardsFromVE(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(applyStandardsFromVE, Transform);

applyStandardsFromVE.prototype._transform = function (lesson, encoding, callback) {
  
  lesson = format(lesson);
  
  _.forIn(standards, function (value, key) {
    if (value.indexOf(lesson._id) >= 0)
      lesson.standards.push(parseInt(key));
  });
  
  this.push(lesson);
  callback();
};
 
module.exports = applyStandardsFromVE;