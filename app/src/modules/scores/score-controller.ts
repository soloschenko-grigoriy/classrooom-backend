import express = require('underscore');
import {Controller} from "../../controller";

export class ScoreController extends Controller{
    configure(){
        this.root = '/api/scores';
        this.routes = ['load','list','create'];
        return super.configure();
    }
}