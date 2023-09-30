const transformation = require('transform-coordinates')

function TransformationToWGS84(longlat, formTransform = '') {
  let result;
  
  if (formTransform?.length !== 0) {
    const transform = transformation(`EPSG:${formTransform}`, '4326')
    result = transform.forward(longlat)
  }

  // let objectGeoJson = {
  //   type: 'Feature',
  //    geometry: {
  //     type: "Point",
  //     coordinates: result !== undefined ? [result.x, result.y] : [longlat.x, longlat.y]
  //   },
  // }

  return result !== undefined ? [result.x, result.y] : [longlat.x, longlat.y]
}

module.exports = TransformationToWGS84