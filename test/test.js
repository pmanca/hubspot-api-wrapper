var hubspot = require('../hubspot')
var assert = require('assert')
var portalID = 2323210
var companyID = 304784618
var randNum = Math.random() * 100
var token = "COSo5OqbKxICXwEYiuaNASCRtLUBKLSqAjIZAEL7khPdZ3b29HfMzn44j4zgbHnCMbASsw"
//var options = {type:"hapikey",value:"e5ca5aac-d9e0-4d2c-aeed-93179d563c6c"}
var options = {type:"oauth" , value:token}
var updateCompanyBody = {
    "properties": [
        {
            "name": "description",
            "value": "A far better description than before"
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

it("sets up the auth",function(){
	var result = hubspot.init(options)
	assert(result == true)
})

//default timeout in mocha is 2000 ms

it('get all contacts',function(){
	this.timeout(8000)
	return hubspot.contact.getAll()
	.then(function(data){
		assert(data != null,"did we get something back")
	})
})

it('get Recent',function(){
	this.timeout(7000)
	return hubspot.contact.getRecent()
	.then(function(data){
		assert(data != null,"did we get something back")
	})
})

it('get by email(contact)',function(){
	return hubspot.contact.getByEmail("pmanca@hubspot.com")
	.then(function(data){
		assert(data != null)
	})
})

it('get by VID(contact)',function(){
	return hubspot.contact.getByID(301)
	.then(function(data){
		assert(data != null)
	})
})

it('contact search',function(){
	return hubspot.contact.search("Peter")
	.then(function(data){
		assert(data != null,"did we get something back")
	})
})


it('create a contact',function(){
	return hubspot.contact.create(contact2Create)
	.then(function(data){
		console.log(data)
		assert(data.status == 200)
	})
})


it('update a company',function(){
	return hubspot.company.update(companyID,updateCompanyBody)
	.then(function(data){
		//console.log(data)
		assert(data.status == 200)
	})
})



it('get all companies',function(){
	this.timeout(7000)
	return hubspot.company.getAll()
	.then(function(data){
		assert(data != null,"did we get something back")
	})
})

it('get all Recently Modified companies',function(){
	this.timeout(7000)
	return hubspot.company.getRecentlyModified()
	.then(function(data){
		assert(data != null,"did we get something back")
	})
})

it('get all Recently Created companies',function(){
	this.timeout(7000)
	return hubspot.company.getRecentlyModified()
	.then(function(data){
		assert(data != null,"did we get something back")
	})
})

it('get company by domain',function(){
	return hubspot.company.getByDomain("hubspot.com")
	.then(function(data){
	//	console.log(data)
		assert(data.status == 200)
	})
})

it('get company by ID',function(){
	return hubspot.company.getByID(companyID)
	.then(function(data){
	//	console.log(data)
		assert(data.status == 200)
	})
})

it('get contacts at company',function(){
	return hubspot.company.getContactsByCompanyID(companyID,portalID)
	.then(function(data){
		//console.log(data)
		assert(Array.isArray(data))
	})
})

it('get contact vids at company',function(){
	return hubspot.company.getContactIDsByCompanyID(companyID,portalID)
	.then(function(data){
		//console.log(data)
		assert(data != null)
	})
})

it('add contact to company',function(){
	return hubspot.company.addContactToCompany(companyID,301)
	.then(function(data){
		//console.log(data)
		assert(data.status == 200)
	})
})

it('(FAIL)add contact to company',function(){
	return hubspot.company.addContactToCompany(companyID,300)
	.then(function(data){
		//console.log(data)
		assert(data.response.status == 404)
	})
})

it('remove contact from company',function(){
	return hubspot.company.removeContactFromCompany(companyID,301)
	.then(function(data){
		//console.log(data)
		assert(data.status == 204)
	})
})

it('Delete a company',function(){
	return hubspot.company.delete(companyID,portalID)
	.then(function(data){
		assert(data.status == 200)
	})
})

it('Delete a company when company does not exit',function(){
	return hubspot.company.delete(companyID,portalID)
	.then(function(data){
		assert(data.status != 200)
	})
})

it('create a deal',function(){
	return hubspot.deal.create(dealToCreate)
	.then(function(data){
		//console.log(data)
		assert(data.status == 200)
	})
})