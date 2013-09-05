var inherits = require('util').inherits;
var Transform = require('stream').Transform;
var pullFromDatabase = require('./pull-from-database');
  
function matchConceptsToStandards(options) {
  if (!(this instanceof matchConceptsToStandards)) {
    return new matchConceptsToStandards(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(matchConceptsToStandards, Transform);

matchConceptsToStandards.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  pullFromDatabase(lesson, function (err, lesson) {
    self.push(lesson);
    callback();
  });
};
 
module.exports = matchConceptsToStandards;
