const fs = require('fs');
const identifyTM3Zone = require('./lib/IdentifyTM3Zone');
const filePath = './data/TM-3_Zone-Geosensei.geojson';


fs.readFile(filePath, 'utf8', (err, data) => {
    const parsedData = JSON.parse(data);
    const input = { "type": "Feature", "properties": { "TM3_ZONA": "48-2", "EPSG_CODE": "23834", "Credit": "Geosensei" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 105.0, -7.79 ], [ 108.0, -7.79 ], [ 108.0, 4.11 ], [ 105.0, 4.11 ], [ 105.0, -7.79 ] ] ] } };
    
    const result = identifyTM3Zone(parsedData, input);

    console.log('result', result);
});