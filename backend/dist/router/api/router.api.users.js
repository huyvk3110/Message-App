"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_model_1 = require("../../database/database.model");
const bcrypt = require("bcrypt");
const router = express_1.Router();
router.route('/')
    .get(function (req, res) {
    const { name, id, email, online } = req.query;
    let filter = {};
    if (name)
        filter = Object.assign(filter, { name });
    if (id)
        filter = Object.assign(filter, { _id: id });
    if (email)
        filter = Object.assign(filter, { email });
    if (online)
        filter = Object.assign(filter, { online });
    database_model_1.User.find(filter)
        .then(data => res.json(data))
        .catch(error => res.status(200).json(error));
})
    .post(function (req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).send('Request error');
    let user = new database_model_1.User({
        name,
        email,
        password: bcrypt.hashSync(password, 12),
        created_at: new Date(),
        last_login: new Date(),
        login_count: 0,
        permission: 2,
        online: false,
    });
    user.save()
        .then(data => res.status(201).send('Create user successful'))
        .catch(error => res.status(500).send(error));
})
    .put(function (req, res) {
    const { id, name, password } = req.body;
    if (!id || (!name && !password))
        return res.status(400).send("Request error");
    let update = {};
    if (name)
        update = Object.assign(update, { name });
    if (password)
        update = Object.assign(update, { password: bcrypt.hashSync(password, 12) });
    database_model_1.User.findOneAndUpdate({ _id: id }, update)
        .then(data => res.status(200).send('Update user successful'))
        .catch(error => res.status(500).send(error));
})
    .delete(function (req, res) {
    const { id } = req.body;
    if (!id)
        return res.status(400).send("Request error");
    database_model_1.User.findByIdAndDelete(id)
        .then(data => res.status(200).send("Delete user successful"))
        .catch(error => res.status(500).send(error));
});
exports.default = router;
//# sourceMappingURL=router.api.users.js.map