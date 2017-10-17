# Elasticsearch Node.js demo

## Demo

This repository includes a Docker Compose file to reproduce the environment locally.

Run the following commands to start and create the index with sample data:

```bash
docker-compose up
# Wait until the elasticsearch container says "started". Then import data
# into the index with the following command:
docker exec elasticsearchnodejs_web_1 /usr/src/app/elasticsearch-data/load-data.sh
```

Then, open http://localhost:8080 in a browser to see the search page.

## Troubleshooting

Sometimes I have seen the following error when the Elasticsearch container
boots:

```
elasticsearch_1  | [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

Elasticsearch has a fix for this documented at https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html.
