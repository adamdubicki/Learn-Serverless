'use strict';
const { getPage, parsePage, saveRatingsToDB } = require('./utils');

module.exports.scrape = (event, context, callback) => {

  getPage(event)
    .then(page => parsePage(page))
    .then(yelpData => saveRatingsToDB(yelpData));

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};