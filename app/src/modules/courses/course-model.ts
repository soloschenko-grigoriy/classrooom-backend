import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iCourse {
  name: string,
  description: string,
  icon: string,
  position: number,
  active: boolean
}

var schema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  position: Number,
  active: Boolean
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

export interface iCourseModel extends iCourse, mongoose.Document{}
export var Course = mongoose.model<iCourseModel>('Course', schema);