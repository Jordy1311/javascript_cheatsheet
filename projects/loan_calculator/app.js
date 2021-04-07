// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e) {  
    console.log('Calculating results...');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principle).toFixed(2);
    } else {
        // Calling error on incorrect values entered
        showError('Please check the values entered')
    }

    e.preventDefault();
}

// showError function
function showError(error) {
    // Create div
    const errorDiv = document.createElement('div');
    
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class to div
    errorDiv.className = 'alert alert-danger';
    // Add text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above heading - insertBefore is called on the parent, takes two values(what you want to insert, before what element)
    card.insertBefore(errorDiv, heading);

    // Clear error after amount of time in milliseconds
    setTimeout(clearError, 2000);
}

// clearError function
function clearError() {
    document.querySelector('.alert').remove();
}