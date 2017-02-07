//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')

var token = "CLeeqdmhKxICXwEYiuaNASCRtLUBKKCjAjIZAEL7khOzw7aSN5HQ8jBr7LSU3QvjN7DMEA"
//var options = {type:"hapikey",value:"e5ca5aac-d9e0-4d2c-aeed-93179d563c6c"}
var options = {type:"oauth" , value:token}


describe('Testing The Owner Endpoints -->',function(){
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

	describe('Get owner by email',function(){
		it("success",function(){
			hubspot.owner.getByEmail("pmanca@hubspot.com")
			.then(result => {
				assert(result.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.owner.getByEmail("fail@fail.edu")
			.then(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Get all owners',function(){
		it("success",function(){
			hubspot.owner.getAll()
			.then(result => {
				assert(result.status == 200)
			})
		})
	})
})