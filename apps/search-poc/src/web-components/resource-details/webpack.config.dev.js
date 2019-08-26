
const configTools = require('../build/config-tools');


module.exports = configTools.getWebpackConfig(configTools.buildMode.DEV, 'resourceDetails');
