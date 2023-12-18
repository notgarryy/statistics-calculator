function calculatePoisson(){
  document.getElementById('myChart3').textContent = '';
  let i=0;
  let randomVariable = document.getElementById('rectangle-4180-3Rf').value;
  let avgSuccessRate = document.getElementById('rectangle-4179-TCZ').value;
  let inversAVG = avgSuccessRate * -1;

  let a = Math.pow(avgSuccessRate, randomVariable);
  let b = Math.pow(2.718281828459045, inversAVG);
  let c = recursionFactorial(randomVariable);

  let poissonDistribution = (a * b) / c;

  let total = 0;
  let totalLessThanRV = 0;
  for(i=0; i<randomVariable; i++){
    let d = Math.pow(avgSuccessRate, i);
    let e = Math.pow(2.718281828459045, inversAVG);
    let f = recursionFactorial(i);

    total = (d*e)/f;

    totalLessThanRV += total;
  }

  let totalLessThanEqRV = totalLessThanRV + poissonDistribution;
  let totalMoreThanRV = 1 - totalLessThanEqRV;
  let totalMoreThanEqRV = 1 - totalLessThanRV;

  document.querySelector('.poisson-x-eqs-RV').innerHTML = `P(X=${randomVariable}) = ${poissonDistribution.toPrecision(5)}`;
  document.querySelector('.poisson-x-less-than-RV').innerHTML = `P(X<${randomVariable}) = ${totalLessThanRV.toPrecision(5)}`;
  document.querySelector('.poisson-x-less-than-eqs-RV').innerHTML = `P(X≤${randomVariable}) = ${totalLessThanEqRV.toPrecision(5)}`;
  document.querySelector('.poisson-x-more-than-RV').innerHTML = `P(X>${randomVariable}) = ${totalMoreThanRV.toPrecision(5)}`;
  document.querySelector('.poisson-x-more-than-eqs-RV').innerHTML = `P(X≥${randomVariable}) = ${totalMoreThanEqRV.toPrecision(5)}`;
  document.querySelector('.poisson-expectance').innerHTML = `Ekspektasi = ${avgSuccessRate}`;
  document.querySelector('.poisson-variance').innerHTML = `Variansi = ${avgSuccessRate}`;

  const count = new Array;
  const dataset = new Array;
  let distribution = 0;
  i = 0;
  do{
    let d = Math.pow(avgSuccessRate, i);
    let e = Math.pow(2.718281828459045, inversAVG);
    let f = recursionFactorial(i);

    distribution = (d*e)/f;

    count.push(i);
    dataset.push(distribution)
    i++;
  }while(distribution > 0.0001);


  const ctx = document.getElementById('myChart3');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: count,
      datasets: [{
        label: 'Poisson Distribution',
        data: dataset,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'lightblue'
      }]
    },
    options: {}
  });
}

function Combinatorial(n, r){
  let z = n-r;
  let a = recursionFactorial(n);
  let b = recursionFactorial(r);
  let c = recursionFactorial(z);
  let d = b * c;

  let combination = a/d;
  return combination;
}

function recursionFactorial(num){
  if(num === 0){
    return 1;
  } else if (num > 0){
    return num * recursionFactorial(num - 1);
  }
}