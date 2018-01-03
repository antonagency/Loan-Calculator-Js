   const results = document.getElementById('results'),
         loaderContainer = document.getElementById('loader');
         loader = document.getElementById('img-loading');

   const viewResults = (element, state) => {
       element === 'results' ? results.style.display = state : loaderContainer.style.display = state; loader.style.display = state;
   }
   // Event
   document.getElementById('loan-form').addEventListener('submit', e => {
       e.preventDefault();
        // Hide Results 
        viewResults('result', 'none')
        // Show Loader
        viewResults('loader', 'block');
        // Call the calculate results function 
        setTimeout(calculateResults, 2000);
    });

   function calculateResults () {
    // UI Vars 
    const amount = document.getElementById('amount'),
          interest = document.getElementById('interest'),
          years = document.getElementById('years');
    // Results UI
    const monthlyPayment = document.getElementById('monthly-payment'),
          totalPayment = document.getElementById('total-payment'),
          totalInterest = document.getElementById('total-interest');
    // Calculation
    let principal = Number(amount.value),
        calculatedInterest = Number(interest.value) / 100 / 12;
        calculatedPayments = Number(years.value) * 12;
    // Compute monthly payment
    let x = Math.pow(1 + calculatedInterest, calculatedPayments),
        monthly = (principal * x * calculatedInterest) / (x - 1);  
        
    function paymentsCalculation () {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show Results
        viewResults('results', 'block');
    }    
    // Ternaty Operation
    isFinite(monthly) ? paymentsCalculation() : showError('Please check your numbers!'); 
    // Hide Loder
    viewResults('loader', 'none');
   }


   function showError (err) {
    const errorDiv = document.createElement('div');
    // Get Elements
    const card = document.querySelector('.card'),
          heading = document.querySelector('.heading');  
    // Add Class
    errorDiv.setAttribute('class', 'alert alert-danger');
    // Text Node
    errorDiv.appendChild(document.createTextNode(err));
    // Insert error div
    card.insertBefore(errorDiv, heading);
    // Clear error
    setTimeout(() => errorDiv.remove(), 3000);
   }