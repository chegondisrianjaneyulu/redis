const { redisClient } = require('./redis');

const redisSetMethods = async () => {
    // A Redis set is an unordered collection of unique strings (members). You can use Redis sets to efficiently:

    // Track unique items (e.g., track all unique IP addresses accessing a given blog post).
    // Represent relations (e.g., the set of all users with a given role).
    // Perform common set operations such as intersection, unions, and differences.
 

    redisClient.del('bikes:racing:france');
    redisClient.del('bikes:racing:usa');

    //add if key not exists
    const response1 = await redisClient.sAdd('bikes:racing:france', 'bike:1');
    await redisClient.sAdd('bikes:racing:france', 'bike:9');
    await redisClient.sAdd('bikes:racing:france', 'bike:10');
    console.log('sets-response1', response1);

    const response2 = await redisClient.sAdd('bikes:racing:usa', ['bike:2', 'bike:3', 'bike:1']);
    console.log('sets-response2', response2);

    //get full set values
    console.log('get-sets', await redisClient.sMembers('bikes:racing:france')); //[ 'bike:2', 'bike:3' ]
    
    //get random sets
    console.log('get-sets', await redisClient.sRandMember('bikes:racing:usa')) //any value will return

    //check for value exist or not in set if not return false if exists return true3
    const response3  = await redisClient.sIsMember('bikes:racing:usa', 'bike:2');
    console.log('sets-response3', response3); //true
 
    //return number of members in a set
    const response4 = await redisClient.sCard('bikes:racing:usa');
    console.log('sets-response4', response4);


    console.log('get-sets-france', await redisClient.sMembers('bikes:racing:france'));
    console.log('get-sets-usa', await redisClient.sMembers('bikes:racing:usa'));
    //Returns the members of the set resulting from the difference between the first set and all the successive sets
    const response5 = await redisClient.sDiff(['bikes:racing:france', 'bikes:racing:usa']);
    console.log('response5',response5);





}

module.exports.redisSetMethods = redisSetMethods