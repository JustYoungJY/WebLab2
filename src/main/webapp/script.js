function validateForm() {
    const strX = document.getElementById("x").value;
    const x = parseFloat(strX.replace(",", "."));

    if(!Number.isFinite(x)){
        return {isOk: false, message: "The X must be a number!"};
    }

    if(x < -5 || x > 5) {
        return {isOk: false, message: "The X must be in the range from -5 to 5!"};
    }

    const yCheck = document.querySelector("input[name='y']:checked");
    if(!yCheck){
        return {isOk: false, message: "The Y must be chosen!"};
    }
    const y = Number(yCheck.value);

    const rCheck = document.querySelector("input[name='r']:checked");
    if(!rCheck){
        return {isOk: false, message: 'The R must be chosen!'};
    }
    const r = Number(rCheck.value);

    return {isOk: true, x, y, r};
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
    if(!validation.isOk) {
        console.error("Validation error:", validation.message); // добавил для отладки
        showError(validation.message);
        return;
    }

    form.action = "";
    form.submit();
});