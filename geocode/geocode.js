const request = require('request')

function geocodeAddress (address, callback) {
    var encodedAddress = encodeURIComponent(address) 
 
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
            //Errors like invalid domain name
            if (error){
                callback('Unable to connect to google Servers')
            }
            // "ZERO_RESULTS": Geocode was successful but returned no results.
            // this might happen if a wrong address is passed
            else if (body.status === 'ZERO_RESULTS') {
                callback('Unable to find that address')
            }
            else if(body.status === 'OVER_QUERY_LIMIT') {
                callback('You have exceeded your daily quota')
            }
            /* "REQUEST_DENIED" indicates that your request was denied. */
            else if (body.status === 'REQUEST_DENIED') {
                callback(`You found AREA 52 - Your request was denied.`)
            }
            /* "INVALID_REQUEST" generally indicates that the query
                 * (address, components or latlng) is missing. */
             else if (body.status === 'INVALID_REQUEST') {
                callback(`Some manadatory parameters missing`)
            } /* "UNKNOWN_ERROR" indicates that the request could not be processed due to a
            * server error. The request may succeed if you try again. */
            else if (body.status === 'UNKNOWN_ERROR') {
                callback(`Opps. Shit happens. Try again please!`)
            }
            else if(body.status === 'OK') {
                callback(undefined, {
                    body: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    }
module.exports = {
    geocodeAddress
}