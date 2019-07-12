Type.registerNamespace('Frosting');
Frosting.Utilities = Frosting.Utilities || {};

/**
 * Frosting Utilities Dom Namespace
 * @namespace Dom
 * @memberof Frosting.Utilities
 */
Frosting.Utilities.Dom = (function() {

  /**
   * Function that creates nested elements from an abject.
   * 
   * @function makeElements
   * @memberof Frosting.Utilities.Dom
   * 
   * @param {Object} element - object with element def
   * @param {string} element.tag - required tag name
   * @param {string} [element.text] - optional text for this tag
   * @param {string[]} [element.classes] - optional array of classes
   * @param {element[]} [element.content] - optional array of child element objects
   * @param {string} [element.<attrName>] - any attribute to be added to the element value is a string
   * 
   * @example
   * <pre><code>
   * var elObject = {
   *  tag: 'div',
   *  classes: ['exDiv', 'coolClass'],
   *  content: [
   *    {
   *      tag: 'span',
   *      text: 'This is neat!'
   *    }
   *  ],
   *  'data-stuff': 'dataStuff 1"
   * };
   * Frosting.Utilities.Dom.makeElements(elObject);
   * // returns this element <div class="exDiv coolClass" data-stuff="dataStuff 1"><span>This is neat!</span></div>
   * </code></pre>
   * 
   * @return {Node} el - fully built dom element ready to be inserted.
   */
  function makeElements(element) {
    if(!element) return;
    var el, textNode, self = this;
    
    el = document.createElement(element.tag);
    
    Object.getOwnPropertyNames(element).forEach(function(val, idx, arr) {
      if (val === 'classes') {
        element[val].forEach(function(className) {
          el.classList.add(className);
        });
      }
      else if (val === 'content') {
        if(element[val]) {
          element[val].forEach(function(childElement){
            var childEl = self.makeElements(childElement);
            if (childEl) { el.appendChild(childEl); }
          });
        }
      }
      else if (val === 'text') {
        textNode = document.createTextNode(element[val]);
        el.appendChild(textNode);
      }
      else if (val !== 'tag') {
        el.setAttribute(val, element[val]);
      }
    });
    
    return el;    
  }
  
  /**
   * Function notifies SharePoint that it is loaded and ready to use
   * @function init
   * @memberof Frosting.Utilities.Dom
   */
  function init() { 
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('domTools.js');
  }
  
  /**
   * Function notifies SharePoint that it is loaded and ready to use when MDS is active
   * @function mdsInit
   * @memberof Frosting.Utilities.Dom
   */
  function mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/shared/utlilities/domTools.js';
    this.init();
    RegisterModuleInit(thisUrl, this.init);
  }
  
  return {
    makeElements: makeElements,
    init: init,
    mdsInit: mdsInit
  }
  
})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Utilities.Dom.mdsInit();
} else {
  Frosting.Utilities.Dom.init();
}
