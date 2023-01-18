function getFetchData() {
  fetch("required_data.json")
    .then((Response) => Response.json())
    .then((data) => {
      // Declaring arrays
      let arrYear = [];
      let arrMonths = [];
      let arrGas = [];
      let arrSolid = [];
      let arrLiquid = [];
      let arrElectricity = [];

      let year = document.getElementById("year");
      for (let i = 0; i < data.length; i++) {
        if (!arrYear.includes(data[i]["Year"])) {
          arrYear.push(data[i]["Year"]);
          year.innerHTML += `<option value=${data[i]["Year"]}>${data[i]["Year"]}</option>`;
        }
      }
      // First get the data for 1996
      for (let i = 0; i < 12; i++) {
        arrGas.push(parseFloat(data[i]["Gas"].toFixed(1)));
        arrSolid.push(parseFloat(data[i]["Solid_fuels"].toFixed(1)));
        arrLiquid.push(parseFloat(data[i]["Liquid_fuels"].toFixed(1)));
        arrElectricity.push(parseFloat(data[i]["Electricity"].toFixed(1)));
        arrMonths.push(data[i]["Month"]);
      }
// console.log(typeof(arrSolid));
      Highcharts.chart("historical_graph", {
        title: {
          text: "Historical",
        },
        subtitle: {
          text: 'Source: <a href="https://www.gov.uk/government/collections/quarterly-energy-prices#2022" target="_blank">UK GOV</a>',
        },
        yAxis: {
          title: {
            text: "Fuel Prices",
          },
        },
        xAxis: {
          title: {
            text: `Year ${year.value}`,
          },
          categories: arrMonths,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
          },
        },

        series: [
          {
            name: "Solid Fuel",
            data: arrSolid,
          },
          {
            name: "Liquid Fuel",
            data: arrLiquid,
          },
          {
            name: "Gas Fuel",
            data: arrGas,
          },
          {
            name: "Electricity",
            data: arrElectricity,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
    });
}

function getHistoricalData(yearValue = null) {
  fetch("required_data.json")
    .then((Response) => Response.json())
    .then((data) => {
      // Declaring arrays
      let arrMonths = [];
      let arrGas = [];
      let arrSolid = [];
      let arrLiquid = [];
      let arrElectricity = [];

      if (!yearValue) {
        yearValue = document.getElementById("year").value;
        document.getElementById("forcaster").classList.add("display-none");
        document.getElementById("historical").classList.remove("display-none");
        document.getElementById("historical_button").classList.add("active");
        document.getElementById("forcaster_button").classList.remove("active");
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i]["Year"] == yearValue) {
          // let gas = ;
          arrGas.push(parseFloat(data[i]["Gas"].toFixed(1)));
          arrSolid.push(parseFloat(data[i]["Solid_fuels"].toFixed(1)));
          arrLiquid.push(parseFloat(data[i]["Liquid_fuels"].toFixed(1)));
          arrElectricity.push(parseFloat(data[i]["Electricity"].toFixed(1)));
          arrMonths.push(data[i]["Month"]);
        }
      }

      Highcharts.chart("historical_graph", {
        title: {
          text: "Historical",
        },
        subtitle: {
          text: 'Source: <a href="https://www.gov.uk/government/collections/quarterly-energy-prices#2022" target="_blank">UK GOV</a>',
        },
        yAxis: {
          title: {
            text: "Fuel Prices",
          },
        },
        xAxis: {
          title: {
            text: `Year ${year.value}`,
          },
          categories: arrMonths,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
          },
        },

        series: [
          {
            name: "Solid Fuel",
            data: arrSolid,
          },
          {
            name: "Liquid Fuel",
            data: arrLiquid,
          },
          {
            name: "Gas Fuel",
            data: arrGas,
          },
          {
            name: "Electricity",
            data: arrElectricity,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
    });
}

function calculations(max, min, arr)
{
  let final = [];

  let percentage = Math.round(((max - min) / max) * 100) / 100;

  let percent = (percentage * max);

  for (let a in arr) {
    summ = (parseFloat(percent) + parseFloat(arr[a])).toFixed(1);

    final.push(parseFloat(summ))
  }

  return final;
}

function getForcasterData() {
  // Applying required class
  document.getElementById("historical").classList.add("display-none");
  document.getElementById("forcaster").classList.remove("display-none");
  document.getElementById("forcaster_button").classList.add("active");
  document.getElementById("historical_button").classList.remove("active");

  fetch("required_data.json")
    .then((Response) => Response.json())
    .then((data) => {
      let count = 0;
      let arrMonths = [];
      let arrGas = [];
      let arrSolid = [];
      let arrLiquid = [];
      let arrElectricity = [];

      for (let year of data.reverse()) {
        arrGas.push(parseFloat(year["Gas"].toFixed(1)));
        arrSolid.push(parseFloat(year["Solid_fuels"].toFixed(1)));
        arrLiquid.push(parseFloat(year["Liquid_fuels"].toFixed(1)));
        arrElectricity.push(parseFloat(year["Electricity"].toFixed(1)));
        arrMonths.push(year["Month"]);
        count++;
        if (count >= 12) break;
      }

      let calculated = [arrGas, arrSolid, arrLiquid, arrElectricity];

      for (let i = 0; i < 4; i++) {
        calculated.splice(i, 1, calculations(Math.max(...calculated[i]), Math.min(...calculated[i]), calculated[i]));
      }

      arrMonths = arrMonths.reverse();
      // console.log(calculated[0]);
      Highcharts.chart("forcaster_graph", {
        title: {
          text: "Forcaster",
        },
        subtitle: {
          text: 'Source: <a href="https://www.gov.uk/government/collections/quarterly-energy-prices#2022" target="_blank">UK GOV</a>',
        },
        yAxis: {
          title: {
            text: "Fuel Prices",
          },
        },
        xAxis: {
          title: {
            text: `Year 2022 - 2023`,
          },
          categories: arrMonths,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
          },
        },

        series: [
          {
            name: "Solid Fuel",
            data: calculated[1],
          },
          {
            name: "Liquid Fuel",
            data: calculated[2],
          },
          {
            name: "Gas Fuel",
            data: calculated[0],
          },
          {
            name: "Electricity",
            data: calculated[3],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
    });
}
