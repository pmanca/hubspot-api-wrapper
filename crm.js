var axios = require('axios')
var hubCache = require('./init').hubCache
var contact = require('./contact').contact
var company = require('./company').company
var deal = require('./deal').deal
var engagement = require('./engagement').engagement

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

exports.crm = {
	createContactAndAssociateToCompany: (properties,companyID) => {

		    return contact.create(properties).then(result => {
			    if(result.data == undefined){
			    	return {"message": "Failed to create contact",
			    			"err": result}
			    }
			 	return company.addContactToCompany(companyID,result.data.vid).then(result => {
					return result
				}).catch(err => {
					return err
				})
			}).catch(err =>{
				return err
			})
	},
	createContactAndAssociateToDeal: (properties,dealID) => {
		
		return contact.create(properties).then(result => {
			if(result.data == undefined){
			    	return {"message": "Failed to create contact",
			    			"err": result}
			}
			return deal.associate(dealID,"CONTACT",[result.data.vid]).then(result => {
				return result
			}).catch(err => {
				return err
			})
		}).catch(err => {
			return err
		})
	},
	createEngagementAndAssociateToContact: (properties,vid) => {
		return engagement.create(properties).then(result => {
			if(result.data == undefined){
			    	return {"message": "Failed to create contact",
			    			"err": result}
			}
			var id = result.data.engagement.id
			return engagement.associate(id,"contact",vid).then(result => {
				return result
			}).catch(err => {
				return err
			})
		}).catch(err => {
			return err
		})
	}
}