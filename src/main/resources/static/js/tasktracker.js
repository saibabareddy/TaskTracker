var employee ={};
var user ={};

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
	 var date = m+"-"+_d+"-"+y
	 return date
}

function get30Minutesplus(){
	var d = new Date();    
	var h = addZero(d.getUTCHours());
	var m = addZero(d.getUTCMinutes()+30);
	var s = addZero(d.getUTCSeconds());
	var time =  h + ":" + m + ":" + s;
	return time;
}

// to set date
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





// get list of employees
function _refreshEmployees() {
	
	$.ajax({
		    'url' : '/tasktracker/tasks/employees',
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		    		console.log(data[index].name);
		    		_generateEmpList(data[index].name);
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
		    'url' : '/tasktracker/tasks/listtasks/'+date,
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		    		_generateTasksList(data[index].name,data[index].task);
		            });
		    },
			'error' : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		  });
	}

/*
 * $("#TaskSubmit").click(function( event ) { event.preventDefault(); var
 * incomingDate = $("#date").text(); var incomingTime = $("#time").text(); var
 * incomingName = $("#employeeName").val(); var incomingTask =
 * $("#tasktext").val() var response ={ date : incomingDate, time :
 * incomingTime, name : incomingName, task : incomingTask }
 * console.log(JSON.stringify(response, null, '\t')); $.ajax({ 'url' :
 * '/tasktracker/tasks/insertTasks', 'type' : 'POST', 'data' :
 * JSON.stringify(response), 'contentType': 'application/json', 'success' :
 * function(data) { console.log(data.status); }, 'error' :
 * function(XMLHttpRequest, textStatus, errorThrown){ console.log(textStatus); }
 * });
 * 
 * });
 */

function showStandUp(){
	$("#eveningScrum").hide();
	_refreshEmployees();
	$("#standUp").show();
}
function showEveningScrum(){
	$("#standUp").hide();
	_refreshTasks();
	$("#eveningScrum").show();
}

function _generateEmpList(value){
	var row=[];
	row.length=0;
	row.push("<td id='name'>"+value+"</td>");
	row.push("<td id='task'><textarea col='4' row='50' placeholder='Enter Tasks...' class='form-control'></textarea></td>");
	row.push('<td><button type="button" class="saveButton btn btn-success btn-lg" id="TaskStatusSubmit">Save <span class="glyphicon glyphicon-floppy-save"></span></button></td>');
	$("<tr/>",{ html:row.join("") }).appendTo("#employeeTable tbody");
	
}



function _generateTasksList(name,task){
	var row=[];
	row.length=0;
	row.push("<td  id='name'>"+name+"</td>");
	row.push("<td id='task'>"+task+"</td>");
	row.push('<td><select id="_status"><option value="" disabled selected="selected" style="display:none;">Label</option><option value="true">Completed</option><option value="false">Not Completed</option></select></td>');
	row.push('<td><button type="button" class="saveTaskButton btn btn-success btn-lg" id="TaskStatusSubmit">Save <span class="glyphicon glyphicon-floppy-save"></span></button></td>"');
	$("<tr/>",{ html:row.join("") }).appendTo("#tasksTable tbody");
	
}

$(document).on('click', '.saveButton',function(e) {
	var response = {};
    var currentTD = $(this).parents('tr').find('td');   
    console.log($(this).parents('tr').find('#error').text());
        $.each(currentTD, function () {
        	var _id=$(this).attr('id');
        	if(_id === "name" )
        	{
        	response[_id] = $(this).text();
        	}
        	if(_id === "task" )
        	{
        	response[_id] = $(this).find('textarea').val();
        	}
        }); 
        response["date"] = getDate();
        response["time"] = getTime();
     if(response.task){
      console.log(JSON.stringify(response, null, '\t'));
  	  $.ajax({
  		    'url' : '/tasktracker/tasks/insertTasks',
  		    'type' : 'POST',
  		    'data' : JSON.stringify(response),
  		    'contentType': 'application/json',
  		    'success' : function(data) {
  		    				console.log(data.status);
  		    				if(data.status === "true")
  		    				{
  		    				var message = "Task Saved";
  		    				$('#standUp .error').addClass("alert alert-success");
		    				$('#standUp .error').html('<div><span class="glyphicon glyphicon-ok-circle"></span> Saved</div>');
  		    				}
  		    				if(data.status === "alreadyExists")
  		    				{
  		    					var message = "Already Saved your task";
  		    					messagepopup(message);
  		    					 
  		    				}
  		    },
  			'error' : function(XMLHttpRequest, textStatus, errorThrown){
  				console.log(textStatus);
  			}
  		  });
      }
      else{
    	  $('#standUp .error').addClass("alert alert-danger");
    	  $('#standUp .error').text(" Task should not be null");
      }
        
    });

$(document).on('click', '.saveTaskButton',function(e) {
	var response = {};
    var currentTD = $(this).parents('tr').find('td');  
    console.log($(this).parents('tr').find("#_status").val());
    var status= $(this).parents('tr').find("#_status").val();
    $.each(currentTD, function () {
        	var _id=$(this).attr('id');
        	if(_id === "name" )
        	{
        		response[_id] = $(this).text();
        	}
        	if(_id === "task" )
        	{
        		response[_id] = $(this).text();
        	}
        }); 
        response["date"] = getDate();
        response["time"] = getTime();
        response["status"] = status;
        
    if(status === "true")
    {	
      console.log(JSON.stringify(response, null, '\t'));
  	  $.ajax({
  		    'url' : '/tasktracker/tasks/updateTasks',
  		    'type' : 'POST',
  		    'data' : JSON.stringify(response),
  		    'contentType': 'application/json',
  		    'success' : function(data) {
  		    	console.log(data.status);
  				if(data.status === "true")
  				{
  					var message = "Status Saved";
  					 $('#standUp .error').addClass("alert alert-success");
   					$('#standUp .error').html('<div><span class="glyphicon glyphicon-ok-circle"></span> Saved</div>');
  				}
  				if(data.status === "alreadyExists")
  				{
  					var message= "Already Saved your Status";
  					messagepopup(message);
  				}
  		    },
  			'error' : function(XMLHttpRequest, textStatus, errorThrown){
  				console.log(textStatus);
  			}
  		  });
    }
    else{
    	 $('#standUp .error').addClass("alert alert-danger");
  	  $('#standUp .error').text(" Task should not be null");
    }
      
    
    
    });

$("#reasonSubmit").click(function( event ) {
event.preventDefault();
var incomingDate = $("#popup_box #date").val();
var incomingTime = $("#popup_box #time").val();
var incomingName = $("#popup_box #name").val();
var incomingTask = $("#popup_box #task").val();
var incomingStatus = $("#popup_box #status").val();
var incomingReason = $("#popup_box #reason").val();
var response ={
		date : incomingDate,
		time : incomingTime,
		name : incomingName,
		task : incomingTask,
		status : incomingStatus,
		reason : incomingReason
		
}
console.log(JSON.stringify(response, null, '\t'));
$.ajax({
	    'url' : '/tasktracker/tasks/updateTasks',
	    'type' : 'POST',
	    'data' : JSON.stringify(response),
	    'contentType': 'application/json',
	    'success' : function(data) {
	    	 			hidepopup();
	    	 			console.log(data.status);
	      				if(data.status === "true")
	      				{
	      				var message = "Status Saved";
	      				messagepopup(message);
	      				}
	      				if(data.status === "alreadyExists")
	      				{
	      					var message = "Already Saved your Status";
	      					messagepopup(message);
	      				}
	    				
	    },
		'error' : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(textStatus);
		}
	  });

});

$(document).on('change', '#_status',function(e) {
	var response = {};
    var currentTD = $(this).parents('tr').find('td');  
    console.log($(this).parents('tr').find("#_status").val());
    var status= $(this).parents('tr').find("#_status").val();
    $.each(currentTD, function () {
        	var _id=$(this).attr('id');
        	if(_id === "name" )
        	{
        		response[_id] = $(this).text();
        	}
        	if(_id === "task" )
        	{
        		response[_id] = $(this).text();
        	}
        }); 
   response["date"] = getDate();
   response["time"] = getTime();
   response["status"] = status;  
   if(status === "false")
   {
     showpopup(response);
   }
	
});


$("#cancel_button").click(function(e){
	e.preventDefault();
	  hidepopup();
});
	 
$("#close_button").click(function(e){
	e.preventDefault();
	  hidepopup();
	 });

$(document).on('click', '.ok_btn',function(e){
	e.preventDefault();
	hidemessagepopup();
	 });


function showpopup(response){
	console.log("inside pop up ="+ response);
	 $("#popup_box").fadeToggle();
	 $("#popup_box").css({"visibility":"visible","display":"block"});
	 $("#popup_box #name").val(response.name);
	 $("#popup_box #task").val(response.task);
	 $("#popup_box #time").val(response.time);
	 $("#popup_box #date").val(response.date);
	 $("#popup_box #status").val(response.status);
}

function messagepopup(message){
	$("#message_box").html("<br/><div align='center'>"+ message +"</div><br/><input type='button' class='ok_btn' id='ok_button' value='OK'/><br/><br/>");
	 $("#message_box").fadeToggle();
	 $("#message_box").css({"visibility":"visible","display":"block"});
}

function hidemessagepopup()
{
 $("#message_box").css({"visibility":"hidden","display":"none"});
}

function hidepopup()
{
 $("#popup_box").fadeToggle();
 $("#popup_box").css({"visibility":"hidden","display":"none"});
}


function progressUpdater(htmlElement,start){
	// set progress bar
	   var maxTime = 3600000;
	   var timeoutVal = Math.floor(maxTime/100);
	   animateUpdate();

	   function updateProgress(percentage) {
	       $(htmlElement).css("width", percentage + "%");
	       
	       if(percentage === 80)
	       {
	    	   $(htmlElement).css("background","#ff8000");
	       }
	       if(percentage === 95)
	       {
	    	   $(htmlElement).css("background","#ff0000");
	       }
	       else{
	    	   $(htmlElement).css("background", "#00ff00"); 
	       }
	   }

	   function animateUpdate() {
	       var now = new Date();
	       var timeDiff = now.getTime() - start;
	       var perc = Math.round((timeDiff/maxTime)*100);
	       console.log(perc);
	         if (perc <= 100) {
	          updateProgress(perc);
	          setTimeout(animateUpdate, timeoutVal);
	         }
	   }
	   
}


function timer(countDownTime,htmlElement,htmlElement1){
	// Update the count down every 1 second
	var x = setInterval(function() {

	    // Get todays date and time
	    var now = new Date().getTime();
	    
	    
	    // Find the distance between now an the count down date
	    var distance = countDownTime - now;
	    
	    // Time calculations for days, hours, minutes and seconds
	    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	    
	    // Output the result in an element with id="demo"
	   $(htmlElement1).text(days + "d " + hours + "h "+ minutes + "m " + seconds + "s ");
	   
	   
	    
	    // If the count down is over, write some text
	    if (distance < 0) {
	        clearInterval(x);
	        $(htmlElement1).text("Closing");
	    }
	}, 1000);
}

function showHideToggle(){
	setInterval(function() {
		showMorningStandup();	
	}, 378000);
}

$(document).ready(function(){
	
		var d = new Date();
	 	var countDate = new Date();
	 	var timerNow = new Date();
	
	
	if(d.getUTCHours() >= 02 && d.getUTCHours() < 03){
					countDate.setUTCHours(03);
					countDate.setUTCMinutes(00);
					countDate.setUTCSeconds(00);
					timerNow.setUTCHours(02);
					timerNow.setUTCMinutes(00);
					timerNow.setUTCSeconds(00);
					 $("#eveningScrum").hide();
					$("#standUp").fadeIn(3000);
					var htmlElement = ".morning_Timer";
					var htmlElement1 =".morningTime";
					progressUpdater(htmlElement,timerNow.getTime());
					timer(countDate.getTime(),htmlElement,htmlElement1);
		 	}
		 	else if(d.getUTCHours() >= 03 && d.getUTCHours() < 04){
		 		countDate.setUTCHours(04);
				countDate.setUTCMinutes(00);
				countDate.setUTCSeconds(00);
				timerNow.setUTCHours(03);
				timerNow.setUTCMinutes(00);
				timerNow.setUTCSeconds(00);
		 		$("#standUp").hide();
		 		$("#eveningScrum").fadeIn(3000);
		 		var htmlElement = ".evening_Timer";
				var htmlElement1 =".eveningTime";
				progressUpdater(htmlElement,timerNow.getTime());
				timer(countDate.getTime(),htmlElement,htmlElement1);	
		 } else{
			 $("#standUp").hide();
			 $("#eveningScrum").hide();
		 }
	
	_refreshEmployees();
	_refreshTasks();
	_setDateandTime();
	hidepopup();
	hidemessagepopup();
	$(window).on("load resize ", function() {
		  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
		  $('.tbl-header').css({'padding-right':scrollWidth});
		}).resize();
	
	
		 

});       	   
            	

