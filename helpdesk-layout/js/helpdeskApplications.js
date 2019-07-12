Type.registerNamespace('Frosting');
Frosting.Helpdesk = Frosting.Helpdesk || {};

Frosting.Helpdesk.Applications = (function() {
  
  var _applicationsListUrl = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getbytitle('Application%20Inventory')";
  var _headers = {
    'Accept': "application/json;odata=verbose",
    'Content-Type': "application/json;odata=verbose"
  };
  var _applications = [];
  
  /**
   * Gets Issues from issues list
   * @function _getIssues
   * @memeberof Frosting.Helpdesk.Issues
   * @param {string} [filterString] - optional filter string
   * 
   * @return {Rx.Observable} - Returns observable with response from query
   */
  function _getApplications(filterString) {
    
    var rqUrl = _applicationsListUrl + '/items';
    
    if(filterString){
      rqUrl = rqUrl + '?$filter=' + filterString;
    }
    
    return Frosting.Utilities.Request.Get(rqUrl, _headers)
      .map(function(appsResponse) {
        _applications = appsResponse.results;
        return _applications;
      })
      
  }
  
      
  /**
   * Init function
   */
  function _init() { 
    _getApplications()
      .subscribe(function(apps){
        Frosting.Helpdesk.Applications.apps = apps;
      });
    //var myRequestFilterString = 'Requestor eq ' + _spPageContextInfo.userId;
    //var myTodoFilterString = 'AssignedTo eq ' + _spPageContextInfo.userId ;
    //_getIssues(myRequestFilterString)
    //  .subscribe(function(issues){
    //    _issueListElements(issues, _myReqList);
    //  });
    //_getIssues(myTodoFilterString)
    //  .subscribe(function(issues){
    //    _issueListElements(issues, _myTodoList);
    //  });
      //.subscribe(function(issuesResponse){
        //Frosting.Helpdesk.Issues.issues = issuesResponse;
        
      //});    
  }
  /**
   * MDS Init function
   */
  function _mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/helpdeskApplications.js';
    _init();
    RegisterModuleInit(thisUrl, _init);
  }
  
  return {
    init: _init,
    mdsInit: _mdsInit,
    getApplications: _getApplications,
    allApplications: _getApplications()
  }

})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.Issues.mdsInit();
} else {
  Frosting.Helpdesk.Issues.init();
}
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('helpdeskApplications.js');
