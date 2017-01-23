var axios = require('axios')
var hubCache = require('./init').hubCache

exports.deal = {
	create: body => {
		var endpoint =  `https://api.hubapi.com/deals/v1/deal`
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
	update: (dealID,properties) =>{
		var endpoint =  `https://api.hubapi.com/deals/v1/deal/` + dealID
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.put(endpoint,properties,
				{headers: {"content-type": "application/json"}
				}).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.put(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token, "content-type": "application/json" }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	getAll: properties => {		
		    return getDeals(properties).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getRecentlyModified: () => {		
		    return getRecentlyModifiedDeals().then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getRecentlyCreated: () => {		
		    return getRecentlyCreatedDeals().then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	delete: (dealID,portalID) =>{
		var endpoint =  `https://api.hubapi.com/deals/v1/deal/` + dealID + "?portalId=" + portalID
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value
			return axios.delete(endpoint,
				{headers: {"content-type": "application/json"}
				}).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.delete(endpoint,
				{headers: {"Authorization": "Bearer " + token, "content-type": "application/json" }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	getByID: id => {
		var endpoint = `https://api.hubapi.com/deals/v1/deal/` + id
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
	getByID: id => {
		var endpoint = `https://api.hubapi.com/deals/v1/deal/` + id
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
	associate: (dealID,objType,objIDs) => {		
		var endpoint = `https://api.hubapi.com/deals/v1/deal/` + dealID + `/associations/` + objType
		var idString = ""
		if(hubCache.get("config").type == "hapikey"){
			if(objIDs){
				for(var i = 0; i < objIDs.length; i++){
					idString += "&id=" + objIDs[i]
				}	
			}
			endpoint += `?hapikey=` + hubCache.get("config").value + idString
			return axios.put(endpoint,{}).then(response => {
				return response
			})
		}else{
			if(objIDs){
				for(var i = 0; i < objIDs.length; i++){
					if(i == 0){
						idString += "?id=" + objIDs[i]
					}else{
						idString += "&id=" + objIDs[i]	
					}
					
				}	
			}
			var token = hubCache.get("config").value
			endpoint += idString
			return axios.put(endpoint,{},
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
		
	},
	removeAssociateObject: (dealID,objType,objIDs) => {		
		var endpoint = `https://api.hubapi.com/deals/v1/deal/` + dealID + `/associations/` + objType
		var idString = ""		
		if(hubCache.get("config").type == "hapikey"){
			if(objIDs){
				for(var i = 0; i < objIDs.length; i++){
					idString += "&id=" + objIDs[i]
				}	
			}
			endpoint += `?hapikey=` + hubCache.get("config").value + idString
			return axios.delete(endpoint).then(response => {
				return response
			})
		}else{
			if(objIDs){
				for(var i = 0; i < objIDs.length; i++){
					if(i == 0){
						idString += "?id=" + objIDs[i]
					}else{
						idString += "&id=" + objIDs[i]	
					}
					
				}	
			}
			var token = hubCache.get("config").value
			endpoint += idString
			return axios.delete(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err =>{
				return err
			})
		}
		
	},
	getAssociatedDeals: (objType, id) => {		
		    return getAssociatedDealsOfObject(objType,id).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	
}


function getDeals(properties){
	var deals = []
	var propString = ""
	var endpoint = `https://api.hubapi.com/deals/v1/deal/paged`
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
					axios.get(endpoint + "?hapikey=" + key + '&offset=' + offset + propString)
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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


function getRecentlyModifiedDeals(){
	var deals = []
	var endpoint = `https://api.hubapi.com/deals/v1/deal/recent/modified`
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&offset=' + offset)
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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
					axios.get(endpoint + '?offset=' + offset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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

function getRecentlyCreatedDeals(){
	var deals = []
	var endpoint = `https://api.hubapi.com/deals/v1/deal/recent/created`
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&offset=' + offset)
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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
					axios.get(endpoint + '?offset=' + offset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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

function getAssociatedDealsOfObject(objType,id){
	var deals = []	
	var endpoint = `https://api.hubapi.com/deals/v1/deal/associated/` + objType + `/` + id + `/paged`
	
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&offset=' + offset)
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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
					axios.get(endpoint + '?offset=' + offset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    deals = deals.concat(response.data.deals)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(deals)
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