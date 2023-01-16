const UserServices = require('../services/user-services')

const userService = new UserServices()

const create = async (req,res)=>{
    try {
        console.log(req.body)
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        })
        return res.status(200).json({
            message:'User created successfully',
            success:true,
            data:{response},
            err:{}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'User not created successfully',
            success:false,
            data:{},
            err:{error}
        })
    }
}

const destroy = async (req,res) =>{
    try {
        const response = await userService.destroy(req.params.id)
        return res.status(201).json({
            message:'User deleted successfully',
            success:true,
            data:{response},
            err:{}
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'User not deleted successfully',
            success:false,
            data:{},
            err:{error}
        })
    }
}

const getUser = async (req,res) =>{
    console.log(req.params.id)
    try {
        const response = await userService.getUserById(req.params.id)
        console.log(response)
        return res.status(201).json({
            message:'User fetched successfully',
            success:true,
            data:{response},
            err:{}
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'User not fetched successfully',
            success:false,
            data:{},
            err:{error}
        })
    }
}

const signIn = async (req,res) =>{
    console.log(req.body)
    try {
        //const response = await userService.signIn(req.body)-->THIS WILL ALSO WORK
        const response = await userService.signIn(
            req.body.email,
            req.body.password
        )
        return res.status(201).json({
            message:'User signed In successfully',
            success:true,
            data:response,
            err:{}

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'User not signedIn successfully',
            success:false,
            data:{},
            err:{error}
        })
    }
}

module.exports = {
    create,
    destroy,
    getUser,
    signIn
}