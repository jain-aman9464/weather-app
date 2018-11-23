const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address', 
            describe: 'Address to fetch weather for', 
            string: true, 
            default: 'Delhi, India' 
        }
    })
    .help()
    .alias('help', 'h')
    .argv
    
geocode.geocodeAddress(argv.address, function(err, results) {
    if(err) {
        console.log(err)
    }
    else {
        console.log(results.address)
        weather.getWeather(results.latitude, results.longitude, function(error, weatherResults) {
            if (error) {
                console.log(error)
            }
            else {
                console.log(JSON.stringify(weatherResults, undefined, 2))
            }
        })
    }
})
