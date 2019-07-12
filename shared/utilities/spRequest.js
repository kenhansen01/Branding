Type.registerNamespace('Frosting');
Frosting.Utilities = Frosting.Utilities || {};

Frosting.Utilities.Request = (function() {
  function _errorResponse(sender, args){
    Frosting.Utilities.logger('An error occured while getting list' + args.get_message());
  }
  
  function _get(url, headers) {
    return _sendRequest({url: url, headers: headers,  method: 'GET'});
  }
  
  function _delete(url, headers, eTag) {
    return _postInternal(url, headers, '', 'DELETE', eTag);
  }
  
  function _post(url, headers, body) {
    return _postInternal(url, headers, body, 'POST');
  }
  
  function _merge(url, headers, body, eTag) {
    return _postInternal(url, headers, body, 'MERGE', eTag);
  }
  
  function _put(url, headers, body, eTag) {
    return _postInternal(url, headers, body, 'PUT');
  }
  
  function _postInternal(url, headers, body, action, eTag) {
    var localHeaders = {};
    //var bodyString = JSON.stringify(body);
    for (var key in headers) {
	  if (headers.hasOwnProperty(key)) {
	    localHeaders[key] = headers[key];
	  }
	}
	localHeaders['X-RequestDigest'] = document.getElementById('__REQUESTDIGEST').value;
    localHeaders['Content-Length'] = body ? JSON.stringify(body).length : 0;
	if (action && action.length > 0) {
	  localHeaders['X-HTTP-Method'] = action;
	  localHeaders['IF-MATCH'] = eTag && eTag.length > 0 ? eTag : '*';
	}
	
	return _sendRequest({url: url, body: body, method: 'POST', headers: localHeaders}); 
  }
  
  /**
   * Creates & returns observable for the request
   * 
   * @param {Object} requestObject - An object with the following properties
   *  - url: URL of the request
   *  - body: The body of the request
   *  - method: Method of the request, SharePoint only uses GET or POST
   *  - headers: The headers for the request
   *
   * @return {Observable} An observable sequence containing the XMLHttpRequest
   */
  function _sendRequest(requestObject) {
    if(!requestObject.headers || !requestObject.headers['Accept'] || requestObject.headers['Accept'].length === 0) {
      requestObject.headers['Accept'] = 'application/json;odata=verbose';
    }
    
    return Rx.Observable.ajax(requestObject)
    .map(function(res){ 
      var response = typeof res === 'object' ? res.response : JSON.parse(res).response;
      if( response && response.d )
        return response.d
      else
        return null 
    });
  }
  
  function _init() {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('spRequest.js');
  }

  function _mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/shared/utilities/spRequest.js';
    Frosting.Utilities.Request.init();
    RegisterModuleInit(thisUrl, Frosting.Utilities.Request.init);
  }
  
  // public methods available
  return {
    ErrorRes: _errorResponse,
    SendRequest: _sendRequest,
    Get: _get,
    Post: _post,
    Delete: _delete,
    Merge: _merge,
    Put: _put,
    init: _init,
    mdsInit: _mdsInit
  };

})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Utilities.Request.mdsInit();
} else {
  Frosting.Utilities.Request.init();
}



/*request.getXReqDigest = function(url) {
  return Frosting.Utilities.sendRequest({
    url: url,
    method: post,
    headers: {'accept': 'application/json; odata=verbose', 'content-type': 'application/json; odata=verbose'}
  });
}*/

