import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import ProductList from "./views/step/productList.vue";
import OrderCheck from "./views/step/orderCheck.vue";
import ReCharge from "./views/step/reCharge.vue";

let routes = [
  {
    path: "/finance/login",
    component: Login,
    name: "登录",
    hidden: true
  },
  {
    path: "/home",
    component: Home,
    name: "导航栏",
    redirect: "/finance/productlist",
    children: [
      { path: "/finance/productlist", component: ProductList, name: "可购买商品列表" },
      { path: "/finance/ordercheck", component: OrderCheck, name: "订单查询" },
      { path: "/finance/recharge", component: ReCharge, name: "充值" }
    ]
  },
  {
    path: "*",
    hidden: true,
    redirect: { path: "/finance/login" }
  }
];

export default routes;
