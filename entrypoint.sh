#!/bin/sh
## script is copied from Renato Pozzi: https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl 
echo "Check that we have NEXT_PUBLIC_CLASSIC_API_URL var"
test -n "$NEXT_PUBLIC_CLASSIC_API_URL"
echo "NEXT_PUBLIC_CLASSIC_API_URL=${NEXT_PUBLIC_CLASSIC_API_URL}"

echo "Check that we have NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL var"
test -n "$NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL"
echo "NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL=${NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL}"


echo "Check that we have NEXT_PUBLIC_SEAFARERS_API_URL var"
test -n "$NEXT_PUBLIC_SEAFARERS_API_URL"
echo "NEXT_PUBLIC_SEAFARERS_API_URL=${NEXT_PUBLIC_SEAFARERS_API_URL}"

env

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#NEXT_PUBLIC_CLASSIC_API_URL_PLACEHOLDER#$NEXT_PUBLIC_CLASSIC_API_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL_PLACEHOLDER#$NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#NEXT_PUBLIC_SEAFARERS_API_URL_PLACEHOLDER#$NEXT_PUBLIC_SEAFARERS_API_URL#g"

echo "Starting Nextjs"
exec "$@"