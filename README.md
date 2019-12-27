# Catan Map Generator UI

## Catan Map Generator

## Alternative UI

## References

* https://nextjs.org/learn/basics/getting-started
* http://www.boduch.ca/2019/04/refreshing-nextjs-page-data.html
* https://auth0.com/blog/next-js-practical-introduction-for-react-developers-part-2/

## Todo

* input params for UI
* resource spread validation check
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