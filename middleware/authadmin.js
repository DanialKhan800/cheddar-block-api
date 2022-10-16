import jwt from 'jsonwebtoken';

const auth = (req, res, next) =>{
    try {
        if(!req.headers.authorization){
            res.status(401).json({message:"Please provide token"});
        }

        const token = req.headers.authorization.split(" ")[1];
        let decodedata;
        if(token){
            decodedata = jwt.verify(token,process.env.JWTPHRASE);
            
            if(decodedata.userrole == "false"){
                return res.status(401).json({message:"Game is added only by admin"}); 
            }
            req.userId = decodedata?.id;
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"error in game creation middleware auth"})
    }
}



export default auth;