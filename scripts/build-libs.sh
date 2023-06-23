#!/bin/sh
set -euf

# This script should be seldom used. Generated files are committed to the repo.

# Generate and copy serivces
for path in $(find gen/ -type d -name 'api-*'); do
	echo
	echo
	echo "> Building $path"
	(cd $path && yarn install && yarn run build)
done

# Install packages
echo
echo
echo "> Building Rivet"
rm -rf node_modules/
yarn install

