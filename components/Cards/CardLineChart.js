import React from "react";
import Chart from "chart.js";

export default function CardLineChart() {
  React.useEffect(() => {
    const labels = [];
    const metaReal = [];
    const metaMax = [];
    const metaMin = [];
    const lucro = [];
    for (let i = 0; i < 30; i++) {
      labels[i] = i + 1;
      metaReal[i] = (Math.random() * 100 + 1).toFixed(2);
      metaMax[i] = (Math.random() * 100 + 1).toFixed(2);
      metaMin[i] = (Math.random() * 100 + 1).toFixed(2);
      lucro[i] = (Math.random() * 100 + 1).toFixed(2);
    }

    var config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Meta Real",
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: metaReal,
            fill: false,
          },
          {
            label: "Meta Máxima",
            backgroundColor: "#0ea5e9",
            borderColor: "#0ea5e9",
            fill: false,
            data: metaMax,
          },
          {
            label: "Meta Mínima",
            fill: false,
            backgroundColor: "#FBBF24",
            borderColor: "#FBBF24",
            data: metaMin,
          },
          {
            label: "Lucro",
            fill: false,
            backgroundColor: "#34d399",
            borderColor: "#34d399",
            data: lucro,
          },
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
            fontColor: "white",
          },
          align: "end",
          position: "top",
        },
        tooltips: {
          mode: "index",
          intersect: false,
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
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
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
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-white text-xl font-semibold">Metas e Lucros</h2>
              <hr class="mt-4 border-b-1 border-gray-700"></hr>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
