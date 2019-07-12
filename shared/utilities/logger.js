Type.registerNamespace('Frosting');
Frosting.Utilities = Frosting.Utilities || {};

Frosting.Utilities.logger = function(message) {
  if(window.console){
    console.log(message);
  }
  else {
    ULS.enable = true; //ensure ULS logging is enabled
    ULSOnError(message, location.href, 0);
  }
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('logger.js');
