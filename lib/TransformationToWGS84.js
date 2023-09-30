const transformation = require('transform-coordinates')

function TransformationToWGS84(longlat, formTransform) {

  const transform = transformation(`EPSG:${formTransform}`, '4326')
  const result = transform.forward(longlat)

  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [result.x, result.y]
    },
  }
}
  
console.log(TransformationToWGS84({x: 13.4105, y: 52.5034}, '3395' ))

module.exports = TransformationToWGS84