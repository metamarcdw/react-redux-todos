import express from 'express';
import serialize from 'express-serializer';
import Joi from 'joi';
import uuid from 'uuid/v4';

import { users } from '../db';
import { userSerializer } from '../serializers';
import { newUserSchema } from '../schemas';
import { findItem } from '../helpers';

const router = express.Router();

router.get('/user', (req, res) => {
    if (users.length < 1) return res.status(404).send({
        msg: 'No users found.'
    });

    serialize(req, users, userSerializer)
        .then(json => {
            res.send(json);
        }).catch(err => console.log(err));
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const { item: user } = findItem(id, users, res, 'public_id');

    if (user) serialize(req, user, userSerializer)
        .then(json => {
            res.send(json);
        }).catch(err => console.log(err));
});

router.post('/user', (req, res) => {
    const { value, error } = Joi.validate(req.body, newUserSchema);
    if (error) return res.status(400).send({
        msg: error.details[0].message
    });

    const { name, password } = value;
    const newUser = {
        id: users.length + 1,
        public_id: uuid(),
        name,
        password_hash: password,
        admin: false
    };
    users.push(newUser);

    serialize(req, newUser, userSerializer)
        .then(json => {
            res.send({ new_user: json });
        }).catch(err => console.log(err));
});

router.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { item: user } = findItem(id, users, res, 'public_id');
    user.admin = true;

    if (user) serialize(req, user, userSerializer)
        .then(json => {
            res.send({ promoted_user: json });
        }).catch(err => console.log(err));
});

router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const { item: user, index } = findItem(id, users, res, 'public_id');
    users.splice(index, 1);

    if (user) serialize(req, user, userSerializer)
        .then(json => {
            res.send({ deleted_user: json });
        }).catch(err => console.log(err));
});

export default router;
