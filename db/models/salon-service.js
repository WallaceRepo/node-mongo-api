const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName:{
        type:String,
        required:true
    },
    serviceDuration:{
        type:String,
        required:true
    },
    servicePrice:{
        type:String,
        required:true
    },
    serviceMaterials:{
        type:String,
        required:true
    },
 }, {timestamps: true });
 
  // model name gets plural automatically 
 const Salon_service = mongoose.model('Salon_service', serviceSchema)
 module.exports = Salon_service;
