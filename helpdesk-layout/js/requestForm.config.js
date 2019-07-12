Type.registerNamespace('Frosting');
Frosting.Sods = Frosting.Sods || {};
Frosting.Helpdesk = Frosting.Helpdesk || {};
Frosting.Helpdesk.RequestForm = Frosting.Helpdesk.RequestForm || {};

Frosting.Helpdesk.RequestForm.Config = {
  configTools: {
    page: function(contents, classes) {
      return {
        tag: 'div',
        classes: classes ? ['support-ticket-page'].concat(classes) : ['support-ticket-page'],
        content: contents ? contents : []
      };
    },
    divwrapper: function(classes) {
      return {
        tag: 'div',
        classes: classes,
        content: []
      }
    },
    subtext: function(textString) {
      return {
        tag: 'p',
        classes: ['ms-Dialog-subText'],
        text: textString
      };
    },
    span: function(classes, textString, content) {
      return {
        tag: 'span',
        classes: classes,
        text: textString ? textString : null,
        content: content ? content : null
      };
    },
    label: function(labelText) {
      return {
        tag: 'label',
        classes: ['ms-Label'],
        text: labelText
      };
    },
    options: function(value, text){
      return {
        tag: 'option',
        value: value,
        text: text
      };
    },
    compoundButton: function(labelText, descriptionText, classes, buttonAttributes) {
      var button, iconSpan, labelSpan, descSpan;
      button = {
        tag: 'button',
        classes: classes ? ['ms-Button', 'ms-Button--compound'].concat(classes) : ['ms-Button', 'ms-Button--compound'],
        content: []
      };
      iconSpan = this.span(['ms-Button-icon'], null, [{ tag: 'i', classes: ['ms-Icon', 'ms-Icon--Add']}]);
      labelSpan = this.span(['ms-Button-label'], labelText);
      descSpan = this.span(['ms-Button-description'], descriptionText);
      
      button.content = button.content.concat([iconSpan, labelSpan, descSpan]);
      
      return buttonAttributes ? Object.assign(button, buttonAttributes) : button;
    },
    actionButton: function(textString, classes) {
      var button, labelSpan;
      button = {
        tag: 'button',
        classes: classes ? ['ms-Button'].concat(classes) : ['ms-Button'],
        content: []
      };
      labelSpan = this.span(['ms-Button-label'], textString);
      
      button.content = button.content.concat(labelSpan);
      button.type = 'button';
      
      return button;
    },
    dropdown: function(labelText, options, classes) {
      var dropdownContainer, dropdownLabel, dropdownIcon, dropdownSelect, self = this;
      dropdownContainer = {
        tag: 'div',
        classes: ['ms-Dropdown'],
        content: [],
        tabindex: '0'
      };
      dropdownLabel = this.label(labelText);
      dropdownIcon = { tag: 'i', classes: ['ms-Dropdown-caretDown', 'ms-Icon', 'ms-Icon--ChevronDown'] };
      dropdownSelect = {
        tag: 'select',
        classes: classes ? ['ms-Dropdown-select'].concat(classes) : ['ms-Dropdown-select'],
        content: []
      };
      
      options
        .subscribe(function(opts){
          opts.forEach(function(option) {
            var optionObject = self.options(option.value, option.text);
            dropdownSelect.content.push(optionObject);
          });
        });
      
      dropdownContainer.content = dropdownContainer.content.concat([dropdownLabel, dropdownIcon, dropdownSelect]);
      
      return dropdownContainer;
    },
    textfield: function(labelText, textField, classes) {
      var textFieldContainer, textFieldLabel;
      textFieldContainer = {
        tag: 'div',
        classes: classes ? ['ms-TextField'].concat(classes) : ['ms-TextField'],
        content: []
      };
      textFieldLabel = this.label(labelText);
      
      textFieldContainer.content = textFieldContainer.content.concat([textFieldLabel, textField]);
      
      return textFieldContainer;
    },
    messagebar: function(classes){
      return {
        tag: 'div',
        classes: ['ms-MessageBar'],
        content: [
          {
            tag: 'div',
            classes: ['ms-MessageBar-content'],
            content: [
              {
                tag: 'div',
                classes: ['ms-MessageBar-icon'],
                content: [{ tag: 'i', classes: ['ms-Icon', 'ms-Icon--Completed'] }]
              },
              {
                tag: 'div',
                classes: classes ? ['ms-MessageBar-text'].concat(classes) : ['ms-MessageBar-text']
              }
            ]
          }
        ]
      };
    },
    buildPageObject: function(page) {
      var pageObject, pageContents = [], pageLabel = null, pageFormItems = null, pageActionButtonsWrapper = null, pageActionButtons = [], self = this;
      pageLabel = self.subtext(page.content.subText);
      if (page.content.compoundButtons) {
        page.content.compoundButtons.forEach(function(buttonObj){
          var cButton = self.compoundButton(buttonObj.labelText, buttonObj.descriptionText, buttonObj.classes, buttonObj.buttonAttributes);
          pageActionButtons.push(cButton);
        });
      }
      if (page.content.dropdown) {
        pageFormItems = this.dropdown(page.content.dropdown.labelText, page.content.dropdown.options, page.content.dropdown.classes);
      }
      if (page.content.textField) {
        pageFormItems = this.textfield(page.content.textField.labelText, page.content.textField.field, page.content.classes);
      }
      if (page.content.messageBar) {
        pageFormItems = this.messagebar(page.content.messageBar.classes);
      }
      if (page.content.buttons) {
        pageActionButtonsWrapper = self.divwrapper(['rq-Form-actions'])
        page.content.buttons.forEach(function(buttonObj) {
          var aButton = self.actionButton(buttonObj.text, buttonObj.classes);
          pageActionButtons.push(aButton);
        });
        pageActionButtonsWrapper.content = pageActionButtons;
      }
      
      pageContents = pageContents.concat([pageLabel, pageFormItems]);
      pageContents = pageActionButtonsWrapper ? pageContents.concat(pageActionButtonsWrapper) : pageContents.concat(pageActionButtons);
      
      pageObject = this.page(pageContents, page.classes);
      return pageObject;
    }
  },
  
  pages: [
    {
      classes: ['is-active-page'],
      content: {
        subText: 'What kind of support do you need?',
        compoundButtons: [
          {
            labelText: 'Fix it!',
            descriptionText: 'I found something that is not working the way it should.',
            classes: ['rqType', 'next-page'],
            buttonAttributes: {value: 'Bug'}
          },
          {
            labelText: 'Let me in!',
            descriptionText: 'I need access to this or I can\'t do my job.',
            classes: ['rqType', 'next-page'],
            buttonAttributes: {value: 'Access Request'}
          },
          {
            labelText: 'Help me!',
            descriptionText: 'I just need someone to show me how this works.',
            classes: ['rqType', 'next-page'],
            buttonAttributes: {value: 'Support'}
          },
          {
            labelText: 'Listen up!',
            descriptionText: 'I have a fantastic idea that will improve things.',
            classes: ['rqType', 'next-page'],
            buttonAttributes: {value: 'Enhancement'}
          }
        ]
      }
    },
    {
      content: {
        subText: 'Which system is this for?',
        dropdown: {
          labelText: 'Systems We Support',
          classes: ['rqSystem'],
          options: getAppOptions()
        },
        buttons: [
        {
          classes: ['prev-page'],
          text: 'Back'
        },
        {
          classes: ['ms-Button--primary', 'next-page'],
          text: 'Next'
        }
        ]
      }
    },
    {
      content: {
        subText: 'If there is a specific page or URL that would be super helpful!',
        classes: [],
        textField: {labelText: 'URL or page:', field: { tag: 'input',  classes: ['ms-TextField-field', 'rqLocation'], type: 'text', value: '', placeholder: 'URL' }},
        buttons: [
        {
          classes: ['prev-page'],
          text: 'Back'
        },
        {
          classes: ['ms-Button--primary', 'next-page'],
          text: 'Next'
        }
        ]
      }
    },
    {
      content: {
        subText: 'Please describe the request',
        classes: ['ms-TextField--multiline'],
        textField: {labelText: 'Please describe your request.', field: { tag: 'textarea', classes: ['ms-TextField-field', 'rqRequest'] }},
        buttons: [
        {
          classes: ['prev-page'],
          text: 'Back'
        },
        {
          classes: ['ms-Button--primary','next-page'],
          text: 'Next'
        }
        ]
      }
    },
    {
      content: {
        subText: 'Make sure it all looks good, then send the request.',
        messageBar: {classes: ['rqSummary']},
        buttons: [
        {
          classes: ['prev-page'],
          text: 'Back'
        },
        {
          classes: ['ms-Button--primary','rqSubmit'],
          text: 'Looks good!'
        }
        ]
      }
    }
  ],
  
  makeObject: function() {
    var fullObject = [], self = this;
    this.pages.forEach(function(page) {
      var pageObject = self.configTools.buildPageObject(page);
      fullObject.push(pageObject);
    });
    return fullObject;
  },

  
  /**
   * Init function
   */
  init: function() { 
    Frosting.Helpdesk.RequestForm.Config.FormObject = this.makeObject();
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('requestForm.config.js');  
  },
  /**
   * MDS Init function
   */
  mdsInit: function() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/requestForm.config.js';
    this.init();
    RegisterModuleInit(thisUrl, this.init);
  }

};

function getAppOptions(){      
  return Frosting.Helpdesk.Applications.getApplications('OnRequestForm eq 1')
    .map(function(apps){
      var appOptions =[{ value: 'empty', text: 'Choose a system', classes: ['is-disabled'] }];;
      apps.forEach(function(app){
        appOptions.push({ value: app.Helpdesk_x0020_Abbreviation, text: app.Title });
      });
      return appOptions;
    });
}

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.RequestForm.Config.mdsInit();
} else {
  Frosting.Helpdesk.RequestForm.Config.init();
}

