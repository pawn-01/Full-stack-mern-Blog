const express = require('express')
const cors = require('cors')
const { user , Posts } = require('./databse');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express()
var salt = bcrypt.genSaltSync(10);
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const  Middleware  = require('./Middleware');
const { error } = require('console');
require('dotenv').config()

app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/register', async (req, res) => {
     try{
      const a = await user.create({
         username:req.body.username,
         password:bcrypt.hashSync(req.body.password, salt)
      })
      console.log(a);
      res.json({message:"register Sucessfully"});
    }
    catch(error){
       res.status(400).json({error});
    }
})

app.post('/login',async(req,res)=>{
   try{
       const userdoc = await user.findOne({username:req.body.username});
      // console.log(userdoc);
       if(userdoc){
        const passok =  bcrypt.compareSync(req.body.password,userdoc.password);
        if(passok){
        const token =  jwt.sign({username:userdoc.username,id:userdoc._id},process.env.Sercret_Key);
       // console.log(token);
        return  res.cookie('token',token).json({id:userdoc._id,username:req.body.username});
         }
         else{
          res.status(400).json({message:"credentials not matched"});
         }
       }
       else{
        res.status(400).json({message:"user not exist"})
       }
   }
   catch(error){
     // console.log(error);
       res.status(400).json({error})
   }
})


app.post('/profile',Middleware,async(req,res)=>{
   res.json({decode:req.user,a:1});
})

app.post('/logout',async(req,res)=>{
  res.cookie('token',' ').json('ok');
})

app.post('/create',upload.single('file'),Middleware,async(req,res)=>{
   try{
      const { originalname , path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length-1];
      const newpath = path+'.'+ext;
      fs.renameSync(path,newpath);
      const {title , summary, content} = req.body;
      const userdecode = req.user;
      const postdoc = await Posts.create({
           title,
           summary,
           content,
           cover:newpath,
           author:userdecode.id
      })
      res.json(postdoc);
   }
   catch(error){
       res.status(400).json(error);
   }
})

app.get('/posts',async(req,res)=>{
      try {
           const post = await Posts.find()
            .populate('author',['username'])
            .sort({createdAt:-1})
            .limit(20);
           //console.log(post);
           res.json({array:post});
      } 
      catch (error) {
        // console.log(error);
         res.status(400).json(error);
      }
})

app.get('/posts/:id',async(req,res)=>{
   try{
       const { id } = req.params;
     //  console.log(id);
       const postdoc = await Posts.findById(id).populate('author',['username']);
       res.json({postdoc});
   }
   catch(error){
     // console.log(error);
      res.status(400).json({error});
   }
})

app.put('/edit/:id',upload.single('file'),Middleware,async(req,res)=>{
   try{
    const { id } = req.params;
    var newpath = null;
    if(req.file){
      const { originalname , path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length-1];
       newpath = path+'.'+ext;
      fs.renameSync(path,newpath);
    }
  // authorization
      const userdecode = req.user;
      
      const { title , summary , content} = req.body;
      const postdoc = await Posts.findById(id);
      const isAuthor = JSON.stringify(postdoc.author)===JSON.stringify(userdecode.id);
      if(!isAuthor){
           return res.status(400).json({isAuthor,userdecode,postdoc});
      }

       const postres = await Posts.updateOne({_id:id},
         {title,
          summary,
          content,
          cover:newpath ? newpath : postdoc.cover
      })

      res.json({postres,a:1});
   }
   catch(error){
      // console.log(error);
       res.status(400).json({error});
   }
})

app.delete('/delete/:id',Middleware,async(req,res)=>{
   try{
      const { id } = req.params;
     // console.log(id);
     const userdecode = req.user;
     const postdoc = await Posts.findById(id);
     const isAuthor = JSON.stringify(postdoc.author)===JSON.stringify(userdecode.id);
     if(!isAuthor){
          return res.status(400).json({isAuthor,userdecode,postdoc});
     }

    const postdelete =  await Posts.deleteOne({_id:id});
     res.json("delete Sucessfully")
   }
   catch(error){
     // console.log(error);
      res.status(400).json({error})
   }
     
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

module.exports = app;