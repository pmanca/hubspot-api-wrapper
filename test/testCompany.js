//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var portalID = 2323210
var randNum = Math.random() * 100
var companyID = 348915390
var company2Delete = 313912152


var token = "CKeKrNmfKxICXwEYiuaNASCRtLUBKKCjAjIZAEL7khOwgSSJ-ubkD4vzceDda2eQbagvNw"
//var options = {type:"hapikey",value:"xxxxx"}
var options = {type:"oauth" , value:token}

var company2Create = {
    "properties": [
        {
            "name": "name",
            "value": "A company name"
        },
        {
            "name": "description",
            "value": "A company description"
        }
    ]
}


describe('Testing the company endpoints -->',function(){
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

	describe('get all companies',function(){
		it('success',function(){
			this.timeout(30000)
			return hubspot.company.getAll()
			.then(data => {
				assert(data != null,"did we get something back")
			})
		})
	})	

	describe('Create a company', function(){
		it('success',function(){
			return hubspot.company.create(company2Create)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.company.create(-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Update a company',function(){
		it('success',function(){
			return hubspot.company.update(companyID,company2Create)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.company.update(-99,company2Create)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('Delete a company',function(){
		it('success',function(){
			return hubspot.company.delete(company2Delete,portalID)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.company.delete(-99)
			.catch(err => {
				assert(data.response.status == 404,portalID)
			})
		})
	})

	describe('Get Recently Modified Companies',function(){
		it('success',function(){
			this.timeout(10000)
			return hubspot.company.getRecentlyModified()
			.then(data => {
				assert(data != null)
			})
		})
	})

	describe('Get Recently Created Companies',function(){
		it('success',function(){
			this.timeout(10000)
			return hubspot.company.getRecentlyCreated()
			.then(data => {
				assert(data != null)
			})
		})
	})

	describe('Get a company by domain',function(){
		it('success',function(){
			return hubspot.company.getByDomain("www.hubspot.com")
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.company.getByDomain("www.fake.com")
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('Get a company by ID',function(){
		it('success',function(){
			return hubspot.company.getByID(companyID)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.company.getByID(-99)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('get contacts by company ID',function(){
		it('success',function(){
			return hubspot.company.getContactsByCompanyID(companyID,portalID)
			.then(data => {
				assert(data != null)
			})
		})
		it('FAIL',function(){
			return hubspot.company.getContactsByCompanyID(-99,portalID)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Get contact IDs by company',function(){
		it('success',function(){
			return hubspot.company.getContactIDsByCompanyID(270798078,portalID)
			.then(data => {
				assert(data != null)
			})
		})
		it('FAIL',function(){
			return hubspot.company.getContactIDsByCompanyID(-99,portalID)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('Add Contact to a Company',function(){
		it('success',function(){
			return hubspot.company.addContactToCompany(companyID,301)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.company.addContactToCompany(companyID,-99)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

	describe('Remove contact from Company',function(){
		it('success',function(){
			return hubspot.company.removeContactFromCompany(companyID,301)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it('FAIL',function(){
			return hubspot.company.removeContactFromCompany(companyID,-99)
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})
})
