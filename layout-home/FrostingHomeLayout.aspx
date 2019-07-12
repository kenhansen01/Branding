<%-- SPG:

This HTML file has been associated with a SharePoint Page Layout (.aspx file) carrying the same name.  While the files remain associated, you will not be allowed to edit the .aspx file, and any rename, move, or deletion operations will be reciprocated.

To build the page layout directly from this HTML file, simply fill in the contents of content placeholders.  Use the Snippet Generator at http://Frosting/sites/helpdesk/_layouts/15/ComponentHome.aspx?Url=http%3A%2F%2FFrosting%2Fsites%2Fhelpdesk%2F%5Fcatalogs%2Fmasterpage%2FFrostingCustom%2Flayout%2Dhome%2FFrostingHomeLayout%2Easpx to create and customize additional content placeholders and other useful SharePoint entities, then copy and paste them as HTML snippets into your HTML code.   All updates to this file within content placeholders will automatically sync to the associated page layout.

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
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            <div>
                
                
                
                <Publishing:EditModePanel runat="server" CssClass="edit-mode-panel">
                    <PageFieldTextField:TextField FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
                    </PageFieldTextField:TextField>
                </Publishing:EditModePanel>
                
            </div>
            <div class="ms-Grid">
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md3">
                        <div>
                            <a id="startNavigation" name="startNavigation" tabIndex="-1">
                            </a>
                            <DesignerTempNode name="PlaceHolderLeftNavBarTop" />
                            <DesignerTempNode name="PlaceHolderQuickLaunchTop" />
                            <DesignerTempNode name="PlaceHolderLeftNavBarDataSource" />
                            <DesignerTempNode name="PlaceHolderCalendarNavigator" />
                            <DesignerTempNode name="PlaceHolderLeftActions" />
                            <div class="ms-core-sideNavBox-removeLeftMargin">
                                <SharePoint:SPNavigationManager id="QuickLaunchNavigationManager" runat="server" QuickLaunchControlId="V4QuickLaunchMenu" ContainedControl="QuickLaunch" EnableViewState="false">
                                <SharePoint:DelegateControl runat="server" ControlId="QuickLaunchDataSource">
                                <Template_Controls>
                                <asp:SiteMapDataSource SiteMapProvider="SPNavigationProvider" ShowStartingNode="False" id="QuickLaunchSiteMap" StartingNodeUrl="sid:1025" runat="server" />
                                </Template_Controls>
                                </SharePoint:DelegateControl>
                                <SharePoint:AspMenu id="V4QuickLaunchMenu" runat="server" EnableViewState="false" DataSourceId="QuickLaunchSiteMap" UseSimpleRendering="true" Orientation="Vertical" StaticDisplayLevels="3" AdjustForShowStartingNode="true" MaximumDynamicDisplayLevels="0" SkipLinkText="" />
                                </SharePoint:SPNavigationManager>
                                <SharePoint:SPNavigationManager id="TreeViewNavigationManagerV4" runat="server" ContainedControl="TreeView" CssClass="ms-tv-box">
                                <SharePoint:SPLinkButton runat="server" NavigateUrl="~site/_layouts/15/viewlsts.aspx" id="idNavLinkSiteHierarchyV4" Text="&lt;%$Resources:wss,treeview_header%&gt;" accesskey="&lt;%$Resources:wss,quiklnch_allcontent_AK%&gt;" CssClass="ms-tv-header" />
                                <SharePoint:DelegateControl runat="server" ControlId="TreeViewAndDataSource">
                                <Template_Controls>
                                <SharePoint:SPHierarchyDataSourceControl runat="server" id="TreeViewDataSourceV4" RootContextObject="Web" IncludeDiscussionFolders="true" />
                                <SharePoint:SPRememberScroll runat="server" id="TreeViewRememberScrollV4" onscroll="javascript:_spRecordScrollPositions(this);" style="overflow: auto;">
                                <SharePoint:SPTreeView id="WebTreeViewV4" runat="server" ShowLines="false" DataSourceId="TreeViewDataSourceV4" ExpandDepth="0" SelectedNodeStyle-CssClass="ms-tv-selected" NodeStyle-CssClass="ms-tv-item" SkipLinkText="" NodeIndent="12" ExpandImageUrl="/_layouts/15/images/tvclosed.png?rev=23" ExpandImageUrlRtl="/_layouts/15/images/tvclosedrtl.png?rev=23" CollapseImageUrl="/_layouts/15/images/tvopen.png?rev=23" CollapseImageUrlRtl="/_layouts/15/images/tvopenrtl.png?rev=23" NoExpandImageUrl="/_layouts/15/images/tvblank.gif?rev=23">
                                </SharePoint:SPTreeView>
                                </SharePoint:SPRememberScroll>
                                </Template_Controls>
                                </SharePoint:DelegateControl>
                                </SharePoint:SPNavigationManager>
                                <DesignerTempNode name="PlaceHolderQuickLaunchBottom" />
                            </div>
                        </div>
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
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderLeftNavBarTop">
                            </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea">
            <SharePoint:SPTitleBreadcrumb runat="server" RenderCurrentNodeAsLink="true" SiteMapProvider="SPContentMapProvider" CentralAdminSiteMapProvider="SPXmlAdminContentMapProvider">
            
            <PATHSEPARATORTEMPLATE>
            <SharePoint:ClusteredDirectionalSeparatorArrow runat="server" />
            </PATHSEPARATORTEMPLATE>
            </SharePoint:SPTitleBreadcrumb>
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderQuickLaunchTop">
                            </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderQuickLaunchBottom">
                                    <div class="ms-core-listMenu-verticalBox">
                                        <SharePoint:ClusteredSPLinkButton runat="server" id="idNavLinkViewAll" PermissionsString="ViewFormPages" NavigateUrl="~site/_layouts/15/viewlsts.aspx" Text="&lt;%$Resources:wss,AllSiteContentMore%&gt;" accesskey="&lt;%$Resources:wss,quiklnch_allcontent_AK%&gt;" CssClass="ms-core-listMenu-item ms-core-listMenu-heading" />
                                        
                                    </div>
                                </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderLeftNavBarDataSource">
                            </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderCalendarNavigator">
                            </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderLeftActions">
                            </asp:Content>