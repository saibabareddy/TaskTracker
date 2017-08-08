package com.tasktracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Tasks {
		
		String date;
		String time;
		String name;
		String task;
		String status;
		String reason;
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getTask() {
			return task;
		}
		public void setTask(String task) {
			this.task = task;
		}
		public String getReason() {
			return reason;
		}
		public void setReason(String reason) {
			this.reason = reason;
		}
		public String getTime() {
			return time;
		}
		public void setTime(String time) {
			this.time = time;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		
		
		

}
