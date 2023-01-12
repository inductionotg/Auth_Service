const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index')

const {User} = require('./models/index')
const bcrypt = require('bcrypt')
const prepareAndStartServer=()=>{

    app.listen(3001,async()=>{
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:true}))
        app.use('/api',apiRoutes)
        console.log('Server started',PORT);
        /*
        -- To check hashing
        const incomingPassword = 'password123'
        const user =await User.findByPk(8)
        const haspassword = bcrypt.compareSync(incomingPassword, user.password);
        console.log(haspassword)
        */
    })
}
prepareAndStartServer()