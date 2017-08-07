package com.tasktracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Employees {
	String id;
	String Name;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	
	

}
