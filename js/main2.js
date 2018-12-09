// 获取所有按钮
// var btnList=document.querySelectorAll('.btn-group .btn');
var increase=document.getElementsByName('increase');
// console.log(increase);
var decrease=document.getElementsByName('decrease');
var addToCart=document.getElementsByName('addToCart');

// 获取购物车旁边的徽标
var totalQty=document.getElementsByName('totalQty')[0];
// 获取商品的删除链接
var delA=document.getElementsByName('delA');
//获取弹出框的删除按钮
var delBtn=document.getElementsByName('delBtn')[0];

//点击删除链接时，添加删除类，用作记录删除那个商品的盒子
function addDelClass(){
  this.parentNode.parentNode.classList.add("delThis");
  console.log(this);
}
// 点击弹出框的“删除”按钮确认删除
function delBb(){
  var commodityBox=document.getElementsByClassName('container')[1];
  var theBoxToBeDeleted=document.getElementsByClassName('delThis')[0];
  commodityBox.removeChild(theBoxToBeDeleted);
}

// function delAFunction(){
//   this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
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

for(var i=0;i<increase.length;i++){
  increase[i].addEventListener('click', increaseValue);
  decrease[i].addEventListener('click', decreaseValue);
  delA[i].onclick=addDelClass;
}
delBtn.onclick=delBb;