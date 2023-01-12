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
}

module.exports=UserRepository