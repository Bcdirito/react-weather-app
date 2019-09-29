const path = require("path")
const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public") 

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})

app.get("", (req, res) => {
    res.send("Express Server Connected")
})


app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You need to send an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({ error })
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error })
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Brian DiRito"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        message: "You are now on the help page.",
        name: "Brian DiRito"
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Help 404",
        message: "Help article not found",
        name: "Brian DiRito"
    })
})

// Always needs to come last
app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        message: "Page not found.",
        name: "Brian DiRito"
    })
})

