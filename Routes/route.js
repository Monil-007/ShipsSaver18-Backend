const express = require('express')
const router = express.Router();

const { register_product_func, find_delivery_savers_func, close_order_func, your_orders_func } = require('../Controllers/functions.js');


router.post('/DeliverySaverApi/rkRegister', register_product_func);
router.post('/DeliverySaverApi/rkGetSavers', find_delivery_savers_func);
router.delete('/DeliverySaverApi/rkCloseOrder', close_order_func);
router.post('/DeliverySaverApi/rkGetYourOrders', your_orders_func);


module.exports = router