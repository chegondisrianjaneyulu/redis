const {redisClient} = require('./redis');

const redisStringMethods = async () => {
    //add
    const response1 = await redisClient.set("bike:1", "Deimos")
    console.log('string-response1', response1); // OK

    //GET 
    const getResponse = await redisClient.get('bike:1');
    console.log('string-getResponse', getResponse); //Deimos

    // SET to fail if the key already exists
    const response2 = await redisClient.set('bike:1', "mt 15", {'NX': true});
    console.log('string-response2', response2) // null

    //Only set the key if it already exists
    const response3 = await redisClient.set('bike:2', "yamaha xsr", {XX : true});
    console.log('string-response3', response3) // null -> not exists

    //Only set the key if it already exists
    const response4 = await redisClient.set('bike:1', "bullet", {XX: true});
    console.log('string-response4', response4); // OK


    //multiple keys in a single command is also useful for reduced latency
    const response5 = await redisClient.mSet([["role:1" , "admin"], ["role:2", "customer"], ["role:3", "HR"]]);
    console.log('string-response5', response5) //OK
    

    //retrieve the multiple key values, When MGET is used, Redis returns an array of values
    const response6 = await redisClient.mGet(["role:1", "role:2", "role:3", "bike:1"]);
    console.log('string-response6', response6) //[ 'admin', 'customer', 'HR', 'bullet' ]


    //The INCR command parses the string value as an integer, increments it by one, and finally sets the obtained value as the new value
    const response7 = await redisClient.set('age:sri', "23");
    console.log('string-response7', response7) //OK

    const response8 = await redisClient.incr('age:sri')
    console.log('string-response8', response8) //24

    const response9 = await redisClient.incrBy('age:sri', 10);
    console.log('string-response9', response9); //34

    const response10 = await redisClient.incrBy('age:sri', -10);
    console.log('string-response9', response10); //24


    // INCRBYFLOAT is used to increment the value of a key by a floating-point number.
    const response11 = await redisClient.incrByFloat('weight', 200.00);
    console.log('string-response11', response11); // 200

    const response12 = await redisClient.incrByFloat('weight', 220.10);
    console.log('string-response12', response12);

    const response13 = await redisClient.incrByFloat('weight', -220.10);
    console.log('string-response12', response13);

    
    const response14 = await redisClient.decr('age:sri');
    console.log('string-response14', response14); // 23

    const response15 = await redisClient.decrBy('age:sri', 3);
    console.log('string-response15', response15); //20


    //EXPIRE 
    const response16 = await redisClient.set('sri', 'potti');
    console.log('string-response16', response16) //OK 

    const response17 = await redisClient.expire('sri', 10);
    console.log('string-response17', response17) //true

    const response18 = await redisClient.get('sri');
    console.log('string-response18', response18) //null 



    //DELETE 
    //if exists return 1 if not exists return 0
    const response19 = await redisClient.del('bike:1');
    console.log('string-response19', response19); //1

    // Most string operations are O(1), which means they're highly efficient. 
    // However, be careful with the SUBSTR, GETRANGE, and SETRANGE commands, which can be O(n). 
    // These random-access string commands may cause performance issues when dealing with large strings.
}


module.exports.redisStringMethods = redisStringMethods