Type.registerNamespace('Frosting');
Frosting.Globals = Frosting.Globals || {}

Frosting.Globals.setGlobals = function() {
  Frosting.Globals.context = SP.ClientContext.get_current();
  Frosting.Globals.taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(Frosting.Globals.context);
  Frosting.Globals.defaultTermStore = Frosting.Globals.taxonomySession.getDefaultSiteCollectionTermStore();
  SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('FrostingGlobals.js');
}

Frosting.Globals.mdsSetGlobals = function () {
  var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/shared/modules/FrostingGlobals.js';
  Frosting.Globals.setGlobals();
  RegisterModuleInit(thisUrl, Frosting.Globals.setGlobals)
}

if (typeof _spPageContextInfo != "undefined" && _spPageContextInfo != null) {
    Frosting.Globals.mdsSetGlobals();
} else {
    Frosting.Globals.setGlobals();
}
