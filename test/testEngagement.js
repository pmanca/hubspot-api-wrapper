//default timeout in mocha is 2000 ms
//Peter Manca
//Test script for HubSpot API Wrapper
var hubspot = require('../index')
var assert = require('assert')
var ownerID = 15149075

var token = "CLeeqdmhKxICXwEYiuaNASCRtLUBKKCjAjIZAEL7khOzw7aSN5HQ8jBr7LSU3QvjN7DMEA"
var options = {type:"hapikey",value:"xxxxx"}
//var options = {type:"oauth" , value:token}

var callEngagement = {
	"engagement": {
        "active": true,
        "ownerId": ownerID,
        "type": "CALL",
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
	"metadata" : {
    "toNumber" : "5618769964",
    "fromNumber" : "(857) 829-5489",
    "status" : "COMPLETED",
    "externalId" : "CAc052aca6842211ab1c548dcfed5c9",
    "durationMilliseconds" : 38000,
    "externalAccountId" : "AC890b8e6fbebd59158e26046a8dde",
    "recordingUrl" : "https://api.twilio.com/2010-04-01/Accounts/AC890b8e6fbe0d989bb9158e26046a8dde/Recordings/RE3079ac919116b2d22",
    "body" : ""
}

}

var meetingEngagement = {
	"engagement": {
        "active": true,
        "ownerId": ownerID,
        "type": "MEETING",
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
    "body": "This is the description.",
    "startTime": 1456858800000,
    "endTime": 1456862400000,
    "title": "Event title"
  }
}

var taskEngagement = {
	"engagement": {
        "active": true,
        "ownerId": ownerID,
        "type": "TASK",
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
    "body": "This is the body of the task.",
    "status": "NOT_STARTED",
    "forObjectType": "CONTACT"
  }
}
var emailEngagement = {
	"engagement": {
        "active": true,
        "ownerId": ownerID,
        "type": "EMAIL",
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
    "from": {
      "email": "email@domain.com",
      "firstName": "First",
      "lastName": "Last"
    },
    "to": [
      {
        "email": "contact name <test@test.com>"
      }
    ],
    "cc": [],
    "bcc": [],
    "subject": "This is the subject of the email",
    "html": "<div>This is the body of the email</div><div><br></div><div>-Me</div>",
    "text": "This is the body of the email\n\n-Me"
}
}
var noteEngagement = {
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

var engagement2Update = {
    "engagement": {
        "ownerId": 1,
        "timestamp": 1409172644778
    },
    "metadata": {
        "body": "a new note body"
    }
}


describe('Testing The Engagement Endpoints -->',function(){
	this.timeout(2500)
	beforeEach(function(done){
		setTimeout(function(){
			done()
		},500)
	})

	var id2Delete = 0

	describe('set up the auth',function(){
		it("success",function(){
			var result = hubspot.init(options)
			assert(result == true)
		})
	})

	describe('Get all of the Engagements',function(){
		it("success",function(){
			hubspot.engagement.getAll()
			.then(data => {
				assert(data != null)
			})
		})
	})

	describe("Get Associated Engagements",function(){
		it("success",function(){
			hubspot.engagement.getAssociatedEngagements("contact",301)
			.then(data => {
				assert(data != null)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.getAssociatedEngagements("contact",-99)
			.catch(err => {
				assert(err.error.status == 404)
			})
		})
	})

	describe("Create an Engagement: Note",function(){
		it("success -- NOTE",function(){
			hubspot.engagement.create(noteEngagement)
			.then(data => {
				vid2Delete = data.data.engagement.id
				assert(data.status == 204)
			})
		})
		it("success -- EMAIL",function(){
			hubspot.engagement.create(emailEngagement)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it("success -- TASK",function(){
			hubspot.engagement.create(taskEngagement)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it("success -- MEETING",function(){
			hubspot.engagement.create(meetingEngagement)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it("success -- CALL",function(){
			hubspot.engagement.create(callEngagement)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.create(-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Update an engagement",function() {
		it("success",function(){
			hubspot.engagement.update(241057483,engagement2Update)
			.then(data => {
				assert(data.status == 204)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.update(-99,engagement2Update)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Get an engagement BY ID",function(){
		it("success",function(){
			hubspot.engagement.getByID(241057483)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.getByID(-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

	describe("Associate an engagement",function(){
		it("success",function(){
			hubspot.engagement.associate(vid2Delete,"contact",301)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.associate(-99,"contact",301)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})	
	})

	describe("delete an engagement",function(){
		it("success",function(){
			hubspot.engagement.delete(vid2Delete)
			.then(data => {
				assert(data.status == 200)
			})
		})
		it("FAIL",function(){
			hubspot.engagement.delete(-99)
			.catch(err => {
				assert(err.response.status == 404)
			})
		})
	})

})