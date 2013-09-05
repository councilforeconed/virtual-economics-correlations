var inherits = require('util').inherits;
var Transform = require('stream').Transform;
var pullFromDatabase = require('./pull-from-database');
  
function applyConceptsFromDatabase(options) {
  if (!(this instanceof applyConceptsFromDatabase)) {
    return new applyConceptsFromDatabase(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(applyConceptsFromDatabase, Transform);

applyConceptsFromDatabase.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  pullFromDatabase(lesson, function (err, lesson) {
    self.push(lesson);
    callback();
  });
};
 
module.exports = applyConceptsFromDatabase;
