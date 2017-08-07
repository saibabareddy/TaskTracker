package com.tasktracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Tasks {
		
		String date;
		String name;
		String task;
		boolean status;
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
		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public String getReason() {
			return reason;
		}
		public void setReason(String reason) {
			this.reason = reason;
		}
		
		

}
