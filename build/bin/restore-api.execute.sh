#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Restoring API App}"
dotnet restore
