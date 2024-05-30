const express=require('express')
const mongoose=require('mongoose')
const app=express()
const path=require('path');
const cors = require('cors')
const credentials=require('./middleware/Credentials')
const corsOptions=require('./config/cors_Options')
const PORT=process.env.PORT||3500
const {Log_Events,logger}=require('./middleware/Log_Events')
const cookieParser = require('cookie-parser')
const err_Handler=require('./middleware/err_Handler');
const Connect=require('./config/connect_DB');
Connect();

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')))
app.use(logger)

app.use('/',require('./routes/root'));
app.use('/users', require('./routes/User'));
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html'))
    res.sendFile(path.join(__dirname,'public','404.html'))
    else if(req.accepts('json'))
        res.json({url:req.url})
    else
    res.type('txt').send('Not found')
})
app.use(err_Handler)
mongoose.connection.once('open',()=>{
    console.log('connected to database')
    app.listen(PORT,()=>{
        console.log('server is running on port 3000')
    })

})
mongoose.connection.on('error',(err)=>{
console.log(err);
Log_Events(`${err.name}/t${err.message}\t${req.method}\t${req.url}`,'Mango_err.txt')
})
