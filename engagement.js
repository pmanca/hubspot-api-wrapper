var axios = require('axios')
var hubCache = require('./init').hubCache
var contact = require('./contact').contact
var company = require('./company').company
var deal = require('./deal').deal

exports.engagement = {
	create: (properties) => {
		//you get the engagement ID back in return to use later on to associate it
		//to a crm object
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
	}
}