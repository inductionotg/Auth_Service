const validateUserAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(500).json({
            message:"Please enter the mandatory credentials",
            success:false,
            data:{},
        })
    }
    next()
}
module.exports = {
    validateUserAuth
}