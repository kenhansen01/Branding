Type.registerNamespace('Frosting');
Frosting.Globals = Frosting.Globals || {};

Frosting.GlobalNavigation = function() {
  this.termSetName = 'Frosting_Global';
  
  this.init = function () {
    if (typeof _spPageContextInfo != "undefined" && _spPageContextInfo != null) {
      _mdsInit.bind(this)();
    } else {
      _init.bind(this)();
    }  
  };
  
  function _init() {
    var initTasks = function() {
      Frosting.Utilities.Taxonomy.getTermsAsTree(this.termSetName)
        .subscribe(function(termsTree) {
          _renderNav(termsTree);
          _showNav();
          _applyTheme();
        });
    }.bind(this);
    
    SP.SOD.executeOrDelayUntilScriptLoaded.bind(this, initTasks, 'FrostingGlobals.js')();
  }
  
  function _mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/shared/modules/getNav.js';
    _init.bind(this)();
    RegisterModuleInit(thisUrl, _init);
  };
    
  function _renderNav(termsTree) {
    var navElement = document.getElementById('top-bar');
    var navTree = new NavList(termsTree, 0, null);
    navElement.appendChild(navTree.divContainer);
  }
  
  function _removeClassFromElements(elements) {
    return function(className) {
      for(var i = 0, l = elements.length; i < l; i++) {
        elements[i].classList.remove(className);
      }
    }
  }

  function _showNav() {
    var navToggle = document.getElementsByClassName('js-FrostingNav')[0];
    var coreBranding = document.getElementsByClassName('ms-core-brandingText')[0];
    var navContainer = document.getElementsByClassName('Frosting-main-menu')[0];
    var form = document.getElementById('aspnetForm');
  
    navToggle.addEventListener('click', function(ev) {
      ev.preventDefault();
      var selectedEls = navContainer.querySelectorAll('.is-selected');
      var activeEls = navContainer.querySelectorAll('.is-active');
      var activeChildren = navContainer.querySelectorAll('.child-active');

      this.classList.toggle('is-active');
      coreBranding.classList.toggle('is-active');
      form.classList.toggle('has-push-left');

      for(var i = 0, l = form.classList.length; i < l; i++) {
        var className = form.classList[i];
        if(!form.classList.contains('has-push-left') && /has-push-left-.*/.test(className)) {
          _removeClassFromElements([form])(className);
          _removeClassFromElements(selectedEls)('is-selected');
          _removeClassFromElements(activeEls)('is-active');
          _removeClassFromElements(activeChildren)('child-active');
        }
      }        
    });   
  }

  function _showSubNav(parent, parentContainer, depth) {
    var anchorToggle = parent.querySelector('.Frosting-main-menu__link');
    var anchorIcon = anchorToggle.querySelector('.ms-Icon');
    var subMenuContainer = parent.querySelector('.Frosting-main-menu-container');
    var form = document.getElementById('aspnetForm');

    anchorToggle.addEventListener('click', function(ev) {
      ev.preventDefault();

      this.classList.toggle('is-selected');
      anchorIcon.classList.toggle('is-selected');
      subMenuContainer.classList.toggle('is-active');
      parentContainer.classList.toggle('child-active');
      form.classList.toggle('has-push-left-' + depth);
    })
  }
  
  /** REMOVE FOR PRODUCTION **/
  function _applyTheme() {
    var themeButton = document.getElementById('js-applyTheme');
  
    function checkInFile() {
      var styleUrl = _spPageContextInfo.siteServerRelativeUrl + 'Style%20Library/en-us/Themable/FrostingTheme/Frosting.master.css';
      var rootWeb = Frosting.Globals.context.get_site().get_rootWeb();
      var file = rootWeb.getFileByServerRelativeUrl(styleUrl);
      var listItem = file.get_listItemAllFields();

      listItem.update();
      file.checkIn('', 1);
      //file.publish();
      Frosting.Globals.context.executeQueryAsync(
        function(){
          applyTheme();
        },
        function(sender, args) { 
	      ULS.enable = true; //ensure ULS logging is enabled
          ULSOnError('An error occured while getting list' + args.get_message(), location.href, 0);
          applyTheme();
        }
      );
    }
  
    function applyTheme() {
      var web = Frosting.Globals.context.get_web();
      var colorPaletteUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/theme/15/FrostingPalette.spcolor';
      var fontSchemeUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/theme/15/FrostingFontScheme.spfont';
  
      web.applyTheme(colorPaletteUrl, fontSchemeUrl, null, true);
      web.update();
  
      Frosting.Globals.context.executeQueryAsync(
        function(){ alert('Theme has been set'); },
        function(sender, args) { 
          ULS.enable = true; //ensure ULS logging is enabled
          ULSOnError('An error occured while getting list' + args.get_message(), location.href, 0);
        }
	  );
    }
    themeButton.addEventListener('click', function(ev) {
      ev.preventDefault();
      checkInFile();
    });
  };
  
  function NavList(termTree, depth, classString) {
    var currentClassString = _classBuilder(classString, 'ul', depth);
    this.divContainer = document.createElement('div');
    this.divContainer.classList.add('ul-depth-'+depth);
    this.divContainer.classList.add('Frosting-main-menu-container');
    this.uList = document.createElement('ul');
    this.uList.classList.add(currentClassString);
    this.uList.classList.add('Frosting-main-menu__items');
    for(var i = 0; i < termTree.children.length; i++) {
      var currentTerm = termTree.children[i];
      var navTerm = new NavTerm(currentTerm, depth, i, currentClassString);
      this.uList.appendChild(navTerm.listItem);
      if (currentTerm.children.length) _showSubNav(navTerm.listItem, this.divContainer, depth+1);
    };
    this.divContainer.appendChild(this.uList);
  }
  
  function NavTerm(term, depth, idx, classString) {    
    var currentClassString = _classBuilder(classString, 'li', idx);
    this.listItem = document.createElement('li');
    this.listItem.classList.add('Frosting-main-menu__item');
    this.listItem.classList.add(currentClassString);
    this.anchor = document.createElement('a');
    this.anchor.classList.add('Frosting-main-menu__link');
    this.anchorText = document.createTextNode(term.title);
    this.anchor.setAttribute('href', term.url);
    this.icon = document.createElement('i');
    this.icon.classList.add('ms-Icon');
    this.icon.classList.add('ms-Icon--'+term.iconName);
    this.anchor.appendChild(this.icon);
    this.anchor.appendChild(this.anchorText);
    this.listItem.appendChild(this.anchor);
    if(term.children.length) {
      var itemUList = new NavList(term, depth+1, currentClassString);
      this.listItem.appendChild(itemUList.divContainer);
    }   
  }  
    
  function _classBuilder(currentClassString, elType, number) {
    return !currentClassString ? elType + '-' + number : currentClassString + '-' + elType + '-' + number;
  }
  
  this.init();  
};

Frosting.GlobalNavigation();
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('getNav.js');
