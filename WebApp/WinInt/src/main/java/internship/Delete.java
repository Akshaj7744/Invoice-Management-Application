package internship;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Delete
 */
@WebServlet("/Delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Delete() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			int count=0; String finalstr="";
			Connection conn = Connect.getConnection();
			String sl_no = request.getParameter("selectedIndexes");
			String index[] = sl_no.split(",");
			if(sl_no != null)
			{
			for(String s:index) 
			{
				finalstr = finalstr + "," + s;
			}
			finalstr = finalstr.substring(1);
			PreparedStatement ps = conn.prepareStatement("DELETE FROM winter_internship WHERE sl_no IN ("+sl_no+") ");
			
			count = ps.executeUpdate();
			if(count == 1)
				response.getWriter().write("Success");
			else
				response.getWriter().write("Fail");
			}
		} catch(Exception e) {
			e.printStackTrace();    
			}
	}
}

