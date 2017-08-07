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
//	
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
	
	//private static final String DELETE = "DELETE FROM Employee WHERE id=?";
	private static final String FIND_ALL = "SELECT * FROM Employee ORDER BY name";
	//private static final String MAX_ID = "SELECT MAX(ID) FROM Employee";
	//private static final String FIND_BY_ID = "SELECT * FROM Employee WHERE id=?";
	//private static final String FIND_BY_NAME = "SELECT * FROM Employee WHERE name=?";
	private static final String INSERT = "INSERT INTO Tasks(task) VALUES(?)";
	private static final String UPDATE = "UPDATE Employee SET name=? WHERE id=?";
	
	
/*	public int delete(int id) {
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
	}*/
	
	public List<Employees> findAll() {

		Connection conn = null;
		PreparedStatement stmt = null;
		List<Employees> list = new ArrayList<Employees>();
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(FIND_ALL);
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
	
/*	public Integer findMaxId() {
		Connection conn = null;
		PreparedStatement stmt = null;
		int maxId= 0;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(MAX_ID);
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
	}*/
	
	/*public Employees findById(int id) {
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
	}*/
	
	/*public Employees findByName(String name) {
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
	}*/
	
	public int insert(String task) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		int result;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(INSERT);
			stmt.setString(1,task);
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
	
	
	private Connection getConnection() {
		
		Connection conn = null;
		try {
			String url = "jdbc:mysql://wmsmysql.cun5uvzp5qky.us-east-1.rds.amazonaws.com:3306/TaskTracker";
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
