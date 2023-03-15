#!/bin/bash
echo 'ENTRYPOINT';

if ! [ -d node_modules ]; then # If the node_module is not in the project directory, check if it is in the "cache" directory.
    if [ -d ../node_modules ]; then # If it is in the "cache" directory, move it to the project directory
        mv ../node_modules ./
    else # If it is not in the "cache" directory, create a node_modules in the project directory, running npm install
        npm install
    fi
fi

npm run start:dev