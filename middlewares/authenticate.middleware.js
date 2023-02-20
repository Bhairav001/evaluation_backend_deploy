const jwt = require("jsonwebtoken")

const authenticate =(req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            const userID = decoded.userID;
            console.log(decoded)
            req.body.userID= userID
            next()
        }else{
            res.send("User already exist, please login")
        }
    }else{
        res.send("User already exist, please login")
    }
}

module.exports={
    authenticate
}