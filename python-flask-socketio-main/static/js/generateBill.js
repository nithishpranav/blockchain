/*
    Generate Bill
    Author: Nithish Pranav
    
    This file is used to generate the bill for the machine.
    It uses the machine contract address to fetch the last transaction timestamp.
    It uses the last transaction from the machine contract to calculate the usage.
    It uses the machine value to calculate the bill.
    It uses the manufacturer and financier wallet id to transfer the bill amount to the manufacturer.

    Functions:
    generateBill() - start the flow of generating the bill. Gets the machine id and user id from the server.
    getContractDetails() - This function is used to get the contract details of the machine.
    getLastTransaction() - This function is used to get the last transaction details of the machine.
    calculateBill() - This function is used to calculate the bill amount.
    getUsage() - This function is called by the calculate bill to fetch the usage details per date.
*/

  function generateBill(){
    console.log("machineDetails");
    fetch('/getInfo')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        machineId = data.machineID;
        userWID = data.userWID;
        getContractDetails(machineId,userWID);
      })
      .catch(error => console.log('error', error)); 
  }
  function getContractDetails(machineId,userWID){
    var machine_id = machineId;
    var machine_value;
    var manufacturer_wallet_id;
    var financier_wallet_id;
    var machine_contract_address;
    var kld_from = "kld-from="+userWID;
    var url ="https://u0anrngbym-u0kuxslxro-connect.us0-aws.kaleido.io/instances/"+machine_id+"/contractDetails?"+kld_from;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic dTBwNjgwb3pvMDpqN3dLUHRZa0xrNnBITlNDQTlDckJaNVM3MlBFemtCSGtxbjVSVkdESGRF");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
          console.log(result);
          var machineDetails = JSON.parse(result);
          machine_value = machineDetails.output1;
          financier_wallet_id = machineDetails.output2;
          manufacturer_wallet_id = machineDetails.output3;
          machine_contract_address = machineDetails.output4;
          getLastTransaction(machineId,userWID,machine_value,financier_wallet_id,manufacturer_wallet_id,machine_contract_address);        
      })
      .catch(error => console.log('error', error));
  }
  async function getLastTransaction(machineId,userWID,machine_value,financier_wallet_id,manufacturer_wallet_id,machine_contract_address){
    var lastTransaction;

   var machineContractAddress = machine_contract_address;
    const response  = await fetch('/getLastTransaction/'+machineContractAddress)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        lastTransaction = data[0].timestamp;
        console.log("lastTransaction"+lastTransaction);
      })
      .catch(error => console.log('error', error)); 

    lastTransaction = lastTransaction.slice(0,10);

    calculateBill(lastTransaction,machineId,financier_wallet_id,manufacturer_wallet_id,machine_contract_address);

  }
  async function calculateBill(lastTransaction,machine_id,financier_wallet_id,manufacturer_wallet_id,machine_contract_address){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    today.setHours(0,0,0,0);
    console.log("date"+date);
    var totalUsage = 0;
    var lastTransactionDate = lastTransaction;
    var lastTransactionYear = parseInt(lastTransaction.slice(0,4));
    var lastTransactionMonth = parseInt(lastTransaction.slice(5,7));
    var lastTransactionDate = parseInt(lastTransaction.slice(8,10));

    const tempDate = new Date(lastTransactionYear,lastTransactionMonth-1,lastTransactionDate);
    var d = new Date(tempDate);

    var dateYear = parseInt(date.slice(0,4));
    var dateMonth = parseInt(date.slice(5,7));
    var dateDate = parseInt(date.slice(8,10));
    var tempYear = lastTransactionYear;
    var tempMonth = lastTransactionMonth;
    console.log("tempDate"+tempDate);
    console.log("today"+today);
    
    
    while(tempDate<today){
      console.log(tempDate,today);
      totalUsage+= await getUsage(tempDate,machine_id,financier_wallet_id);
      console.log("totalUsage"+totalUsage);
      tempDate.setDate(tempDate.getDate()+1);
      console.log(tempDate);
    }

    console.log("totalUsage"+totalUsage);
    document.getElementById("machine_usage").innerHTML = totalUsage;
    document.getElementById("bill").style.display = "block";
  }
  async function getUsage(date,machine_id,financier_wallet_id){
    var month = parseInt(date.getMonth())+1;
    var dayStamp = (date.getDate())+'-'+month+'-'+date.getFullYear();
    var dayStamp = machine_id+":"+dayStamp;
    var kld_from = "kld-from="+financier_wallet_id;
    console.log(dayStamp);
    var dayUsage;
    var usage = 0;
    var url = "https://u0anrngbym-u0kuxslxro-connect.us0-aws.kaleido.io/instances/0xa8b0124d967f9e18c16d8a5dfcff1bc10ef8cb1c/returnUsage?"+kld_from+"&kld-sync=true";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic dTBwNjgwb3pvMDpqN3dLUHRZa0xrNnBITlNDQTlDckJaNVM3MlBFemtCSGtxbjVSVkdESGRF");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"timeStamp":dayStamp});
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response  = await fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        //return parseInt(result.output);
        dayUsage = parseInt(result.output);
        console.log("dayUsage"+dayUsage);
        
      })
      .catch(error => console.log('error', error));
      console.log("dayUsage"+dayUsage);
      return dayUsage;
  } 
