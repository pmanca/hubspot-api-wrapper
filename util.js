var axios = require('axios')
var hubCache = require('./init').hubCache

var counter = 0
//null is for interception a successful response

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



exports.util = {
	getDailyUsage: () => {
		var endpoint =  `https://api.hubapi.com/integrations/v1/limit/daily`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"content-type": "application/json" }
				}).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"Authorization": "Bearer " + token,
				"content-type": "application/json" }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	}
}
