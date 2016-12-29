import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");
import {iCourseModel} from "../courses/course-model";

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iLesson {
  name: string,
  course: mongoose.Model<iCourseModel>,
  description: string,
  icon: string,
  position: number,
  active: boolean,
  disabled: boolean
}

var schema = new mongoose.Schema({
  name: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  description: String,
  icon: String,
  position: Number,
  active: Boolean,
  disabled: Boolean
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

export interface iLessonModel extends iLesson, mongoose.Document{}
export var Lesson = mongoose.model<iLessonModel>('Lesson', schema);