package app.weblab2;

import app.weblab2.Beans.ResultBean;
import app.weblab2.Beans.ResultListBean;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.inject.Inject;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Inject
    private ResultListBean resultListBean;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        long startTime = System.currentTimeMillis();

        double y;
        int r;
        String xListParam = req.getParameter("x_list");

        if (xListParam == null || xListParam.isEmpty()) {
            req.setAttribute("error", "The X must be chosen (at least one)!");
            req.getRequestDispatcher("/form.jsp").forward(req, resp);
            return;
        }

        try {
            y = Double.parseDouble(req.getParameter("y"));
            r = Integer.parseInt(req.getParameter("r"));

        } catch(NumberFormatException e) {
            req.setAttribute("error", "Please enter a valid number");
            req.getRequestDispatcher("/form.jsp").forward(req, resp);
            return;
        }

        Validation validation = new Validation();

        String[] xValues = xListParam.split(",");
        boolean allValid = true;

        for (String xStr : xValues) {
            try {
                double x = Double.parseDouble(xStr.trim());

                if(!validation.validateParameters(x, y, r)) {
                    allValid = false;
                    continue;
                }

                boolean hit = validation.checkHit(x, y, r);
                long executionTime = System.currentTimeMillis() - startTime;
                String currentTime = LocalDateTime.now(ZoneId.of("Europe/Moscow"))
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                ResultBean resultBean = new ResultBean(x, y, r, currentTime, executionTime, hit);
                resultListBean.addResult(resultBean);

            } catch (NumberFormatException e) {
                allValid = false;
            }
        }

        if (!allValid) {
            req.setAttribute("error", "One or more submitted parameters are out of the allowable range or invalid.");
        }

        resp.sendRedirect(req.getContextPath() + "/");
    }
}
