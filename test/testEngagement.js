//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')


var token = "CLeeqdmhKxICXwEYiuaNASCRtLUBKKCjAjIZAEL7khOzw7aSN5HQ8jBr7LSU3QvjN7DMEA"
//var options = {type:"hapikey",value:"e5ca5aac-d9e0-4d2c-aeed-93179d563c6c"}
var options = {type:"oauth" , value:token}


describe('Testing The Engagement Endpoints -->',function(){
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

	describe('Get all of the Engagements',function(){
		it("success",function(){
			hubspot.engagement.getAll()
			.then(result => {
				assert(result != null)
			})
		})
	})

	describe("Get Associated Engagements",function(){
		it("success",function(){
			hubspot.engagement.getAssociatedEngagements("contact",301)
			.then(result => {
				assert(result != null)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.getAssociatedEngagements("contact",-99)
			.catch(err => {
				assert(err.error.status == 404)
			})
		})
	})
})