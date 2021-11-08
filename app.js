const express = require('express');
const mongoose = require('mongoose');


const app = express();

const Post = require('./models/Post');

app.use(express.json());



app.get('/', async (req,res) => {
  const post = await Post.find({title: 'javascript'});
  res.send(post);
});



app.post('/search', async (req,res) => {

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
  }catch(e) {
    res.status(400).send(error);
  }

})



app.listen(3000,()=>{ 
  console.log("app is running");
  mongoose.connect('mongodb+srv://AbuEl3abbas:BsZUSKpVH8hZBnHK@cluster0.nhp9l.mongodb.net/test?retryWrites=true&w=majority',() => console.log('connected to db'));
})
