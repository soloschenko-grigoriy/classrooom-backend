import express = require('underscore');
import {Controller} from "../../controller";

export class QuestionController extends Controller{
    configure(){
        this.root = '/api/questions';
        this.routes = ['load','list','create','update', 'delete'];
        return super.configure();
    }
}