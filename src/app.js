const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//set up paths for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// set up handlebars
app.set("view engine","hbs" )
app.set("views",viewPath )
hbs.registerPartials(partialsPath)

//public directory for express to serve
app.use(express.static(publicPath))
  
app.get('', (req, res)=>{
    res.render('index', {
        title:"Weather",
        name:"Kate"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"Help",
        name:"Kate",
        message:"What to do about helping yourself",
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:"About",
        name:"Kate"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide address for forecast"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{

        if(error){
            res.send({error})
            return
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({error})
                return
            }

            res.send({
                forecast:forecastData,
                location:location,
                address: req.query.address
            })
        })
    
    })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query)


    res.send({
        products:[]
    })
})

/404
app.get("/help/*", (req, res)=>{
    res.render('404', {
        title:"404",
        name:"Kate",
        message:"help article not found"
    })
})

app.get("*", (req, res)=>{
    res.render('404', {
        title:"404",
        name:"Kate",
        message:"Page not found"
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})