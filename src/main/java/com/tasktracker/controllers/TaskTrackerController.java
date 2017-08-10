package com.tasktracker.controllers;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.tasktracker.model.Employees;
import com.tasktracker.model.Tasks;
import com.tasktracker.service.TaskTrackerService;

@Path("/tasks")
public class TaskTrackerController {
	
	@Autowired
	TaskTrackerService tasktrackerService;
	
	@Path("/employees")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Employees> getEmployees() {
		return tasktrackerService.getEmployees();
	}
	
	@Path("/listtasks/{date}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tasks> getTasks(@PathParam("date") String date) {
		return tasktrackerService.getTasks(date);
	}
	
	
	@Path("/insertTasks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Tasks insertTasks(Tasks incomingTask) {
		int status = tasktrackerService.insertTasks(incomingTask);
		if(status == 1)
		{
			incomingTask.setStatus("true");
		}
		if(status == 2) {
			incomingTask.setStatus("alreadyExists");
		}
		return incomingTask;
		
	}
	
	@Path("/updateTasks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Tasks updateTasks(Tasks incomingTask) {
		int status = tasktrackerService.updateTasks(incomingTask);
		if(status == 1)
		{
			incomingTask.setStatus("true");
		}
		if(status == 2) {
			incomingTask.setStatus("alreadyExists");
		}
		return incomingTask;
		
	}
	
}
