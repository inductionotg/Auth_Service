const jwt = require('jsonwebtoken')
const UserRepository = require('../repository/user-repository')
const { AUTH_KEY } = require('../config/serverConfig')
const bcrypt = require('bcrypt')
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
            if(error.name === 'SequelizeValidationError'){
                throw error
            }
            console.log("Error from userservice");
            throw error;
        }
    }

    async destroy(id){
        console.log(id)
        try {
            const response = await this.userRepository.destroy(id);
            return response;
        } catch (error) {
            console.log("Error from userservice");
            throw error;
        }
    }
    async getUserById(id){
        console.log("id from userservice",id)
        try {
            const response = await this.userRepository.getUserById(id)
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            if(error.name === 'UserNullFound'){
                throw error
            }
            console.log("Error from userservice");
            throw error;
        }
    }
    async signIn(email,planPassword){
        console.log("email",email,planPassword)
        try {
            //Step-1 --> get the userEmail and password from the user. we are getting full object of user or fetch the user using email
            const user = await this.userRepository.getUserByEmail(email)
            console.log("userrr",user)
            //STEP-2 --> COMPARE INCOMING PLAINpassword with the encrypted password
            const passwordMatched = this.checkPassword(planPassword,user.password)
            if(!passwordMatched){
                console.log("Passwords not matched")
                throw {error:"password not matched"}
            }
            //step-3 --> If passwords match then create a token and send it to the user
            const newJWT = this.createToken({email:user.email,id:user.id}) 
            return newJWT
        } catch (error) {
            console.log(error)
            if(error.name ==='AttributeNotFound'){
                throw error
            }
            console.log("Error from userservice");
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token)
            if(!response){
                console.log("error is verifying token")
                throw {error:"Invalid token"}
            }
            const user = await this.userRepository.getUserById(response.id)
            if(!user){
                throw {error:"No user with corressponding ID"}
            }
            console.log(user)
            console.log(response)
            return user.id
        } catch (error) {
            console.log(error)
            console.log("Error from userservice");
            throw error;
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
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            const compare = bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
            return compare
        } catch (error) {
            console.log("Error from userservice");
            throw error;
        }
    }
    async isAdmin(userId){
        try {
            return  await this.userRepository.isAdmin(userId)
        } catch (error) {
            console.log("Error from userservice");
            throw error;
        }
    }
}

module.exports = UserServices