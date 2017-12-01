//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var portalID = 2323210
var randNum = Math.random() * 100
var dealID = 85363503
var deal2Delete = 85359153
var vid = 22851

var token = "CIr3xoGALBICXwEYiuaNASCRtLUBKKCjAjIZAFfMOYmNRzAzEIFXHGYYirOYTiVJDcQRNw"
//var options = {type:"hapikey",value:"xxxxx"}
var options = {type:"oauth" , value:token}

var deal2Update = {
  "properties": [
    {
      "name": "amount",
      "value": "70000"
    }
  ]
}

var groupOfDeals2Update = [
  {
    "objectId": 77734013,
    "properties": [
      {
        "name": "dealname",
        "value": "Updated deal name."
      }
    ]
  },
  {
    "objectId": 85719808,
    "properties": [
      {
        "name": "dealname",
        "value": "Another updated deal"
      },
      {
        "name": "amount",
        "value": 27
      }
    ]
  }
]


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

	describe('create a deal',function(){
		it('success',function(){
			return hubspot.deal.create(deal2Create)
			.then(data => {
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

	describe('Update a group of deals',function(){
		it('success',function(){
			return hubspot.deal.updateGroupOfDeals(groupOfDeals2Update)
			.then(data => {
				assert(data.status == 202)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.updateGroupOfDeals("haha")
			.catch(err => {
				assert(data.response.status == 404)
			})			
		})
	})

	describe('update a deal',function(){
		it('success',function(){
			return hubspot.deal.update(dealID,deal2Update)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.update(-99,deal2Update)
			.catch(err => {
				assert(data.response.status == 404)
			})			
		})
	})

	describe('Get all deals',function(){
		it('success',function(){
			return hubspot.deal.getAll()
			.then(data => {
				assert(data != null)
			})
		})
	})

	describe('Get all recently modified deals',function(){
		it('success',function(){
			return hubspot.deal.getRecentlyModified()
			.then(data => {
				console.log(data)
				assert(data != null)
			})
		})
	})

	describe('Get all recently created deals',function(){
		it('success',function(){
			return hubspot.deal.getRecentlyCreated()
			.then(data => {
				console.log(data)
				assert(data != null)
			})
		})
	})

	describe('Delete a Deal',function(){
		it('success', function(){
			return hubspot.deal.delete(deal2Delete,portalID)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.delete(deal2Delete,portalID)
			.catch(err => {
				assert(err.status == 404)
			})
		})
	})

	describe('Get a Deal by ID',function(){
		it('success', function(){
			return hubspot.deal.getByID(dealID)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.getByID(-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Associate an object to the deal",function(){
		it('success',function(){
			return hubspot.deal.associate(dealID,"CONTACT",[vid])
			.then(data => {
				assert(data.status == 204)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.associate(-99,"CONTACT",[vid])
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Remove Associate Object",function(){
		it('success',function(){
			return hubspot.deal.associate(dealID,"CONTACT",[vid])
			.then(data => {
				assert(data.status == 204)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.associate(-99,"CONTACT",[vid])
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe('Get Associated Deals',function(){
		it('success',function(){
			return hubspot.deal.getAssociatedDeals("CONTACT",vid)
			.then(data => {
				assert(data != null)
			})
		})
		it('FAIL',function(){
			return hubspot.deal.getAssociatedDeals("CONTACT",-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})
})