//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var portalID = 2323210

//var token = "CK23wZeCLBICXwEYiuaNASCWrMMBKKCjAjIZAFaAp3DDLHQbDe2zGn1rkWv5Tl7DNY0Mrg"
var options = {type:"hapikey",value:"b4426af6-a1ed-48f7-bbcc-1ac805066df2"}
//var options = {type:"oauth" , value:token}




var product2Create =  [
  {
    "name": "name",
    "value": "A new product"
  },
  {
    "name": "description",
    "value": "A description of this product."
  },
  {
    "name": "price",
    "value": "27.50"
  },
  {
    "name": "recurringbillingfrequency",
    "value": "quarterly"
  }
]



describe('Testing the Product Enpoints --> ',function(){
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

	describe('create a product',function(){
		it('success',function(){
			return hubspot.product.create(product2Create)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it('FAIL',function(){
			return hubspot.product.create("haha")
			.catch(err => {
				assert(data.response.status == 404)
			})			
		})
	})

	describe('Get all proudcts',function(){
		it('success',function(){
			return hubspot.product.getAll()
			.then(data => {
				console.log(data)
				assert(data[0] != null)
			})
		})
	})

	
})