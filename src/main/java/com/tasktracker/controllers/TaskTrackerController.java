package com.tasktracker.controllers;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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
	
	
	@Path("/updateTasks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Tasks updateTasks(Tasks incomingTask) {
		System.out.println(incomingTask.getDate());
		System.out.println(incomingTask.getName());
		System.out.println(incomingTask.getTask());
		System.out.println(incomingTask.getReason());
		System.out.println(incomingTask.isStatus());
		return incomingTask;
		
	}
	@Path("/insertTasks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)

		public int insertTasks(int incomingTask) {

			return incomingTask;
		
	}
	
}
