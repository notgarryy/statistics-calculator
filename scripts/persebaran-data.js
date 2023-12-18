function calculateData(){
  let inputValue = document.getElementById('rectangle-4157-Ld3').value;
  let numbersArray = inputValue.split(', ').map(Number);
  let i, j;

  document.getElementById('container').textContent = '';

  //SORTING DATA
  for(i=0; i<numbersArray.length-1; i++){
    for(j=i+1; j<numbersArray.length; j++){
      if(numbersArray[i] > numbersArray[j]){
        let temp = numbersArray[i];
        numbersArray[i] = numbersArray[j];
        numbersArray[j] = temp;
      }
    }
  }

  //MEAN DATA
  let meanArray = 0;
  for(i=0; i<numbersArray.length; i++){
    meanArray += numbersArray[i];
  }
  meanArray = meanArray / numbersArray.length;

  //MEDIAN DATA
  let medianArray = 0;
  let medianIndex, placeholderIndex1, placeholderIndex2;
  if(numbersArray.length % 2 === 0){
    placeholderIndex1 = (numbersArray.length/2) - 1;
    placeholderIndex2 = (numbersArray.length/2);
    medianArray = (numbersArray[placeholderIndex1] + numbersArray[placeholderIndex2])/2;
  } else if(numbersArray.length % 2 === 1){
    medianIndex = Math.floor(numbersArray.length/2);
    medianArray = numbersArray[medianIndex];
  }

  //MODE DATA
  let numCounts = {};
  let maxCount = 0;
  let modes = [];
  let modeArray = 0;
 
  for (let i = 0; i < numbersArray.length; i++) {
     if (numCounts[numbersArray[i]] === undefined) {
       numCounts[numbersArray[i]] = 1;
     } else {
       numCounts[numbersArray[i]]++;
     }
 
     if (numCounts[numbersArray[i]] > maxCount) {
       maxCount = numCounts[numbersArray[i]];
       modes = [numbersArray[i]];
     } else if (numCounts[numbersArray[i]] === maxCount) {
       modes.push(numbersArray[i]);
     }
  }
 
  if (modes.length > 1) {
     modeArray = "Tidak ada modus";
  } else {
     modeArray = modes[0];
  }

  //QUARTILE DATA
  let quartileOneData = 0;
  let quartileTwoData = medianArray;
  let quartileThreeData = 0;
  let quartileOneDataIndex = 0;
  let quartileThreeDataIndex = 0;

  if(numbersArray.length % 2 === 0){
    quartileOneDataIndex = ((1 * (numbersArray.length + 2)) / 4) - 1;
    quartileThreeDataIndex = ((3 * (numbersArray.length + 2)) / 4) - 1;

    if(Number.isInteger(quartileOneDataIndex) === false && Number.isInteger(quartileThreeDataIndex) === false){
      let x1 = Math.floor(quartileOneDataIndex);
      let y1 = Math.floor(quartileOneDataIndex) + 1;

      let x2 = Math.floor(quartileThreeDataIndex);
      let y2 = Math.ceil(quartileThreeDataIndex);
      
      quartileOneData = ((numbersArray[y1] - numbersArray[x1]) * 0.5) + numbersArray[x1];
      quartileThreeData = ((numbersArray[y2] - numbersArray[x2]) * 0.5) + numbersArray[x2];
    } else {
      let x1 = quartileOneDataIndex;
      let x2 = quartileThreeDataIndex - 1;
      quartileOneData = numbersArray[x1];
      quartileThreeData = numbersArray[x2];
    }
  } else if(numbersArray.length % 2 === 1){
    quartileOneDataIndex = ((1 * (numbersArray.length + 1)) / 4) - 1;
    quartileThreeDataIndex = ((3 * (numbersArray.length + 1)) / 4) - 1;

    if(Number.isInteger(quartileOneDataIndex) === false && Number.isInteger(quartileThreeDataIndex) === false){
      let x1 = Math.floor(quartileOneDataIndex);
      let y1 = Math.floor(quartileOneDataIndex) + 1;

      let x2 = Math.floor(quartileThreeDataIndex);
      let y2 = Math.ceil(quartileThreeDataIndex);
      
      quartileOneData = ((numbersArray[y1] - numbersArray[x1]) * 0.5) + numbersArray[x1];
      quartileThreeData = ((numbersArray[y2] - numbersArray[x2]) * 0.5) + numbersArray[x2];
    } else {
      let x1 = quartileOneDataIndex;
      let x2 = quartileThreeDataIndex - 1;
      quartileOneData = numbersArray[x1];
      quartileThreeData = numbersArray[x2];
    }
  }

  //IQR
  let interQuartileRange = quartileThreeData - quartileOneData;

  //MAX AND MIN DATA
  let maxData = 0; minData = 0;
  for(i=0; i<numbersArray.length; i++){
    if(i==0){
      maxData = numbersArray[i];
      minData = numbersArray[i];
    } else {
      if(numbersArray[i] > maxData){
        maxData = numbersArray[i];
      } else if(numbersArray < minData){
        minData = numbersArray[i];
      }
    }
  }

  //OUTLIER
  let lowerWhisker1 = quartileOneData - (1.5 * interQuartileRange);
  let upperWhisker1 = quartileThreeData + (1.5 * interQuartileRange);


  let outlierArray = new Array;
  for(i = 0; i < numbersArray.length; i++){
    if(numbersArray[i] < lowerWhisker1){
      outlierArray.push(numbersArray[i]);
    } else if(numbersArray[i] > upperWhisker1){
      outlierArray.push(numbersArray[i]);
    }
  }

  //CHART
  anychart.onDocumentReady(function () {
    var data = [
      {x:"Box and Whisker Plot", low: minData, q1: quartileOneData, median: medianArray, q3: quartileThreeData, high: maxData, outliers: outlierArray}
    ]
    // create a chart
    chart = anychart.box();
    // create a box series and set the data
    series = chart.box(data);
    // set the container id
    chart.container("container");
    // initiate drawing the chart
    chart.draw();
  });

  document.querySelector('.data-terurut-box-RK3').innerHTML = `Data terurut: ${numbersArray}`;
  document.querySelector('.max-box-Fos').innerHTML = `Max: ${maxData}`;
  document.querySelector('.min-box-52D').innerHTML = `Min: ${minData}`;
  document.querySelector('.ratarata-box-waD').innerHTML = `Rata-rata: ${meanArray.toPrecision(5)}`;
  document.querySelector('.median-box-buf').innerHTML = `Median: ${medianArray}`;
  document.querySelector('.modus-box-sMP').innerHTML = `Modus: ${modeArray}`;
  document.querySelector('.q1-box-i77').innerHTML = `Q1: ${quartileOneData}`;
  document.querySelector('.q2-box-i77').innerHTML = `Q2: ${quartileTwoData}`;
  document.querySelector('.q3-box-i77').innerHTML = `Q3: ${quartileThreeData}`;
  document.querySelector('.iqr-box-1Ed').innerHTML = `IQR: ${interQuartileRange}`;
  document.querySelector('.pb-box-1Ed').innerHTML = `Pagar Bawah: ${lowerWhisker1}`;
  document.querySelector('.pa-box-1Ed').innerHTML = `Pagar Atas: ${upperWhisker1}`;
  document.querySelector('.outlier-box-fKB').innerHTML = `Outlier: ${outlierArray}`;
}