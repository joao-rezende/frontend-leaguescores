import React from "react";
import Chart from "chart.js";
import Api from "../../services/Api";

export default function CardLineChartAccResult({ results, initialsCurrency }) {
  function formatMoney(value, currency) {
    value = parseFloat(value).toFixed(2);

    if (currency.toUpperCase() == "R$") {
      value = value.toString().replace(".", ",")
    }

    return value;
  }

  const labels = [];
  const dataResults = [];
  const dataLosses = [];

  results.map(data => {
    const year = data.date.substr(0, 4);
    const month = data.date.substr(5, 2);
    labels.push(month + "/" + year);
    dataResults.push(data.total);
  });


  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Resultado",
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: dataResults,
            fill: false,
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Gráfico da Banca",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "rgba(255,255,255,.4)",
          },
          align: "end",
          position: "top",
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
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Dias",
                fontColor: "white",
              },
              gridLines: {
                display: false,
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
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Valores",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
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
    var ctx = document.getElementById("line-chart-acc-result").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-white text-xl font-semibold">Resultado Acumulado</h2>
              <hr className="mt-4 border-b-1 border-gray-700"></hr>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart-acc-result"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
