const redis = require('redis');

let redisClient = redis.createClient();;

const connectRedis = async () => {
    try {
        // redisClient =  redis.createClient({url:'redis://127.0.0.1:6379'});
        
        // redisClient =  redis.createClient();
        redisClient.on('error', (err) => {
            console.log('something went wrong', err);
        });
        redisClient.on('connect', () => {
            console.log('redis connected successfully');
            
        })
        await redisClient.connect();
        // console.log(redisClient)
    }
    catch (e) {
      console.log('error', e)
    }
}

module.exports.connectRedis = connectRedis
module.exports.redisClient = redisClient