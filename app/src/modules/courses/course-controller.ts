import express = require('underscore');
import {Controller} from "../../controller";

export class CourseController extends Controller{
    configure(){
        this.root = '/api/courses';
        this.routes = ['load','list','create','update', 'delete'];
        return super.configure();
    }
}