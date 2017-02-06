var axios = require('axios')
var hubCache = require('./init').hubCache
var contact = require('./contact').contact
var company = require('./company').company
var deal = require('./deal').deal

exports.engagement = {
	create: (properties) => {
		var endpoint = `https://api.hubapi.com/engagements/v1/engagements`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value			
			return axios.post(endpoint,properties).then(response => {
				return response
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
	},
	update: (id,properties) => {
		var endpoint = `https://api.hubapi.com/engagements/v1/engagements/` + id
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value			
			return axios.put(endpoint,properties).then(response => {
				return response
			})
		}else{
			var token = hubCache.get("config").value
			return axios.put(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
	},
	getByID: id => {
		var endpoint = `https://api.hubapi.com/engagements/v1/engagements/` + id
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value			
			return axios.get(endpoint).then(response => {
				return response
			})
		}else{
			var token = hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
	},
	delete: id => {
		var endpoint = `https://api.hubapi.com/engagements/v1/engagements/` + id
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value			
			return axios.delete(endpoint).then(response => {
				return response
			})
		}else{
			var token = hubCache.get("config").value
			return axios.delete(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
	},
	associate: (id,objType,objID) => {
		var endpoint = `https://api.hubapi.com/engagements/v1/engagements/`+ id +`/associations/`+ objType + `/` + objID
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value			
			return axios.put(endpoint,
				{headers: {"Content-Type": "application/json"}
			}).then(response => {
				return response
			})
		}else{
			var token = hubCache.get("config").value
			return axios.put(endpoint,
				{headers: {"Authorization": "Bearer " + token,
				"Content-Type": "application/json" }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
	},
	getAll: () => {		
		    return getEngagements().then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getAssociatedEngagements: (objType,objID) => {
		return getAssociations(objType,objID).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	}
}


function getEngagements(){
	var engagements = []
	console.log("oh hey")
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		
		function toCall(offset){
				var endpoint = `https://api.hubapi.com/engagements/v1/engagements/paged`
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&Offset=' + offset)
				    .then(response =>{
				    	//console.log(response.data)
				    engagements = engagements.concat(response.data.results)
				    if (response.data['hasMore']){
				    	setTimeout(function(){
				    		toCall(response.data['offset'])      		
				    	},101)
				    }else{    	
				    	resolve(engagements)
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
					axios.get(endpoint + '?Offset=' + offset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    engagements = engagements.concat(response.data.results)
				    if (response.data['hasMore']){
				    	setTimeout(function(){
				    		toCall(response.data['offset'])      		
				    	})
				    }else{    	
				    	resolve(engagements)
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



function getAssociations(objType,objID){
	var engagements = []
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		
		function toCall(offset){
		var endpoint = `https://api.hubapi.com/engagements/v1/engagements/associated/`+ objType + `/`+ objID + `/paged`
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&Offset=' + offset)
				    .then(response =>{
				    engagements = engagements.concat(response.data.results)
				    if (response.data['hasMore']){
				    	setTimeout(function(){
				    		toCall(response.data['offset'])      		
				    	},101)
				    }else{    	
				    	resolve(engagements)
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
					axios.get(endpoint + '?Offset=' + offset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    engagements = engagements.concat(response.data.results)
				    if (response.data['hasMore']){
				    	setTimeout(function(){
				    		toCall(response.data['offset'])      		
				    	})
				    }else{    	
				    	resolve(engagements)
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
