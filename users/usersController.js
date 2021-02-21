const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/adminAuth');


router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {
            users: users
        });
    });
});

router.get("/admin/users/create", (req, res) => { //sem middleware para qualquer um poder criar conta admin
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user == undefined) {

            var salt = bcrypt.genSaltSync(10); // seguranca a mais para o nosso hash salt(sal)
            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((Error) => {
                res.redirect("/");
            });

        } else {
            res.redirect("/admin/users/create");
        }
    });
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.get("/logout", (req,res) => {
    req.session.user = undefined;
    res.redirect("/");
});

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ // ver se existe um usario com esse email
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined) { // se existir um usuario com esse email
            // validar senha
            var correct = bcrypt.compareSync(password, user.password);
            if(correct) { // se a senha for valida criamos a sessao
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/homeAdmin");
            } else {
                res.redirect("/login");
            }

        } else {
            res.redirect("/login");
        }
    })
});


module.exports = router;