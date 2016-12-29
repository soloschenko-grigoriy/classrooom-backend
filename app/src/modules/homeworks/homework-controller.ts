import express = require('underscore');
import {Controller} from "../../controller";

export class HomeworkController extends Controller{
    configure(){
        this.root = '/api/homeworks';
        this.routes = ['load','list','create','update', 'delete'];
        return super.configure();
    }
}