const { User } = require('../models/index')

class UserRepository{

    async createUser(data){
        console.log("data from service to repo",data)
        try {
            const user =await User.create(data)
            console.log("user repo",user)
            return user
        } catch (error) {
            console.log("Error from UserRepo")
            throw {error}
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            })
            return true
        } catch (error) {
            console.log("Error from UserRepo")
            throw {error}
        }
    }

    async getUserById(userId){
        console.log(userId)
        try {
            const user = await User.findByPk(userId,{
                attributes: ['email', 'id']
            })
            return user
        } catch (error) {
            console.log("Error from UserRepo")
            throw {error}
        }
    }
    async getUserByEmail(userEmail){
        try {
            const userByEmail = await User.findOne({
                where:{
                    email:userEmail
                }
            })
            if(!userByEmail){
                throw {error:"User doesn't exist"}
            }
            return userByEmail
        } catch (error) {
            console.log(error)
            console.log("Error from UserRepo")
            throw {error}
        }
    }
}

module.exports=UserRepository