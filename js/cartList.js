var cart = new ShoppingCart();
// console.log(cart);
// console.log(cart.getDataFromLocalSatorge());

// 显示购物车所有订单列表
function displayOrderList() {

    // 获取订单列表父元素
    let cartListNode = document.querySelector('#cartList');
    // console.log(cartListNode);

    // 获取样本节点
    let exmapleNode = document.querySelector('#orderExample');

    // 获取购物车数据
    let cartData = cart.getDataFromLocalSatorge();
    //获取订单列表数据
    let orderList = cartData.orderList;
    // if (orderList.length == 0);

    for (const i in orderList) {
        // 当前订单数据
        let order = orderList[i];

        //克隆样本节点形成当前订单节点
        let node = exmapleNode.cloneNode(true);
        // console.log(node);
        // 将订单节点挂接到父节点下
        cartListNode.appendChild(node);

        // 设置数据
        // 节点id
        node.id = order.id;

        // 商品状态
        let selectNode = node.querySelector('[data-operator="checkItem"]');
        selectNode.checked = order.selectStatus;
        // console.log(selectNode);

        // 图像地址
        let imgNode = node.querySelector('[data-name="imgSrc"]');
        imgNode.src = "images/" +order.imgSrc;
        // console.log(imgNode);

        // 商品标题
        let titleNode = node.querySelector('[data-name="title"]');
        titleNode.textContent = order.titile;

        // 单价
        let unitPriceNode = node.querySelector('[data-name="unitPrice"]');
        unitPriceNode.textContent = (order.unitPrice).toFixed(2);


        // 单项订单数量
        let qtyNode = node.querySelector('[data-name="qty"]');
        qtyNode.textContent = order.qty;

        // 小计
        let subPrice = node.querySelector('[data-name="subPrice"]');
        subPrice.textContent = (qtyNode.textContent * unitPriceNode.textContent).toFixed(2);

        node.classList.remove('d-none');

        // console.log(node);
    }
}

// 显示商品样本数
// 显示已选中商品的总数和总价格
function displaySelectedTotal() {
    // 获取购物车数据
    let cartData = cart.getDataFromLocalSatorge();

    // 获取样本数节点并修改数据
    let units = document.querySelector('[data-name="units"]');
    units.textContent = cartData.units;
    // 获取选中商品数量节点并修改数据
    let selectedQty = document.querySelector('[data-name="selectedQty"]')
    selectedQty.textContent = cart.getSelectedQty();

    // 获取选中商品的总价格节点并修改数据
    let selectedAmount = document.querySelector('[data-name="selectedAmount"]');
    selectedAmount.textContent = (cart.getSelectedAmount()).toFixed(2);
}

// 为相关节点注册事件
function regEvent() {
    // 获取清空购物车节点
    let element = document.querySelector('[data-operator="clearAll"]');
    // console.log(element);
    // 注册单机事件,事件触发函数
    element.onclick = clearAllEventFun;

    // 获取一组单项订单删除节点
    element = document.querySelectorAll('[data-operator="deleteItem"]');
    // console.log(element);
    // 为每个删除节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = deleteItemEventFun;
    }

    // 获取删除选中订单节点
    element = document.querySelector('[data-operator="deleteSelected"]');
    // console.log(element);
    // 为"删除选中的商品"节点注册单机事件,事件触发函数
    element.onclick = deleteSelectedOrder;

    // 获取所有+号节点
    element = document.querySelectorAll('[data-operator="increase"]');
    // console.log(element);
    // 为每个+号节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = AnOrderAddOrMinusFun;
    }
    // 获取所有-号节点
    element = document.querySelectorAll('[data-operator="decrease"]');
    // console.log(element);
    // 为每个-号节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = AnOrderAddOrMinusFun;
    }

    // 获取所有订单复选框节点
    element = document.querySelectorAll('[data-operator="checkItem"]');
    // console.log(element);
    // 为每个订单复选框节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = checkItemFun;
    }

    // 获取全选节点
    element = document.querySelectorAll('[data-operator="selectAll"]');
    // console.log(element);
    // 为全选节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = selectAllFun;
    }
}

// 清空事件触发函数
function clearAllEventFun() {
    cart.clearShoppingCart();
    // 获取订单根节点
    let cartListNode = document.querySelector('#cartList');
    //保留样本节点
    let ExampleNode = (document.querySelector('#orderExample')).cloneNode(true);
    //清除订单根节点的所有元素
    cartListNode.innerHTML = "";
    //将样本节点挂接回列表根节点
    cartListNode.appendChild(ExampleNode);
    // 更新商品总数据
    displaySelectedTotal();
}

//删除单项订单事件触发函数
function deleteItemEventFun() {
    // 获取订单根节点
    let cartListNode = document.querySelector('#cartList');
    // 获取当前订单节点
    let node = this.parentNode.parentNode;
    // 调用购物车类删除订单函数
    cart.deleteItem(node.id);
    // 删除节点
    cartListNode.removeChild(node);
    // 修改各种总数据
    displaySelectedTotal();
}
// 删除选中订单事件触发函数
function deleteSelectedOrder() {
    // 获取所有订单的复选框
    let checkItems = document.querySelectorAll('[data-operator="checkItem"]');
    // console.log(checkItems);
    // 定义id数组储存状态为选中的订单的id
    let idArray = new Array();
    // 向id数组添加元素
    for (let i = 1; i < checkItems.length; i++) {
        // console.log(checkItems[i].checked);
        if (checkItems[i].checked) {
            idArray.push((checkItems[i].parentNode.parentNode).id);
        }
    }
    // console.log(idArray);
    for (const i in idArray) {
        // 调用购物车类删除订单函数
        id = idArray[i];
        cart.deleteItem(id);
        // 获取订单根节点
        let cartListNode = document.querySelector('#cartList');
        // 获取要删除的订单节点
        let node = cartListNode.querySelector('[id="' + id + '"]');
        // console.log(node);
        // 删除节点
        cartListNode.removeChild(node);
    }
    // 修改各种总数据
    displaySelectedTotal();
}
// +&-事件触发函数
function AnOrderAddOrMinusFun() {
    // 获取订单根节点
    let cartListNode = document.querySelector('#cartList');

    // 获取当前订单节点
    let node = this.parentNode.parentNode.parentNode;
    // console.log(node);

    // 获取当前订单数量节点
    let qtyNode = node.querySelector('[data-name="qty"]');
    // consol.log(qtyNode);

    // 获取当前订单数量
    let qty = parseInt(qtyNode.textContent);
    // console.log(qty);

    // 获取当前操作是+还是-
    let AddOrMinus = this.textContent;
    // console.log(AddOrMinus);

    // 获取当前订单的id
    let id = node.id;
    // console.log(id);

    // 获取当前订单的小计
    let subPrice = node.querySelector('[data-name="subPrice"]');
    // 获取当前订单的单价
    let unitPriceNode = node.querySelector('[data-name="unitPrice"]');

    // 订单数量加或减
    if (AddOrMinus == '+') {
        qty++;
    } else {
        qty--;
        if (qty <= 0) { qty = 1; return; }
    }
    // 修改页面订单数量
    qtyNode.textContent = qty;
    // 调用指定某个订单数量加1/减1的方法
    cart.AnOrderAddOrMinus(id, AddOrMinus);
    // 修改小计
    subPrice.textContent = (qtyNode.textContent * unitPriceNode.textContent).toFixed(2);
    // 修改商品的总数和总价格
    displaySelectedTotal();
}
// 订单复选框触发函数
function checkItemFun() {
    // 获取“全选复选框”节点
    let cheselectAlls = document.querySelectorAll('[data-operator="selectAll"]');

    // 获取当前订单节点
    let node = this.parentNode.parentNode;

    // 获取当前订单id
    let id = node.id;
    // console.log(id);
    // 获取当前订单的选择状态
    let selectStatus = this.checked;
    // console.log(selectStatus);

    // 调用“设置购物订单项选择状态”方法
    cart.setItemSelectStatus(id, selectStatus);

    // 设置全选状态
    if (selectStatus == false) {
        for (const key in cheselectAlls) {
            cheselectAlls[key].checked = false;
        }
    } else {
        // 当选中商品的总数量=购物车数据的总件数时，“全选”复选框状态为选中
        if (cart.getSelectedQty() == cart.getDataFromLocalSatorge().totalQty) {
            for (const key in cheselectAlls) {
                cheselectAlls[key].checked = true;
            }
        }
    }
    // 修改商品的总数和总价格
    displaySelectedTotal();
}
// 全选复选框触发函数
function selectAllFun(e) {
    // 获取“全选“复选框节点
    let cheselectAlls = document.querySelectorAll('[data-operator="selectAll"]');
    // console.log(cheselectAlls);
    // 获取所有订单复选框节点
    let checkItems = document.querySelectorAll('[data-operator="checkItem"]');
    // 设置所有“全选”复选框的状态同步
    for (const key in cheselectAlls) {
        cheselectAlls[key].checked = e.target.checked;
    }
    // 设置所有订单的状态与“全选”复选框的状态同步
    for (let i=1;i<checkItems.length;i++) {
        // 获取订单id
        let id=(checkItems[i].parentNode.parentNode).id;
        // 将“全选”复选框的状态赋值给订单
        checkItems[i].checked=e.target.checked;
        // 调用“设置购物订单项选择状态”方法
        cart.setItemSelectStatus(id,e.target.checked);
    }
    // 修改商品的总数和总价格
    displaySelectedTotal();
}
// 初始化函数
function init() {
    // 显示购物车所有订单列表
    displayOrderList();
    // 显示商品样本数
    // 显示已选中商品的总数和总价格
    displaySelectedTotal();
    // 为相关节点注册事件
    regEvent();
}

init();