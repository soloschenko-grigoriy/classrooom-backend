import express = require('underscore');
import {Controller} from "../../controller";

export class UserController extends Controller{
    configure(){
        this.root = '/api/users';
        this.routes = ['load','list','create','update', 'delete'];
        return super.configure();
    }
}