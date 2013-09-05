var inherits = require('util').inherits;
var Transform = require('stream').Transform;
var pullFromDatabase = require('./pull-from-database');
  
function applyStandardsFromNCEEDatabase(options) {
  if (!(this instanceof applyStandardsFromNCEEDatabase)) {
    return new applyStandardsFromNCEEDatabase(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(applyStandardsFromNCEEDatabase, Transform);

applyStandardsFromNCEEDatabase.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  pullFromDatabase(lesson, function (err, lesson) {
    self.push(lesson);
    callback();
  });
};
 
module.exports = applyStandardsFromNCEEDatabase;
