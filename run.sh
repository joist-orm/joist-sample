#!/bin/bash

export $(grep -v '^#' env/local.env | sed 's/\"/\\\"/g' | xargs)

node --loader tsx "$@"
