package com.tasktracker.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.tasktracker.model.Employees;

public class TaskTrackerDao {
//	private static final String DRIVER_NAME = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
//	private static final String DB_URL = "jdbc:sqlserver://localhost:1433;DatabaseName=ca";
//	private static final String ID = "sa";
//	private static final String PASS = "sa";
	
	// Oracle
//	private static final String DRIVER_NAME = "oracle.jdbc.driver.OracleDriver";
//	private static final String DB_URL = "jdbc:oracle:thin:@dbserver:1521:xe";
//	private static final String ID = "sys";
//	private static final String PASS = "orcl";
	
	// MySQL
	private static final String DRIVER_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_URL = "jdbc:mysql://mastan.ct5jg6x9mvrp.us-east-1.rds.amazonaws.com:3306/mastan";
	private static final String ID = "mastan";
	private static final String PASS = "mastanbaba";
	
	// PostgreSQL
//	private static final String DRIVER_NAME = "org.postgresql.Driver";
//	private static final String DB_URL = "jdbc:postgresql:ca";
//	private static final String ID = "postgres";
//	private static final String PASS = "postgres";
	
	private static final String DELETE = "DELETE FROM Employee WHERE id=?";
	private static final String FIND_ALL = "SELECT * FROM Employee ORDER BY id";
	private static final String MAX_ID = "SELECT MAX(ID) FROM Employee";
	private static final String FIND_BY_ID = "SELECT * FROM Employee WHERE id=?";
	private static final String FIND_BY_NAME = "SELECT * FROM Employee WHERE name=?";
	private static final String INSERT = "INSERT INTO Employee(id,name) VALUES(?,?)";
	private static final String UPDATE = "UPDATE Employee SET name=? WHERE id=?";
	
	
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
	
	public Integer findMaxId() {
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
	
	public int insert(String name) {
		Connection conn = null;
		PreparedStatement stmt = null;
		int id = findMaxId()+1;
		int result;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(INSERT);
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
		try {
			Class.forName(DRIVER_NAME);
			return DriverManager.getConnection(DB_URL, ID, PASS);
		} catch (Exception e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		}
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
