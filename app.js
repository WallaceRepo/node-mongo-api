require('dotenv').config();
const log = require('./logger');
const express = require('express');
const app = express();

const currDate = new Date();
const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    //console.log(`express-node-api on port ${port} at ${currDate}`);
    log.info(`express-node-api on port ${port} at ${currDate}`)
   
}); 

//Default route
app.get("/", (req,res)=>{
    res.json({
        status: 'ok',
        message: `express-node-api listening at ${currDate}...`,
      
    })
});
