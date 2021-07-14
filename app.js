require('dotenv').config();
const log = require('./logger');
const config = require('./config');
const mongoose = require('mongoose');
const Salon_service = require('./db/models/salon-service')
const express = require('express');
const { render } = require('ejs');
const app = express();
const currDate = new Date();
const port = process.env.PORT || 5001;

app.listen(port, ()=>{
    // console.log unessesary cuz appenders.out.type:'stdout'/ standardout or console.log in logger.js. 
    //console.log(`express-node-api on port ${port} at ${currDate}`);
    //log.info(`express-node-api on port ${port} at ${currDate}`)
   
}); 
        //static files & middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
// view engine
app.set('view engine', 'ejs');

  // db connnect
const dbURI = config.db.dbURI;
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
.then((result)=> console.log('connected to db'))
.catch((err)=>console.log(err));

//default route
app.get("/", (req,res) => res.render('home', {title: 'Home' }));
app.get("/services", (req, res)=> res.redirect('/all-services'));

// db route

app.get('/add-service', (req,res) =>{
    const salon_service = new Salon_service({
        serviceName: 'Manicure',
        serviceDuration: '30min',
        servicePrice: '200Y',
        serviceMaterials:'Nail Polish, Nail Oil, Cleaner'
    });

    salon_service.save()
     .then((result) =>{
         res.send(result)
     })
     .catch((err)=>{
         console.log(err);
     })
});
app.get('/all-services', (req,res) =>{
    Salon_service.find().sort({createdAt: -1 })
      .then((result)=>{
          res.render('services', {title: 'All Services', Salon_services: result })
      })
      .catch((err)=>{
          console.log(err);
      });
});
// app.get('/all-services', (req,res) =>{
//     Salon_service.find()
//       .then((result)=>{
//           res.send(result);
//       })
//       .catch((err)=>{
//           console.log(err);
//       });
// });
app.get('/services', (req,res) =>{
    Salon_service.findById('60e76a0d7cf4e02ef0690e32')
      .then((result)=>{
          res.send(result);
      })
      .catch((err)=>{
          console.log(err);
      });
});

app.get('/services/create', (req, res)=> {
    res.render('create', { title: 'Create a new servide'})
})
app.post('/services', (req, res)=> {
   // console.log(req.body)
   const serv =  new Salon_service(req.body);
     serv.save()
     .then((result) =>{
        res.redirect('./services');
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.get('/services/:id', (req, res)=>{
    const id = req.params.id;
     Salon_service.findById(id)
     .then(result=>{
         res.render('details', { service: result, title: 'Service Details'})
     })
     .catch(err=>{
         console.log(err);
     })
});
app.delete('/services/:id', (req, res)=>{
    const id = req.params.id;
    Salon_service.findByIdAndDelete(id)
    .then(result=>{
        //console.log(result);
        res.json({redirect:'/services'});
        //res.json({ redirect:'/all-services'})
    })
    .catch(err=>console.log(err))
})

