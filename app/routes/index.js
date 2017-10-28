const express = require('express');
const elasticsearch = require('elasticsearch');

const router = express.Router();

/**
 * Helper to check if an object's property does not exist or is empty.
 *
 * @see https://stackoverflow.com/a/28552610/1120652
 *
 * @param {Object} object
 *   The object whose property will be checked.
 * @param {string} property
 *   The property within the object to check.
 * @returns {boolean}
 *   TRUE if the property does not exist or is empty.
 */
const isEmpty = function isEmpty(object, property) {
  return ((object[property] === undefined) ||
    (object[property].length === 0) ||
    (object[property] === 'undefined'));
};

/**
 * Performs a query against Elasticsearch and renders
 * the response.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
const doSearch = function doSearch(req, res) {
  // Initialize the Elasticsearch client.
  const client = new elasticsearch.Client({
    host: 'http://elastic:changeme@elasticsearch:9200',
    log: 'trace',
  });
  let searchString = '';
  let searchType = '';

  // Prepare the request body.
  const body = {
    size: 100,
  };
  if (!isEmpty(req.query, 'search') || !isEmpty(req.query, 'type')) {
    const query = {
      bool: {},
    };

    if (!isEmpty(req.query, 'search')) {
      query.bool.must = {
        multi_match: {
          fields: [
            'title^2',
            'summary',
          ],
          query: req.query.search,
          fuzziness: 'auto',
        },
      };
      searchString = req.query.search;
    }

    if (!isEmpty(req.query, 'type')) {
      query.bool.filter = [
        {
          term: {
            type: req.query.type,
          },
        },
      ];
      searchType = req.query.type;
    }

    body.query = query;
  }

  // Add a type facet.
  body.aggs = {
    type: {
      terms: {
        field: 'type',
      },
    },
  };

  // Perform the search request.
  client.search({
    index: 'elasticsearch_index_demo_elastic',
    body,
  }).then((resp) => {
    // Render results in a template.
    res.render('index', {
      hits: resp.hits.hits,
      total: resp.hits.total,
      aggregations: resp.aggregations.type.buckets,
      searchString,
      searchType,
    });
  }, (err) => {
    console.trace(err.message);
  });
};

/**
 * The initial request that loads the form and all the documents in
 * Elasticsearch.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
router.get('/', (req, res) => {
  doSearch(req, res);
});

/**
 * Processes form submissions by modifying the query for Elasticsearch.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
router.post('/', (req, res) => {
  doSearch(req, res);
});

module.exports = router;
