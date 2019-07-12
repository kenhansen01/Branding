<%-- SPG:

This HTML file has been associated with a SharePoint Page Layout (.aspx file) carrying the same name.  While the files remain associated, you will not be allowed to edit the .aspx file, and any rename, move, or deletion operations will be reciprocated.

To build the page layout directly from this HTML file, simply fill in the contents of content placeholders.  Use the Snippet Generator at http://Frosting/sites/helpdesk/_layouts/15/ComponentHome.aspx?Url=http%3A%2F%2FFrosting%2Fsites%2Fhelpdesk%2F%5Fcatalogs%2Fmasterpage%2FFrostingCustom%2Fhelpdesk%2Dlayout%2FFrostingHelpdesk%5FLayout%2Easpx to create and customize additional content placeholders and other useful SharePoint entities, then copy and paste them as HTML snippets into your HTML code.   All updates to this file within content placeholders will automatically sync to the associated page layout.

 --%>
<%@Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage, Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldFieldValue" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="Publishing" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldTextField" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitle">
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
            <SharePoint:CssRegistration runat="server" ID="FabricComponentsCss" Name="&lt;% $SPUrl:~sitecollection/_catalogs/masterpage/FrostingCustom/helpdesk-layout/css/helpdesk.css %&gt;" After="&lt;% $SPUrl:~sitecollection/_catalogs/masterpage/FrostingCustom/shared/fabric/css/fabric.min.css %&gt;" />
            
            
            
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
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            <div>
                
                
                
                <Publishing:EditModePanel runat="server" CssClass="edit-mode-panel">
                    <PageFieldTextField:TextField FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
                    </PageFieldTextField:TextField>
                </Publishing:EditModePanel>
                
            </div>
            <div class="ms-Grid">
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-xxl8">
                        <div class="ms-CommandBar">
                            <div class="ms-CommandBar-mainArea">
                                
                                <div class="ms-CommandButton">
                                    <button class="ms-CommandButton-button js-NewRequest-button">
                                        <span class="ms-CommandButton-icon ms-fontColor-themePrimary">
                                            <i class="ms-Icon ms-Icon--Add">
                                            </i>
                                        </span>
                                        <span class="ms-CommandButton-label">New Request
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="donutchart" style="">
                        </div>
                        <div class="ms-Dialog ms-Dialog--lgHeader ms-Dialog--close Frosting-newRequest-lgHeader">
                            <button class="ms-Dialog-button ms-Dialog-buttonClose">
                                <i class="ms-Icon ms-Icon--Cancel">
                                </i>
                            </button>
                            <div class="ms-Dialog-title ms-bgColor-themeSecondary">Open Support Ticket
                            </div>
                            <div class="ms-Dialog-content">
                            </div>
                        </div>
                    </div>
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-xxl4">
                        <div class="ms-Grid-row Frosting-helpdesk-requests">
                            <div class="ms-u-sm12 ms-bgColor-themeSecondary Frosting-helpdesk-requests--header">
                                <h2 class="ms-fontColor-white ms-fontWeight-semibold">My Requests
                                </h2>
                            </div>
                            <ul class="ms-List Frosting-helpdesk-requests--list">
                            </ul>
                        </div>
                        <div class="ms-Grid-row Frosting-helpdesk-todo">
                            <div class="ms-u-sm12 ms-bgColor-themeSecondary Frosting-helpdesk-todo--header">
                                <h2 class="ms-fontColor-white ms-fontWeight-semibold">Assigned To Me
                                </h2>
                            </div>
                            <ul class="ms-List Frosting-helpdesk-todo--list">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <SharePoint:ScriptBlock runat="server">
             SP.SOD.executeOrDelayUntilEventNotified(function () {
                SP.SOD.registerSod('helpdesk.js', _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/helpdesk.js');
                SP.SOD.registerSodDep('helpdesk.js','masterSods.js');
                EnsureScriptFunc('helpdesk.js', null, function() { 
                  return;
                });
              }, "FrostingMasterSods.Loaded");
            </SharePoint:ScriptBlock>
        </asp:Content>