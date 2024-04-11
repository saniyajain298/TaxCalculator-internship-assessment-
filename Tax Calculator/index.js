// Bootstrap tooltip
var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });


function onSubmit() {
    var annualIncome = parseFloat(document.getElementsByName("annual-income")[0].value);
    var extraIncome = parseFloat(document.getElementsByName("extra-income")[0].value);
    var ageGroup = document.getElementsByName("age-group")[0].value;
    var deduction = parseFloat(document.getElementsByName("deduction")[0].value);

    // to hide al field error
    var requiredError = document.querySelectorAll(".all-field-error")[0];
    requiredError.style.display = "none";

    // if all fields are present
    if (annualIncome && extraIncome && ageGroup && deduction) {
       
        var overAllIncome = annualIncome + extraIncome - deduction;
        var tax_amount = 0;

        if (overAllIncome > 800000) {
            var tax = 0;
            if (ageGroup === ">40") tax = 0.3;
            else if (ageGroup === ">=40&<60") tax = 0.4;
            else if (ageGroup === ">60") tax = 0.1;

            tax_amount = tax * (overAllIncome - 800000);
        }
        var totalIncome = overAllIncome - tax_amount;
        
        // int to currency
        totalIncome = totalIncome.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
        });
        document.getElementById("amount").innerHTML = totalIncome;

        // show model 
        var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();

    } 
    else {
        // if all fieds are not present then show error
        requiredError.style.display = "block";
    }
}


function varifyInput(name) {
    var value = document.getElementsByName(name)[0].value;
    if (!isNaN(value)) {
        var elements = document.querySelectorAll("." + name)[0];
        elements.style.display = "none";
    } else {
        var elements = document.querySelectorAll("." + name)[0];
        elements.style.display = "block";
    }
}
