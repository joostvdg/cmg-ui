# Catan Map Generator UI

## Catan Map Generator

## Alternative UI

## References

* https://nextjs.org/learn/basics/getting-started
* http://www.boduch.ca/2019/04/refreshing-nextjs-page-data.html
* https://auth0.com/blog/next-js-practical-introduction-for-react-developers-part-2/

## Todo

* Harbors in Map
* seafarers UI
* other validations checks

## Parameters

* https://catan-map-generator.herokuapp.com/api/map?type=large&max=365&min=156&minr=65&maxr=140&max300=22&jsonp=true
* type: game type, large will generate a 6 player map, anything else a 4 player map
* max: maximum “points” per 3 tiles, range should be between 340 and 385
* min: minimum “points” per 3 tiles, range should be between 135 and 180
* minr: minimum average “points” per resource type -> count all points of a resource, lets say Ore, divide by resource tiles, has be at least X, range 25 to 40
* maxr: maximum average “points” per resource type, range should be between 120 and 150
* max300: maximum amount of sets of 3 tiles that breach 300 points, range should be 10-15 for normal and 18-25 for large

## Additional Checks

* not too many of the same resource within 3 tiles
* not too many of the same resource within one line
* not too many points within one line
* Line being --> while column (a1, b0, c1) or row (a0, a1, a2)

## Docker Build

Things to do:

* update dependencies
* use a `.dockerignore` file
    * see [this example](https://github.com/akiran/nextjs-demo/blob/master/.gitignore) as a decent reference
* create a multi-stage `Dockerfile` withs stages for:
    * dependencies
    * build
    * production runtime
    * copied from [NextJS's example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
* create a `next.config.js` file for some experimental configuration
    * also from [NextJS's example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
* run a docker build
* run a docker run

### Docker commands

#### Docker Build

```sh
 docker build -t cmg-ui:0.1.0-d .      
```

#### Docker Multi-arch Build

```sh
docker buildx build . --platform linux/arm64,linux/amd64 --tag caladreas/cmg-ui:1.1.2-a --push  
```

#### Docker Local Run

```sh
docker run -i --rm --name cmg-ui -p 3000:3000 cmg-ui:0.1.0-d
```

## Dynamic Environment Variables

Unfortunately, due to how the NextJS framework works, Environment Variables are "hardcoded" at build time. There should be some way to get [dynamic environment variables](https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/) into the client from the NodeJS environment. But I have not been able to do so.

So, one way is to set a placeholder at that is written into the optimized (by the next build) files, and then do a find & replace of this placeholder just before starting the application.

I found this solution in a blog post from [Renato Pozzi](https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl) on dev.to. 

The gist of the solution:

* use a `next.config.js` file with a `publicRuntimeConfig` and `env` section
* define a placeholder value in your `Dockerfile` and any `.env` files you use
* leverage the multi-stage docker build as outlined by [Vercel](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
* use an entrypoint script, in your Dockerfile, that does the find and replace and runs any command passed to it
  * the `run any command` is vital, as it means we can still start the application normally with a Docker `cmd` while ensuring the find & replace is executed prior to the application starting

### entrypoint.sh

We look for all files in the `/app.next` folder, where the files from the next build (in my case, `RUN yarn build`) are located. It is files in here that have "hardcoded" the environment variables at build time.

We then find & replace our placeholder value with the current live environment variable. We can pass this environment variable to the docker run command `docker run -env NEXT_PUBLIC_BACKEND_URL=my-url caladreas/cmg-ui:0.2.3` or as an enviromnent configuration in a Kubernetes manifest.


```shell
#!/bin/sh
## script is copied from Renato Pozzi: https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl 
echo "Check that we have NEXT_PUBLIC_BACKEND_URL vars"
test -n "$NEXT_PUBLIC_BACKEND_URL"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#NEXT_PUBLIC_BACKEND_URL_PLACEHOLDER#$NEXT_PUBLIC_BACKEND_URL#g"

echo "Starting Nextjs"
exec "$@"
```

### Dockerfile

Note, this is a truncated version of the file, limited to the lines that matter for the dynamic enviromnent variables to work. Look [Dockerfile](here) for the full file.

```dockerfile
FROM node:16-alpine AS runner
ENV NODE_ENV production
ENV NEXT_PUBLIC_BACKEND_URL NEXT_PUBLIC_BACKEND_URL_PLACEHOLDER
COPY --from=builder /app/next.config.js ./
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "server.js"]
```

The `ENTRYPOINT` will run our find & replace script, and then executes whatever is passed to via the `CMD [...]` instruction.

## Next.Config.js

```js
module.exports = {
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  }
}
```

### References

* https://github.com/vercel/next.js/tree/canary/examples/with-docker
* https://hub.docker.com/_/node/?tab=tags&page=1&name=12
* https://medium.com/bb-tutorials-and-thoughts/how-to-run-next-js-app-with-nodejs-api-on-minikube-66b22ae8e589
* https://nextjs.org/learn/basics/deploying-nextjs-app/finally
* https://dev.to/kumareth/next-js-docker-made-easy-2bok
* https://github.com/akiran/nextjs-demo/blob/master/.gitignore
* https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl
* https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/