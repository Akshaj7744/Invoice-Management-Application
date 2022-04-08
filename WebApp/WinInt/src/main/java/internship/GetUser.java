package internship;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class GetUser
 */
@WebServlet("/GetUser")
public class GetUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
		   Connection conn = Connect.getConnection();
		   java.sql.Statement st = conn.createStatement();
		   String page = request.getParameter("page") != null ? request.getParameter("page") : "0";
		   String rowsPerPage = request.getParameter("rowsPerPage") != null ? request.getParameter("rowsPerPage") : "5";
		   int offset = (Integer.parseInt(page)) * (Integer.parseInt(rowsPerPage));
		   String query = "SELECT * FROM winter_internship ORDER BY sl_no ASC limit "+ rowsPerPage + " OFFSET " + offset;
		   ResultSet rs = st.executeQuery(query);
		   
		   List <POJO> data = new ArrayList<>();
		   while(rs.next()) {
		     POJO obj = new POJO();
		     obj.setSl_no(rs.getInt("sl_no"));
		     obj.setBusiness_code(rs.getString("business_code"));
		     obj.setCust_number(rs.getInt("cust_number"));
		     obj.setClear_date(rs.getString("clear_date"));
		     obj.setBuisness_year(rs.getInt("buisness_year"));
		     obj.setDoc_id(rs.getString("doc_id"));
		     obj.setPosting_date(rs.getString("posting_date"));
		     obj.setDocument_create_date(rs.getString("document_create_date"));
		     obj.setDocument_create_date1(rs.getString("document_create_date1"));
		     obj.setDue_in_date(rs.getString("due_in_date"));
		     obj.setInvoice_currency(rs.getString("invoice_currency"));
		     obj.setDocument_type(rs.getString("document_type"));
		     obj.setPosting_id(rs.getInt("posting_id"));
		     obj.setArea_business(rs.getInt("area_business"));
		     obj.setTotal_open_amount(rs.getDouble("total_open_amount"));
		     obj.setBaseline_create_date(rs.getString("baseline_create_date"));
		     obj.setCust_payment_terms(rs.getString("cust_payment_terms"));
		     obj.setInvoice_id(rs.getInt("invoice_id"));
		     obj.setIsOpen(rs.getInt("isOpen"));
		     obj.setAging_bucket(rs.getString("aging_bucket"));
		     obj.setIs_deleted(rs.getInt("is_deleted"));
		     data.add(obj);
		   }
		   String json = new Gson().toJson(data);
		   
		   response.setContentType("application/json");
		   response.setStatus(200);
		   response.getWriter().write(json);
		   
	} catch(Exception e) {
		e.printStackTrace();
	}
  }
}
