//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')

//var token = "CLeeqdmhKxICXwEYiuaNASCRtLUBKKCjAjIZAEL7khOzw7aSN5HQ8jBr7LSU3QvjN7DMEA"
var options = {type:"hapikey",value:"xxxxx"}
//var options = {type:"oauth" , value:token}



describe('Testing The Utility Endpoints -->',function(){
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

	describe("Testing the get Daily Usage endpoint",function(){
		it("success",function(){
			hubspot.util.getDailyUsage()
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.util.getDailyUsage()
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

})