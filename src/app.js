const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public')) //manipulation of paths of directories

const app = express()

//way to customize server {
//way1
// app.use(express.static(path.join(__dirname, '../public'))) 
//way2

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') //dynamic templates
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//}


//commenting these because html contents are in different pages, this one is for learning
//making routes, means page
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     //sendding object values
//     // res.send({
//     //     name : 'Hiranmoyee',
//     //     age : 25
//     // })

//     //sending array of object values
//     res.send([{
//         name :' sara '
//     },{
//         name :' moyee '
//     }])
// })

// app.get('/about', (req,res) =>{
//     res.send('<h1>About</h1>')
// })

app.get('',(req, res) =>{
    res.render('index', {
        title : 'Weather',
        name : 'Moyee'
    })

})

app.get('/about', (req,res) =>{
    res.render('about',{
        title : 'About me',
        name : 'Moyee'

    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        message : 'This is some help text if needed.',
        title : 'Help',
        name : 'Moyee'
        

    })
})
app.get('/weather', (req,res) =>{
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {} ) =>{
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude , (error, forecastData) =>{
            if (error) {
                return res.send({ error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term.'
        })
    } 

    console.log(req.query.search)
    res.send({
            products :[]    
    })
})

//setting 404 error for help page
app.get('/help/*', (req, res) =>{
   res.render('404', {
     title: '404',
     name :'Moyee',
     errorMessage: 'Help article not found.'
   })

})

//setting up 404 error page
app.get('*',(req, res) =>{
    res.render('404', {
        title : '404',
        name : 'Moyee',
        errorMessage : 'Page not Found.'
    })

}) //the * means match with this one if the there is not matching url input

//run the app in port localhost 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})