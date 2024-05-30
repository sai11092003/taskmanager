const {Log_Events} =require('./Log_Events')
const err_Handler=(err,req,res,next)=>{
    Log_Events(`${err.name}/t${err.message}\t${req.method}\t${req.url}`,'err_log.txt');
console.log(err.stack)
const status=res.statusCode?res.statusCode:500;
next();
}

module.exports=err_Handler;