const router=require('express').Router();

const authCheck=(req,res,next)=>{
    if(!req.user){
        res.redirect('/login');
    }else{
        next();
    }
}
router.get('/profile',authCheck,(req,res)=>{
   
    res.send(req.user);
    res.render('profile',{user:req.user})
})
module.exports=router