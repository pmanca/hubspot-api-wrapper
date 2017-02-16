var axios = require('axios')
var hubCache = require('./init').hubCache
var contact = require('./contact').contact
var company = require('./company').company
var deal = require('./deal').deal
var engagement = require('./engagement').engagement

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