const express = require("express");
const mongoose = require("mongoose");
const Joi = require("Joi");

//Import Routes

const authRoute = require("./routes/auth")

const app = express();

const Post = require("./models/Post");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//Middlewares

app.use(cors(corsOptions))
app.use(express.json());

//Routes Middlewares

app.use('/register',authRoute);


app.get('/',(req,res) => {
  res.send("test");
});


const newPostSchema = Joi.object({
  title: Joi.string().max(60).required(),
  location: Joi.string().max(25),
  description: Joi.string().min(50).max(10000).required(),
  publisher: Joi.string().alphanum().min(2).max(50).required(),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().email().required(),
});




app.post("/findPost", async (req, res) => {
  const post = await Post.find({
    
    title: req.body.title,
    location: req.body.location,
  });  
  res.send(post);
});



app.post("/newPost", async (req, res) => {
  const validation = newPostSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    const post = new Post({
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      publisher: req.body.publisher,
      phone: req.body.phone,
      email: req.body.email,
    });

    try {
      const savedUser = await post.save();
      res.send(savedUser);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});





app.listen(3000, () => {
  console.log("app is running");
  mongoose.connect(
    "mongodb+srv://AbuEl3abbas:BsZUSKpVH8hZBnHK@cluster0.nhp9l.mongodb.net/test?retryWrites=true&w=majority",
    () => console.log("connected to db")
  );
});
