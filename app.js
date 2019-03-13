'use strict'
//local storage DS Storage
// debugger;
if (localStorage.allChosenLoc){
  console.log('previous storage')
  var retrievedNames=localStorage.productNamesLoc;
  var retrievedVotes=localStorage.allChosenLoc;
  // console.log('retrievedName', retrievedNames, 'retrievedVotes', retrievedVotes);

  var productNames=JSON.parse(retrievedNames);
  var allChosen=JSON.parse(retrievedVotes);
  // localStorage.clear;// no need
  displaychart();
}
else{ 
  console.log('new page')
  var productNames=['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
  var ext = ['jpg','jpg','jpg', 'jpg', 'jpg', 'jpg','jpg', 'jpg', 'jpg', 'jpg','jpg', 'jpg', 'jpg', 'jpg','png', 'jpg', 'jpg', 'gif','jpg', 'jpg'];
  var allChosen=[];

  for (i=0;i<productNames.length;i++){
    allChosen.push(0);
    
  }
}
//data

var past =[.25,.25,.25];
var allProducts = [];
var productchart;
var votes=0;


var productA= document.getElementById('productA');
var productB= document.getElementById('productB');
var productC= document.getElementById('productC');
var results=document.getElementById('results');
var prodTable=document.getElementById('prodTable');
var holder=document.getElementById('holder');
prodTable.hidden = true;




//Dom Node - I still get tripped up on this
function Product(name, a, ext){
  this.filepath = `img/${name}.${ext}`;
  this.name = name;
  this.chosen = a;
  allProducts.push(this); 
}
for(var i=0; i<productNames.length; i++){
  new Product(`${productNames[i]}`,allChosen[i],`${ext[i]}`);
}

//constructor function //


//make the random products - this i get
function showRandomProducts() {
  var three = [];
  var obj ={};
  for(var k=0; k<3; k++){
    obj[past[k]]=true;
  }  
  for(var i=0; i<past.length; i++){
    var random = Math.floor(Math.random()*allProducts.length);
    while (obj[random]){
      random = Math.floor(Math.random()*allProducts.length);
    }
    three.push(random);
    obj[random]=true; 
 }
  productA.hidden = false;
  productA.src = allProducts[three[0]].filepath;
  productA.alt = allProducts[three[0]].name;
  productA.title = allProducts[three[0]].name;
  productB.src = allProducts[three[1]].filepath;
  productB.alt = allProducts[three[1]].name;
  productB.title = allProducts[three[1]].name;
  productC.src = allProducts[three[2]].filepath;
  productC.alt = allProducts[three[2]].name;
  productC.title = allProducts[three[2]].name;
  past = three;

}
// bar graph stuff
function displaychart(){
  var ctx = document.getElementById('prodTable').getContext('2d');
   productchart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: productNames,
          datasets: [{
              label: "Number of Selections",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: allChosen
          }]
      },
      // Configuration options go here
      options: {
        responsive: false,
        scales: {
          yAxes:[{
            ticks: {
              // fontsize: 10,
              // setpsize: 1,
              // beginAtZero:true
            }

          }],
          xAxes: [{
             ticks:{
              //  fontsize: 10,
               autoSkip: false
             }

          }]
        }
      }
    });
}
//handing on clicks
function handleClick(event){
  if(votes<25){
    var h2 = document.getElementById('instruction');
    h2.textContent= "Click which you would most likely purchase";
    for (var i=0; i<allProducts.length; i++){
      if (event.target.title===allProducts[i].name){
      allProducts[i].chosen++;
      votes++;
      }
    }
    allChosen=[];
    
    for(var i = 0; i<allProducts.length; i++){
      allChosen.push(allProducts[i].chosen);
    }
    var productNamesStringified = JSON.stringify(productNames);
    localStorage.productNamesLoc=productNamesStringified;
    var allChosenStringified = JSON.stringify(allChosen);
    localStorage.allChosenLoc=allChosenStringified;

    showRandomProducts();
    
  }
  if (votes === 25){
    var h2 = document.getElementById('instruction');
    h2.textContent= "Results";
    productA.hidden=true;
    productB.hidden=true;
    productC.hidden=true;
    holder.hidden=true;
    prodTable.hidden=false;
    productA.src = '';
    productA.alt = '';
    productA.title = '';
    productB.src = '';
    productB.alt = '';
    productB.title = '';
    productC.src = '';
    productC.alt = '';
    productC.title = '';
    // console.table(allProducts); 
    displaychart();
    }
}



showRandomProducts();

//event listeners
productA.addEventListener('click',handleClick)
productB.addEventListener('click',handleClick)
productC.addEventListener('click',handleClick)