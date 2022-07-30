const router=require('express').Router();
const passport=require('passport');

router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
})
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})

router.get('/login/spotify', passport.authenticate('spotify',{
    scope: ['user-read-email', 'user-read-private','user-read-recently-played','user-top-read','user-follow-read','user-library-read','playlist-read-private'],
   showDialog:true
  }),(req,res)=>{
    //final function after authenticated
  });

router.get('/login/spotify/redirect',passport.authenticate('spotify'),(req,res)=>{
    res.redirect('/profile');
})



module.exports=router;