function recursionFactorial(num){
  if(num === 0){
    return 1;
  } else if (num > 0){
    return num * recursionFactorial(num - 1);
  }
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

function calculateHyper(){
  document.getElementById('myChart2').textContent = '';
  let i=0;
  let N = document.getElementById('rectangle-4180-ujK').value;
  let n = document.getElementById('rectangle-4181-FAu').value;
  let k = document.getElementById('rectangle-4182-RDo').value;
  let x = document.getElementById('rectangle-4183-bXb').value;
  let a = N-k;
  let b = n-x;

    let combi1 = Combinatorial(k, x);
    let combi2 = Combinatorial(a, b);
    let combi3 = Combinatorial(N, n);
  
    let hypergeometricDistribution = (combi1*combi2)/combi3;
  
    let total=0;
    let totalLessThanX = 0;
    for(i=0; i<x; i++){
      let c = n-i;
      let combi4 = Combinatorial(k, i);
      let combi5 = Combinatorial(a, c);
  
      total = (combi4*combi5)/combi3;
  
      totalLessThanX += total;
    }
  
    let totalLessThanEqX = totalLessThanX + hypergeometricDistribution;
    let totalMoreThanX = 1 - totalLessThanEqX;
    let totalMoreThanEqX = 1 - totalLessThanX;
  
    let mean = (n * k)/N;
    let variance =(((N-n)/(N-1))*n*(k/N)*(1-(k/N)));
  
    document.querySelector('.hyper-x-eqs-RV').innerHTML = `P(X=${x}) = ${hypergeometricDistribution.toPrecision(5)}`;
    document.querySelector('.hyper-x-less-than-RV').innerHTML = `P(X<${x}) = ${totalLessThanX.toPrecision(5)}`;
    document.querySelector('.hyper-x-less-than-eqs-RV').innerHTML = `P(X≤${x}) = ${totalLessThanEqX.toPrecision(5)}`;
    document.querySelector('.hyper-x-more-than-RV').innerHTML = `P(X>${x}) = ${totalMoreThanX.toPrecision(5)}`;
    document.querySelector('.hyper-x-more-than-eqs-RV').innerHTML = `P(X≥${x}) = ${totalMoreThanEqX.toPrecision(5)}`;
    document.querySelector('.hyper-expectance').innerHTML = `Rataan = ${mean.toPrecision(5)}`;
    document.querySelector('.hyper-variance').innerHTML = `Variansi = ${variance.toPrecision(5)}`;

    const count = new Array;
    for(i=0; i<=n; i++){
      count.push(i);
    }

    const dataset = new Array;
    for(i=0; i<=n;i++){
      let total = 0;
      let c = n-i;
      let combi4 = Combinatorial(k, i);
      let combi5 = Combinatorial(a, c);
  
      total = (combi4*combi5)/combi3;
  
      dataset.push(total.toPrecision(6));
    }
    
    const ctx = document.getElementById('myChart2');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: count,
        datasets: [{
          label: 'Hypergeometric Distribution',
          data: dataset,
          borderWidth: 1,
          borderColor: 'blue',
          backgroundColor: 'lightblue'
        }]
      },
      options: {}
    });
} 