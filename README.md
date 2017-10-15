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
