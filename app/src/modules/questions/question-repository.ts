import mongoose = require("mongoose");
import _ = require("underscore");
import {iQuestionModel} from "../questions/question-model";
import {iLessonModel} from "../lessons/lesson-model";

import {Repository} from "../../repository";

export class QuestionRepository extends Repository{
    // public list(data: Object) : Promise<mongoose.Document[]> {
    //     return new Promise((resolve, reject) => {
    //        this.model.find({}).exec((e, questions) => {
    //            if(e){return reject(e); }

    //            mongoose.model('Lesson').find({}).exec((e, lessons) => {
    //                 if(e){return reject(e); }

    //                 questions.forEach((question: iQuestionModel) => {
    //                     var lesson = _.find(lessons, (one => {
    //                         return one.lesson_id == question.lesson_id;
    //                     }));

    //                     // console.log(lesson);
                        
    //                     question.lesson = lesson._id;
    //                     question.save((e) =>{
    //                         console.log(e);
    //                     });
                        
    //                 });

    //                 // resolve(lessons);
    //             })
    //        })
    //     });    
    // }
}