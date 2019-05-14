'use strict';
const {DynamoDB} = require('@aws-sdk/client-dynamodb-v2-node');

async function getQuoteCount() {
  const client = new DynamoDB({region: 'us-east-1'});
  var params = {
      TableName: "Quote"
     };
     var data = await client.describeTable(params)
     return data.Table.ItemCount
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

module.exports.getQuote = async (event, context, callback) => {
  var count = await getQuoteCount();
  var r = Math.floor(Math.random() * Math.max(count, 2000));
  var item = await getQuote(r.toString());

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(item),
  };

  callback(null, response);
};
