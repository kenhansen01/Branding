Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {}

/**
 * Register SODs and dependencies
 *
 * @param {Object} sodObj - Object containing SOD name and dependency name
 * @param {string} sodObj.name - name of script
 * @param {string} sodObj.url - server relative location of script
 * @param {string[]} sodObj.deps - names of dependencies for script
 */
Frosting.Sods.register = function(sodObj) {
  SP.SOD.registerSod(sodObj.name, sodObj.url);
  if(sodObj.deps) {
    var name = sodObj.name;
    sodObj.deps.forEach(function(dep){
      SP.SOD.registerSodDep(name, dep);
    });
  }
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('registerSods.js');
