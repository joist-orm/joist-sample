#!/bin/bash

export $(grep -v '^#' env/local.env | sed 's/\"/\\\"/g' | xargs)

./node_modules/.bin/ts-node "$@"
