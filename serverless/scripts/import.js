'use strict';
const {DynamoDB} = require('@aws-sdk/client-dynamodb-v2-node');

async function batchWriteQuotes(client, quotes) {
    if(quotes.length > 0) {
        var request_params = {
            RequestItems: {
                "Quote": quotes
            }
        }
        return await client.batchWriteItem(request_params)
    }
}

async function getQuoteCount() {
    const client = new DynamoDB({region: 'us-east-1'});
    var params = {
        TableName: "Quote"
       };
       var data = await client.describeTable(params)
       return data.Table.ItemCount
}

async function load() {
  const client = new DynamoDB({region: 'us-east-1'});



   var json = require('./quotes.json');
   var import_data = []
   for(var i = 0; i < json.data.length; i++) {
       var request_item = {
            PutRequest: {
                Item: {
                    "id": {
                        S: i.toString()
                    },
                    "quote": {
                        S: json.data[i].quote
                    },
                    "author": {
                        S: json.data[i].author
                    }
                }
            }
        }
        import_data.unshift(request_item)
        if(import_data.length > 20) {
            console.log(import_data[0].PutRequest.Item.id.S)
            await batchWriteQuotes(client, import_data)
            import_data = []
        }
   }
   await batchWriteQuotes(client, import_data)
}

async function getQuote(id) {
    const client = new DynamoDB({region: 'us-east-1'});
    
    var params = {
        Key: {
         "id": {
           S: id
          }
        }, 
        TableName: "Quote"
       };
       var data = await client.getItem(params)

       return {
         id: id,
         author: data.Item.author.S,
         quote: data.Item.quote.S
       }
}

async function test() {
    var count = await getQuoteCount()
    console.log(count)

    var r = Math.floor(Math.random() * Math.max(count, 2000))

    var d = await getQuote(r.toString())
    console.log(d)
}
test()