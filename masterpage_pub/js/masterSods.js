Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {};
Frosting.Masterpage = Frosting.Masterpage || {};

Frosting.Masterpage.Sods = (function() {
  'use strict';
  var _FrostingCustomFolderUrl, _version, _configObject = {};
  
  _FrostingCustomFolderUrl = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/FrostingCustom/';
  // Get IE or Edge browser version
  _version = _detectIE();
  
  SP.SOD.executeFunc('sp.js', 'SP.Utilities.Utility.getLayoutsPageUrl', function() {
    'use strict';
    _version ? 
      _configObject.sods = [
        { name: 'sp.taxonomy.js', url: SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'), deps: ['sp.js'] },      
        { name: 'es6-shim.min.js', url: _FrostingCustomFolderUrl + 'libs/es6-shim.min.js', deps: ['sp.js'] },
        { name: 'Rx.min.js', url: _FrostingCustomFolderUrl + 'libs/Rx.min.js', deps: ['es6-shim.js'] },
        { name: 'logger.js', url: _FrostingCustomFolderUrl + 'shared/utilities/logger.js', deps: ['sp.js'] },
        { name: 'spRequest.js', url: _FrostingCustomFolderUrl + 'shared/utilities/spRequest.js', deps: ['Rx.min.js'] },
        { name: 'FrostingGlobals.js', url: _FrostingCustomFolderUrl + 'shared/modules/FrostingGlobals.js', deps: ['sp.taxonomy.js'] },
        { name: 'spTaxonomy.js', url: _FrostingCustomFolderUrl + 'shared/utilities/spTaxonomy.js', deps: ['spRequest.js', 'FrostingGlobals.js'] },
        { name: 'getNav.js', url: _FrostingCustomFolderUrl + 'masterpage_pub/js/getNav.js', deps: ['spTaxonomy.js'] }
      ] : 
      _configObject.sods = [
        { name: 'sp.taxonomy.js', url: SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'), deps: ['sp.js'] },      
        { name: 'Rx.min.js', url: _FrostingCustomFolderUrl + 'libs/Rx.min.js', deps: ['sp.js'] },
        { name: 'logger.js', url: _FrostingCustomFolderUrl + 'shared/utilities/logger.js', deps: ['sp.js'] },
        { name: 'spRequest.js', url: _FrostingCustomFolderUrl + 'shared/utilities/spRequest.js', deps: ['Rx.min.js'] },
        { name: 'FrostingGlobals.js', url: _FrostingCustomFolderUrl + 'shared/modules/FrostingGlobals.js', deps: ['sp.taxonomy.js'] },
        { name: 'spTaxonomy.js', url: _FrostingCustomFolderUrl + 'shared/utilities/spTaxonomy.js', deps: ['spRequest.js', 'FrostingGlobals.js'] },
        { name: 'getNav.js', url: _FrostingCustomFolderUrl + 'masterpage_pub/js/getNav.js', deps: ['spTaxonomy.js'] }
      ];    
  });

  function _detectIE() {
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
  
  function init() {
    SP.SOD.executeFunc('sp.js', 'SP.Utilities.Utility.getLayoutsPageUrl', function() {
      'use strict';
      
      _configObject.sods.forEach(function(sodObj){
        Frosting.Sods.register(sodObj);
      });
      
      Frosting.Sods.load(
        _configObject.sods.map(function(sod) {return sod.name;}),
        function(){
          _configObject.sods.map(function(sod) { SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs(sod.name); });
       });
      SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('masterSods.js');
    });
  }
  
  function mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/masterpage_pub/js/masterSods.js';
    Frosting.Masterpage.Sods.init();
    RegisterModuleInit(thisUrl, Frosting.Masterpage.Sods.init);
  }
  
  return {
    init: init,
    mdsInit: mdsInit
  }

})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Masterpage.Sods.mdsInit();
} else {
  Frosting.Masterpage.Sods.init();
}
