var employeesList = [];
var tasksList = [];
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
		    'url' : '/tasktracker/tasks/employees',
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		    		_generateEmpList(data[index].name);
		            var e = { label :data[index].name , value :data[index].name};
		            console.log(e);
		            employeesList.push(e);
		            $.each(employeesList,function(index, value){
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
		    'url' : '/tasktracker/tasks/listtasks/'+date,
		    'type' : 'GET',
		    'success' : function(data) {
		    	$.each(data, function(index) {
		    		_generateTasksList(data[index].name,data[index].task);
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

/*$("#TaskSubmit").click(function( event ) {
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
	  
	});*/

function showStandUp(){
	$("#eveningScrum").hide();
	$("#standUp").show();
}
function showEveningScrum(){
	$("#standUp").hide();
	$("#eveningScrum").show();
}

function _generateEmpList(value){
	var row=[];
	row.length=0;
	row.push("<td class='col-md-3'id='name'>"+value+"</td>");
	row.push("<td class='col-md-6' id='task'><input type='text' placeholder='Enter Tasks...' class='form-control'/></td>");
	row.push("<td class='col-md-6'><button type='button' class='saveButton' id='TaskSubmit'>Save</button></td>");
	row.push("<td style='display:none' id='error'>hello</td>");
	$("<tr/>",{ class:'morning_row',html:row.join("") }).appendTo("#employeeTable tbody");
	
}

function _generateTasksList(name,task){
	var row=[];
	row.length=0;
	row.push("<td class='col-md-3' id='name'>"+name+"</td>");
	row.push("<td class='col-md-3' id='task'>"+task+"</td>");
	row.push('<td class="col-md-2"><select id="_status"><option selected="selected" value="">default</option><option value="true">Completed</option><option value="false">Not Completed</option></select></td>');
	row.push("<td class='col-md-6'><button type='button' class='saveTaskButton' id='TaskStatusSubmit'>Save</button></td>");
	row.push("<td style='display:none' id='error'>hello</td>");
	$("<tr/>",{ class:'morning_row',html:row.join("") }).appendTo("#tasksTable tbody");
	
}

$(document).on('click', '.saveButton',function(e) {
	e.preventDefault();
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
        	response[_id] = $(this).find('input').val();
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
  		    				var message = "Task Saved";
  		    				messagepopup(message);
  		    },
  			'error' : function(XMLHttpRequest, textStatus, errorThrown){
  				console.log(textStatus);
  			}
  		  });
      }
      else{
    	  $(this).parents('tr').find('#error').css("display", "block");
    	  $(this).parents('tr').find('#error').addClass('col-md-6');
    	  $(this).parents('tr').find('#error').text(" Task should not be null");
      }
        
    });

$(document).on('click', '.saveTaskButton',function(e) {
	e.preventDefault();
	var response = {};
    var currentTD = $(this).parents('tr').find('td');  
    
    console.log($(this).parents('tr').find("#_status").val());
    var status= $(this).parents('tr').find("#_status").val();
    if(status){
    	
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
  		    				var message = "Status Submitted";
  		    				messagepopup(message);
  		    },
  			'error' : function(XMLHttpRequest, textStatus, errorThrown){
  				console.log(textStatus);
  			}
  		  });
      }
    else{
    	showpopup(response);
    }
    }
      else{
    	  $(this).parents('tr').find('#error').css("display", "block");
    	  $(this).parents('tr').find('#error').addClass('col-md-6');
    	  $(this).parents('tr').find('#error').text(" Select a Status of completed or not completed");
      }
        
    });

$("#reasonSubmit").click(function( event ) {
event.preventDefault();
var incomingDate = $("#popup_box #date").val();
var incomingTime = $("#popup_box #time").val();
var incomingName = $("#popup_box #name").val();
var incomingTask = $("#popup_box #task").val();
var incomingStatus = $("#popup_box #Status").val();
var incomingReason = $("#popup_box #reason").val();
var response ={
		date : incomingDate,
		time : incomingTime,
		name : incomingName,
		task : incomingTask,
		reason : incomingReason,
		status : incomingStatus
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
	    				var message = "Reason Submitted";
	    				messagepopup(message);
	    				
	    },
		'error' : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(textStatus);
		}
	  });

});

$("#cancel_button").click(function(e){
	e.preventDefault();
	  hidepopup();
});
	 
$("#close_button").click(function(e){
	e.preventDefault();
	  hidepopup();
	 });

$('.ok_btn').click(function(e){
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
 $("#message_box").fadeToggle();
 $("#message_box").css({"visibility":"hidden","display":"none"});
}

function hidepopup()
{
 $("#popup_box").fadeToggle();
 $("#popup_box").css({"visibility":"hidden","display":"none"});
}


$(document).ready(function(){
	$("#standUp").hide();
	$("#eveningScrum").hide();
	_refreshEmployees();
	_refreshTasks();
	_setDateandTime();
	/*$( "#employeeName" ).autocomplete({ 
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
	});*/
		 

});       	   
            	

