Type.registerNamespace('Frosting');
Frosting.Helpdesk = Frosting.Helpdesk || {};
Frosting.Helpdesk.RequestForm = Frosting.Helpdesk.RequestForm || {};

Frosting.Helpdesk.RequestForm.Form = (function() {

  var _helpdeskListUrl = _spPageContextInfo.siteServerRelativeUrl + "/_api/web/lists/getbytitle('Helpdesk%20Issues')";
  var _issueCountUrl = _spPageContextInfo.siteServerRelativeUrl + "/_api/web/lists/getbytitle('Application%20Inventory')";
  
  var _headers = {
    'Accept': "application/json;odata=verbose",
    'Content-Type': "application/json;odata=verbose"
  };
  
  var _formResponses = {
    type: null,
    system: {},
    location: null,
    request: null
  };
  
  var _issueCount = {
    
    issueObjects: {},
    
    get: function(){
      var self = this;
      var rqCountUrl = _issueCountUrl + "/items"; //?$filter=Title eq '" + systemName + "'
      
      return Frosting.Utilities.Request.Get(rqCountUrl, _headers)
      .concatMap(function(rqCountResults) {
        return Rx.Observable.from(rqCountResults.results);
      })
      .map(function(countResult){
        self.issueObjects[countResult.Title] = countResult; //.NumberOfRequests;
        return countResult;
      })
      .toArray();;
    },
    
    set: function(listItem) {
      var self = this;
      var rqBody = {
        __metadata: { type: listItem.__metadata.type },
        NumberOfRequests: (listItem.NumberOfRequests + 1),
      };
      self.issueObjects[listItem.Title] = listItem.NumberOfRequests + 1;
      return Frosting.Utilities.Request.Merge(listItem.__metadata.uri, _headers, rqBody, listItem.__metadata.etag);
    }
    
  };
  
  var _supportDialogElements = {
    componentEl: document.querySelector('.ms-Dialog.Frosting-newRequest-lgHeader'),
    dialogContent: document.querySelector('.ms-Dialog.Frosting-newRequest-lgHeader .ms-Dialog-content')
  };
  
  var _dialogComponent = null;

  function _fabricMaker(elements, fabricType, evtFn) {
    var components = []
    for (var i = 0; i < elements.length; i++) {
      components.push( new fabric[fabricType](elements[i], evtFn) );
    }
    return components;
  }
  
  function _createForm(){
    Frosting.Helpdesk.RequestForm.Config.FormObject.forEach(function(page) {
      var pageEl = Frosting.Utilities.Dom.makeElements(page);
      _supportDialogElements.dialogContent.appendChild(pageEl);
    });
    _supportDialogElements.pageElements = _supportDialogElements.dialogContent.querySelectorAll('.support-ticket-page');
    _supportDialogElements.actionButtons = _supportDialogElements.dialogContent.querySelectorAll('.support-ticket-page .ms-Button');
    _supportDialogElements.dropdownElements = _supportDialogElements.dialogContent.querySelectorAll('.ms-Dropdown');
    _supportDialogElements.systemSelect = _supportDialogElements.dialogContent.querySelector('.rqSystem');
    _supportDialogElements.location = _supportDialogElements.dialogContent.querySelector('.rqLocation');
    _supportDialogElements.request =_supportDialogElements.dialogContent.querySelector('.rqRequest');
    _supportDialogElements.summary = _supportDialogElements.dialogContent.querySelector('.rqSummary');
    _supportDialogElements.textFields = _supportDialogElements.dialogContent.querySelectorAll('.ms-TextField');
    
    _dialogComponent = _fabricMaker([_supportDialogElements.componentEl], 'Dialog')[0];
    
    _fabricMaker(_supportDialogElements.dropdownElements, 'Dropdown');
    _fabricMaker(_supportDialogElements.textFields, 'TextField');
    _fabricMaker(_supportDialogElements.actionButtons, 'Button', _formButtonEvents);
  }
  
  function _formButtonEvents(evt) {
    evt.preventDefault();
    
    if(this.classList.contains('rqType')) {
      _formResponses.type = this.value;
    }
    _formResponses.system.text = _supportDialogElements.systemSelect.options[_supportDialogElements.systemSelect.selectedIndex].text;
    _formResponses.system.value = _supportDialogElements.systemSelect.options[_supportDialogElements.systemSelect.selectedIndex].value;
    _formResponses.system.name = _formResponses.system.text; //_formResponses.system.value + ' - ' +
    _formResponses.location = _supportDialogElements.location.value;
    _formResponses.request = _supportDialogElements.request.value;
    
    _supportDialogElements.summary.innerHTML = '<p>Type of request: <strong>'+_formResponses.type+'</strong></p><p>System: <strong>'+_formResponses.system.text+'</strong></p><p>Location: <strong>'+_formResponses.location+'</strong></p><p>Request: <strong>'+_formResponses.request+'</strong></p>'; 
    
    if (this.classList.contains('next-page')) { _nextPage(); }
    else if (this.classList.contains('prev-page')) { _prevPage(); }
    else if (this.classList.contains('rqSubmit')) { _sendRequest().subscribe(function(response){
      setTimeout(function(){ Frosting.Helpdesk.Issues.init() }, 3000);
    }); }
  }
  
  function _nextPage() {
    for(var i = 0; i < _supportDialogElements.pageElements.length; i++) {
      var currentPage = _supportDialogElements.pageElements[i];
      var nextPage = _supportDialogElements.pageElements[i+1];
      if (currentPage.classList.contains('is-active-page')) {
        currentPage.classList.remove('is-active-page');
        nextPage.classList.add('is-active-page');
        break;
      }
    }
  };
  
  function _prevPage() {
    for(var i = 0; i < _supportDialogElements.pageElements.length; i++) {
      var currentPage = _supportDialogElements.pageElements[i];
      if (currentPage.classList.contains('is-active-page')) {
        currentPage.classList.remove('is-active-page');
        _supportDialogElements.pageElements[i-1].classList.add('is-active-page');
      }
    }
  }
  
  function _sendRequest() {
    var rqUrl = _helpdeskListUrl + '/items';
    var dueDate = function(){
      var date = new Date();
      date.setDate(date.getDate() + 14);
      return date;
    };
    var rqBody = {
      __metadata: { type: 'SP.Data.Helpdesk_x0020_IssuesListItem' },
      Title: _formResponses.system.value + '-' + (1000 + _issueCount.issueObjects[_formResponses.system.name].NumberOfRequests + 1),
      Comment: _formResponses.request,
      System: _formResponses.system.name,
      Type_x002F_Category: _formResponses.type,
      UrlOrPage: _formResponses.location,
      Need_x0020_By_x0020_Date: dueDate()
    };
    return Frosting.Utilities.Request.Post(rqUrl, _headers, JSON.stringify(rqBody))
      .concatMap(function(response) {
        var addIssue = _issueCount.set(_issueCount.issueObjects[_formResponses.system.name]);
        _formResponses.system = 'Choose a system';
        _formResponses.request = '';
        _formResponses.location = '';
        _supportDialogElements.pageElements[0].classList.add('is-active-page');
        _supportDialogElements.pageElements[_supportDialogElements.pageElements.length - 1].classList.remove('is-active-page');
        _dialogComponent.close();
        return addIssue;
      });
  }
  
  function _open() {
    _dialogComponent.open();
    _dialogComponent._overlay.overlayElement.classList.add('ms-Overlay--dark');
  }
  
  /**
   * Init function
   */
  function _init() { 
    _issueCount.get().subscribe(function(res){
      _createForm();
      SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('requestForm.js');
    });
  }
  /**
   * MDS Init function
   */
  function _mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/requestForm.js';
    _init();
    RegisterModuleInit(thisUrl, _init);
  }
  
  return {
    init: _init,
    mdsInit: _mdsInit,
    open:_open
  }

})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.RequestForm.Form.mdsInit();
} else {
  Frosting.Helpdesk.RequestForm.Form.init();
}
