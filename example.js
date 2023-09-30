const identifyTM3Zone = require('./lib/IdentifyTM3Zone');
const transformationToWGS84 = require('./lib/TransformationToWGS84')

const polygon = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [-6.928407029521641, 107.66021067263188],
                        [-8.928407029521641, 105.66021067263188],
                        [-9.928407029521641, 102.66021067263188],
                        [-6.928407029521641, 107.66021067263188],
                    ]
                ]
            }
        }
    ]
}

const point = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-6.928407029521641, 107.66021067263188]
            }
        }
    ]
}


const resultTransformPolygon = {
    ...polygon,
    features: polygon.features.map(feature => {
        return {
            ...feature,
            geometry: {
                ...feature.geometry,
                coordinates: feature.geometry.coordinates.map(coordinate => {
                    return coordinate.map(([lon, lat]) => {
                        return transformationToWGS84({ x: lon, y: lat }, '23830')
                    })
                })
            }
        }
    })
}

const resultTransformPoint = {
  ...point,
  features: point.features.map(feature => {
    return {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: transformationToWGS84({x : feature.geometry.coordinates[0], y : feature.geometry.coordinates[1]})
      }
    }
    
  })
}

identifyTM3Zone(resultTransformPolygon.features[0], "within", res => {
    console.log(res);
})


identifyTM3Zone(resultTransformPoint.features[0], "within", res => {
    console.log(res);
})


