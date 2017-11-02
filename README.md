# Elasticsearch Node.js demo

Implements a search form that queries an Elasticsearch index using Node.js. Read the companion article at https://www.lullabot.com/articles/a-nodejs-client-for-elasticsearch.

## Demo

### Staring the demo

This repository includes a Docker Compose file to reproduce the environment locally.

Execute the following commands to start and create the index with sample data:

```bash
docker-compose up
# Wait until the elasticsearch container says "started". Then open a new temrinal and import
# data into the index with the following command:
docker exec elasticsearchnodejs_web_1 /usr/src/app/elasticsearch-data/load-data.sh
```

Finally, open http://localhost:3000 in a browser to see the search page.

### Stopping the demo

Open the terminal where you executed `docker-compose up` and press Ctrl + c, which will
stop the containers. 

## Troubleshooting

If you see the following error in the output after executing `docker-compose up`:

```
elasticsearch_1  | [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

Elasticsearch explains how to fix this at https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html.
