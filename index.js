const {send} = require('micro')
const maxmind = require('maxmind');
const url = require('url');
const cityLookup = maxmind.openSync('GeoLite2-City.mmdb', { watchForUpdates: true });

module.exports = async (req, res) => {
    const u = url.parse(req.url, true);
    const {ip} = u.query;
    let statusCode = 400, data;
    try{
        if(ip && maxmind.validate(ip)){
            data = cityLookup.get(ip);
            statusCode = 200
            
        } else {
            statusCode = 400
            data = { error: 'Bad request' }
            console.log(data);
        }
    } catch (error) {
        statusCode = 500;
        data = { error: error.message }
        console.log(error);
    }
    send(res, statusCode, data)
}