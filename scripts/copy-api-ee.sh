#!/bin/sh
set -euf

cp  "$RIVET_EE_PATH/sdks/typescript/archive.tgz" vendor/rivet-gg-api-ee.tgz
yarn install

