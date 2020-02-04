import * as bcrypt from "bcrypt";
import { Router } from "express";
import { User } from "../../database/database.model";
import { isAuth } from "../../util/util";

const router = Router();

router.route('/')
    .get(isAuth, function (req: any, res) {
        const id = req.session.user._id;

        User.findById(id)
            .then(user => {
                let data = Object.assign({}, user.toObject());
                delete data.password;
                res.status(200).json(data)
            })
            .catch(error => res.status(500).send('Unknow error'));
    })
    .post(function (req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).send('Request error');
        let user = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 12),
            created_at: new Date(),
            last_login: new Date(),
            login_count: 0,
            permission: 2,
            socketId: undefined,
            online: false,
        })
        user.save()
            .then(data => res.status(201).send('Create account successful'))
            .catch(error => res.status(500).send(error));
    })
    .put(isAuth, function (req: any, res) {
        const id = req.session.user._id;
        const { name, oldPassword, newPassword } = req.body;

        if (!oldPassword || (!name && !newPassword)) return res.status(400).send('Request error');
        User.findById(id)
            .then(user => {
                if (!bcrypt.compareSync(oldPassword, user.get('password'))) return res.status(400).send('Request error');
                if (name) user.set('name', name);
                if (newPassword) user.set('password', bcrypt.hashSync(newPassword, 12));
                user.save()
                    .then(data => res.status(200).send('Update user info success'))
                    .catch(error => res.status(500).send('Unknow error'))
            })
            .catch(error => res.status(500).send('Unknow error'));
    })
    .delete(isAuth, function (req: any, res) {
        const id = req.session.user._id;
        const { password } = req.body;

        if (!password) return res.status(400).send('Request error');
        User.findById(id)
            .then(user => {
                if (!bcrypt.compareSync(password, user.get('password'))) return res.status(400).send('Request error');
                user.remove()
                    .then(data => res.status(200).send('Delete account success'))
                    .catch(error => res.status(500).send('Unknow error'))
            })
            .catch(error => res.status(500).send('Unknow error'));
    })

export default router;