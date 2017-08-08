var employeesList = [];
var tasksList = [];
var employee ={};

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime(){
		var d = new Date();    
		var h = addZero(d.getUTCHours());
		var m = addZero(d.getUTCMinutes());
		var s = addZero(d.getUTCSeconds());
		var time =  h + ":" + m + ":" + s;
		return time;
}

function getDate(){
	 var d = new Date();
	 var y = addZero(d.getUTCFullYear());
	 var _d = addZero(d.getUTCDate());
	 var m = addZero(d.getUTCMonth()+1);
	 var date = _d+"-"+m+"-"+y
	 return date
}

//to set date 
function _setDateandTime(){
	$("#date").css('text-align', 'justify');
	$("#date").css('font-family', 'Times New Roman');
	$("#date").css('font-weight', '600');
	$("#date").text(getDate());
	$("#_date").css('text-align', 'justify');
	$("#_date").css('font-family', 'Times New Roman');
	$("#_date").css('font-weight', '600');
	$("#_date").text(getDate());
	$("#time").css('text-align', 'justify');
	$("#time").css('font-family', 'Times New Roman');
	$("#time").css('font-weight', '600');
	$("#time").text(getTime());
	$("#_time").css('text-align', 'justify');
	$("#_time").css('font-family', 'Times New Roman');
	$("#_time").css('font-weight', '600');
	$("#_time").text(getTime());
}



//get list of employees
function _refreshEmployees() {
	
	$.ajax({
		    'url' : '/TaskTracker/tasktracker/tasks/employees',
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		            var e = { label :data[index].name , value :data[index].name};
		            console.log(e);
		            employeesList.push(e);
		            $.each(employeesList,function(index){
		            	var e = employeesList[index];
		            	console.log(e);
		            });
		            
		        });
		    },
			'error' : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		  });
	}

function _refreshTasks() {
	var date = getDate();
	$.ajax({
		    'url' : '/TaskTracker/tasktracker/tasks/listtasks/'+date,
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		            var e = { label :data[index].name , value :data[index].task};
		            console.log(e);
		            tasksList.push(e);
		            $.each(tasksList,function(index){
		            	var e = tasksList[index];
		            	console.log(e);
		            });
		            
		        });
		    },
			'error' : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		  });
	}

$("#TaskSubmit").click(function( event ) {
	  event.preventDefault();
	  var incomingDate = $("#date").text();
	  var incomingTime = $("#time").text();
	  var incomingName = $("#employeeName").val();
	  var incomingTask = $("#tasktext").val()
	  var response ={
			date : incomingDate,
			time : incomingTime,
	  		name : incomingName,
	  		task : incomingTask
	  }
	  console.log(JSON.stringify(response, null, '\t'));
	  $.ajax({
		    'url' : '/TaskTracker/tasktracker/tasks/insertTasks',
		    'type' : 'POST',
		    'data' : JSON.stringify(response),
		    'contentType': 'application/json',
		    'success' : function(data) {
		    				console.log(data.status);
		    },
			'error' : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		  });
	  
	});

function showStandUp(){
	$("#eveningScrum").hide();
	$("#standUp").show();
}
function showEveningScrum(){
	$("#standUp").hide();
	$("#eveningScrum").show();
}



$(document).ready(function(){
	$("#standUp").hide();
	$("#eveningScrum").hide();
	_refreshEmployees();
	_refreshTasks();
	_setDateandTime();
	
	$( "#employeeName" ).autocomplete({ 
	    source: employeesList,
	    select: function(event, ui) {
	        var index = employeesList.indexOf(ui.item.value);
	    }
	});
	
	$( "#_employeeName" ).autocomplete({ 
	    source: tasksList,
	    select: function(event, ui) {
	    	event.preventDefault();
	    	$("#_employeeName").val(ui.item.label);
	        $("#_tasktext").val(ui.item.value); 
	    }
	});
	

   
 /*  var app = angular.module("ShipmentManagement", []);
		//Controller Part
	app.controller("ShipmentController", function($scope, $http) {           
   $scope.shipments = [];
   $scope.shipmentForm = {
           id : -1,
           name : "",
           provider : ""
       };
 //Now load the data from server
   _refreshshipmentData();
 
   //HTTP POST/PUT methods for add/edit country 
   // with the help of id, we are going to find out whether it is put or post operation
   
   $scope.submitShipment = function() {

       var method = "";
       var url = "";
       
       if ($scope.shipmentForm.id == -1) {
           //Id is absent in form data, it is create new country operation
           method = "POST";
           url = 'http://localhost:8080/newShipment';
       } 
       $http({
           method : method,
           url : url,
           data : angular.toJson($scope.shipmentForm),
           headers : {
               'Content-Type' : 'application/json'
           }
       }).then( _success, _error );
   };

  
   
  Private Methods 
   //HTTP GET- get all shipments collection
   function _refreshshipmentData() {
       $http({
           method : 'GET',
           url : 'http://localhost:8080/Shipments'
       }).then(function successCallback(response) {
           $scope.shipments = response.data;
       }, function errorCallback(response) {
           console.log(response.statusText);
       });
   }

   function _success(response) {
       _refreshshipmentData();
       _clearFormData()
   }

   function _error(response) {
       console.log(response.statusText);
   }
});*/
});       	   
            	

