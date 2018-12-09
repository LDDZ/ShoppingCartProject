// 获取所有按钮
// var btnList=document.querySelectorAll('.btn-group .btn');
var increase=document.getElementsByName('increase');
console.log(increase);
var decrease=document.getElementsByName('decrease');
var addToCart=document.getElementsByName('addToCart');
// 获取购物车旁边的徽标
var totalQty=document.getElementsByName('totalQty')[0];

// for (const key in btnList) {
//     if (btnList.hasOwnProperty(key)) {
//         const element = btnList[key];
//         switch(element.name){
//             case 'increase':element.addEventListener('click',increaseValue);break;
//             case 'decrease':element.addEventListener('click',decreaseValue);break;
//             case 'addToCart':element.addEventListener('click',addToCart);break;
//         }        
//     }
// }

function increaseValue(e){
      var qtyObj=  e.target.nextElementSibling;
      var qty=parseInt(qtyObj.innerText);
      qty++;
      qtyObj.innerText=qty;
      console.log(qty);        
}
function decreaseValue(e){
    var qtyObj=  e.target.previousElementSibling;
    var qty=parseInt(qtyObj.innerText);
   if(qty>1) qty--;
   else qty=0;
    qtyObj.innerText=qty;
    console.log(qty);        
}

function addToCartNum(e){
    var qtyObj=  e.target.previousElementSibling.previousElementSibling;
    var qty=parseInt(qtyObj.innerText);
    var total=parseInt(totalQty.innerText);
    total+=qty;
    totalQty.innerText=total;  
}
// for(var i=0;i<increase.length;i++){
//     increase[i].addEventListener('click', increaseValue);
// }
// for(var i=0;i<decrease.length;i++){
//     decrease[i].addEventListener('click', decreaseValue);
// }
// for(var i=0;i<addToCart.length;i++){
//     addToCart[i].addEventListener('click', addToCartNum);
// }
for(var i=0;i<increase.length;i++){
    increase[i].addEventListener('click', increaseValue);
    decrease[i].addEventListener('click', decreaseValue);
    addToCart[i].addEventListener('click', addToCartNum);
}