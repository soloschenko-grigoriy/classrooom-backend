import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");
import {iLessonModel} from "../lessons/lesson-model";

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iQuestion {
  name: string,
  answer1: string,
  answer2: string,
  answer3: string,
  answer4: string,
  correct: string,
  answer1type: string,
  answer2type: string,
  answer3type: string,
  answer4type: string,
  lesson: mongoose.Model<iLessonModel>,
  position: number
}

var schema = new mongoose.Schema({
  name: String,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  correct: String,
  answer1type: String,
  answer2type: String,
  answer3type: String,
  answer4type: String,
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  position: Number
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

export interface iQuestionModel extends iQuestion, mongoose.Document{}
export var Question = mongoose.model<iQuestionModel>('Question', schema);