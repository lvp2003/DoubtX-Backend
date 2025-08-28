function requireRoles(...allowed){
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        if(!req.user.role || !allowed.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden: insufficient role"});
        }
        next();
    }
}
module.exports = requireRoles;
