function getData(url, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("readystatechange", callback);
    request.send();
};
