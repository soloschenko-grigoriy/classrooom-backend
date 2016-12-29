import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iUser {
  name: string,
  email: string,
  password: string,
  keycode: string
}

var schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  keycode: String
});

sanitizerPlugin(schema, { skip: {} });
schema.plugin(deepPopulate, {});

schema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.token;
  }
});

export interface iUserModel extends iUser, mongoose.Document{}
export var User = mongoose.model<iUserModel>('User', schema);