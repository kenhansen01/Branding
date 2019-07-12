Type.registerNamespace('Frosting');
Frosting.Helpdesk = Frosting.Helpdesk || {};

Frosting.Helpdesk.Issues = (function() {
  
  var _issueListUrl = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getbytitle('Helpdesk%20Issues')";
  var _headers = {
    'Accept': "application/json;odata=verbose",
    'Content-Type': "application/json;odata=verbose"
  };
  var _myReqList = document.querySelector('.ms-List.Frosting-helpdesk-requests--list');
  var _myTodoList = document.querySelector('.ms-List.Frosting-helpdesk-todo--list');
  var _issues = [];
  
  /**
   * Gets Issues from issues list
   * @function _getIssues
   * @memeberof Frosting.Helpdesk.Issues
   * @param {string} [filterString] - optional filter string
   * 
   * @return {Rx.Observable} - Returns observable with response from query
   */
  function _getIssues(filterString) {
    
    var rqUrl = _issueListUrl + '/items';
    
    if(filterString){
      rqUrl = rqUrl + '?$filter=' + filterString;
    }
    
    return Frosting.Utilities.Request.Get(rqUrl, _headers)
      .map(function(issuesResponse) {
        _issues = issuesResponse.results;
        Frosting.Helpdesk.Issues.issues = _issues;
        return _issues;
      })
      
  }
  
  function _issueListElements(issues, list) {
    //var elements = [];
    var listItemEl = null;
    list.innerHTML = '';
    issues.forEach(function(issue){
      if(issue.Helpdesk_x0020_Status == '80 - Complete' || issue.Helpdesk_x0020_Status == '90 - Cancelled') { return; }
      var elementObj = {
        tag: 'li',
        classes: issue.AssignedToId == _spPageContextInfo.userId ? ['ms-ListItem', 'ms-bgColor-themeLighter--hover', 'is-unread'] : ['ms-ListItem', 'ms-bgColor-neutralLight--hover'],
        content: [
          {
            tag: 'span',
            classes: ['ms-ListItem-primaryText'],
            text: issue.Title
          },
          {
            tag: 'span',
            classes: ['ms-ListItem-secondaryText'],
            text: issue.Helpdesk_x0020_Status.slice(5)
          },
          {
            tag: 'span',
            classes: ['ms-ListItem-tertiaryText'],
            text: issue.Comment
          },
          {
            tag: 'span',
            classes: ['ms-ListItem-metaText'],
            text: (new Date (issue.Modified)).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
          },
          {
            tag: 'div',
            classes: ['ms-ListItem-selectionTarget']
          },
        ]
      };
      listItemEl = Frosting.Utilities.Dom.makeElements(elementObj);
      new fabric['ListItem'](listItemEl);
      listItemEl.addEventListener('click', function(evt) {
        evt.preventDefault();
        
        SP.UI.ModalDialog.showModalDialog({
          url: _spPageContextInfo.webServerRelativeUrl + '/Lists/Helpdesk%20Issues/DispForm.aspx?ID='+issue.ID,
          title: issue.Title
        });
          
      });
      list.appendChild(listItemEl);
    });
  }
  
      
  /**
   * Init function
   */
  function _init() { 
    var myRequestFilterString = 'Requestor eq ' + _spPageContextInfo.userId;
    var myTodoFilterString = 'AssignedTo eq ' + _spPageContextInfo.userId ;
    _getIssues(myRequestFilterString)
      .subscribe(function(issues){
        _issueListElements(issues, _myReqList);
      });
    _getIssues(myTodoFilterString)
      .subscribe(function(issues){
        _issueListElements(issues, _myTodoList);
      });  
  }
  /**
   * MDS Init function
   */
  function _mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/helpdeskIssues.js';
    _init();
    RegisterModuleInit(thisUrl, _init);
  }
  
  return {
    init: _init,
    mdsInit: _mdsInit,
    getIssues: _getIssues,
    allIssues: _getIssues()
  }

})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.Issues.mdsInit();
} else {
  Frosting.Helpdesk.Issues.init();
}
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('helpdeskIssues.js');
