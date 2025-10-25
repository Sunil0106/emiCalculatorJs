import {
  calculateBasicEmi,
  calInterestEmi,
  calRemainingPrincipal,
  calTotalEmi,
  calculateTotal,
} from "./utils/calculate-fun.js";
import {
  convertToCents,
  convertCentsToDollars,
} from "./utils/formatCurrency.js";
const loanAmountEl = document.querySelector(".js-loan-principal-amount");
const loanInterestRateEl = document.querySelector(".js-loan-interest-rate");
const loanTimeEl = document.querySelector(".js-loan-time");

const years = document.getElementById("year");
const months = document.getElementById("month");

if (!years.checked) {
  months.checked = true;
}

function calUserValues() {
  const principalAmount = convertToCents(Number(loanAmountEl.value));
  const loanTime = Number(
    years.checked ? loanTimeEl.value * 12 : loanTimeEl.value
  );
  const interestRate = Number(loanInterestRateEl.value);
  document.querySelector(".display-error").innerHTML = "";
  if (!principalAmount || !loanTime || !interestRate) {
    document.querySelector(".display-error").innerHTML =
      "Please fill all input with valid data (Numbers)";
    return;
  }
  const principalEmi = calculateBasicEmi(principalAmount, loanTime);
  const interestEmi = calInterestEmi(principalAmount, loanTime, interestRate);
  const totalEmi = calTotalEmi(principalAmount, loanTime, interestRate);
  const remainingEmi = calRemainingPrincipal(principalAmount, loanTime);

  const table = document.createElement("table");
  table.innerHTML = `
  <tr>
  <th>Months</th>
   <th>Outstanding Balance</th>
  <th>Principal Portion</th>
  <th>Monthly Interest</th>
  <th>Monthly EMI</th>
 
  </tr>
  `;

  for (let i = 0; i < loanTime; i++) {
    const rows = document.createElement("tr");
    rows.innerHTML = `
   <td>${i + 1}</td>
   <td>${convertCentsToDollars(remainingEmi[i])}</td>
   <td>${convertCentsToDollars(principalEmi[i])}</td>
<td>${convertCentsToDollars(interestEmi[i])}</td>
<td>${convertCentsToDollars(totalEmi[i])}</td>
   `;

    table.appendChild(rows);
  }
  const resultDisplay = document.querySelector(".js-calculation-result");
  resultDisplay.innerHTML = "";
  resultDisplay.appendChild(table);

  document.querySelector(".js-total-payable-amount").innerHTML = `
  Total Interest: ${convertCentsToDollars(
    calculateTotal(interestEmi)
  )} \n  Total Payable Amount ${convertCentsToDollars(
    principalAmount + calculateTotal(interestEmi)
  )}
  
  
  
  `;
}
document
  .querySelector(".js-calculate-emi-btn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    calUserValues();
    loanAmountEl.value = "";
    loanTimeEl.value = "";
    loanInterestRateEl.value = "";
  });
