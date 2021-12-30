const jwt = require('jsonwebtoken');

function verify (req,res,next){
    
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(401);

    try{
        const verified = jwt.verify(token,process.env.COMPANY_TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }
    
    
}

module.exports = verify;