
// 商品类
class Product {
  constructor(id, titile, unitPrice, imgSrc) {
    // 商品类成员
    this.id = id;
    this.titile = titile;
    this.unitPrice = unitPrice;
    this.imgSrc = imgSrc;
  }
}

//订单类
class Order {
  constructor(product, qty, selectStatus) {
    // 订单类成员
    this.id = product.id;
    this.titile = product.titile;
    this.unitPrice = product.unitPrice;
    this.imgSrc = product.imgSrc;
    this.qty = qty;
    this.selectStatus = selectStatus;
  }
}
// class Order {
//   constructor(product, qty,selectStatus) {
//     // 订单类成员
//     this.product= product;
//     this.qty = qty;
//     this.selectStatus=selectStatus;
//   }
// }

// 购物车数据类---确定格式
class CartData {
  // 数据成员 订单列表 总样本 总件数 总金额
  constructor() {
    this.orderList = new Array();
    this.units = 0;
    this.totalQty = 0;
    this.totalAmount = 0;
  }
}

// 购物车操作类
class ShoppingCart {
  // 将购物车数据写入本地存储
  setDataToLocalSatorge(cartData) {
    // 清空原有存储写入新列表
    localStorage.removeItem('test');
    // let cartDataString=JSON.stringify(cartData);
    // localStorage.setItem('test',cartDataString);
    localStorage.setItem('test', JSON.stringify(cartData));
  }
  // 从本地存储中获取购物车数据
  getDataFromLocalSatorge() {
    let test = localStorage.getItem('test');
    if (test == null || test == '') {
      return new CartData();
    } else {
      return JSON.parse(test);
    }
  }
  // 加入购物车(写入localStorage)
  addToCart(order) {
    // 读取本地存储中的购物车数据
    let cartData = this.getDataFromLocalSatorge();
    var flag = true; //假设当前状态是新商品
    for (var i = 0; i < cartData.orderList.length; i++) {
      if (order.id == cartData.orderList[i].id) {
        flag = false; // 修改状态，是老商品
        cartData.orderList[i].qty += order.qty;
        break;
      }
    }
    if (flag) {
      // order是购物车中的新商品，给样本数++
      cartData.orderList.push(order);
      cartData.units++;
    }

    cartData.totalQty += order.qty;
    cartData.totalAmount += order.unitPrice * order.qty;
    // 将新购物车数据写入本地存储
    this.setDataToLocalSatorge(cartData);
  }
  // 获取商品列表
  getSelectedProductList() {
    let cartData = this.getDataFromLocalSatorge();
    let list=cartData.orderList;
    return list;
  }
  // 获取选中商品的总数量
  getSelectedQty() {
    // 定义选中商品总数量变量
    let selectQty = 0;
    let cartData = this.getDataFromLocalSatorge();
    for (let i = 0; i < cartData.orderList.length; i++) {
      if (cartData.orderList[i].selectStatus) {
        selectQty += cartData.orderList[i].qty;
      }
    }
    return selectQty;
  }
  // 获取选中商品的总价格
  getSelectedAmount() {
    // 定义选中商品总价格变量
    let selectAmount = 0;
    let cartData = this.getDataFromLocalSatorge();
    for (let i = 0; i < cartData.orderList.length; i++) {
      if (cartData.orderList[i].selectStatus) {
        selectAmount += cartData.orderList[i].unitPrice * cartData.orderList[i].qty;
      }
    }
    return selectAmount;
  }
  // 设置购物订单项选择状态
  setItemSelectStatus(id, selectStatus) {
    let cartData = this.getDataFromLocalSatorge();
    let flag = false;
    for (let i = 0; i < cartData.orderList.length; i++) {
      if (id == cartData.orderList[i].id) {
        cartData.orderList[i].selectStatus = selectStatus;
        flag = true;
      }
    }
    if (flag) { this.setDataToLocalSatorge(cartData); }
    else { console.log('状态修改失败，id有误！'); }
  }

  // 删除某个指定（id）订单
  deleteItem(id) {
    let cartData = this.getDataFromLocalSatorge();
    for (let i = 0; i < cartData.orderList.length; i++) {
      if (id == cartData.orderList[i].id) {
        // 变更总商品总件数
        cartData.totalQty -= cartData.orderList[i].qty;
        //变更商品总价格
        cartData.totalAmount -= cartData.orderList[i].qty * cartData.orderList[i].unitPrice;
        // 变更总商品件数
        cartData.units--;
        // 删除当前订单
        cartData.orderList.splice(i, 1);
        break;
      }
    }
    this.setDataToLocalSatorge(cartData);
  }
  // 指定某个订单数量加1/减1
  AnOrderAddOrMinus(id, a) {
    let cartData = this.getDataFromLocalSatorge();
    for (let i = 0; i < cartData.orderList.length; i++) {
      if (id == cartData.orderList[i].id) {
        if (a == '-') {
          cartData.orderList[i].qty--;
          cartData.totalQty--;
          cartData.totalAmount -= cartData.orderList[i].unitPrice;
          if (cartData.orderList[i].qty == 0) {
            cartData.orderList.splice(i, 1);
            cartData.units--;
          }
        } if (a == '+') {
          cartData.orderList[i].qty++;
          cartData.totalQty++;
          cartData.totalAmount += cartData.orderList[i].unitPrice;
        }
      }
    }
    this.setDataToLocalSatorge(cartData);
  }

  // 清空购物车（移除本地存储购物车项）
  clearShoppingCart() {
    // localStorage.clear('test');
    localStorage.removeItem('test');
  }
}