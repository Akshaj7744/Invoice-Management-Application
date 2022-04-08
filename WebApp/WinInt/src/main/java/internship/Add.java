package internship;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
    	try {
			Connection conn = Connect.getConnection();	
			String business_code = request.getParameter("business_code");
			int cust_number = Integer.parseInt(request.getParameter("cust_number"));
			String clear_date = request.getParameter("clear_date");
			int buisness_year = Integer.parseInt(request.getParameter("buisness_year"));
			String doc_id = request.getParameter("doc_id");
			String posting_date = request.getParameter("posting_date");
			String document_create_date = request.getParameter("document_create_date");
			String due_in_date = request.getParameter("due_in_date");
			String invoice_currency = request.getParameter("invoice_currency");
			String document_type = request.getParameter("document_type");
			int posting_id = Integer.parseInt(request.getParameter("posting_id"));
			double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
			String baseline_create_date = request.getParameter("baseline_create_date");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
			
			PreparedStatement ps = null;
			String query = "insert into grey_goose.winter_internship (sl_no, business_code, cust_number, clear_date, buisness_year, doc_id,"
					+ "posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id,"
					+ "total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) "
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			
			ps = conn.prepareStatement(query);
			java.sql.Statement st = conn.createStatement();
			java.sql.Statement st1 = conn.createStatement();
			String query1 = "SELECT * FROM customer WHERE cust_number=" + cust_number;
			String query2 = "SELECT COUNT(*) AS total FROM winter_internship";
			  ResultSet res = st.executeQuery(query1);
			  ResultSet res1 = st1.executeQuery(query2);
			  res1.next();
			  
			  int total = res1.getInt("total");
			  total++;
			  ps.setInt(1, total);
			  ps.setString(2, business_code);
			  if(res.next() == true) {
				  ps.setInt(3, cust_number);
			  }
			  else {
		       ps.setNull(3, java.sql.Types.NULL);
			  }
			ps.setString(4, clear_date);
			ps.setInt(5, buisness_year);
			ps.setString(6, doc_id);
			ps.setString(7, posting_date);
			ps.setString(8, document_create_date);
			ps.setString(9, due_in_date);
			ps.setString(10, invoice_currency);
			ps.setString(11, document_type);
			ps.setInt(12, posting_id);
			ps.setDouble(13, total_open_amount);
			ps.setString(14, baseline_create_date);
			ps.setString(15, cust_payment_terms);
			ps.setInt(16, invoice_id);
	        System.out.println(ps.toString());
			int count = ps.executeUpdate();
			if(count == 1)
				response.getWriter().write("Success");
			else
				response.getWriter().write("Fail");
		} catch(Exception e) {
			e.printStackTrace();    
			}
    }
}
