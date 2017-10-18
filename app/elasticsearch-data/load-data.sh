#!/usr/bin/env bash

set -x

node_modules/elasticdump/bin/elasticdump \
  --input=elasticsearch-data/index_mapping.json \
  --output=http://elastic:changeme@elasticsearch:9200/elasticsearch_index_demo_elastic \
  --type=mapping

node_modules/.bin/elasticdump \
  --input=elasticsearch-data/index.json \
  --output=http://elastic:changeme@elasticsearch:9200/elasticsearch_index_demo_elastic \
  --type=data
