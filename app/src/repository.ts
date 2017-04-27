import mongoose = require("mongoose");
import _ = require('underscore');

import {iRepository} from "./iRepository";

export class Repository implements iRepository{

  /**
   * Mongoose model
   */
  public model: mongoose.Model<mongoose.Document>;

  /**
   * constructor
   */
  constructor(model: mongoose.Model<mongoose.Document>){
    this.model = model;
  }

  /**
   * Count model in DB
   *
   * @param cookies
   * @param headers
   * @param data
   * @param success
   * @param eor
   *
   * @returns Model
   */
  public count(data: Object) : Promise<Number>{
    var criteria  : Object  = {},
        limit     : number  = 50,
        page      : number  = 0,
        sort      : string  = '_id';

    _.each(data, function(value, key)
    {
      switch(key){
        case 'limit': limit = +value; break;
        case 'page' : page = value;  break;
        case 'sort' : sort = value;  break;

        case 'like':
          _.each(value, function(v, k)
          {
            criteria[k] = {$regex: v};
          });
          break;

        case 'likeI':
          _.each(value, function(v, k)
          {
            criteria[k] = {$regex: new RegExp(v, 'i')};
          });
          break;
        case 'likeOr':
          var or = [];
          _.each(value, function(v, k)
          {
            var elm = {};
            elm[k]  = {$regex: v, $options: '-i'};
            or.push(elm);
          });
          criteria['$or'] = or;
          break;
        case 'or':
          if(!criteria['$or']){
            criteria['$or'] = [];
          }
          _.each(value, function(v, k)
          {
            criteria['$or'].push(v);
          });
          break;
        case 'in':
          _.each(value, function(v, k)
          {
            criteria[k] = {$in: v};
          });
          break;
        case 'gt':
          _.each(value, function(v, k)
          {
            criteria[k] = {$gt: v};
          });
          break;
        case 'lt':
          _.each(value, function(v, k)
          {
            criteria[k] = {$lt: v};
          });
          break;
        case 'gte':
          _.each(value, function(v, k)
          {
            criteria[k] = {$gte: v};
          });
          break;
        case 'lte':
          _.each(value, function(v, k)
          {
            criteria[k] = {$lte: v};
          });
          break;
        default        :
          criteria[key] = value;
          break;
      }
    });

    return new Promise((resolve, reject) => {
      this.model
        .find(criteria)
        .count()
        .exec(function(e, r)
        {
          if(e){ return reject(e);}
          
          resolve(r);
        });
    });
  }

  /**
   * Load one model from DB
   *
   * @param id
   * @param cookies
   * @param headers
   * @param data
   * @param success
   * @param eor
   *
   * @returns Model
   */
  public load(id: string, data: Object) : Promise<mongoose.Document>{
    var populate : Array <number> = [];

    _.each(data, function(value, key)
    {
      switch(key){
        case 'populate': populate = value; break;
      }
    });

    return new Promise((resolve, reject) => {
      let doc : any = this.model.findById(id);
      
      doc
        .deepPopulate(populate.join(' '))
        .exec(function(e, r)
        {
          if(e){ return reject(e); }
          
          resolve(r);
        });

    });
  }

  /**
   * Get list of modeld from DB
   *
   * @param cookies
   * @param headers
   * @param data
   * @param success
   * @param eor
   *
   * @returns Model
   */
  public list(data: Object) : Promise<mongoose.Document[]> {
    var criteria  : Object        = {},
        fields    : string        = '',
        limit     : number        = 50,
        page      : number        = 0,
        sort      : string        = '_id',
        populate  : Array<number> = [];

    _.each(data, function(value, key)
    {
      switch(key){
        case 'limit': limit = value; break;
        case 'page' : page = value;  break;
        case 'sort' : sort = value;  break;

        case 'like':
          _.each(value, function(v, k)
          {
            criteria[k] = {$regex: v};
          });
          break;

        case 'likeI':
          _.each(value, function(v, k)
          {
            criteria[k] = {$regex: new RegExp(v, 'i')};
          });
          break;
        case 'likeOr':
          var or = [];
          _.each(value, function(v, k)
          {
            var elm = {};
            elm[k]  = {$regex: v, $options: '-i'};
            or.push(elm);
          });
          criteria['$or'] = or;
          break;
        case 'or':
          if(!criteria['$or']){
            criteria['$or'] = [];
          }
          _.each(value, function(v, k)
          {
            criteria['$or'].push(v);
          });
          break;
        case 'in':
          _.each(value, function(v, k)
          {
            criteria[k] = {$in: v};
          });
          break;
        case 'gt':
          _.each(value, function(v, k)
          {
            criteria[k] = {$gt: v};
          });
          break;
        case 'lt':
          _.each(value, function(v, k)
          {
            criteria[k] = {$lt: v};
          });
          break;
        case 'gte':
          _.each(value, function(v, k)
          {
            criteria[k] = {$gte: v};
          });
          break;
        case 'lte':
          _.each(value, function(v, k)
          {
            criteria[k] = {$lte: v};
          });
          break;
        case 'populate':
          populate = value;
          break;
        case 'fields'  :
          fields = value;
          break;
        default        :
          criteria[key] = value;
          break;
      }
    });

    return new Promise((resolve, reject) => {
      let doc: any = this.model
        .find(criteria)
        .select(fields)
        .limit(+limit)
        .skip(page * limit)
        .sort(sort);
      
        doc
          .deepPopulate(populate.join(' '))
          .exec(function(e, r)
          {
            if(e){return reject(e); }

            resolve(r);
          });
    });    
  }

  /**
   * Delete model from DB
   *
   * @param cookies
   * @param headers
   * @param data
   * @param success
   * @param eor
   *
   * @returns Model
   */
  public create(data: Object) : Promise<mongoose.Document>{
    return new Promise((resolve, reject) => {
      new this.model(data).save(function(e, r)
      {
        if(e){ return reject(e);}

        resolve(r);
      });
    });
    

  }

  /**
   * Update one model
   *
   * @param id
   * @param cookies
   * @param headers
   * @param data
   * @param success
   * @param eor
   *
   * @returns Model
   */
  public update(id: string, data: Object, additional?: Object) : Promise<mongoose.Document>{
    return new Promise((resolve, reject) => {
      this.model.findOneAndUpdate({ _id: id }, data, additional, (e, r) => {
        if(e){ return reject(e); }

        
        return this.load(id, data)
          .catch(e => {
            reject(e);
          })
          .then((res : any) => {
            resolve(res);
          });
      });
    });
  }

  /**
   * Delete model from DB
   *
   * @param id
   * @param cookies
   * @param headers
   * @param data
   * @param success
   * @param eor
   *
   * @returns Model
   */
  public delete(id: String) : Promise<iRepository>{
    return new Promise<iRepository>((resolve, reject) => {
      this.model.remove({ _id: id }, (e) => {
        if(e){ return reject(e); }

        resolve();
      });
    });
  }
}