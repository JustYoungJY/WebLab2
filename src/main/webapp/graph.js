const canvas = document.getElementById('area-canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const unit = 150 / 5; // 30 pixels per unit, fitting -5 to 5 within 300px

function drawAxes() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Arrowheads
    ctx.beginPath();
    ctx.moveTo(width - 5, centerY - 5);
    ctx.lineTo(width, centerY);
    ctx.lineTo(width - 5, centerY + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 5, 5);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 5);
    ctx.stroke();

    // X and Y labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#e3dbdb';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('X', width - 5, centerY + 5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Y', centerX + 5, 5);
}

function drawLabels(r) {
    ctx.font = '10px Arial';
    ctx.fillStyle = '#e3dbdb';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // X axis labels
    ctx.fillText('R', centerX + r * unit, centerY + 5);
    ctx.fillText('R/2', centerX + (r / 2) * unit, centerY + 5);
    ctx.fillText('-R/2', centerX - (r / 2) * unit, centerY + 5);
    ctx.fillText('-R', centerX - r * unit, centerY + 5);

    // Y axis labels
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('R', centerX + 5, centerY - r * unit);
    ctx.fillText('R/2', centerX + 5, centerY - (r / 2) * unit);
    ctx.fillText('-R/2', centerX + 5, centerY + (r / 2) * unit);
    ctx.fillText('-R', centerX + 5, centerY + r * unit);
}

function drawTicks(r) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;

    // X axis ticks
    ctx.beginPath();
    ctx.moveTo(centerX + r * unit, centerY - 5);
    ctx.lineTo(centerX + r * unit, centerY + 5);
    ctx.moveTo(centerX + (r / 2) * unit, centerY - 5);
    ctx.lineTo(centerX + (r / 2) * unit, centerY + 5);
    ctx.moveTo(centerX - (r / 2) * unit, centerY - 5);
    ctx.lineTo(centerX - (r / 2) * unit, centerY + 5);
    ctx.moveTo(centerX - r * unit, centerY - 5);
    ctx.lineTo(centerX - r * unit, centerY + 5);
    ctx.stroke();

    // Y axis ticks
    ctx.beginPath();
    ctx.moveTo(centerX - 5, centerY - r * unit);
    ctx.lineTo(centerX + 5, centerY - r * unit);
    ctx.moveTo(centerX - 5, centerY - (r / 2) * unit);
    ctx.lineTo(centerX + 5, centerY - (r / 2) * unit);
    ctx.moveTo(centerX - 5, centerY + (r / 2) * unit);
    ctx.lineTo(centerX + 5, centerY + (r / 2) * unit);
    ctx.moveTo(centerX - 5, centerY + r * unit);
    ctx.lineTo(centerX + 5, centerY + r * unit);
    ctx.stroke();
}

function drawAreas(r) {
    ctx.fillStyle = '#9a52b6';

    // Rectangle
    ctx.fillRect(centerX, centerY - (r / 2) * unit, r * unit, (r / 2) * unit);

    // Triangle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - r * unit, centerY);
    ctx.lineTo(centerX, centerY + r * unit);
    ctx.closePath();
    ctx.fill();

    // Circle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - r * unit, centerY);
    ctx.arc(centerX, centerY, r * unit, Math.PI, 3 * Math.PI / 2, false);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
}

function drawPoints(r) {
    const rows = document.querySelectorAll('#results-body tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
            const px = parseFloat(cells[0].textContent);
            const py = parseFloat(cells[1].textContent);
            const pr = parseInt(cells[2].textContent);
            const hitColor = cells[3].querySelector('span').style.color;
            const isHit = hitColor === 'rgb(39, 174, 96)'; // #27ae60

            if (pr === r) {
                ctx.beginPath();
                ctx.arc(centerX + px * unit, centerY - py * unit, 3, 0, 2 * Math.PI);
                ctx.fillStyle = isHit ? '#27ae60' : '#e74c3c';
                ctx.fill();
            }
        }
    });
}

function drawGraph(r) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#111118';
    ctx.fillRect(0, 0, width, height);

    if (r) {
        drawAreas(r);
        drawTicks(r);
        drawLabels(r);
        drawPoints(r);
    }
    drawAxes();
}

// Load saved R
const savedR = localStorage.getItem('selectedR');
if (savedR) {
    const radio = document.querySelector(`input[name="r"][value="${savedR}"]`);
    if (radio) {
        radio.checked = true;
    }
}

// Initial draw
const initialRRadio = document.querySelector('input[name="r"]:checked');
const initialR = initialRRadio ? parseInt(initialRRadio.value) : null;
drawGraph(initialR);

// Listen for R changes
const radios = document.querySelectorAll('input[name="r"]');
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        const selectedR = radio.value;
        localStorage.setItem('selectedR', selectedR);
        drawGraph(parseInt(selectedR));
    });
});

// Handle canvas click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const x = ((clickX - centerX) / unit).toFixed(2);
    const y = ((centerY - clickY) / unit).toFixed(2);

    const rRadio = document.querySelector('input[name="r"]:checked');
    if (!rRadio) {
        showError('The R must be chosen!');
        return;
    }

    const r = rRadio.value;

    // Create temporary form to submit
    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = '';

    const xInput = document.createElement('input');
    xInput.type = 'hidden';
    xInput.name = 'x_list';
    xInput.value = x;
    tempForm.appendChild(xInput);

    const yInput = document.createElement('input');
    yInput.type = 'hidden';
    yInput.name = 'y';
    yInput.value = y;
    tempForm.appendChild(yInput);

    const rInput = document.createElement('input');
    rInput.type = 'hidden';
    rInput.name = 'r';
    rInput.value = r;
    tempForm.appendChild(rInput);

    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);
});