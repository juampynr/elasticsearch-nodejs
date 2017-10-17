const elasticsearch = require('elasticsearch');
const express = require('express');

const router = express.Router();

/**
 * Performs a query against Elasticsearch and renders
 * the response.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
const doSearch = (req, res) => {
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

  if (!req.query.search || !req.query.type) {
    const query = {
      bool: {},
    };

    if (!req.query.search) {
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

    if (!req.query.type) {
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
    index: 'elasticsearch_index_draco_elastic',
    body,
  })
    .then((resp) => {
      const { hits } = resp.hits;
      const { total } = resp.hits;
      // Render results in a template.
      res.render('index', {
        title: 'Node.js Elasticsearch demo',
        hits,
        total,
        aggregations: resp.aggregations.type.buckets,
        search_string: searchString,
        search_type: searchType,
      });
    }, (err) => {
      console.trace(err.message); // eslint-disable-line no-console
    });
};

router.get('/', (req, res) => {
  doSearch(req, res);
});

router.post('/', (req, res) => {
  doSearch(req, res);
});

module.exports = router;
