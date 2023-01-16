const jwt = require('jsonwebtoken')
const UserRepository = require('../repository/user-repository')
const { AUTH_KEY } = require('../config/serverConfig')
class UserServices{
    constructor(){
        this.userRepository = new UserRepository()
    }
    async create(data){
        console.log("data from controoler in service",data)
        try{
            const user = await this.userRepository.createUser(data);
            console.log("user service",user);
            return user;
        }catch(error){
            console.log("Error from userservice");
            throw {error};
        }
    }

    async destroy(id){
        console.log(id)
        try {
            const response = await this.userRepository.destroy(id);
            return response;
        } catch (error) {
            console.log("Error from userservice");
            throw {error};
        }
    }
    async getUserById(id){
        console.log("id from userservice",id)
        try {
            const response = await this.userRepository.getUserById(id)
            console.log(response)
            return response
        } catch (error) {
            console.log("Error from userservice");
            throw {error};
        }
    }
    createToken(user){
        try {
            const jwtToken = jwt.sign(user,AUTH_KEY,{expiresIn:'1h'})
            return jwtToken
        } catch (error) {
            console.log("Error from userservice");
            throw {error};
        }
    }

     verifyToken(token){
        console.log(token,AUTH_KEY)
        try {
            const verify = jwt.verify(token,AUTH_KEY)
            return verify
        } catch (error) {
            console.log(error)
            console.log("Error from userservice");
            throw {error};
        }
    }
}

module.exports = UserServices