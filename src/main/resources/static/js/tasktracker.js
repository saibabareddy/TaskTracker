var employeesList = [];
var employee ={};
var _date = new Date();
var utcString = _date.toUTCString();
//to set date 
function _getDate(){
	$("#date").css('text-align', 'justify');
	$("#date").css('font-family', 'Times New Roman');
	$("#date").css('font-weight', '600');
	$("#date").text(utcString);
	$("#_date").css('text-align', 'justify');
	$("#_date").css('font-family', 'Times New Roman');
	$("#_date").css('font-weight', '600');
	$("#_date").text(utcString);
}



//get list of employees
function _refreshEmployees() {
	
	$.ajax({
		    'url' : '/tasktracker/tasks/employees',
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

$("#TaskSubmit").click(function( event ) {
	  event.preventDefault();
	  var incomingDate = $("#date").text();
	  var incomingName = $("#employeeName").val();
	  var incomingTask = $("#tasktext").val()
	  var response ={
			date : incomingDate,
	  		name : incomingName,
	  		task : incomingTask
	  }
	  console.log(JSON.stringify(response, null, '\t'));
	  
/*	  $.ajax({
		    'url' : '/tasktracker/tasks/updateTasks',
		    'type' : 'POST',
		    'data' : JSON.stringify(response),
		    'contentType': 'application/json',
		    'success' : function(data) {
		    				console.log(data.status);
		    },
			'error' : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		  });*/
	  $.ajax({
		    'url' : '/tasktracker/tasks/insertTasks',
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
	_getDate();
	
	$( "#employeeName" ).autocomplete({ 
	    source: employeesList,
	    select: function(event, ui) {
	        var index = employeesList.indexOf(ui.item.value);
	    }
	});
	
	$( "#_employeeName" ).autocomplete({ 
	    source: employeesList,
	    select: function(event, ui) {
	        var index = employeesList.indexOf(ui.item.value);
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
            	

