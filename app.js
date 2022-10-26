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
var ingredientes= [];
var pasos=[];
app.get('/',(req,res)=>{
    console.log(blogs.length);
    res.render("index.ejs", {blogs: blogs});

})

app.get('/aboutus',(req,res)=>{
    res.render("aboutus.ejs")
})

app.get('/publicar',(req,res)=>{
    res.render("publicar.ejs",{steps: pasos, ingredients: ingredientes} );
})

app.post('/publicar',(req,res)=>{
    var title = req.body.recipeName;
    var notes = req.body.talkusabouttherecipe;
    blogs.push({title:title, notes:notes, ingredients:ingredientes,preparation:pasos});
    ingredientes=[];
    pasos=[];
    console.log(blogs.length);
    res.render("publicar.ejs",{steps: pasos, ingredients: ingredientes} );
})

app.post('/publicar/Preparacion',(req,res)=>{
    var paso = req.body.paso;
    pasos.push(paso);
    res.render("publicar.ejs",{steps: pasos, ingredients: ingredientes} );
})

app.post('/publicar/Ingredientes',(req,res)=>{
    var ingredientein = req.body.ingrediente;
    ingredientes.push(ingredientein);
    console.log("Tamao Ingredientes ");
    console.log(ingredientes.length);
    res.render("publicar.ejs",{steps: pasos, ingredients: ingredientes} );
})

app.post('/publicar/dPreparacion',(req,res)=>{
   var aux;
    for(var i=req.body.x; i+1<pasos.length;i++ ){
        aux=pasos[i];
        pasos[i]=pasos[i+1];
        pasos[i+1]=aux;
    }
    pasos.pop();
    res.render("publicar.ejs",{steps: pasos, ingredients: ingredientes} );
})

app.post('/publicar/dIngredientes',(req,res)=>{
    var aux;
     for(var i=req.body.x; i+1<ingredientes.length;i++ ){
         aux=ingredientes[i];
         ingredientes[i]=ingredientes[i+1];
         ingredientes[i+1]=aux;
     }
     ingredientes.pop();
     console.log("Tamao Ingredientes ");
     console.log(ingredientes.length);
     res.render("publicar.ejs",{steps: pasos, ingredients: ingredientes} );
})

app.listen(3000,()=>{
    console.log("listening to port 3000");
})