package internship;

import java.sql.*;

public class Connect
{
	static final String jdbc_driver = "com.mysql.cj.jdbc.Driver";
	static final String url = "jdbc:mysql://localhost:3306/grey_goose";
	static final String user = "root";
	static final String pass = "root";
	
	private static java.sql.Connection conn;
	
	public static Connection getConnection() throws Exception
	{
		try {
			Class.forName(jdbc_driver);
			conn = DriverManager.getConnection(url, user, pass);
			return conn;
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
