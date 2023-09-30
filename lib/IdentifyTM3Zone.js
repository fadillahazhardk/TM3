const de9im = require('de9im');
const fs = require('fs');
const filePath = 'data/TM-3_Zone-Geosensei.geojson';

/**
 * Identify TM3 Zone.
 *
 * @param {Object} input - The input GeoJSON
 * @param {'within' | 'contains'} method - The method for comparison ('within' or 'contains').
 * @param {function} callback - The callback function to handle the result or error.
 * @returns {void}
 */

function IdentifyTM3Zone(input, method = 'within' | 'contains', callback) {
    if (method !== 'within' && method !== 'contains') {
        callback("error, method must be within or contains");
    }
    if (input.type !== 'Feature') {
        callback("error, input must be a Feature");
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            if (Array.isArray(parsedData?.features)) {
                const result = parsedData.features.find(item => de9im[method](input, item));

                if (result) {
                    callback(result);
                } else {
                    callback("coordinates is not in TM3 zone")
                }
            } else {
                callback("error, parsedData.features must be an array");
            }
        }
    });
}

module.exports = IdentifyTM3Zone;