Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {}

/**
 * Load array of SODs
 *
 * @callback sodCallback
 * @param {string[]} sodNames - Array of SOD names to load
 * @param {sodCallback} callback - Function to execute after SOD loaded
 */
Frosting.Sods.load = function(sodNames, callback) {
  SP.SOD.loadMultiple(sodNames, callback)
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('loadSods.js');
