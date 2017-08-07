package com.tasktracker.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.tasktracker.model.Employees;

@Component
@Path("/test")
public class TestController {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Employees> test() {
		ArrayList<Employees> list = new ArrayList<>();
		Employees e = new Employees();
		e.setId("1");
		e.setName("Mastan");
		list.add(e);
		return list;
	}

}
