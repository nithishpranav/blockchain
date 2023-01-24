$(document).ready(function () {
  const ctx = document.getElementById("myChart").getContext("2d");

  // const hourChart = new Chart(ctx, {
  //   type: "line",
  //   data: {
  //     datasets: [{ label: "Usage",  }],
  //   },
  //   options: {
  //     borderWidth: 3,
  //     borderColor: ['rgba(255, 99, 132, 1)',],
  //   },
  // });

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [

        { label: "Voltage",
          borderColor: ['rgba(25, 119, 12, 1)',],
        },
        {
          label: "Rotation",
          borderColor: ['rgba(255, 99, 132, 1)',],
        },
        {
          label: "Vibration",
          borderColor: ['rgba(115, 9, 122, 1)',],
        },
        {
          label: "Pressure",
          borderColor: ['rgba(215, 119, 12, 1)',],
        }
      ],
    }
    // options: {
    //   borderWidth: 3,
    //   borderColor: ['rgba(255, 99, 132, 1)',],
    // },
  });

  function addData(label, volt_data, rotate_data, vibration_data, pressure_data) {
    //console.log("Adding data :: " + label +  " :: " + volt_data);
    myChart.data.labels.push(label);

    //for (var i = 0; i < myChart.data.datasets.length; i++) {
      //myChart.data.datasets[0].data.push(data);
      myChart.data.datasets[0].data.push(volt_data);
      myChart.data.datasets[1].data.push(rotate_data);
      myChart.data.datasets[2].data.push(vibration_data);
      myChart.data.datasets[3].data.push(pressure_data);
    //}
    //console.log(myChart.data.datasets[0].data);
    //console.log(myChart.data.datasets[1].data);
    myChart.update();
  }


  function removeFirstData() {
    myChart.data.labels.splice(0, 1);
    myChart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }



  const MAX_DATA_COUNT = 100;
  //connect to the socket server.
  //   var socket = io.connect("http://" + document.domain + ":" + location.port);
  var socket = io.connect();

  //receive details from server
  socket.on("updateSensorData", async function (msg) {
    //console.log("Received sensorData :: " + msg.date + " :: " + msg.value+ " :: " + msg.volt_value+" :: " + msg.rotate_value+"::" + msg.vibration_value+"::" + msg.pressure_value);

    // Show only MAX_DATA_COUNT data
    if (myChart.data.labels.length > MAX_DATA_COUNT) {
      removeFirstData();
    }
    addData(msg.date,msg.volt_value,msg.rotate_value,msg.vibration_value,msg.pressure_value);
    //await sleep(4000);
    //sleep
    
  });
});

  var myPieChart = null/*  ww w.  j  a  v  a 2s  .c om*/
        var config = {
          options:{
                responsive:true,
                rotation: -90,
                circumference: 180,
          },
          type:'pie'}
      function pchart(ftb,mtb) {
         var ftb = ftb,
            mtb = mtb,
            ctx = document.getElementById('pieChart').getContext('2d');
                        config.data = {
            labels: ["Financier","Manufacturer"],
            datasets:
               [{
                  data: [ftb,mtb],
                  backgroundColor: ["#cd3e51", "#1d76db"],
                  //hoverBackgroundColor: ["#FF0000","#0000FF"]
               }]
         };
         if(myPieChart == null){
                            myPieChart = new Chart(ctx, config);
                        }else{
                            myPieChart.update()
                        }
      }

// var flag = null;
// function pieChartAppear(ftb,mtb) {
//   console.log ("flag: ",flag)
//   if (flag === null) {

//   const ptx = document.getElementById("pieChart").getContext("2d");
//   flag = true;
//   const pieChart = new Chart(ptx, {
//     type: "pie",
//     data: {
//       labels: ["Financier","Manifacturer"],
//       datasets: [
//         {
//           label: "Usage",
//           data: [ftb,mtb],
//           backgroundColor: ["#3e95cd", "#8e5ea2"],
//         },
//       ],
//     },
//     options: {
//       responsive:true,
//       rotation: -90,
//       circumference: 180,
//       title: {
//         display: true,
//         text: "Pie Chart",
//       },
//     },
//   });
//   }
//   else{
//     console.log("pieChart update")
//     pieChart.data.dataset.data=[ftb,mtb];
//     pieChart.update();
//   }
// }

function appear(){
  console.log("appear");
  document.getElementById("view").style.display = "none";
  const hctx = document.getElementById('hChart');

  let delayed;
  let flagOne = true;
  const hChart = new Chart(hctx, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20', 'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30', 'Day 31'],
      datasets: [{
        label: '# of Hours Used',
        data: [12, 10, 3, 5, 2, 3, 1, 2, 3, 4, 5, 6, 7, 10, 9, 1, 4, 12, 6, 8, 7, 2, 4, 3, 9, 2, 4, 6, 5, 4, 10],
        borderWidth: 1
      }]
    },

    
    options: {
      animation:{
        onComplete: () => {delayed = true
          if(flagOne){
          console.log("animation complete");
          document.getElementById("generateBill").style.display = "block";
          flagOne = false;
          }
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
            console.log(delay);
          }
          return delay;
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}