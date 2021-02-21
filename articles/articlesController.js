const express = require('express');
const router = express.Router();
const Article = require('./Article');
const Category = require('../categories/Category');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');

router.get("/admin/articles", adminAuth, (req, res) => {
    Article.findAll({
        include: [{model: Category}] // join
    }).then(articles => {
        res.render("admin/articles/index", {
            articles: articles
        });
    });
    
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        });
    });
    
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        body: body,
        categoryId: category, // campo da chave estrangeira para a tabela category
        slug: slugify(title)
    }).then(() => {
        res.redirect("/admin/articles")
    })
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != null && !isNaN(id)) {
        Article.destroy({ // deleta campo na tabela
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/articles");
        });
    }
    else {
        res.redirect("/admin/articles");
    } 
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {
                    article: article,
                    categories: categories
                });
            });
        }
        else {
            res.redirect("/admin/articles")
        }
    }).catch(Error => {
        res.redirect("/");
    });
});


router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var newTitle = req.body.title;
    var newBody = req.body.body;
    var newCategory = req.body.category
    Article.update({title: newTitle, body: newBody, categoryId: newCategory, slug: slugify(newTitle)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(Error => {
        res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num
    var offset = 0
    if(isNaN(offset) || page == 0) {
        offset = 0;
    }
    else {
        offset = parseInt(page-1)*4;
    }
    Article.findAndCountAll({ // retorna articles que tem articles.count(numero de linhas) e articles.rows as linhas
        order: [
            ['id', 'DESC']
        ],
        limit: 4,
        offset: offset
    }).then(articles => {
        var next = true;

        if(offset + 4 >= articles.count) {
            next = false;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {
                result: result,
                categories: categories,
            })
        });
    });
});


module.exports = router;