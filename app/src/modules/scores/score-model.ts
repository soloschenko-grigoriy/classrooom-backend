import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");
import {iQuestionModel} from "../questions/question-model";
import {iLessonModel} from "../lessons/lesson-model";
import {iUserModel} from "../users/user-model";

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iScore {
  lesson: mongoose.Model<iLessonModel>,
  question: mongoose.Model<iQuestionModel>,
  user: mongoose.Model<iUserModel>,
  answered: string,
  correct: boolean
}

var schema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  answered: String,
  correct: Boolean
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

export interface iScoreModel extends iScore, mongoose.Document{}
export var Score = mongoose.model<iScoreModel>('Score', schema);