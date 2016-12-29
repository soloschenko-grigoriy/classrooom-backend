import mongoose = require("mongoose");

export interface iRepository{

  /**
   * Count model in DB
   *
   * @param data
   *
   * @returns Promise<iModel>
   */
  count(data: Object): Promise<Number>;

  /**
   * Load one model from DB
   *
   * @param id
   * @param data
   *
   * @returns Promise<iModel>
   */
  load(id: string, data: Object): Promise<mongoose.Document>;

  /**
   * Get list of modeld from DB
   *
   * @param data
   *
   * @returns Promise<iModel>
   */
  list(data: Object): Promise<mongoose.Document[]>;

  /**
   * Delete model from DB
   *
   * @param data
   *
   * @returns Promise<iModel>
   */
  create(data: Object): Promise<mongoose.Document>;

  /**
   * Update one model
   *
   * @param id
   * @param data
   *
   * @returns Promise<iModel>
   */
  update(id: string, data: Object, additional?: Object): Promise<mongoose.Document>;

  /**
   * Delete model from DB
   *
   * @param id
   * @param data
   *
   * @returns Promise<iModel>
   */
  delete(id: string): Promise<iRepository>;
}