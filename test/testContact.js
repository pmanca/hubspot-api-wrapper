//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var portalID = 2323210
var randNum = Math.random() * 100
var VID2Delete = 24451
var utk = "629f2542ccc40c0f413fc35f46c3e799"





var token = "CNPOjKqBLBICXwEYiuaNASCRtLUBKKCjAjIZAPvBbcGdVIYQfCJBBGb3-NXLH90b6RbJWw"
//var options = {type:"hapikey",value:"b4426af6-a1ed-48f7-bbcc-1ac805066df2"}
var options = {type:"oauth" , value:token}

var updateCompanyBody = {
    "properties": [
        {
            "name": "description",
            "value": "A far better description than before"
        }
    ]
}
var deal2Update = {
  "properties": [
    {
      "name": "amount",
      "value": "70000"
    }
  ]
}
var dealToCreate =  {
            "associations": {
                "associatedCompanyIds": [
                    
                ],
                "associatedVids": [
                    301
                ]
            },
            "portalId": portalID,
            "properties": [
                {
                    "value": "Tim's Newer Deal",
                    "name": "dealname"
                },
                {
                    "value": "appointmentscheduled",
                    "name": "dealstage"
                },
                {
                    "value": "default",
                    "name": "pipeline"
                },
                {
                    "value": 1409443200000,
                    "name": "closedate"
                },
                {
                    "value": "60000",
                    "name": "amount"
                }
                
            ]
        }

var contact2Create = {
            "properties": [
                {
                    "property": "email",
                    "value": "Matt" + randNum + "@hubspot.com"
                },
                {
                    "property": "firstname",
                    "value": "matthew"
                },
                {
                    "property": "lastname",
                    "value": "McAulliffe"
                }
                ]
            }


var contact2Update = {
            "properties": [
               
                {
                    "property": "firstname",
                    "value": "matthew" + randNum
                },
                {
                    "property": "lastname",
                    "value": "McAulliffe4"
                }
                ]
            }

describe('Testing the Contact Enpoints',function(){
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

	describe('get all contacts',function(){
		it('success',function(){
			this.timeout(10000)
			return hubspot.contact.getAll()
			.then(data => {
				console.log(data)
				assert(data != null,"did we get something back")
			})
		})
	})

	describe('get recent contacts',function(){
		it('success',function(){
			this.timeout(7000)
			return hubspot.contact.getRecent()
			.then(data => {
				assert(data != null,"did we get something back")
			})
		})	
	})

	describe('get contact by email',function(){
		it('success',function(){
			return hubspot.contact.getByEmail("pmanca@hubspot.com")
			.then(data => {				
				assert(data.status == 200)
			})
		})

		it('FAIL',function(){
			return hubspot.contact.getByEmail("pmanca@FAKE.com")
			.catch(err => {
				assert(err.response.status == 404)
			})
		})

	})

	describe('get contact by VID',function(){
		it('success',function(){
			return hubspot.contact.getByID(301)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.getByID(-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('create a contact', function(){
		it('success',function(){
			return hubspot.contact.create(contact2Create)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.create(contact2Create)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('create or Update a contact',function(){
		it('success',function(){
			return hubspot.contact.createOrUpdate("Matt2@hubspot.com",contact2Update)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.createOrUpdate("Matt2@FAKE.com",contact2Update)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Update a contact',function(){
		it('success',function(){
			return hubspot.contact.update(21701,contact2Update)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.update(-99,contact2Update)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Update a contact By Email',function(){
		it('success',function(){
			return hubspot.contact.updateByEmail("matt@hubspot.com",contact2Update)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.updateByEmail("MATT@FAKE.com",contact2Update)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Delete a contact',function(){
		it('success',function(){
			return hubspot.contact.delete(VID2Delete)
			.then(data => {
				assert(data.data.deleted == true)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.delete(randNum)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('contact search by firstname',function(){
		it('success',function(){
			return hubspot.contact.search("Peter")
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.search("Nessuno")
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('get Batch of contacts by ID',function(){
		it('success',function(){
			return hubspot.contact.getBatchByID([301,1],["firstname","phonenumber"])
			.then(data => {
				assert(data != null)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.getBatchByID(-999,["fake","fake 2"])
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('Get a batch of contacts by Email',function(){
		it('success',function(){
			return hubspot.contact.getBatchByEmail(["petermanca3@gmail.com","pmanca@hubspot.com"],["firstname","phonenumber"],portalID)
			.then(data => {
				assert(data != null)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.getBatchByEmail(["fake"],[],portalID)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('get a contact by UTK',function(){
		it('success',function(){
			return hubspot.contact.getByUTK(utk)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.getByUTK(1)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})
	
	//This endpoint was unpublished as of 5/18/2018
	//I don't know when this will be unscoped
	// describe('Get batch of contacts by UTKs',function(){
	// 	it('success',function(){
	// 		return hubspot.contact.getBatchByUTK([utk,utk],["firstname","phonenumber"])
	// 		.then(data => {
	// 			assert(data != null)
	// 		})
	// 	})
	// 	it('FAIL',function(){
	// 		return hubspot.contact.getBatchByUTK([1,2,3])
	// 		.catch(err => {
	// 			assert(err.response.status == 404)
	// 		})
	// 	})
	// })

	describe('Merge contacts',function(){
		it('success',function(){
			return hubspot.contact.merge(301,301)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.contact.merge(-99,-9)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

})            
