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
 * Servlet implementation class Edit
 */
@WebServlet("/Edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Edit() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			Connection conn = Connect.getConnection();
			int sl_no = Integer.parseInt(request.getParameter("sl_no"));
			String invoice_currency = request.getParameter("invoice_currency");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			
			PreparedStatement ps = null;
			String query = "update grey_goose.winter_internship set invoice_currency=?, cust_payment_terms=? WHERE sl_no=?";
			
			ps = conn.prepareStatement(query);  
			ps.setString(1, invoice_currency);
			ps.setString(2, cust_payment_terms);
			ps.setInt(3, sl_no);
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