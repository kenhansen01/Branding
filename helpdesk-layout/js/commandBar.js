Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {};
Frosting.Helpdesk = Frosting.Helpdesk || {};
Frosting.Helpdesk.CommandBar = Frosting.Helpdesk.CommandBar || {};

Frosting.Helpdesk.CommandBar = {

  /**
   *
   */
  fabricButtons: function(button, action){
    button.addEventListener('click', function(evt) {
      evt.preventDefault();
    });
    return new fabric['Button'](button, action);
  },
  
  /**
   *
  
  filterComponent: function(){
    var filterButton = document.querySelector('.js-Filter-button');
    filterButton.addEventListener('click',function(evt){
      evt.preventDefault();
      evt.stopPropagation();
    });
    new fabric['CommandButton'](filterButton);

  }, */
  
  /**
   *
   */
  newRequestDialogComponent: function(){
    var rqButton = document.querySelector(".js-NewRequest-button");
    rqButton.addEventListener('click', function(evt) {
      evt.preventDefault();
      Frosting.Helpdesk.RequestForm.Form.open();
    });
  },
  
  /**
   * Activate the command bar elements - generic activation   *
   */
  activate: function(){
    var CommandBarElements = document.querySelectorAll('.ms-CommandBar');
    var button = document.querySelector(".js-NewRequest-button");
    for(var i = 0; i < CommandBarElements.length; i++) {
      new fabric['CommandBar'](CommandBarElements[i]);
    }
    //this.filterComponent();    
    this.newRequestDialogComponent();
  },
  
  /**
   * Init function
   */
  init: function() { 
    this.activate();
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('commandBar.js');
  },
  /**
   * MDS Init function
   */
  mdsInit: function() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/commandBar.js';
    this.init();
    RegisterModuleInit(thisUrl, this.init);
  }

};

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.CommandBar.mdsInit();
} else {
  Frosting.Helpdesk.CommandBar.init();
}

