var axios = require('axios')
var hubCache = require('./init').hubCache

exports.contact = {
	getAll: properties => {		
		    return getContacts(properties).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getRecent: properties => {		
		    return getRecentContacts(properties).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getByEmail: email => {
		var endpoint =  `https://api.hubapi.com/contacts/v1/contact/email/`+ email + `/profile`
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
		var endpoint = `https://api.hubapi.com/contacts/v1/contact/vid/` + id + `/profile`
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
	create: properties => {
		var endpoint =  `https://api.hubapi.com/contacts/v1/contact/`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,properties).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	createOrUpdate: (email,properties) => {
		var endpoint =  `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/`+ email + `/`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,properties).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	update: (vid,properties) => {
		var endpoint =  `https://api.hubapi.com/contacts/v1/contact/vid/` + vid + `/profile`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,properties).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	updateByEmail: (email,properties) => {
		var endpoint =   `https://api.hubapi.com/contacts/v1/contact/email/`+ email + `/profile`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,properties).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	delete: vid => {
		var endpoint = `https://api.hubapi.com/contacts/v1/contact/vid/` + vid
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.delete(endpoint).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.delete(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	search: query => {
		var endpoint = `https://api.hubapi.com/contacts/v1/search/query?q=` + query
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value
			return axios.get(endpoint).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	getBatchByID: (vids,properties) => {
		var vidString = ""
		if(vids){
			for(var i = 0; i < vids.length; i++){
				if(i == 0){
					vidString += "vid=" + vids[i]
				}else{
					vidString += "&vid=" + vids[i]	
				}
			}	
		}
		var propString = ""
		if(properties){
			for(var i = 0; i < properties.length; i++){
				propString += "&property=" + properties[i]
			}	
		}
		var endpoint = `https://api.hubapi.com/contacts/v1/contact/vids/batch/?` + vidString + propString
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value
			return axios.get(endpoint).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	getBatchByEmail: (emails,properties,portalID) => {
		var emailString = ""
		if(emails){
			for(var i = 0; i < emails.length; i++){				
				emailString += "&email=" + emails[i]					
			}	
		}
		var propString = ""
		if(properties){
			for(var i = 0; i < properties.length; i++){
				propString += "&property=" + properties[i]
			}	
		}
		var endpoint = `http://api.hubapi.com/contacts/v1/contact/emails/batch/?portalId=` + portalID + emailString + propString
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value
			return axios.get(endpoint).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	getByUTK: utk => {
		var endpoint = `http://api.hubapi.com/contacts/v1/contact/utk/`+ utk + `/profile`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.get(endpoint).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.get(endpoint,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	//This endpoint was unpublished as of 5/18/2018
	//I don't know when this will be unscoped
	// getBatchByUTK: (utks,properties) => {
	// 	var utkString = ""
	// 	if(utks){
	// 		for(var i = 0; i < utks.length; i++){	
	// 			if(i == 0){
	// 				utkString += "utk=" + utks[i]						
	// 			}else{
	// 				utkString += "&utk=" + utks[i]					
	// 			}			
				
	// 		}	
	// 	}
	// 	var propString = ""
	// 	if(properties){
	// 		for(var i = 0; i < properties.length; i++){
	// 			propString += "&property=" + properties[i]
	// 		}	
	// 	}
	// 	var endpoint = `http://api.hubapi.com/contacts/v1/contact/utks/batch/?` + utkString + propString
	// 	if(hubCache.get("config").type == "hapikey"){
	// 		endpoint += `&hapikey=` + hubCache.get("config").value
	// 		return axios.get(endpoint).then(response =>{
	// 			return response
	// 		}).catch(err =>{
	// 			return err
	// 		})
	// 	}else{
	// 		var token = hubCache.get("config").value
	// 		return axios.get(endpoint,
	// 			{headers: {"Authorization": "Bearer " + token }
	// 		}).then(response => {
	// 			return response
	// 		}).catch(err => {
	// 			return err
	// 		})
	// 	}
	// },
	merge: (vidPrimary,vidSecondary) => {
		var body = {
			"vidToMerge": vidSecondary
		}
		var endpoint = `https://api.hubapi.com/contacts/v1/contact/merge-vids/`+ vidPrimary + `/?`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,body).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,body,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	createOrUpdateByBatch: body => {
		var endpoint = `http://api.hubapi.com/contacts/v1/contact/batch/`
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.post(endpoint,body).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.post(endpoint,body,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	}
	
}



function getContacts(properties){
	var contacts = []
	var propString = ""
	if(properties){
		for(var i = 0; i < properties.length; i++){
			propString += "&property=" + properties[i]
		}	
	}
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(vid){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					var hapiEndpoint = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey='
					axios.get(hapiEndpoint + key + '&count=100' + '&vidOffset=' + vid + propString)
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				    	setTimeout(function(){
				    		toCall(response.data['vid-offset'])      		
				    	},101)
				    }else{    	
				    	resolve(contacts)
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
					var hapiEndpoint = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?'
					axios.get(hapiEndpoint + '&count=100' + 'vidOffset=' + vid + propString,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				    	setTimeout(function(){
				    		toCall(response.data['vid-offset'])      		
				    	})
				    }else{    	
				    	resolve(contacts)
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


function getRecentContacts(properties){
	var contacts = []
	var propString = ""
	if(properties){
		for(var i = 0; i < properties.length; i++){
			propString += "&property=" + properties[i]
		}	
	}
	
	return new Promise(function(resolve,reject){

		//the zeroes are for the vid and the timeoffset for the initial call
		toCall(0,0)
		//need this extra fn due to recursion
		function toCall(vid,timeOffset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					var hapiEndpoint = 'https://api.hubapi.com/contacts/v1/lists/recently_updated/contacts/recent?hapikey='
					axios.get(hapiEndpoint + key + '&count=100' + '&vidOffset=' + vid + "&" + timeOffset + propString)
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				    	setTimeout(function(){
				    		toCall(response.data['vid-offset'],response.data['time-offset'])      		
				    	},101)
				    }else{    	
				    	resolve(contacts)
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
					var endpoint = ' https://api.hubapi.com/contacts/v1/lists/recently_updated/contacts/recent?'
					axios.get(endpoint + '&count=100' + 'vidOffset=' + vid + "&" + timeOffset + propString,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				    	setTimeout(function(){
				    		toCall(response.data['vid-offset'],response.data['time-offset'])      		
				    	},101)
				    }else{    	
				    	resolve(contacts)
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

