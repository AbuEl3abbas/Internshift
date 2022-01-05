const jwt = require('jsonwebtoken');

function studentVerification (req,res,next){
    
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(401);

    try{
        const verified = jwt.verify(token,process.env.STUDENT_TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }
    
    
}

function companyVerification (req,res,next){
    
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

function supervisorVerification (req,res,next){
    
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(401);

    try{
        const verified = jwt.verify(token,process.env.ADMIN_TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }
    
    
}

module.exports = {
    studentVerification,
    companyVerification,
    supervisorVerification
};