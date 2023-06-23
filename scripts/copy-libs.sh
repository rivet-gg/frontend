#!/bin/sh
set -euf

mkdir -p gen

# Generate and copy serivces
for api in auth chat cloud group identity kv party portal; do
	path="gen/api-$api"

	rm -rf $path

	echo
	echo "> Copying $path"
	(cp -r ../backend-ee/gen/svc/api-$api/smithy/typescript/ $path || cp -r ../backend-ee/gen/svc/api-$api/openapi/typescript/ $path)
done

./scripts/build-libs.sh

