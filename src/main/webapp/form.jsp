<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
  <p>Name: Izaak German Konstantinovich</p>
  <p>Group: P3217</p>
  <p>Varik: 2108</p>
</header>
<table id="main-table">
  <tr>
    <td>
      <form id="point-form" method="POST" action="">
        <table>
          <tr>
            <td>Choose X:</td>
            <td>
              <div class="checkbox-container">
                <table>
                  <tr>
                    <td><input type="checkbox" id="x-5" name="x" value="-5"><label for="x-5">-5</label></td>
                    <td><input type="checkbox" id="x-4" name="x" value="-4"><label for="x-4">-4</label></td>
                    <td><input type="checkbox" id="x-3" name="x" value="-3"><label for="x-3">-3</label></td>
                    <td><input type="checkbox" id="x-2" name="x" value="-2"><label for="x-2">-2</label></td>
                    <td><input type="checkbox" id="x-1" name="x" value="-1"><label for="x-1">-1</label></td>
                    <td><input type="checkbox" id="x0" name="x" value="0"><label for="x0">0</label></td>
                    <td><input type="checkbox" id="x1" name="x" value="1"><label for="x1">1</label></td>
                    <td><input type="checkbox" id="x2" name="x" value="2"><label for="x2">2</label></td>
                    <td><input type="checkbox" id="x3" name="x" value="3"><label for="x3">3</label></td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td><label for="y">Enter Y:</label></td>
            <td><input type="number" step="0.01" min="-5" max="5" id="y" name="y" required></td>
          </tr>
          <tr>
            <td>Choose R:</td>
            <td>
              <div class="radio-container">
                <table>
                  <tr>
                    <td><input type="radio" id="r1" name="r" value="1"><label for="r1">1</label></td>
                    <td><input type="radio" id="r2" name="r" value="2"><label for="r2">2</label></td>
                    <td><input type="radio" id="r3" name="r" value="3"><label for="r3">3</label></td>
                    <td><input type="radio" id="r4" name="r" value="4"><label for="r4">4</label></td>
                    <td><input type="radio" id="r5" name="r" value="5"><label for="r5">5</label></td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td colspan="2"><button type="submit">Submit</button></td>
          </tr>
        </table>
      </form>
    </td>
  </tr>
  <tr>
    <td><canvas id="area-canvas" width="350" height="350"></canvas></td>
  </tr>
  <tr>
    <td colspan="2">
      <div class="table-container">
        <table id="results-table">
          <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Result</th>
            <th>Execution time</th>
            <th>Time</th>
          </tr>
          </thead>
          <tbody id="results-body">
          <c:if test="${not empty resultListBean.results}">
            <c:forEach items="${resultListBean.results}" var="entry">
              <tr>
                <td><c:out value="${entry.x}"/></td>
                <td><c:out value="${entry.y}"/></td>
                <td><c:out value="${entry.r}"/></td>
                <td>
                  <c:choose>
                    <c:when test="${entry.hit == true}">
                      <span style="color: #27ae60; font-weight: bold;">Hit</span>
                    </c:when>
                    <c:otherwise>
                      <span style="color: #e74c3c;">Miss</span>
                    </c:otherwise>
                  </c:choose>
                </td>
                <td><c:out value="${entry.executionTime}"/></td>
                <td><c:out value="${entry.currentTime}"/></td>
              </tr>
            </c:forEach>
          </c:if>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</table>
<script src="script.js"></script>
<script src="graph.js"></script>
</body>
</html>