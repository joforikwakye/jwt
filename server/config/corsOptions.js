const whitelist = [
    'http://localhost:3000'
]

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions