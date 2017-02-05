var axios = require('axios')
var hubCache = require('./init').hubCache

exports.owner = {
	getByEmail: email => {
		var endpoint = `http://api.hubapi.com/owners/v2/owners?email=` + email
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value			
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
	getAll: (includeInactive) => {
		if(!includeInactive){
			includeInactive = false
		}
		var endpoint = `http://api.hubapi.com/owners/v2/owners?includeInactive=` + includeInactive
		if(hubCache.get("config").type == "hapikey"){
			endpoint += `&hapikey=` + hubCache.get("config").value			
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
	}
}