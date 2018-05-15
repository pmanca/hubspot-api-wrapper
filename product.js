var axios = require('axios')
var hubCache = require('./init').hubCache

var counter = 0
//null is for interception a successful response
var baseURL = "https://api.hubapi.com/crm-objects/v1/objects"


axios.interceptors.response.use(null, err => {

	return new Promise(function(resolve,reject){
		// Do something with response error 
	    const config = err.config;
	    
	    // If we have no information to retry the request
	    if (!config) {
	      return reject(err);
		}
	    if(err.response.status >= 500){
	    	if(counter > 3){
	    		counter = 0
	    		return reject(err)
	    	}else{
	    		 counter++
	    		setTimeout(function(){
					return resolve(axios(config))
	    		},Math.pow((counter + 10), 2))
	    	}	
	    }else if(err.response.status == 429 && err.response.data.policyName === 'SECONDLY'){
	    	setTimeout(function(){
					return resolve(axios(config))
	    		},1001)
	    }
	    else{
	    	return reject(err);
	    }
	})

});

exports.product = {
	getAll: properties => {		
		    return getProducts(properties).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	create: body => {
		var endpoint =  `${baseURL}/products`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,body,
				{headers: {"content-type": "application/json" }
				}).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,body,
				{headers: {"Authorization": "Bearer " + token,
				"content-type": "application/json" }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	
	
}


function getProducts(properties){
	var products = []
	var propString = ""
	var endpoint = `${baseURL}/products/paged`
	if(properties){
		for(var i = 0; i < properties.length; i++){
			propString += "&properties=" + properties[i]
		}	
	}
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&offset=' + offset + propString,
						{headers: {"content-type": "application/json"}
					}).then(response =>{
						console.log(response)
					    products = products.concat(response.data.objects)
					    if (response.data['hasMore']){
					    	setTimeout(function(){
					    		toCall(response.offset)      		
					    	},101)
					    }else{    	
					    	resolve(products)
					    }
				  }).catch(error => {
				  	//look through 429 error codes for daily or secondly(as in time) limit
					if(error.response.status == 404){
						var rejectObject = {
							advice: "You have a 404 error for endpoint not found.",
							error: error.response
						}
						reject(rejectObject)
					}else if(error.response.status == 429){
						var rejectObject = {
							advice: "You have exceeded your call limit for the day.",
							error: error.response
						}
						reject(rejectObject)
					}else if(error.response.status == 401){
						var rejectObject = {
							advice: "You are not authorized to hit this endpoint.",
							error: error.response
						}
						reject(rejectObject)
					}else{
						var rejectObject = {
							advice: "You received a " + error.response.status + " error.",
							error: error.response
						}
						reject(rejectObject)
					}
				  })
				}else{
					var token = hubCache.get("config").value
					axios.get(endpoint + '?offset=' + offset + propString,
						{headers: {"Authorization": "Bearer " + token,"content-type": "application/json" }
					})
				    .then(response =>{
				    products = products.concat(response.data.objects)
				    if (response.data['hasMore']){
				    	setTimeout(function(){
				    		toCall(response.data['offset'])      		
				    	},101)
				    }else{    	
				    	resolve(products)
				    }
				  }).catch(error => {
				  	//look through 429 error codes for daily or secondly(as in time) limit
					if(error.response.status == 404){
						var rejectObject = {
							advice: "You have a 404 error for endpoint not found.",
							error: error.response
						}
						reject(rejectObject)
					}else if(error.response.status == 429){
						var rejectObject = {
							advice: "You have exceeded your call limit for the day.",
							error: error.response
						}
						reject(rejectObject)
					}else if(error.response.status == 401){
						var rejectObject = {
							advice: "You are not authorized to hit this endpoint.",
							error: error.response
						}
						reject(rejectObject)
					}else{
						var rejectObject = {
							advice: "You received a " + error.response.status + " error.",
							error: error.response
						}
						reject(rejectObject)
					}
				  })
				}//end of oauth block
				
		
		}//end of tocall function
		
	})//end of Promise
	

}