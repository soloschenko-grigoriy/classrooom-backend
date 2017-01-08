import express = require('underscore');
import {Controller} from "../../controller";

export class LessonController extends Controller{
    configure(){
        this.root = '/api/lessons';
        this.routes = ['load','list'];
        return super.configure();
    }
}