// Event listener on calculate loan button
document.getElementById('form-input').addEventListener('submit', (e) => {
  // Show loading
  document.getElementById('loading').style.display = 'block';
  // Hide result
  document.getElementById('result').style.display = 'none';

  // Calculate 
  setTimeout(calculateLoan, 3000);

  e.preventDefault();
});

// Calculate loan
function calculateLoan(e) {
  // Get UI Vars
  const amount = document.getElementById('form-input').amount.value;
  const interest = document.getElementById('form-input').interest.value;
  const years = document.getElementById('form-input').years.value;

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);
  
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Hide loading
    document.getElementById('loading').style.display = 'none';
    // Show result
    document.getElementById('result').style.display = 'block';
  } else {
    // Error message
    showError('Please check your numbers');
    
  }
}

// Show error
function showError(error) {
  // Hide loading
  document.getElementById('loading').style.display = 'none';
  // Hide result
  document.getElementById('result').style.display = 'none';

  document.getElementById('form-input').amount.value = '';
  document.getElementById('form-input').interest.value = '';
  document.getElementById('form-input').years.value = '';

  // Get elements
  const card = document.querySelector('.card');
  const headingText = document.querySelector('.heading')
  
  // Make div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, headingText);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error 
function clearError() {
  document.querySelector('.alert').remove();
}

