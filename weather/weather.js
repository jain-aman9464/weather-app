const request = require('request')

function getWeather (lat, lng, callback){
    request({
        url: `https://api.darksky.net/forecast/54b898a702b26084b9889e95f9cd1094/${lat},${lng}`, 
        json: true
    }, function(error, response, body) {
        if (error) {
            callback('Unable to connect to Forecast.io servers')
        }
        else if (response.statusCode == 400) {
            callback('Unable to fetch weather')
        }
        else if (response.statusCode == 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    })
}

module.exports ={
    getWeather
}