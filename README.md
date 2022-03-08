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

### Next.Config.js

```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  experimental: {
    outputStandalone: true,
  },
}
```

### References

* https://github.com/vercel/next.js/tree/canary/examples/with-docker
* https://hub.docker.com/_/node/?tab=tags&page=1&name=12
* https://medium.com/bb-tutorials-and-thoughts/how-to-run-next-js-app-with-nodejs-api-on-minikube-66b22ae8e589
* https://nextjs.org/learn/basics/deploying-nextjs-app/finally
* https://dev.to/kumareth/next-js-docker-made-easy-2bok
* https://github.com/akiran/nextjs-demo/blob/master/.gitignore