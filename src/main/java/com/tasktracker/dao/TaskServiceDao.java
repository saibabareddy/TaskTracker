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

public class TaskServiceDao {
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
	private static final String DB_URL = "jdbc:mysql://localhost/ca";
	private static final String ID = "root";
	private static final String PASS = "";
	
	// PostgreSQL
//	private static final String DRIVER_NAME = "org.postgresql.Driver";
//	private static final String DB_URL = "jdbc:postgresql:ca";
//	private static final String ID = "postgres";
//	private static final String PASS = "postgres";
	
	private static final String DELETE = "DELETE FROM employee WHERE id=?";
	private static final String FIND_ALL = "SELECT * FROM employee ORDER BY id";
	private static final String FIND_BY_ID = "SELECT * FROM employee WHERE id=?";
	private static final String FIND_BY_NAME = "SELECT * FROM employee WHERE name=?";
	private static final String INSERT = "INSERT INTO employee(name) VALUES(?)";
	private static final String UPDATE = "UPDATE employee SET name=? WHERE id=?";
	
	
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
				employee.setId(rs.getString("id"));
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
	
	public int insert(Employees employee) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(INSERT, Statement.RETURN_GENERATED_KEYS);
			stmt.setString(1, employee.getName());
			int result = stmt.executeUpdate();
			ResultSet rs = stmt.getGeneratedKeys();
			
			if (rs.next()) {
				employee.setId(rs.getString(1));
			}
			
			return result;
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			close(stmt);
			close(conn);
		}
	}
	
	public int update(Employees employee) {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(UPDATE);
			stmt.setString(1, employee.getName());
			stmt.setString(2, employee.getId());
			
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
