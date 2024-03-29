import React from "react";
import Chart from "chart.js";

export default function CardBarChart({ profits, losses, initialsCurrency }) {
  function formatMoney(value, currency) {
    value = parseFloat(value).toFixed(2);

    if (currency.toUpperCase() == "R$") {
      value = value.toString().replace(".", ",")
    }

    return value;
  }

  React.useEffect(() => {
    const labels = [];
    const dataProfits = [];
    const dataLosses = [];

    profits.map(data => {
      const year = data.date.substr(0, 4);
      const month = data.date.substr(5, 2);
      labels.push(month + "/" + year);
      dataProfits.push(data.value);
    });

    losses.map(data => {
      dataLosses.push(parseFloat(data.value) * -1);
    });

    let config = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Lucro",
            backgroundColor: "rgb(52, 211, 153)",
            borderColor: "rgb(52, 211, 153)",
            data: dataProfits,
            fill: false,
            barThickness: 8,
          },
          {
            label: "Prejuízo",
            fill: false,
            backgroundColor: "rgb(248, 113, 113)",
            borderColor: "rgb(248, 113, 113)",
            data: dataLosses,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (inf, context) {
              var label = context.datasets[inf.datasetIndex].label || '';

              if (label) {
                label += ': ';
              }
              if (inf.value !== null) {
                label += initialsCurrency + " " + formatMoney(inf.value, initialsCurrency);
              }
              return label;
            }
          }
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(255,255,255,.7)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Meses",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(255, 255, 255, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                labelString: "Valores",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(255, 255, 255, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-white text-xl font-semibold">Lucros X Prejuízos</h2>
              <hr className="mt-4 border-b-1 border-gray-700"></hr>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
