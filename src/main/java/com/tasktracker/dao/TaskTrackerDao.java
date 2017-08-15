package com.tasktracker.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.tasktracker.model.Employees;
import com.tasktracker.model.Tasks;


@Repository
public class TaskTrackerDao {
//	private static final String DRIVER_NAME = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
//	private static final String DB_URL = "jdbc:sqlserver://localhost:1433;DatabaseName=ca";
//	private static final String ID = "sa";
//	private static final String PASS = "sa";
	
//	// Oracle
//	private static final String DRIVER_NAME = "oracle.jdbc.driver.OracleDriver";
//	private static final String DB_URL = "jdbc:oracle:thin:@//mastan.cc04xsvfdyut.us-east-1.rds.amazonaws.com:1521/MASTAN";
//	private static final String ID = "mastan";
//	private static final String PASS = "mastanbaba";
	
	/*// MySQL
	private static final String DRIVER_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_URL = "jdbc:mysql:/tasktracker.cc04xsvfdyut.us-east-1.rds.amazonaws.com:3306/TASKTRACKER";
	private static final String ID = "TaskTracker";
	private static final String PASS = "tasktracker";*/
	
	// PostgreSQL
//	private static final String DRIVER_NAME = "org.postgresql.Driver";
//	private static final String DB_URL = "jdbc:postgresql:ca";
//	private static final String ID = "postgres";
//	private static final String PASS = "postgres";
	//comment
	
	private static final String DELETE = "DELETE FROM Employee WHERE id=?";
	private static final String FIND_ALL_EMPLOYEES = "SELECT * FROM Employee ORDER BY id";
	private static final String FIND_ALL_TASKS = "SELECT * FROM Tasks where date = ?";
	private static final String EMPLOYEE_MAX_ID = "SELECT MAX(ID) FROM Employee";
	private static final String TASKS_MAX_ID = "SELECT MAX(ID) FROM Tasks";
	private static final String FIND_BY_ID = "SELECT * FROM Employee WHERE id=?";
	private static final String FIND_BY_NAME = "SELECT * FROM Employee WHERE name=?";
	private static final String INSERT_EMPLOYEE = "INSERT INTO Employee(id,name) VALUES(?,?)";
	private static final String INSERT_TASK = "INSERT INTO Tasks(id,name,task,date,time,status,reason) VALUES(?,?,?,?,?,?,?)";
	private static final String UPDATE_TASK = "UPDATE Tasks SET status = ?,reason=? WHERE date = ? and name =?";
	private static final String UPDATE = "UPDATE Employee SET name=? WHERE id=?";
	private static final String FIND_TASK = "SELECT name,date from Tasks where name=? and date=?";
	private static final String FIND_TASK_STATUS = "SELECT status from Tasks where name=? and date=?";
	
	
	public int delete(int id) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(DELETE);
			stmt.setInt(1, id);
			
			return stmt.executeUpdate();
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
	}
	
	public List<Employees> findAllEmployees() {
		Connection conn = null;
		PreparedStatement stmt = null;
		List<Employees> list = new ArrayList<Employees>();
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_ALL_EMPLOYEES);
			
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				Employees employee = new Employees();
				employee.setId(rs.getInt("id")+"");
				employee.setName(rs.getString("name"));
				list.add(employee);
			}
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		return list;
	}
	
	public List<Tasks> findAllTasks(String date) {
		Connection conn = null;
		PreparedStatement stmt = null;
		List<Tasks> list = new ArrayList<Tasks>();
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_ALL_TASKS);
			stmt.setString(1, date);
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				Tasks task = new Tasks();
				task.setName(rs.getString("name"));
				task.setTask(rs.getString("task"));
				task.setStatus(rs.getString("status"));
				task.setReason(rs.getString("task"));
				list.add(task);
			}
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		return list;
	}
	
	public Integer EmployeefindMaxId() {
		Connection conn = null;
		PreparedStatement stmt = null;
		int maxId= 0;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(EMPLOYEE_MAX_ID);
			ResultSet rs = stmt.executeQuery();
			while(rs.next())
			{
				maxId = rs.getInt(1);
			}
			
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		
		return maxId;
	}
	
	public Integer TaskfindMaxId() {
		Connection conn = null;
		PreparedStatement stmt = null;
		int maxId= 0;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(TASKS_MAX_ID);
			ResultSet rs = stmt.executeQuery();
			while(rs.next())
			{
				maxId = rs.getInt(1);
			}
			
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		
		return maxId;
	}
	
	public Employees findById(int id) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_BY_ID);
			stmt.setInt(1, id);
			
			ResultSet rs = stmt.executeQuery();
			
			if (rs.next()) {
				Employees employee = new Employees();
				employee.setId(rs.getString("id"));
				employee.setName(rs.getString("name"));
				return employee;
			} else {
				return null;
			}
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
	}
	
	public Employees findByName(String name) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_BY_NAME);
			stmt.setString(1, name);
			ResultSet rs = stmt.executeQuery();
			
			if (rs.next()) {
				Employees employee = new Employees();
				employee.setId(rs.getInt("id")+"");
				employee.setName(rs.getString("name"));
				return employee;
			} else {
				return null;
			}
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
	}
	
	public String findTaskfExists(Tasks task) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_TASK);
			stmt.setString(1, task.getName());
			stmt.setString(2, task.getDate());
			ResultSet rs = stmt.executeQuery();
			String result;
			boolean empty = true;
			while( rs.next() ) {
			    // ResultSet processing here
			    empty = false;
			    result = "exists";
			    return result;
			}

			if( empty ) {
			    // Empty result set
				 result = "notexists";
				    return result;
			}
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		return null;
	}
	
	public String findStatusifExists(Tasks task) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_TASK_STATUS);
			stmt.setString(1, task.getName());
			stmt.setString(2, task.getDate());
			ResultSet rs = stmt.executeQuery();
			String result;
			while( rs.next() ) {
			    result=rs.getString(1);
			    return result;
			}
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		return null;
	}
	
	
	public int insertEmployee(String name) {
		Connection conn = null;
		PreparedStatement stmt = null;
		int id = EmployeefindMaxId()+1;
		int result;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(INSERT_EMPLOYEE);
			stmt.setInt(1,id);
			stmt.setString(2,name);
			result = stmt.executeUpdate();
			
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		return result;
	}
	
	
	public int insertTask(Tasks task) {
		Connection conn = null;
		PreparedStatement stmt = null;
		int id = TaskfindMaxId()+1;
		int result;
		String _existsornot = findTaskfExists(task);
		if(_existsornot.equals("notexists"))
		{
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(INSERT_TASK);
			stmt.setInt(1,id);
			stmt.setString(2,task.getName());
			stmt.setString(3,task.getTask());
			stmt.setString(4, task.getDate());
			stmt.setString(5, task.getTime());
			stmt.setString(6, task.getStatus());
			stmt.setString(7, task.getReason());
			result = stmt.executeUpdate();
			
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		}
		else {
			result= 2;
		}
		return result;
	}
	
	public int update(Employees employee) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(UPDATE);
			stmt.setString(1, employee.getName());
			stmt.setInt(2, Integer.parseInt(employee.getId()));
			return stmt.executeUpdate();
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
	}
	
	public int updateTask(Tasks task) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String status=findStatusifExists(task);
		int result;
		if(status == null)
		{
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(UPDATE_TASK);
			stmt.setString(1, task.getStatus());
			stmt.setString(2, task.getReason());
			stmt.setString(3, task.getDate());
			stmt.setString(4, task.getName());
			return stmt.executeUpdate();
		}
		catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
		} 
		else {
			return 2;
		}
		
	}
	
	
private Connection getConnection() {
		
		Connection conn = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url = "jdbc:mysql://wmsmysql.cun5uvzp5qky.us-east-1.rds.amazonaws.com:3306/TASKTRACKER";
			conn = DriverManager.getConnection(url, "wmsmysqladmin", "WMSMySQLPass1");
			System.out.println("COnnection Successful");
		} catch (Exception e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		}
		return conn;
	}
	
	
	private static void close(Connection con) {
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				// e.printStackTrace();
				throw new RuntimeException(e);
			}
		}
	}
	
	
	private static void close(Statement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				// e.printStackTrace();
				throw new RuntimeException(e);
			}
		}
	}


}
