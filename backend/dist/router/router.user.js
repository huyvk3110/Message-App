"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.route('/api/users/')
    .get(function (req, res) {
    res.send('On api user');
});
exports.default = router;
//# sourceMappingURL=router.user.js.map