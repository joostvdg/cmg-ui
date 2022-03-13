#!/bin/sh

echo "Check that we have NEXT_PUBLIC_BACKEND_URL vars"
test -n "$NEXT_PUBLIC_BACKEND_URL"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#NEXT_PUBLIC_BACKEND_URL_PLACEHOLDER#$NEXT_PUBLIC_BACKEND_URL#g"

echo "Starting Nextjs"
exec "$@"
