import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import ProductList from "./views/step/productList.vue";
import OrderCheck from "./views/step/orderCheck.vue";
import ReCharge from "./views/step/reCharge.vue";

let routes = [
  {
    path: "/login",
    component: Login,
    name: "登录",
    hidden: true
  },
  {
    path: "/",
    component: Home,
    name: "导航栏",
    redirect: "/productlist",
    children: [
      { path: "/productlist", component: ProductList, name: "可购买商品列表" },
      { path: "/ordercheck", component: OrderCheck, name: "订单查询" },
      { path: "/recharge", component: ReCharge, name: "充值" }
    ]
  },
  {
    path: "*",
    hidden: true,
    redirect: { path: "/login" }
  }
];

export default routes;
