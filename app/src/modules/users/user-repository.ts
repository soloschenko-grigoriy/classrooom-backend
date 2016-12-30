import mongoose = require("mongoose");
import _ = require('underscore');
import crypto = require('crypto');
import {Repository} from "../../repository";
import {iUserModel} from "./user-model";

export class UserRepository extends Repository{
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
    if(data['password']){
        let shasum = crypto.createHash('sha1');
        shasum.update(data['password']);
        data['password'] = shasum.digest('hex');
    }
    
    return super.list(data); 
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
    if(!data['keycode']){
        return super.update(id, data, additional);
    }
    
    return new Promise((resolve, reject) => {
        let shasum = crypto.createHash('sha1');
        this.load(id, {})
            .catch(e => {
                delete data['keycode'];
                reject(e);
            })
            .then((user : any) => {
                var timstamp = +data['keycode'];
                shasum.update(user.id+user.email+timstamp+user.name+'gs-classes-classroom+keycode');
                data['keycode'] = shasum.digest('hex');

                resolve(super.update(id, data, additional));
            });
    });
    
  }
}