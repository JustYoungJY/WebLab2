function validateForm() {
    const xChecks = document.querySelectorAll("input[name='x']:checked");
    const xValues = Array.from(xChecks).map(checkbox => checkbox.value);

    if (xValues.length === 0) {
        return {isOk: false, message: "The X must be chosen (at least one)!"};
    }

    const strY = document.getElementById("y").value;
    const y = parseFloat(strY.replace(",", "."));

    if (!Number.isFinite(y)) {
        return {isOk: false, message: "The Y must be a number!"};
    }

    if (y < -5 || y > 5) {
        return {isOk: false, message: "The Y must be in the range from -5 to 5!"};
    }

    const rCheck = document.querySelector("input[name='r']:checked");
    if (!rCheck) {
        return {isOk: false, message: 'The R must be chosen!'};
    }
    const r = Number(rCheck.value);

    return {isOk: true, xValues, y, r};
}

function addRowToTable(data) {
    const tbody = document.getElementById("results-body");
    const trow = tbody.insertRow(0);

    trow.insertCell(0).textContent = data.x;
    trow.insertCell(1).textContent = data.y;
    trow.insertCell(2).textContent = data.r;
    trow.insertCell(3).textContent = data.result ? "hit" : "did not hit";
    trow.insertCell(4).textContent = data.executionTime;
    trow.insertCell(5).textContent = data.currentTime;
}

let errorTimeoutId = null;
function showError(message) {
    let popup = document.getElementById("error-popup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "error-popup";
        document.body.appendChild(popup);
    }

    popup.textContent = message;
    popup.style.display = "block";

    if (errorTimeoutId) clearTimeout(errorTimeoutId);
    errorTimeoutId = setTimeout(() => {
        popup.style.display = "none";
        errorTimeoutId = null;
    }, 3000);
}

const form = document.getElementById("point-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const validation = validateForm();
    if (!validation.isOk) {
        showError(validation.message);
        return;
    }

    const { xValues, y, r } = validation;
    const xChecks = document.querySelectorAll("input[name='x']");

    const xHiddenInput = document.createElement('input');
    xHiddenInput.type = 'hidden';
    xHiddenInput.name = 'x_list';
    xHiddenInput.value = xValues.join(',');
    form.appendChild(xHiddenInput);

    const yInput = document.createElement('input');
    yInput.type = 'hidden';
    yInput.name = 'y';
    yInput.value = y;
    form.appendChild(yInput);

    const rInput = document.createElement('input');
    rInput.type = 'hidden';
    rInput.name = 'r';
    rInput.value = r;
    form.appendChild(rInput);

    xChecks.forEach(checkbox => checkbox.name = 'temp_x');

    form.action = "";
    form.submit();

    xChecks.forEach(checkbox => checkbox.name = 'x');
    form.removeChild(xHiddenInput);
    form.removeChild(yInput);
    form.removeChild(rInput);
});