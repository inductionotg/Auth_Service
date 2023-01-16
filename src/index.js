const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index')

const UserRepository = require('./repository/user-repository')

const UserServices = require('./services/user-services')
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
       /*const user = new UserRepository()
       const res = await user.getUserById(2)
       console.log(res.email,res.id)*/

       //const token = new UserServices();
       //const response = token.createToken({email:'ritesh2sinha@gmail.com',id:3})
       //console.log(response)
       //const tokenVer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdGVzaDJzaW5oYUBnbWFpbC5jb20iLCJpZCI6MywiaWF0IjoxNjczODUwMDA3LCJleHAiOjE2NzM4NTM2MDd9.xmzMlX5-yPFaj8Ttx3w5PDK1wEbbdsbAOQjQR5CAzXo'
       //const verify = token.verifyToken(tokenVer)
       //console.log(verify)
       /*
       const user = new UserRepository()
       const response = await user.getUserByEmail("ritesh2000.sinha@gmail.com")
       console.log(response.email)
       */
    })
}
prepareAndStartServer()