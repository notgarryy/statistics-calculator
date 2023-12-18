function calculateBinomial(){
  document.getElementById('myChart1').textContent = '';
  let i=0;
  let n = document.getElementById('rectangle-4179-TCZ').value;
  let p = document.getElementById('rectangle-4180-3Rf').value;
  let q = 1-p;
  let x = document.getElementById('rectangle-4181-yCq').value;
  let a=n-x;

    let combi1 = Combinatorial(n, x);
    let pow1 = Math.pow(p, x);
    let pow2 = Math.pow(q, a);
  
    let binomialDistribution = combi1*pow1*pow2;
  
    let total=0;
    let totalLessThanX = 0;
    for(i=0; i<x; i++){
      let b = n-i;
      let combi2 = Combinatorial(n, i);
      let pow3 = Math.pow(p, i);
      let pow4 = Math.pow(q, b);
  
      total = combi2 * pow3 * pow4;
  
      totalLessThanX += total;
    }
  
    let totalLessThanEqX = totalLessThanX + binomialDistribution;
    let totalMoreThanX = 1 - totalLessThanEqX;
    let totalMoreThanEqX = 1 - totalLessThanX;
  
    let mean = n*p;
    let variance = n*p*q;
  
    document.querySelector('.binomial-x-eqs-RV').innerHTML = `P(X=${x}) = ${binomialDistribution.toPrecision(5)}`;
    document.querySelector('.binomial-x-less-than-RV').innerHTML = `P(X<${x}) = ${totalLessThanX.toPrecision(5)}`;
    document.querySelector('.binomial-x-less-than-eqs-RV').innerHTML = `P(X≤${x}) = ${totalLessThanEqX.toPrecision(5)}`;
    document.querySelector('.binomial-x-more-than-RV').innerHTML = `P(X>${x}) = ${totalMoreThanX.toPrecision(5)}`;
    document.querySelector('.binomial-x-more-than-eqs-RV').innerHTML = `P(X≥${x}) = ${totalMoreThanEqX.toPrecision(5)}`;
    document.querySelector('.binomial-expectance').innerHTML = `Rataan = ${mean}`;
    document.querySelector('.binomial-variance').innerHTML = `Variansi = ${variance.toPrecision(6)}`;

    const count = new Array;
    for(i=0; i<=n; i++){
      count.push(i);
    }

    const dataset = new Array;
    for(i=0; i<=n;i++){
      let total = 0;
      let b = n-i;
      let combi2 = Combinatorial(n, i);
      let pow3 = Math.pow(p, i);
      let pow4 = Math.pow(q, b);

      total = combi2 * pow3 * pow4;
  
      dataset.push(total.toPrecision(6));
    }
    
    const ctx = document.getElementById('myChart1');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: count,
        datasets: [{
          label: 'Binomial Distribution',
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