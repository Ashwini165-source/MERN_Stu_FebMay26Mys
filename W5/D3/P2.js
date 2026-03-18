// Why use Async/Await

function getUser(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve({id:1001,name:"Kiran"});
        },100);
    });
}

function getOrders(userId){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(["order-A","order-B"]);
        },1200)
    });
}

async function showUserAndOrders(){
    const user = await getUser();
    console.log("User Loaded:",user.name);

    const orders =  await getOrders(user.id);
    console.log("Orders loaded",orders);
}

showUserAndOrders();