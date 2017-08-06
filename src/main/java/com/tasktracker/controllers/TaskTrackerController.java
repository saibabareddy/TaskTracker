package com.tasktracker.controllers;

import java.util.List;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.tasktracker.model.Employees;
import com.tasktracker.service.TaskTrackerService;

@Path("/tasks")
public class TaskTrackerController {
	
	@Autowired
	TaskTrackerService tasktrackerService;
	
	@Path("/employees")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Employees> getEmployees() {
		return tasktrackerService.getEmployees();
	}

}
