const {format} =require('date-fns')
const { v4: uuid } = require('uuid');
const path = require('path')
const fs= require('fs');
const fsPromise = require('fs').promises;
const Log_Events=async(message,filename)=>{
    try{
if(!fs.existsSync(path.join(__dirname,'..','logs')))
    await fsPromise.mkdirSync(path.join(__dirname,'..','logs'))

await fsPromise.appendFile(path.join(__dirname,'..','logs',filename),`${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\t${uuid()}\t ${message}`)
    }
    catch(err){
        console.log(err)
    }
}
const logger=(req,res,next)=>{
    Log_Events(`${req.method} ${req.url}`,'req_logger.txt')
    console.log(`${req.method} ${req.url}`)
    next();
}

module.exports ={logger,Log_Events};