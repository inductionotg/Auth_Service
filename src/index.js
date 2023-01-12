const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index')
const prepareAndStartServer=()=>{

    app.listen(3001,()=>{
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:true}))
        app.use('/api',apiRoutes)
        console.log('Server started',PORT);
    })
}
prepareAndStartServer()