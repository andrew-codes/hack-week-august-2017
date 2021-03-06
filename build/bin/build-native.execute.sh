#!/bin/bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Bundling via Haul}"
haul bundle --platform $1
