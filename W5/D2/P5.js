//Callback error

function divideNumbers(a,b,callback){
    if(b==0){
        callback("Cannot divide by zero.");
            return;
    }
    const result =a/b;
    
    callback(null,result);
}

divideNumbers(10,0,function(error,result){
    if(error){
        console.log("Error: ",error);
        return;
    }
    console.log("Resutt: ",result);
});