const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors());

const API_KEY = process.env.API

app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.get("/weather", async (req, res) => {
    try{
        const city = req.query.city;

        if(!city) {
            return res.status(400).json({ error: "City is required" })
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    appid: API_KEY,
                }
            }
        )

        const data = response.data;

        const result = {
            temp: Math.floor(data.main.temp-273.15),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            long: data.coord.lon,
            lati: data.coord.lat,
            timezone: Math.floor(data.timezone/3600),
            country: data.sys.country,
            city: data.name
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" })
    }
})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})