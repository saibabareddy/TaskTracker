package com.tasktracker.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasktracker.dao.TaskTrackerDao;
import com.tasktracker.model.Employees;
import com.tasktracker.model.Tasks;

@Service
public class TaskTrackerService {

@Autowired
TaskTrackerDao tasktrackerDao = new TaskTrackerDao();
public List<Employees> getEmployees(){
		return tasktrackerDao.findAllEmployees();
	}

public List<Tasks> getTasks(String date){
	return tasktrackerDao.findAllTasks(date);
}

public int insertTasks(Tasks task){
	return tasktrackerDao.insertTask(task);
}
	
}
