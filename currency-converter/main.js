// Getting the data on first load
function getOnloadData() {
  const url = "http://www.floatrates.com/daily/usd.json";

  // fetching data from url
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Declaring variables
      let sourceSelect = document.getElementById("sourceCurrency");
      let destinationSelect = document.getElementById("destinationCurrency");

      sourceSelect.innerHTML = `<option value="usd">U.S. Dollar</option>`;
      // document.getElementById("destinationValue").value =
      //   data["eur"]["rate"].toFixed(2);

      // Looping over the fetched data
      for (let key in data) {
        sourceSelect.innerHTML += `<option value="${key}">${data[key]["name"]}</option>`;
        destinationSelect.innerHTML += `<option value="${key}">${data[key]["name"]}</option>`;
      }
    });
}

// Validating for invalid currency
function currencyValidation(amount = null) {
  document.getElementById("result").className = 'd-none';
  if (amount < 1 || amount === "") {
    document.getElementById("amount").classList.add("is-invalid");
    document.getElementById("error").className = "invalid-feedback";
    return true;
  }
  document.getElementById("error").className = "d-none";
  document.getElementById("amount").classList.remove("is-invalid");
    return false;
}

// Performing required operations on changing the currency
function changeData(myId = null, currency = null) {
  document.getElementById("result").className = 'd-none';
  // Getting current data
  let selectedSourceCurrency = document.getElementById("sourceCurrency");
  let selectedDestinationCurrency = document.getElementById(
    "destinationCurrency"
  );

  let url = `http://www.floatrates.com/daily/${selectedSourceCurrency.value}.json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      if (myId == "sourceCurrency") {
        selectedDestinationCurrency.innerHTML = "";
        // Looping over the fetched data
        for (let key in data) {
          selectedDestinationCurrency.innerHTML += `<option value="${key}">${data[key]["name"]}</option>`;
        }
      } else if (myId == "selectedSourceCurrency") {
        selectedSourceCurrency.innerHTML = "";

        // Looping over the fetched data
        for (let key in data) {
          selectedSourceCurrency.innerHTML += `<option value="${key}">${data[key]["name"]}</option>`;
        }
      }
    });
}

// Displaying the result section
function results() {
  document.getElementById("result").className = 'col-md-10';

  // Declaring variables
  let sourceSelect = document.getElementById("sourceCurrency");
  let destinationSelect = document.getElementById("destinationCurrency");
  let destinationUrl = `http://www.floatrates.com/daily/${destinationSelect.value}.json`;

  fetch(destinationUrl)
    .then((response) => response.json())
    .then((destinationData) => {
      let url = `http://www.floatrates.com/daily/${sourceSelect.value}.json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("fromCurrency").innerHTML = `1 ${destinationData[sourceSelect.value]["name"]}`;

          document.getElementById("toCurrency").innerHTML = `${data[destinationSelect.value]["rate"].toFixed(2)} ${data[destinationSelect.value]["name"]}`;

          document.getElementById("date").innerHTML = `${data[destinationSelect.value]["date"]}`;

          document.getElementById("sourceResult").innerHTML = `${document.getElementById("amount").value} ${destinationData[sourceSelect.value]["code"]}`;

          let calculated = document.getElementById("amount").value * data[destinationSelect.value]["rate"];

          document.getElementById("destinationResult").innerHTML = `${calculated.toFixed(2)} ${data[destinationSelect.value]["code"]}`;

        });
    });
}

