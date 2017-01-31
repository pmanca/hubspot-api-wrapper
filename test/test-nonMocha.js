var hubspot = require('../index')

var vid = 301
var portalID = 2323210
var companyID = 256313506
var utk = "629f2542ccc40c0f413fc35f46c3e799"
var token = "COHk_PKaKxICXwEYiuaNASCRtLUBKLSqAjIZAEL7khPo3oAs-Xxzzkw22L2emTk4lD3RsA"


var options = {type:"hapikey",value:"e5ca5aac-d9e0-4d2c-aeed-93179d563c6c"}
//var options = {type:"oauth" , value:token}
var initResult = hubspot.init(options)
console.log(initResult)

/*var properties = {
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
*/

// hubspot.contact.getAll().then(result => {
//    console.log(result.length)
// }).catch(err => {
//    console.log(err)
// })

// hubspot.company.getAll().then(result => {
//     console.log(result.length)
// })


// hubspot.deal.getAll().then(result => {
//     console.log(result.length)
// })
hubspot.company.getRecentlyCreated()
            .then(data => {
                console.log(data)
            }).catch(err => {
                console.log(err)
            })

hubspot.company.getRecentlyModified()
            .then(data => {
                console.log(data)
            }).catch(err => {
                console.log(err)
            })

hubspot.company.getAll().then(result => {
    console.log(result)
})            
/*hubspot.company.update(companyID,properties).then(result => {
    console.log(result)
})*/

/*hubspot.company.create(properties).then(result => {
    console.log(result)
})*/


////////////////////////////////////////////////
//contacts
////////////////////////////////////////////////
/*hubspot.contact.getRecent().then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})*/

/*var body = [
        {
            "email": "testingapis@hubspot.com",
            "properties": [
                {
                    "property": "firstname",
                    "value": "Codey"
                },
                {
                    "property": "lastname",
                    "value": "Huang"
                },
                {
                    "property": "website",
                    "value": "http://hubspot.com"
                },
                {
                    "property": "company",
                    "value": "HubSpot"
                },
                {
                    "property": "phone",
                    "value": "555-122-2323"
                },
                {
                    "property": "address",
                    "value": "25 First Street"
                },
                {
                    "property": "city",
                    "value": "Cambridge"
                },
                {
                    "property": "state",
                    "value": "MA"
                },
                {
                    "property": "zip",
                    "value": "02139"
                }
            ]
        },
        {
        "vid": "259429",
        "properties": [
            {
                "property": "firstname",
                "value": "Harper"
            },
            {
                "property": "lastname",
                "value": "Wolfberg"
            },
            {
                "property": "website",
                "value": "http://hubspot.com"
            },
            {
                "property": "company",
                "value": "HubSpot"
            },
            {
                "property": "phone",
                "value": "555-122-2323"
            },
            {
                "property": "address",
                "value": "25 First Street"
            },
            {
                "property": "city",
                "value": "Cambridge"
            },
            {
                "property": "state",
                "value": "MA"
            },
            {
                "property": "zip",
                "value": "02139"
            }
        ]
    }
]*/

/*hubspot.contact.createOrUpdateByBatch(body).then(result => {
    console.log(result)
})*/

/*hubspot.contact.merge(301,301).then(result => {
    console.log(result.data)
})*/

/*hubspot.contact.getBatchByUTK([utk,utk],["firstname","phonenumber"]).then(result =>{
    console.log(result.data)
})*/

/*hubspot.contact.getByUTK(utk).then(result => {
    console.log(result.data)
})*/

/*hubspot.contact.getBatchByEmail(["petermanca3@gmail.com","pmanca@hubspot.com"],["firstname","phonenumber"],portalID).then(result => {
    console.log(result.data)
})*/

/*hubspot.contact.getBatchByID([301,1],["firstname","phonenumber"]).then(result =>{
    console.log(result.data)
})*/


/*hubspot.contact.search("Peter").then(result => {
    console.log(result.data)
})*/



/*var contact2Update = {
            "properties": [
                {
                    "property": "email",
                    "value": "Matt3@hubspot.com"
                },
                {
                    "property": "firstname",
                    "value": "matthew4"
                },
                {
                    "property": "lastname",
                    "value": "McAulliffe4"
                }
                ]
            }


hubspot.contact.delete(601).then(result => {
	console.log(result)
})*/
/*hubspot.contact.updateByEmail("Matt3@hubspot.com",contact2Update).then(result =>{
	console.log(result)
})*/
/*hubspot.contact.update(601,contact2Update).then(result =>{
	console.log(result)
}).catch(err =>{
	console.log(err)
})*/

/*hubspot.contact.createOrUpdate("Matt2@hubspot.com",contact2Update).then(result => {
	console.log(result)
})*/


/*var contact2Create = {
            "properties": [
                {
                    "property": "email",
                    "value": "Matt2@hubspot.com"
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
hubspot.contact.create(contact2Create).then(result =>{
	console.log(result)
})*/

/*hubspot.contact.getAll(["createdate"]).then(result =>{
	console.log(result)
}).catch(error => {
	//console.log("in the error" + error)
	console.log(Object.keys(error))
	console.log(error.advice)
	console.log(error.error.status)
})*/

/*hubspot.contact.getByEmail("pmanca@hubspot.com").then(result => {
	console.log(result.data)
})*/

/*hubspot.contact.getByID(vid).then(result =>{
	console.log(result.data)
})*/