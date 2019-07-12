<%-- SPG:

This HTML file has been associated with a SharePoint Page Layout (.aspx file) carrying the same name.  While the files remain associated, you will not be allowed to edit the .aspx file, and any rename, move, or deletion operations will be reciprocated.

To build the page layout directly from this HTML file, simply fill in the contents of content placeholders.  Use the Snippet Generator at http://Frosting/sites/helpdesk/_layouts/15/ComponentHome.aspx?Url=http%3A%2F%2FFrosting%2Fsites%2Fhelpdesk%2F%5Fcatalogs%2Fmasterpage%2FFrostingCustom%2Fhelpdesk%2Dlayout%2FFrostingHelpdeskLayout%2Easpx to create and customize additional content placeholders and other useful SharePoint entities, then copy and paste them as HTML snippets into your HTML code.   All updates to this file within content placeholders will automatically sync to the associated page layout.

 --%>
<%@Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage, Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldFieldValue" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="Publishing" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldTextField" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldUrlField" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitle">
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
            
            
            
            <Publishing:EditModePanel runat="server" id="editmodestyles">
                <SharePoint:CssRegistration name="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %&gt;" After="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %&gt;" runat="server">
                </SharePoint:CssRegistration>
            </Publishing:EditModePanel>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea">
            <SharePoint:SPTitleBreadcrumb runat="server" RenderCurrentNodeAsLink="true" SiteMapProvider="SPContentMapProvider" CentralAdminSiteMapProvider="SPXmlAdminContentMapProvider">
            
            <PATHSEPARATORTEMPLATE>
            <SharePoint:ClusteredDirectionalSeparatorArrow runat="server" />
            </PATHSEPARATORTEMPLATE>
            </SharePoint:SPTitleBreadcrumb>
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            <div class="ms-CommandBar">
                <div class="ms-CommandBar-sideCommands">
                    <div class="ms-CommandButton ms-CommandButton--noLabel">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                <i class="ms-Icon ms-Icon--CircleRing">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">
                            </span>
                        </button>
                    </div>
                </div>
                <div class="ms-CommandBar-mainArea">
                    <div class="ms-SearchBox ms-SearchBox--commandBar">
                        <input class="ms-SearchBox-field" type="text" value="" />
                        <label class="ms-SearchBox-label">
                            <i class="ms-SearchBox-icon ms-Icon ms-Icon--Search">
                            </i>
                            <span class="ms-SearchBox-text">Search
                            </span>
                        </label>
                        <div class="ms-CommandButton ms-SearchBox-clear ms-CommandButton--noLabel">
                            <button class="ms-CommandButton-button">
                                <span class="ms-CommandButton-icon">
                                    <i class="ms-Icon ms-Icon--Cancel">
                                    </i>
                                </span>
                                <span class="ms-CommandButton-label">
                                </span>
                            </button>
                        </div>
                        <div class="ms-CommandButton ms-SearchBox-exit ms-CommandButton--noLabel">
                            <button class="ms-CommandButton-button">
                                <span class="ms-CommandButton-icon">
                                    <i class="ms-Icon ms-Icon--ChromeBack">
                                    </i>
                                </span>
                                <span class="ms-CommandButton-label">
                                </span>
                            </button>
                        </div>
                        <div class="ms-CommandButton ms-SearchBox-filter ms-CommandButton--noLabel">
                            <button class="ms-CommandButton-button">
                                <span class="ms-CommandButton-icon">
                                    <i class="ms-Icon ms-Icon--Filter">
                                    </i>
                                </span>
                                <span class="ms-CommandButton-label">
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="ms-CommandButton">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                <i class="ms-Icon ms-Icon--CircleRing">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">Command
                            </span>
                        </button>
                    </div>
                    <div class="ms-CommandButton">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                <i class="ms-Icon ms-Icon--CircleRing">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">New
                            </span>
                            <span class="ms-CommandButton-dropdownIcon">
                                <i class="ms-Icon ms-Icon--ChevronDown">
                                </i>
                            </span>
                        </button>
                        <ul class="ms-ContextualMenu is-opened ms-ContextualMenu--hasIcons">
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Folder
                                </a>
                                <i class="ms-Icon ms-Icon--Folder">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item ms-ContextualMenu-item--divider">
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Plain Text Document
                                </a>
                                <i class="ms-Icon ms-Icon--Page">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">A Coffee
                                </a>
                                <i class="ms-Icon ms-Icon--Coffee">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Picture
                                </a>
                                <i class="ms-Icon ms-Icon--Picture">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Money
                                </a>
                                <i class="ms-Icon ms-Icon--Money">
                                </i>
                            </li>
                        </ul>
                    </div>
                    <div class="ms-CommandButton">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                <i class="ms-Icon ms-Icon--CircleRing">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">Command
                            </span>
                        </button>
                    </div>
                    <div class="ms-CommandButton">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                <i class="ms-Icon ms-Icon--CircleRing">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">Command
                            </span>
                        </button>
                    </div>
                    <div class="ms-CommandButton">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                <i class="ms-Icon ms-Icon--CircleRing">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">Command
                            </span>
                        </button>
                    </div>
                    <div class="ms-CommandButton ms-CommandBar-overflowButton ms-CommandButton--noLabel">
                        <button class="ms-CommandButton-button">
                            <span class="ms-CommandButton-icon">
                                <i class="ms-Icon ms-Icon--More">
                                </i>
                            </span>
                            <span class="ms-CommandButton-label">
                            </span>
                        </button>
                        <ul class="ms-ContextualMenu is-opened ms-ContextualMenu--hasIcons">
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Folder
                                </a>
                                <i class="ms-Icon ms-Icon--Folder">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item ms-ContextualMenu-item--divider">
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Plain Text Document
                                </a>
                                <i class="ms-Icon ms-Icon--Page">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">A Coffee
                                </a>
                                <i class="ms-Icon ms-Icon--Coffee">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Picture
                                </a>
                                <i class="ms-Icon ms-Icon--Picture">
                                </i>
                            </li>
                            <li class="ms-ContextualMenu-item">
                                <a class="ms-ContextualMenu-link" tabindex="1">Money
                                </a>
                                <i class="ms-Icon ms-Icon--Money">
                                </i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <script type="text/javascript">//<![CDATA[
          var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
          for (var i = 0; i < CommandBarElements.length; i++) {
            new fabric['CommandBar'](CommandBarElements[i]);
          }
        
            //]]></script>
            <div>
                
                
                
                <Publishing:EditModePanel runat="server" CssClass="edit-mode-panel">
                    <PageFieldTextField:TextField FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
                    </PageFieldTextField:TextField>
                </Publishing:EditModePanel>
                
            </div>
            <div class="ms-Grid">
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md3">
                    </div>
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md6">
                        <div class="ms-Grid-row">
                            <div data-name="Page Field: Main_Section1_bgImage">
                                
                                
                                <PageFieldUrlField:UrlField FieldName="0ae9b171-7628-46e9-a9ba-b29e98d16e19" runat="server">
                                    
                                </PageFieldUrlField:UrlField>
                                
                            </div>
                            <div data-name="Page Field: Main_Section1_Headline">
                                
                                
                                <PageFieldTextField:TextField FieldName="f75515f6-11f1-4a16-bd39-6bfa3c5b4872" runat="server">
                                    
                                </PageFieldTextField:TextField>
                                
                            </div>
                        </div>
                    </div>
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md3">
                    </div>
                </div>
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12">
                    </div>
                </div>
            </div>
        </asp:Content>