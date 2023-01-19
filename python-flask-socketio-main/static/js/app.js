$(document).ready(function () {
  const ctx = document.getElementById("myChart").getContext("2d");


  const hctx = document.getElementById('hChart');

  new Chart(hctx, {
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
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


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
        { label: "Usage",  
          borderColor: ['rgba(255, 99, 132, 1)',],
        },
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

  function addData(label, data, volt_data, rotate_data, vibration_data, pressue_data) {
    console.log("Adding data :: " + label + " :: " + data+ " :: " + volt_data);
    myChart.data.labels.push(label);

    //for (var i = 0; i < myChart.data.datasets.length; i++) {
      myChart.data.datasets[0].data.push(data);
      myChart.data.datasets[1].data.push(volt_data);
      myChart.data.datasets[2].data.push(rotate_data);
      myChart.data.datasets[3].data.push(vibration_data);
      myChart.data.datasets[4].data.push(pressue_data);
    //}
    console.log(myChart.data.datasets[0].data);
    console.log(myChart.data.datasets[1].data);
    myChart.update();
  }


  function removeFirstData() {
    myChart.data.labels.splice(0, 1);
    myChart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }



  const MAX_DATA_COUNT = 10;
  //connect to the socket server.
  //   var socket = io.connect("http://" + document.domain + ":" + location.port);
  var socket = io.connect();

  //receive details from server
  socket.on("updateSensorData", async function (msg) {
    console.log("Received sensorData :: " + msg.date + " :: " + msg.value+ " :: " + msg.volt_value+" :: " + msg.rotate_value+"::" + msg.vibration_value+"::" + msg.pressue_value);

    // Show only MAX_DATA_COUNT data
    if (myChart.data.labels.length > MAX_DATA_COUNT) {
      removeFirstData();
    }
    addData(msg.date, msg.value,msg.volt_value,msg.rotate_value,msg.vibration_value,msg.pressue_value);
    //await sleep(4000);
    //sleep
    
  });
});
