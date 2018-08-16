'use strict';
const { getPage, parsePage, saveRatingsToDB, deployScrapers } = require('./utils');

module.exports.scrape = (event, context, callback) => {

  getPage(event)
    .then(page => parsePage(page))
    .then(yelpData => saveRatingsToDB(yelpData, event))
    .then(() => callback(null, {
      statusCode: 200,
        body: JSON.stringify({
          message: `Scraped ${event}`,
        })
    }))
    .catch(error => callback(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`)));
};

module.exports.launch_scrapers = (event, context, callback) => {
  const fakeDatabaseResults = [
    "urban-light-at-lacma-los-angeles",
    "the-museum-of-contemporary-art-los-angeles",
    "the-last-bookstore-los-angeles"
  ];

  fakeDatabaseResults.forEach(businessName => {
    deployScrapers(businessName)
  })
}