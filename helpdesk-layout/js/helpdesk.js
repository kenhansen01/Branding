Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {};
Frosting.Helpdesk = Frosting.Helpdesk || {};
Frosting.Helpdesk.Sods = Frosting.Helpdesk.Sods || {};

Frosting.Helpdesk.Sods.config = function() {
  var FrostingCustomFolderUrl = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/FrostingCustom/';
  var configObject = {
    sods: [
      { name: 'charts/loader.js', url: 'http://gstatic.com/charts/loader.js', deps: ['getNav.js'] },
      { name: 'domTools.js', url: FrostingCustomFolderUrl + 'shared/utilities/domTools.js', deps: ['getNav.js'] },
      { name: 'helpdeskIssues.js', url: FrostingCustomFolderUrl + 'helpdesk-layout/js/helpdeskIssues.js', deps: ['domTools.js'] },
      { name: 'helpdeskApplications.js', url: FrostingCustomFolderUrl + 'helpdesk-layout/js/helpdeskApplications.js', deps: ['domTools.js'] },
      { name: 'requestForm.config.js', url: FrostingCustomFolderUrl + 'helpdesk-layout/js/requestForm.config.js', deps: ['helpdeskApplications.js'] },
      { name: 'requestForm.js', url: FrostingCustomFolderUrl + 'helpdesk-layout/js/requestForm.js', deps: ['requestForm.config.js'] },
      { name: 'commandBar.js', url: FrostingCustomFolderUrl + 'helpdesk-layout/js/commandBar.js', deps: ['requestForm.js'] },
      { name: 'helpdeskCharts.js', url: FrostingCustomFolderUrl + 'helpdesk-layout/js/helpdeskCharts.js', deps: ['charts/loader.js', 'helpdeskIssues.js'] }
    ]
  };
  return configObject;
};

Frosting.Helpdesk.Sods.init = function() {
  SP.SOD.executeFunc('sp.js', 'SP.Utilities.Utility.getLayoutsPageUrl', function() {
    'use strict'; 
    Element.prototype.setPointerCapture = Element.prototype.setPointerCapture || Element.prototype.msSetPointerCapture;
    Element.prototype.releasePointerCapture = Element.prototype.releasePointerCapture || Element.prototype.msReleasePointerCapture;
    
    var sodsToLoad = Frosting.Helpdesk.Sods.config().sods;
  
    sodsToLoad.forEach(function(sodObj){
      Frosting.Sods.register(sodObj);
    });
  
    Frosting.Sods.load(
      sodsToLoad.map(function(sod) {return sod.name;}),
      function(){
        sodsToLoad.map(function(sod) { 
          if(sod.name === 'charts/loader.js') {
            SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs(sod.name);
          }
        });
        SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('helpdesk.js');
      });    
  });  
}

Frosting.Helpdesk.Sods.mdsInit = function() {
  var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/helpdesk.js';
  Frosting.Helpdesk.Sods.init();
  RegisterModuleInit(thisUrl, Frosting.Helpdesk.Sods.init);
}

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.Sods.mdsInit();
} else {
  Frosting.Helpdesk.Sods.init();
}
