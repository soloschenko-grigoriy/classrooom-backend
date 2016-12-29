import _ = require('underscore');
import express = require('underscore');

import {iRepository} from './iRepository';
import {iController} from './iController';

export class Controller implements iController{

  /**
   * Model ref
   */
  public repository: iRepository;

  /**
   * Available routes
   */
  public routes: string[] = ['load','list','create','update', 'delete'];

  /**
   * Root of this routes
   */
  public root: string;

  public app: express;

  constructor(app: express, repository: iRepository){
    this.app = app;
    this.repository = repository;
    this.configure();
  }

  /**
   * Configure routes for this controller
   *
   * @param app
   */
   public configure(){

      // options route
      this.app.options(this.root,          _.bind(this.options, this));
      this.app.options(this.root + '/:id', _.bind(this.options, this));

      // list route
      if(!!~_.indexOf(this.routes, 'list')){
        this.app.get(this.root, _.bind(this.list, this));
      }

      // load route
      if(!!~_.indexOf(this.routes, 'load')){
        this.app.get(this.root + '/:id', _.bind(this.load, this));
      }

      // create route
      if(!!~_.indexOf(this.routes, 'create')){
        this.app.post(this.root, _.bind(this.create, this));
      }

      // update route
      if(!!~_.indexOf(this.routes, 'update')){
        this.app.put(this.root + '/:id',   _.bind(this.update, this));
        this.app.patch(this.root + '/:id', _.bind(this.update, this));
      }


      // delete route
      if(!!~_.indexOf(this.routes, 'delete')){
        this.app.delete(this.root + '/:id', _.bind(this.delete, this));
      }

      return this;
  }

  /**
   * Allow cross domain requests
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public allowCrossDomain(req : express.Request, res : express.Response, next : Function): Controller{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,POST,PUT,PATCH,UPDATE,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Length,Content-Type,X-Auth-Token');

    return this;
  }

  /**
   * Options request
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public options(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);

    res.json(true);

    return this;
  }

  /**
   * Count request
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public count(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);

    this.repository.count(req.query)
      .catch(e => {
        res.status(status || 500).send(e);
      })
      .then(r => {
        res.json(r);
      });

    return this;
  }

  /**
   * Load model from DB
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public load(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);

    this.repository.load(req.params.id, req.query)
      .catch(e => {
        res.status(status || 500).send(e);
      })
      .then(r => {
        res.json(r);
      })
    
    return this;
  }

  /**
   * List models
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public list(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);

    this.repository.list(req.query)
      .catch(e => {
        res.status(status || 500).send(e);
      })
      .then(r => {
        res.json(r);
      });

    return this;
  }

  /**
   * Create new model
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public create(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);
    
    this.repository.create(req.body)
      .catch(e => {
        res.status(status || 500).send(e);
      })
      .then(r => {
        res.json(r);
      });

    return this;
  }

  /**
   * Update model in DB
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public update(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);

    this.repository.update(req.params.id, req.body)
      .catch(e => {
        res.status(status || 500).send(e);
      })
      .then(r => {
        res.json(r);
      });

    return this;
  }

  /**
   * Delet model from Db
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns Controller
   */
  public delete(req : express.Request, res : express.Response, next : Function) : Controller{
    this.allowCrossDomain(req, res, next);

    this.repository.delete(req.params.id)
      .catch(e => {
        res.status(status || 500).send(e);
      })
      .then(r => {
        res.json(r);
      });

    return this;
  }
}