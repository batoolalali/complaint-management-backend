'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
  get one or all records
  takes an _id 
  returns array of the records
   */
  get(userName) {
    let obj = userName ? { userName } : {};
    return this.schema.find(obj);
  }

  /**
  Create a record
  takes a record object
  */
  create(record) {
    let obj = new this.schema(record);
    return obj.save();
  }

  /**
   Update a record in the database
   takes  a  Record ID
  and takes The new data to replace (object). ID is a required field
   returns new updated date
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
   Deletes a recode in the model
   takes {string} Mongo Record ID
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
