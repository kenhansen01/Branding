Type.registerNamespace('Frosting');
Frosting.Helpdesk = Frosting.Helpdesk || {};

Frosting.Helpdesk.Charts = (function() {

  var _dataTable = [];
  
  function _addIssueData(issues) {
    // All columns from issue list that may be useful in charts
    var dataPoints = { 
      'Title': 'Title',
      'System': 'System',
      'Issue Type': 'Type_x002F_Category',
      'Status': 'Helpdesk_x0020_Status',
      'Request': 'Comment',
      'Location': 'UrlOrPage',
      'Due Date': 'Need_x0020_By_x0020_Date',
      'Requested Date': 'Requested_x0020_Date',
      'Priority': 'Helpdesk_x0020_Priority',
      'Date Modified': 'Modified',
      'Date Closed': 'Date_x0020_Closed',
      'Id' : 'ID',
      'Requested By': 'RequestorId',
      'Estimated Work Hours': 'Work_x0020_Hours_x0020_Estimate',
      'Actual Work Hours': 'Actual_x0020_Hours'
    };
    // Column Names
    var columns = Object.keys(dataPoints);
    var itemVals, issueProp, issuePropVal;

    _dataTable.push(columns); // Add column titles
    
    issues.forEach(function(issue) {
      itemVals = [];
      columns.forEach(function(column){
        issueProp = dataPoints[column];
        issuePropVal = issue[issueProp];
        itemVals.push(issuePropVal);
      });
      _dataTable.push(itemVals); // Add item
    });
  }
  
  function _drawChart() {
    
    var data = google.visualization.arrayToDataTable(_dataTable);
    var sliceColors = []
    var options = {
      title: 'Status of current requests',
      chartArea: { left: 15, top: 25 },
      height: 500,
      pieHole: 0.4,
      pieSliceText: 'percentage',
      animation: {
        duration: 500,
        easing: 'out'
      }
    };
    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    
    data.sort([{column: 3}]);
    
    var groupedData = google.visualization.data.group(data, [3], [{'column': 3,'aggregation': google.visualization.data.count, 'type': 'number'}]);
    
    for(var i = 0; i < groupedData.qg.length; i++) {
      var dataItem = groupedData.qg[i];
      var dataItemPropVal = dataItem.c[0].v;
      
      switch (dataItemPropVal) {
        case '10 - Initiated':
          sliceColors.push({color: '#555555'});
          break;
        case '20 - Assigned':
          sliceColors.push({color: '#5c2d91'});
          break;
        case '30 - In Progress':
          sliceColors.push({color: '#1B6cb5'});
          break;
        case '40 - Ready for Review':
          sliceColors.push({color: '#008272'});
          break;
        case '50 - Update RunBook':
          sliceColors.push({color: '#808080'});
          break;
        case '60 - Ready for Release':
          sliceColors.push({color: '#6bb835'});
          break;
        case '70 - On Hold':
          sliceColors.push({color: '#d98c24'});
          break;
        case '80 - Complete':
          sliceColors.push({color: '#24933c'});
          break;
        case '90 - Cancelled':
          sliceColors.push({color: '#e31421'});
          break;
        default:
          break; 
      } 
      
    }
    options.slices = sliceColors;    
    chart.draw(groupedData, options);
  }
  
  function _loadCharts() {
    google.charts.load('current', {packages:['corechart']});
    google.charts.setOnLoadCallback(_drawChart);
  }
  
  /**
   * Init function
   */
  function _init() { 
    //_issueCount.get().subscribe(function(res){
    Frosting.Helpdesk.Issues.allIssues
      .subscribe(function(issues) {
        _addIssueData(Frosting.Helpdesk.Issues.issues, { 'Status' : 'Helpdesk_x0020_Status' });
        _loadCharts();
        SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('helpdeskCharts.js');
    });
  }
  /**
   * MDS Init function
   */
  function _mdsInit() {
    var thisUrl = _spPageContextInfo.siteServerRelativeUrl + '_catalogs/masterpage/FrostingCustom/helpdesk-layout/js/helpdeskCharts.js';
    _init();
    RegisterModuleInit(thisUrl, _init);
  }
  
  return {
    init: _init,
    mdsInit: _mdsInit
  }

})();

if(typeof _spPageContextInfo != 'undefined' && _spPageContextInfo != null) {
  Frosting.Helpdesk.Charts.mdsInit();
} else {
  Frosting.Helpdesk.Charts.init();
}
