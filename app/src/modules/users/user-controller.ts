import express = require('underscore');
import {Controller} from "../../controller";

export class UserController extends Controller{
    configure(){
        this.root = '/api/users';
        this.routes = ['load','list', 'update'];
        return super.configure();
    }
}