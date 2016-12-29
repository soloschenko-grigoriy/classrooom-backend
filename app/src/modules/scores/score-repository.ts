import {Repository} from "../../repository";

import mongoose = require("mongoose");
import _ = require("underscore");

import {iQuestionModel} from "../questions/question-model";
import {iLessonModel} from "../lessons/lesson-model";
import {iScoreModel} from "../scores/score-model";
import {iUserModel} from "../users/user-model";

export class ScoreRepository extends Repository{
    // public list(data: Object) : Promise<mongoose.Document[]> {
    //     return new Promise((resolve, reject) => {
    //        this.model.find({}).exec((e, scores) => {
    //            if(e){return reject(e); }

    //            mongoose.model('Lesson').find({}).exec((e, lessons) => {
    //                 if(e){return reject(e); }

    //                 mongoose.model('Question').find({}).exec((e, questions) => {
    //                     if(e){return reject(e); }

    //                     mongoose.model('User').find({}).exec((e, users) => {
    //                         if(e){return reject(e); }
                            
    //                         scores.forEach((score: iScoreModel) => {
    //                             let lesson : mongoose.Model<iLessonModel> = _.find(lessons, ( (one: iLessonModel) => {
    //                                 return one.lesson_id == score.lesson_id;
    //                             }));

    //                             let question : mongoose.Model<iQuestionModel> = _.find(questions, ((one: iQuestionModel) => {
    //                                 return one.question_id == score.question_id;
    //                             }));

    //                             let user : mongoose.Model<iUserModel> = _.find(users, ((one: iUserModel) => {
    //                                 return one.user_id == score.user_id;
    //                             }));

    //                             // if(!lesson || !question || !user){
    //                             //     console.log(score);
    //                             // }
                                
                                
    //                             score.lesson = lesson['_id'];
    //                             score.question = question['_id'];
    //                             score.user = user['_id'];
    //                             score.correct = (score.is_correct == 1) ? true : false;
    //                             score.save((e) =>{
    //                                 console.log(e);
    //                             });
                                
    //                         });
    //                     });
    //                 });

                    

    //                 // resolve(lessons);
    //             })
    //        })
    //     });    
    // }
}