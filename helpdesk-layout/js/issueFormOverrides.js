/**
SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
  OnPreRender: function(ctx) {
    var fieldName = ctx.ListSchema.Field[0].Name;
    if (fieldName == "Developer_x0020_Comments")
    {
      var span = $get(ctx.FormUniqueId + ctx.FormContext.listAttributes.Id + fieldName);
      var tr = document.createElement('tr');
      tr.style.backgroundColor = "#ada";
      tr.innerHTML="<td colspan='2'>&nbsp;</td>";
      var fieldTr = span.parentNode.parentNode;
      fieldTr.parentNode.insertBefore(tr, fieldTr);
    }
  },
  Templates: {
    Fields: {
      'V3Comments': {
        EditForm: readonlyFieldTemplate //,
        //DisplayForm:
      },
      'Developer_x0020_Comments': {
        //EditForm:
        DisplayForm: return null;
      },
    }
  }
});
*/

if (typeof _spPageContextInfo != "undefined" && _spPageContextInfo != null) {
    RegisterInMDS();
}
else {
    RegisterReadonlyFieldContext();
}

function RegisterInMDS() {
    // RegisterReadonlyFiledContext-override for MDS enabled site
    RegisterModuleInit(_spPageContextInfo.siteServerRelativeUrl + "/_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/issueFormOverrides.js", RegisterReadonlyFieldContext);
    //RegisterReadonlyFiledContext-override for MDS disabled site (because we need to call the entry point function in this case whereas it is not needed for anonymous functions)
    RegisterReadonlyFieldContext();
}

function RegisterReadonlyFieldContext () {

    // Create object that has the context information about the field that we want to render differently
    var readonlyFieldContext = {};
    readonlyFieldContext.Templates = {};
    readonlyFieldContext.Templates.Fields = {
        // Apply the new rendering for Title, AssignedTo, and Priority fields on Edit forms
        "V3Comments": {
            "EditForm": readonlyFieldTemplate
        },
        "Developer_x0020_Comments": {
            "DisplayForm": '<div hidden="true"></div>'
        },
        //"Priority": {
        //    "EditForm": readonlyFieldTemplate
        //}
    };
    readonlyFieldContext.OnPreRender =  function(ctx) {
      var fieldName = ctx.ListSchema.Field[0].Name;
      
      if (ctx.BaseViewID == "EditForm" && fieldName == "Developer_x0020_Comments")
      {
        var span = $get(ctx.FormUniqueId + ctx.FormContext.listAttributes.Id + fieldName);
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.classList.add('ms-borderColor-themeSecondary');
        td.classList.add('ms-u-textAlignCenter');
        td.classList.add('ms-font-xl');
        td.style.borderWidth = '1px';
        td.style.borderStyle = 'solid';
        td.setAttribute('colspan', 2);
        td.style.padding = '15px';
        td.innerHTML="<a href='mailto:"+ ctx.ListData.Items[0].Requestor[0].EntityData.Email +"?subject=Your%20support%20request%20for%20"+ctx.ListData.Items[0].System+"&body=Please refer to this request: http%3A%2F%2FFrosting%2Fsites%2Fhelpdesk%2FLists%2FHelpdesk%2520Issues%2FDispForm.aspx%3FID%3D"+ctx.FormContext.itemAttributes.Id+"' target='_self'>Send Email To Requestor</a>";
        tr.appendChild(td);
        var fieldTr = span.parentNode.parentNode;
        fieldTr.parentNode.insertBefore(tr, fieldTr.nextSibling);
      }
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(readonlyFieldContext);

}

// This function provides the rendering logic
function readonlyFieldTemplate(ctx) {

    //Reuse SharePoint JavaScript libraries
    switch (ctx.CurrentFieldSchema.FieldType) {
        case "Text":
        case "Number":
        case "Integer":
        case "Currency":
        case "Choice":
        case "Computed":
            return SPField_FormDisplay_Default(ctx);

        case "MultiChoice":
            prepareMultiChoiceFieldValue(ctx);
            return SPField_FormDisplay_Default(ctx);

        case "Boolean":
            return SPField_FormDisplay_DefaultNoEncode(ctx);

        case "Note":
            prepareNoteFieldValue(ctx);
            return SPFieldNote_Display(ctx);

        case "File":
            return SPFieldFile_Display(ctx);

        case "Lookup":
        case "LookupMulti":
                return SPFieldLookup_Display(ctx);           

        case "URL":
            return RenderFieldValueDefault(ctx);

        case "User":
            prepareUserFieldValue(ctx);
            return SPFieldUser_Display(ctx);

        case "UserMulti":
            prepareUserFieldValue(ctx);
            return SPFieldUserMulti_Display(ctx);

        case "DateTime":
            return SPFieldDateTime_Display(ctx);

        case "Attachments":
            return SPFieldAttachments_Default(ctx);

        case "TaxonomyFieldType":
            //Re-use JavaScript from the sp.ui.taxonomy.js SharePoint JavaScript library
            return SP.UI.Taxonomy.TaxonomyFieldTemplate.renderDisplayControl(ctx);
    }
}

//User control need specific formatted value to render content correctly
function prepareUserFieldValue(ctx) {
    var item = ctx['CurrentItem'];
    var userField = item[ctx.CurrentFieldSchema.Name];
    var fieldValue = "";

    for (var i = 0; i < userField.length; i++) {
        fieldValue += userField[i].EntityData.SPUserID + SPClientTemplates.Utility.UserLookupDelimitString + userField[i].DisplayText;

        if ((i + 1) != userField.length) {
            fieldValue += SPClientTemplates.Utility.UserLookupDelimitString
        }
    }

    ctx["CurrentFieldValue"] = fieldValue;
}

//Choice control need specific formatted value to render content correctly
function prepareMultiChoiceFieldValue(ctx) {

    if (ctx["CurrentFieldValue"]) {
        var fieldValue = ctx["CurrentFieldValue"];

        var find = ';#';
        var regExpObj = new RegExp(find, 'g');

        fieldValue = fieldValue.replace(regExpObj, '; ');
        fieldValue = fieldValue.replace(/^; /g, '');
        fieldValue = fieldValue.replace(/; $/g, '');

        ctx["CurrentFieldValue"] = fieldValue;
    }
}

//Note control need specific formatted value to render content correctly
function prepareNoteFieldValue(ctx) {

    if (ctx["CurrentFieldValue"]) {
        var fieldValue = ctx["CurrentFieldValue"];
        fieldValue = "<div>" + fieldValue.replace(/\n/g, '<br />'); + "</div>";

        ctx["CurrentFieldValue"] = fieldValue;
    }
}