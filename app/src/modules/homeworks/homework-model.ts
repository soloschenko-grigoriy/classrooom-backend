import mongoose = require("mongoose");
import sanitizerPlugin = require("mongoose-sanitizer");
import {iQuestionModel} from "../questions/question-model";

var deepPopulate = require("mongoose-deep-populate")(mongoose);

export interface iHomework {
  quesion: mongoose.Model<iQuestionModel>,
  text: string
}

var schema = new mongoose.Schema({
  quesion: { type: mongoose.Schema.Types.ObjectId, ref: 'Quesion' },
  text: String
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

export interface iHomeworkModel extends iHomework, mongoose.Document{}
export var Homework = mongoose.model<iHomeworkModel>('Homework', schema);