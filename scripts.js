// Global Script File (scripts.js)

// Function to calculate EMI
function calculateEMI(loanAmount, rate, tenure) {
    let monthlyRate = rate / (12 * 100);
    let totalMonths = tenure * 12;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

// Function to generate Donut Chart
function generateChart(ctxId, labels, data, colors) {
    let ctx = document.getElementById(ctxId).getContext('2d');
    if (window[ctxId]) window[ctxId].destroy();
    window[ctxId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors
            }]
        }
    });
}

// Function to navigate back to Home Page
function goHome() {
    window.location.href = "index.html";
}

// Event Listener for all Calculate Buttons
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll("button.calculate");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            let calculatorType = this.getAttribute("data-type");
            if (calculatorType === "emi") {
                let loanAmount = parseFloat(document.getElementById("loanAmount").value) || 0;
                let rate = parseFloat(document.getElementById("rate").value) || 0;
                let tenure = parseInt(document.getElementById("tenure").value) || 0;
                let emi = calculateEMI(loanAmount, rate, tenure);
                document.getElementById("emiResult").innerHTML = `EMI: ₹${emi.toFixed(2)}`;
                generateChart("emiChart", ["Principal Amount", "Total Interest"], [loanAmount, emi * tenure - loanAmount], ["#36a2eb", "#ffce56"]);
            }
        });
    });
});
