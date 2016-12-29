import express = require('underscore');

export interface iController{
    
    /**
     * Configure routes for this controller
     *
     * @param app
     */
    configure(): iController;

    /**
     * Allow cross domain requests
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    allowCrossDomain(req : express.Request, res : express.Response, next : Function): iController;

    /**
     * Options request
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    options(req : express.Request, res : express.Response, next : Function) : iController

    /**
     * Count request
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    count(req : express.Request, res : express.Response, next : Function) : iController

    /**
     * Load model from DB
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    load(req : express.Request, res : express.Response, next : Function) : iController;

    /**
     * List models
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    list(req : express.Request, res : express.Response, next : Function) : iController;

    /**
     * Create new model
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    create(req : express.Request, res : express.Response, next : Function) : iController;

    /**
     * Update model in DB
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    update(req : express.Request, res : express.Response, next : Function) : iController;

    /**
     * Delet model from Db
     *
     * @param req
     * @param res
     * @param next
     *
     * @returns Controller
     */
    delete(req : express.Request, res : express.Response, next : Function) : iController;
}