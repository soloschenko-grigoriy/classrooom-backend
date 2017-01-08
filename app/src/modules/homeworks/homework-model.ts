import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");
import {iLessonModel} from "../lessons/lesson-model";

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iHomework {
  lesson: mongoose.Model<iLessonModel>,
  description: string,
  special: boolean
}

var schema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  description: String,
  special: Boolean
});

sanitizerPlugin(schema, { skip: {
  description: true
} });
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

export interface iHomeworkModel extends iHomework, mongoose.Document{}
export var Homework = mongoose.model<iHomeworkModel>('Homework', schema);