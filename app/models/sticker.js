var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StickerSchema = new Schema({
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true}
});

module.exports = mongoose.model('Sticker', StickerSchema);