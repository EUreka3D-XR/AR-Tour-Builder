#!/bin/sh
# if [ -z "$BACKEND_URL" ]; then
#   echo "ERROR: BACKEND_URL environment variable is not set" >&2
#   exit 1
# fi
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"
