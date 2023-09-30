const de9im = require('de9im');

function identifyTM3Zone(listGeojson, input) {
    const result = listGeojson.features.filter(item => de9im.within(input, item));

    return result;
}

module.exports = identifyTM3Zone;