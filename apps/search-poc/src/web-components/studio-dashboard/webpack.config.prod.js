
const configTools = require('../build-config/tools');


module.exports = configTools.getWebpackConfig(configTools.buildMode.PROD, 'studioDashboard');
