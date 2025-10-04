package app.weblab2;

import app.weblab2.Beans.ResultBean;
import app.weblab2.Beans.ResultListBean;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        long startTime = System.currentTimeMillis();

        double y;
        int x, r;
        try {
            x = Integer.parseInt(req.getParameter("x"));
            y = Double.parseDouble(req.getParameter("y"));
            r = Integer.parseInt(req.getParameter("r"));

        } catch(NumberFormatException e) {
            req.setAttribute("error", "Please enter a valid number");
            req.getRequestDispatcher("/form.jsp").forward(req, resp);
            return;
        }

        Validation validation = new Validation();
        if(!validation.validateParameters(x, y, r)) {
            req.setAttribute("error", "The parameters are out of the allowable range");
            req.getRequestDispatcher("/form.jsp").forward(req, resp);
            return;
        }

        boolean hit = validation.checkHit(x, y, r);
        long executionTime = System.currentTimeMillis() - startTime;
        String currentTime = LocalDateTime.now(ZoneId.of("Europe/Moscow"))
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        HttpSession session = req.getSession();
        ResultListBean resultListBean = (ResultListBean) session.getAttribute("resultListBean");
        if (resultListBean == null) {
            resultListBean = new ResultListBean();
            session.setAttribute("resultListBean", resultListBean);
        }

        ResultBean resultBean = new ResultBean(x, y, r, currentTime, executionTime, hit);
        resultListBean.addResult(resultBean);

        req.getRequestDispatcher("/form.jsp").forward(req, resp);
    }
}
