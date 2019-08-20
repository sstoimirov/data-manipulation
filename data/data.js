function getData(url, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("readystatechange", callback);
    request.send();
    // fetch(url)
    //     .then(response=>{
    //         return response.json();
    //     })
    //     .then(data=>{
    //         console.log(data)
    //     })
    //     .catch(err=>{
    //         console.log("Something when wrong")
    //     })
        
};