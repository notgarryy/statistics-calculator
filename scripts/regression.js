function linearRegression(){
  document.getElementById('myChart').textContent = '';
  let xValue = document.getElementById('rectangle-4157-3zD').value;
  let xArray = xValue.split(', ').map(Number);

  let yValue = document.getElementById('rectangle-4157-zrq').value;
  let yArray = yValue.split(', ').map(Number);

  let n = xArray.length;

  let i = 0;
  let xyArray = new Array;
  for(i=0; i<n; i++){
    xyArray[i] = xArray[i] * yArray[i];
  }

  let xSqArray = new Array;
  for(i=0; i<n; i++){
    xSqArray[i] = xArray[i] * xArray[i]; 
  }

  let ySqArray = new Array;
  for(i=0; i<n; i++){
    ySqArray[i] = yArray[i] * yArray[i]; 
  }

  let xySum = summationFunction(xyArray, n);
  let xSum = summationFunction(xArray, n);
  let ySum = summationFunction(yArray, n);
  let xSqSum = summationFunction(xSqArray, n);
  let ySqSum = summationFunction(ySqArray, n);
  let xSumSq = xSum*xSum;
  let ySumSq = ySum*ySum;
  let yAvg = ySum/n;
  let xAvg = xSum/n;
  let root1 = (n*xSqSum) - xSumSq;
  let root2 = (n*ySqSum) - ySumSq;
  let sqrt1 = Math.sqrt(root1);
  let sqrt2 = Math.sqrt(root2);

  let b1 = ((n*xySum) - (xSum*ySum))/((n*xSqSum)-xSumSq);
  let b2 = yAvg - (b1*xAvg);
  let r = ((n*xySum) - (xSum*ySum))/(sqrt1*sqrt2);

  let relationship;
  if(r >= 0 && r <= 0.199){
    relationship = 'Sangat Lemah';
  } else if(r >= 0.2 && r <= 0.399){
    relationship = 'Lemah';
  } else if(r >= 0.4 && r <= 0.599){
    relationship = 'Cukup';
  } else if(r >= 0.6 && r <= 0.799){
    relationship = 'Kuat';
  } else if(r >= 0.8 && r <= 1){
    relationship = 'Sangat Kuat';
  }

  let KP = (r*r) * 100;

  document.querySelector('.rectangle-4188-P9f').innerHTML = `${b2.toPrecision(5)} + ${b1.toPrecision(5)}X`;
  document.querySelector('.rectangle-4189-Ywf').innerHTML = `${r.toPrecision(5)}`;
  document.querySelector('.rectangle-4190-hxy').innerHTML = `${relationship}`;
  document.querySelector('.rectangle-4191-82h').innerHTML = `${KP.toPrecision(4)}%`;

  const regression = new Array;
  let yval = 0;

  let maxData = Math.max(...xArray);
  let minData = Math.min(...xArray);

  for(i=minData; i<=maxData; i++){
    yval = b2 + (b1*i);
    regression.push({x: i, y: yval})
  };

  const scatter = new Array;

  for(i=0; i<=n; i++){
    scatter.push({x: xArray[i], y: yArray[i]})
  };

  const ctx = document.getElementById('myChart').getContext('2d');
  const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Scatter',
        data: scatter,
        borderColor: 'black',
        backgroundColor: 'black'
      },{
        label: 'Regression Line Dataset',
        data: regression,
        borderColor: 'green',
        backgroundColor: 'transparent',
        type: 'line'
      }]
    },
    options: {}
  });
}

function summationFunction(numbersArray, count){
  let i = 0;
  let summation = 0;
  for(i=0; i<count; i++){
    summation += numbersArray[i];
  }
  return summation;
}