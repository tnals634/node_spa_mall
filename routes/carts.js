// /routes/carts.js
const express = require("express");
const router = express.Router();
const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

//localhost:3000/api/carts GET Method
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({});
  // [{goodsId, quantity}]
  const goodsIds = carts.map((cart) => {
    return cart.goodsId;
  });
  //{2, 11, 19} 이런 값을 가지게 됨

  const goods = await Goods.find({ goodsId: goodsIds });
  //Goods에 해당하는 정보를 가지고 올건데,
  //만약 goodsIds 변수안에 존재하는 값일 때에만 조회하라.

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId),
    };
  });

  res.json({
    carts: results,
  });
});

module.exports = router;
