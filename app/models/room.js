var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: { type: String, required: true, unique: true}
});

module.exports = mongoose.model('Room', RoomSchema);