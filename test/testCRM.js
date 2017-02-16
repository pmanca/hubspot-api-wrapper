//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var randNum = Math.random() * 100
var companyID = 345052763
var dealID = 59275105
var ownerID = 15149075


//var token = "CLeeqdmhKxICXwEYiuaNASCRtLUBKKCjAjIZAEL7khOzw7aSN5HQ8jBr7LSU3QvjN7DMEA"
var options = {type:"hapikey",value:"xxxxx"}
//var options = {type:"oauth" , value:token}

var contact = {
  "properties": [
    {
      "property": "email",
      "value": "testingapis" + randNum + "@hubspot.com"
    },
    {
      "property": "firstname",
      "value": "Peter"
    }
    ]
}

var engagement = {
    "engagement": {
        "active": true,
        "ownerId": ownerID,
        "type": "NOTE",
        "timestamp": 1409172644778
    },
    "associations": {
        "contactIds": [ ],
        "companyIds": [ ],
        "dealIds": [ ],
        "ownerIds": [ ]
    },
    "attachments": [
        {
            "id": 4241968539
        }
    ],
    "metadata": {
        "body": "note body"
    }
}



describe('Testing The CRM Endpoints -->',function(){
	this.timeout(2500)
	beforeEach(function(done){
		setTimeout(function(){
			done()
		},500)
	})

	describe('set up the auth',function(){		
		it("success",function(){
			var result = hubspot.init(options)
			assert(result == true)
		})
	})

	describe("Testing the create contact and associate to deal",function(){
		it("success",function(){
			hubspot.crm.createContactAndAssociateToDeal(contact,dealID)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.crm.createContactAndAssociateToDeal(contact,-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Testing the create contact and associate to company",function(){
		it("success",function(){
			hubspot.crm.createContactAndAssociateToCompany(contact,companyID)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.crm.createContactAndAssociateToDeal(contact,-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Create an engagement and associate it to a contact",function(){
		it("success",function(){
			hubspot.crm.createEngagementAndAssociateToContact(engagement,301)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.crm.createEngagementAndAssociateToContact(engagement,-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

})