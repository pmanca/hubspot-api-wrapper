//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var portalID = 2323210
var randNum = Math.random() * 100

var token = "CK77ivmbKxICXwEYiuaNASCRtLUBKLSqAjIZAEL7khPaiCiSiXdHlXSuHsnIvOfQwOzcUg"
var options = {type:"hapikey",value:"e5ca5aac-d9e0-4d2c-aeed-93179d563c6c"}
//var options = {type:"oauth" , value:token}

var deal2Create =  {
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
                    "value": "24",
                    "name": "hubspot_owner_id"
                },
                {
                    "value": 1409443200000,
                    "name": "closedate"
                },
                {
                    "value": "60000",
                    "name": "amount"
                },
                {
                    "value": "newbusiness",
                    "name": "dealtype"
                }
            ]
        }
describe('Testing the Deal Enpoints --> ',function(){
	describe('set up the auth',function(){		
		it("success",function(){
			var result = hubspot.init(options)
			assert(result == true)
		})
	})

	describe('create a deal',function(){
		it('success',function(){
			return hubspot.deal.create(deal2Create)
			.then(data => {
				console.log(data)
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.create("haha")
			.catch(err => {
				assert(data.response.status == 404)
			})
		})
	})

})