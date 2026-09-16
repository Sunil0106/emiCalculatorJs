import { calculateSchedule } from "./utils/calculate-fun.js";
import {
  convertToCents,
  convertCentsToDollars,
} from "./utils/formatCurrency.js";

//Declaring variables
const loanAmountEl = document.querySelector(".js-loan-principal-amount");
const loanInterestRateEl = document.querySelector(".js-loan-interest-rate");
const loanTimeEl = document.querySelector(".js-loan-time");

const years = document.getElementById("year");
const months = document.getElementById("month");

if (!years.checked) {
  months.checked = true;
}

function calUserValues() {
  //Taking user values
  const principalAmount = convertToCents(Number(loanAmountEl.value));
  const loanTime = Number(
    years.checked ? loanTimeEl.value * 12 : loanTimeEl.value,
  );
  const interestRate = Number(loanInterestRateEl.value);

  //checking error
  document.querySelector(".display-error").innerHTML = "";
  if (principalAmount <= 0 || loanTime <= 0 || interestRate < 0) {
    document.querySelector(".display-error").innerHTML =
      "Please fill all input with valid data (Numbers)";
    return;
  }

  //Calculations
  const paymentDetails = calculateSchedule(
    principalAmount,
    loanTime,
    interestRate,
  );
  //generating table for result
  const table = document.createElement("table");
  table.innerHTML = `
  <tr>
  <th>Months</th>
   <th>Outstanding Balance</th>
  <th>Principal Portion</th>
  <th>Monthly Interest</th>
  <th>Monthly Payment</th>
 
  </tr>
  `;

  paymentDetails.forEach((payment) => {
    const rows = document.createElement("tr");
    rows.innerHTML = `
   <td>${payment.month}</td>
   <td>${convertCentsToDollars(payment.outstandingBalance)}</td>
   <td>${convertCentsToDollars(payment.principalPortion)}</td>
<td>${convertCentsToDollars(payment.interest)}</td>
<td>${convertCentsToDollars(payment.monthlyEmi)}</td>
   `;
    table.appendChild(rows);
  });

  const resultDisplay = document.querySelector(".js-calculation-result");
  resultDisplay.innerHTML = "";
  resultDisplay.appendChild(table);

  //calculating total

  const totalPayable = paymentDetails.reduce(
    (total, payment) => total + payment.monthlyEmi,
    0,
  );
  const totalInterest = paymentDetails.reduce(
    (total, payment) => total + payment.interest,
    0,
  );

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
  <td></td>
  <td>Total Interest</td>
  <td>${convertCentsToDollars(totalInterest)}</td>
  <td>Total Payable</td>
  <td>${convertCentsToDollars(totalPayable)}</td>
  `;
  table.appendChild(totalRow);
}

//executing the function when butten clicked
document
  .querySelector(".js-calculate-emi-btn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    calUserValues();
    loanAmountEl.value = "";
    loanTimeEl.value = "";
    loanInterestRateEl.value = "";
  });
