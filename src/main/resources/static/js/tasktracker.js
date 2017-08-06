
            	

 $(document).ready(function(){
	 var _date = new Date();
	 var utcString = _date.toUTCString();
	
// to set date 
	$("#date").css('text-align', 'justify');
	$("#date").css('font-family', 'Times New Roman');
	$("#date").css('font-weight', '600');
	$("#date").text(utcString);

function _refreshEmployees() {
	$.ajax({
		    'url' : '/tasktracker/test',
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		            alert(data[index].name);
		        });
		    }
		  });
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
            	   
            	

