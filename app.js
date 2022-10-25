const express= require('express');
const { request } = require('http');
const https = require('https');
const { stringify } = require('querystring');
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static("Public"));

app.engine('ejs',require('ejs').renderFile);
app.set("view engine", "ejs");

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
var blogs=[];
app.get('/',(req,res)=>{
    console.log(blogs.length);
    res.render("index.ejs", {blogs: blogs});

})

app.get('/aboutus',(req,res)=>{
    res.render("aboutus.ejs")
})

app.get('/publicar',(req,res)=>{
    res.render("publicar.ejs")
})

app.post('/publicar',(req,res)=>{
    var title = req.body.recipeName;
    var notes = req.body.talkusabouttherecipe;
    var ingredients = req.body.ingredients;
    var preparation = req.body.stepstofollow;
    blogs.push({title:title, notes:notes, ingredients:ingredients,preparation:preparation});
    console.log(blogs.length);
    res.render("publicar.ejs")
})

app.listen(3000,()=>{
    console.log("listening to port 3000");
})