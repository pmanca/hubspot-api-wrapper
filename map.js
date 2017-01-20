var myMap = new Map();

// Add new elements to the map

var options = {type:"hapikey",value:"e5ca5aac-d9e0-4d2c-aeed-93179d563c6c"}
myMap.set("bar", options);
console.log(myMap.get("bar").type)