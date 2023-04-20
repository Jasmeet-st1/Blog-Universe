const express = require('express');
const path=require('path');
const mongoose=require('mongoose');

const blogroutes=require('./routes/blogRoutes');

const app=express();

//connect mongoose
const dBURI= // your mongodb URI link


mongoose.connect(dBURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {app.listen(3000,()=>{
        console.log("Server started at",3000);
    });})
    .catch(error => console.error(error));


app.set('view engine', 'ejs');   //set view engine to ejs
app.set('views', path.join(__dirname, 'my-views'));      //set views to path.join(__dirname, 'my-views')

app.use(express.static ('public')); //use express static path for development purposes
app.use(express.urlencoded({extended:true})); //use express url encoding for development purposes

app.get('/', (req, res)=>{
    // const blogsabc=[
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'}, 
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'}, 
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    // ]
    // res.render('index' , {title: 'Home', blogs : blogsabc});

    res.redirect('/blogs');
});

//blog routes

app.use('/blogs',blogroutes);

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About Us'});
})



app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
})


