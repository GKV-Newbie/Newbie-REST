const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config()

const PORT = process.env.PORT || 4000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT,function(){
    console.log(PORT+' started')
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://gkv:gkv@cluster0-iyniz.mongodb.net/Newbie?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err));

app.get('/',(req,res)=>{
    console.log(req)
    res.send('happy')
})

app.use('/user',require('./api/routes/user'))
app.use('/procedure',require('./api/routes/procedure'))
// app.use('/media',require('./api/routes/media'))
// app.use('/flush',require('./api/routes/flush'))
// app.use('/test',require('./test'))

//console.log(app._router.stack)
