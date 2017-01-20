/*Peter Manca
*Node wrapper for HubSpot API
*1/17/2017
*/
var axios = require('axios')
var hubCache = new Map()

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
	create: properties =>{
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
	createOrUpdate: (email,properties) =>{
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
	update: (vid,properties) =>{
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
	updateByEmail: (email,properties) =>{
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
	delete: vid =>{
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
	search: query =>{
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
	getBatchByID: (vids,properties) =>{
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
	getBatchByEmail: (emails,properties,portalID) =>{
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
	getByUTK: utk =>{
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
	getBatchByUTK: (utks,properties) =>{
		var utkString = ""
		if(utks){
			for(var i = 0; i < utks.length; i++){	
				if(i == 0){
					utkString += "utk=" + utks[i]						
				}else{
					utkString += "&utk=" + utks[i]					
				}			
				
			}	
		}
		var propString = ""
		if(properties){
			for(var i = 0; i < properties.length; i++){
				propString += "&property=" + properties[i]
			}	
		}
		var endpoint = `http://api.hubapi.com/contacts/v1/contact/utks/batch/?` + utkString + propString
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
					axios.get(hapiEndpoint + key + '&vidOffset=' + vid + propString)
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				      toCall(response.data['vid-offset'])      
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
					axios.get(hapiEndpoint + 'vidOffset=' + vid + propString,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				      toCall(response.data['vid-offset'])      
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
					axios.get(hapiEndpoint + key + '&vidOffset=' + vid + "&" + timeOffset + propString)
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				      toCall(response.data['vid-offset'],response.data['time-offset'])      
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
					axios.get(endpoint + 'vidOffset=' + vid + "&" + timeOffset + propString,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['has-more']){
				      toCall(response.data['vid-offset'],response.data['time-offset'])      
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


//end of contact
////////////////////////////////////////////////////////////////////
//initialize auth
 


exports.init = obj => {
	if(Object.keys(obj)[0] == "type" && Object.keys(obj)[1] == "value" && Object.keys(obj).length == 2){
		hubCache.set("config",obj)
		return true
	}else{
		return false
	}

}
//end auth
////////////////////////////////////////////////////////////////
//start company

exports.company = {
	create: properties =>{
		var endpoint =  `https://api.hubapi.com/companies/v2/companies`
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
	update: (companyID,properties) =>{
		var endpoint =  `https://api.hubapi.com/companies/v2/companies/` + companyID
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.put(endpoint,properties).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.put(endpoint,properties,
				{headers: {"Authorization": "Bearer " + token }
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	delete: (id,portalID) =>{
		var endpoint = `https://api.hubapi.com/companies/v2/companies/`+ id + `?portalId=` + portalID
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value
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
	getAll: properties => {		
		    return getCompanies(properties).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getRecentlyModified: () => {		
		    return getRecentlyModifiedCompanies().then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getRecentlyCreated: () => {		
		    return getRecentlyCreatedCompanies().then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getByDomain: domain => {
		var endpoint = `https://api.hubapi.com/companies/v2/companies/domain/` + domain
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
	getByID: id => {
		var endpoint = `https://api.hubapi.com/companies/v2/companies/` + id
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
	getContactsByCompanyID: (companyID,portalID) => {		
		    return getContactsAtCompany(companyID,portalID).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	getContactIDsByCompanyID: (companyID,portalID) => {		
		    return getContactVIDsAtCompany(companyID,portalID).then(response => {
		    	return response	
		    }).catch(err =>{
				throw err
			})
	},
	addContactToCompany: (companyID,vid) =>{
		var endpoint = `https://api.hubapi.com/companies/v2/companies/` + companyID + `/contacts/` + vid
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `?hapikey=` + hubCache.get("config").value
			return axios.put(endpoint,{},
				{headers: {"content-type": "application/json"}
			}).then(response =>{
				return response
			}).catch(err =>{
				return err
			})
		}else{
			var token = hubCache.get("config").value
			return axios.put(endpoint,{},
				{headers: {"Authorization": "Bearer " + token}
			}).then(response => {
				return response
			}).catch(err => {
				return err
			})
		}
	},
	removeContactFromCompany: (companyID,vid) =>{
		var endpoint = `https://api.hubapi.com/companies/v2/companies/` + companyID + `/contacts/` + vid
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
	}
}

function getCompanies(properties){
	var companies = []
	var propString = ""
	var endpoint = `https://api.hubapi.com/companies/v2/companies/paged`
	if(properties){
		for(var i = 0; i < properties.length; i++){
			propString += "&property=" + properties[i]
		}	
	}
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&vidOffset=' + offset + propString)
				    .then(response =>{
				    companies = companies.concat(response.data.companies)
				    if (response.data['has-more']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(companies)
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
				    companies = companies.concat(response.data.companies)
				    if (response.data['has-more']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(companies)
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

function getRecentlyModifiedCompanies(){
	var companies = []
	var endpoint = `https://api.hubapi.com/companies/v2/companies/recent/modified`
	
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&vidOffset=' + offset)
				    .then(response =>{
				    companies = companies.concat(response.data.companies)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(companies)
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
				    companies = companies.concat(response.data.companies)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(companies)
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


function getRecentlyCreatedCompanies(){
	var companies = []
	var endpoint = `https://api.hubapi.com/companies/v2/companies/recent/created`
	
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(offset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "?hapikey=" + key + '&vidOffset=' + offset)
				    .then(response =>{
				    companies = companies.concat(response.data.companies)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(companies)
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
				    companies = companies.concat(response.data.companies)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
				    }else{    	
				    	resolve(companies)
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

function getContactsAtCompany(companyID,portalID){
	var contacts = []
	var endpoint = `https://api.hubapi.com/companies/v2/companies/`+ companyID + `/contacts?portalId=` + portalID

	
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(vidOffset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "&hapikey=" + key + '&vidOffset=' + vidOffset)
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
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
					axios.get(endpoint + '&offset=' + vidOffset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    contacts = contacts.concat(response.data.companies)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
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

function getContactVIDsAtCompany(companyID,portalID){
	var contacts = []
	var endpoint = `https://api.hubapi.com/companies/v2/companies/` + companyID + `/vids?portalId=` + portalID

	
	
	return new Promise(function(resolve,reject){
		
		toCall(0)
		//need this extra fn due to recursion
		function toCall(vidOffset){
				//update the key
				if(hubCache.get("config").type == "hapikey"){
					var key = hubCache.get("config").value
					axios.get(endpoint + "&hapikey=" + key + '&vidOffset=' + vidOffset)
				    .then(response =>{
				    contacts = contacts.concat(response.data.contacts)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
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
					axios.get(endpoint + '&offset=' + vidOffset,
						{headers: {"Authorization": "Bearer " + token }
					})
				    .then(response =>{
				    contacts = contacts.concat(response.data.companies)
				    if (response.data['hasMore']){
				      toCall(response.data['offset'])      
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

//end of companies
//////////////////////////////////////////////////////////////////
//start the deals

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