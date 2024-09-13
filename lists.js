const { redisClient } = require('./redis');

const redisListMethods = async () => {
    // Redis lists are linked lists of string values. Redis lists are frequently used to:
    // Implement stacks and queues.
    // Build queue management for background worker systems.

    //DELETE 
    const response = await redisClient.del('list');
    console.log('list-del-response', response); //1

    // adds a new element to the head of a list
    const response1 = await redisClient.lPush('list', '1');
    console.log('list-response1', response1); //1
   
    await redisClient.lPush('list', '2')
    await redisClient.lPush('list', '3')
    await redisClient.lPush('list', '4')

    const getList = await redisClient.lRange('list', 0, -1);
    console.log('list-getList', getList) //[4,3,2,1]

    //adds to the tail.
    await redisClient.rPush('list', '0');
    console.log('list-getList', await redisClient.lRange('list', 0, -1)) //[ '4', '3', '2', '1', '0' ]

    //removes and returns an element from the head of a list
    const response2 = await redisClient.lPop('list');
    console.log('list-response2', response2) //4
    console.log('list-getList', await redisClient.lRange('list', 0, -1)); //[ '3', '2', '1', '0' ]

    //removes and returns an element from the tails of a list.
    const response3 = await redisClient.rPop('list');
    console.log('list-response3', response3); //0
    console.log('list-getList', await redisClient.lRange('list', 0, -1)) //[ '3', '2', '1' ]

    //returns the length of a list.
    const response4 = await redisClient.lLen('list');
    console.log('list-response4', response4); //3

    await redisClient.del('list1');

    // atomically moves elements from one list to another.
    const response5 = await redisClient.lMove('list', 'list1',  'LEFT', 'RIGHT');
    console.log('response5', response5)// 3 is moved to another list1
    console.log('list-getList', await redisClient.lRange('list1', 0, -1)) // ['3'];


    //reduces a list to the specified range of elements.
    const response6 = await redisClient.lTrim('list', 0, 1);
    console.log('list-response6', response6); //OK 
    console.log('list-getlist', await redisClient.lRange('list', 0, -1));

    await redisClient.lPop('list');
    await redisClient.lPop('list');
    console.log('list-getlist', await redisClient.lRange('list', 0, -1)) //[]


    // await redisClient.rPush('list', '1');

    // BLPOP: Removes and returns an element from the head of the list, blocking if the list is empty until a timeout is reached or an element becomes available
    const response7 = await redisClient.blPop('list', 5);
    console.log('list-response7', response7) //{ key: 'list', element: '1' }

    // BLMOVE: Atomically moves elements from one list to another, blocking until an element is available if the source list is empty
    const response8 = await redisClient.blMove("list", "list2", "RIGHT", "LEFT", 30);
    console.log('list-response8', response8)

    // Redis lists are implemented via Linked Lists. This means that even if you have millions of elements inside a list, 
    // the operation of adding a new element in the head or in the tail of the list is performed in constant time. 

    
}

module.exports.redisListMethods = redisListMethods

