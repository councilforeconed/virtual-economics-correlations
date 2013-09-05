var inherits = require('util').inherits;
var Transform = require('stream').Transform;
var pullFromDatabase = require('./pull-from-database');
  
function fetchStandards(options) {
  if (!(this instanceof fetchStandards)) {
    return new fetchStandards(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(fetchStandards, Transform);

fetchStandards.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  pullFromDatabase(lesson, function (err, lesson) {
    self.push(lesson);
    callback();
  });
};
 
module.exports = fetchStandards;
