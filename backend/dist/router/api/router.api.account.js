"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const express_1 = require("express");
const database_model_1 = require("../../database/database.model");
const util_1 = require("../../util/util");
const router = express_1.Router();
router.route('/')
    .get(util_1.isAuth, function (req, res) {
    const id = req.user._id;
    database_model_1.User.findById(id)
        .then(user => {
        let data = Object.assign({}, user.toObject());
        delete data.password;
        res.status(200).json(data);
    })
        .catch(error => res.status(500).send('Unknow error'));
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
        socketId: undefined,
        online: false,
    });
    user.save()
        .then(data => res.status(201).send('Create account successful'))
        .catch(error => res.status(500).send(error));
})
    .put(util_1.isAuth, function (req, res) {
    const id = req.user._id;
    const { name, oldPassword, newPassword } = req.body;
    if (!oldPassword || (!name && !newPassword))
        return res.status(400).send('Request error');
    database_model_1.User.findById(id)
        .then(user => {
        if (!bcrypt.compareSync(oldPassword, user.get('password')))
            return res.status(400).send('Request error');
        if (name)
            user.set('name', name);
        if (newPassword)
            user.set('password', bcrypt.hashSync(newPassword, 12));
        user.save()
            .then(data => res.status(200).send('Update user info success'))
            .catch(error => res.status(500).send('Unknow error'));
    })
        .catch(error => res.status(500).send('Unknow error'));
})
    .delete(util_1.isAuth, function (req, res) {
    const id = req.user._id;
    const { password } = req.body;
    if (!password)
        return res.status(400).send('Request error');
    database_model_1.User.findById(id)
        .then(user => {
        if (!bcrypt.compareSync(password, user.get('password')))
            return res.status(400).send('Request error');
        user.remove()
            .then(data => res.status(200).send('Delete account success'))
            .catch(error => res.status(500).send('Unknow error'));
    })
        .catch(error => res.status(500).send('Unknow error'));
});
exports.default = router;
//# sourceMappingURL=router.api.account.js.map