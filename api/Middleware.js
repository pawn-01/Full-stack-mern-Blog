const jwt = require('jsonwebtoken');
require('dotenv').config()

const Middleware = (req,res,next) => {
    try{
    const { token } = req.cookies; 
   // console.log(token);
    if(!token || token==' ') return res.status(400).json({token:"token",a:-1});
    const decode = jwt.verify(token,process.env.Sercret_Key);
    //console.log(decode);
    
    req.user = decode;
    
    next();
    }
    catch(error){
        //console.log(error);
        res.status(400).json({error,a:-1});
    }
}

module.exports = Middleware;