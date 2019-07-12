Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {};
Frosting.Sods.Masterpage = Frosting.Sods.Masterpage || {};

Frosting.Sods.Masterpage.config = function() {
  var FrostingCustomFolderUrl = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/FrostingCustom/';
  var configObject;
  // Get IE or Edge browser version
  var version = detectIE();
  if (version === false) {
    configObject = {
      sods: [
        { name: 'sp.taxonomy.js', url: SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'), deps: ['sp.js'] },      
        { name: 'Rx.min.js', url: FrostingCustomFolderUrl + 'libs/Rx.min.js', deps: ['sp.js'] },
        { name: 'logger.js', url: FrostingCustomFolderUrl + 'shared/utilities/logger.js', deps: ['sp.js'] },
        { name: 'spRequest.js', url: FrostingCustomFolderUrl + 'shared/utilities/spRequest.js', deps: ['Rx.min.js'] },
        { name: 'FrostingGlobals.js', url: FrostingCustomFolderUrl + 'shared/modules/FrostingGlobals.js', deps: ['sp.taxonomy.js'] },
        { name: 'spTaxonomy.js', url: FrostingCustomFolderUrl + 'shared/utilities/spTaxonomy.js', deps: ['spRequest.js', 'FrostingGlobals.js'] },
        { name: 'getNav.js', url: FrostingCustomFolderUrl + 'shared/modules/getNav.js', deps: ['spTaxonomy.js'] }
      ]
    };
  } else {
    configObject = {
      sods: [
        { name: 'sp.taxonomy.js', url: SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'), deps: ['sp.js'] },      
        { name: 'es6-shim.min.js', url: FrostingCustomFolderUrl + 'libs/es6-shim.min.js', deps: ['sp.js'] },
        { name: 'Rx.min.js', url: FrostingCustomFolderUrl + 'libs/Rx.min.js', deps: ['es6-shim.js'] },
        { name: 'logger.js', url: FrostingCustomFolderUrl + 'shared/utilities/logger.js', deps: ['sp.js'] },
        { name: 'spRequest.js', url: FrostingCustomFolderUrl + 'shared/utilities/spRequest.js', deps: ['Rx.min.js'] },
        { name: 'FrostingGlobals.js', url: FrostingCustomFolderUrl + 'shared/modules/FrostingGlobals.js', deps: ['sp.taxonomy.js'] },
        { name: 'spTaxonomy.js', url: FrostingCustomFolderUrl + 'shared/utilities/spTaxonomy.js', deps: ['spRequest.js', 'FrostingGlobals.js'] },
        { name: 'getNav.js', url: FrostingCustomFolderUrl + 'shared/modules/getNav.js', deps: ['spTaxonomy.js'] }
      ]
    };

  }
  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
  
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  return configObject;
};

Frosting.Sods.Masterpage.init = function() {
  SP.SOD.executeFunc('sp.js', 'SP.Utilities.Utility.getLayoutsPageUrl', function() {
    'use strict'; 
    
    var sodsToLoad = Frosting.Sods.Masterpage.config().sods;
    
    sodsToLoad.forEach(function(sodObj){
      Frosting.Sods.register(sodObj);
    });
    
    Frosting.Sods.load(
      sodsToLoad.map(function(sod) {return sod.name;}),
      function(){
        sodsToLoad.map(function(sod) { SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs(sod.name); });
     });
  });
  SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('masterSods.js');
}

Frosting.Sods.Masterpage.mdsInit = function() {
  var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/shared/modules/masterSods.js';
  Frosting.Sods.Masterpage.init();
  RegisterModuleInit(thisUrl, Frosting.Sods.Masterpage.init);
}

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Sods.Masterpage.mdsInit();
} else {
  Frosting.Sods.Masterpage.init();
}
