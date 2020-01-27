"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.route('/users')
    .get(function (req, res) {
    res.send('On user router');
});
exports.default = router;
//# sourceMappingURL=router.users.js.map