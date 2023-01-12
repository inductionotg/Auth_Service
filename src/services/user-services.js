const UserRepository = require('../repository/user-repository')

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
}

module.exports = UserServices