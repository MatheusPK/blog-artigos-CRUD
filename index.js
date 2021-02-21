const express = require('express');
const app = express(); // açucar sintatico
const bodyParser = require('body-parser');
const dbConnection = require('./database/dbConnection');
const session = require('express-session');
const PORT = process.env.PORT || 5000

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');
const usersController = require('./users/usersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');


// view engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({ 
    secret: "Bobó de Camarão", // aumenta a seguranca das sessoes, normalmente algo aleatorio
    cookie: {
        maxAge: 600000 // tempo que dura cada sessao - milisec
    },
    resave: false,
    saveUninitialized: false
}));

// static files
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// database connection
dbConnection 
    .authenticate()
    .then(() => {
        console.log("conexao com banco de daos bem sucedida");
    })
    .catch(Error => {
        console.log(Error);
    });

app.use("/", categoriesController); // pode colocar um prefixo para as rotas importdas
app.use("/", articlesController);
app.use("/", usersController);

app.get("/session", (req, res) => {
    req.session.treinamento = "batata";
    req.session.ano = 2019;
    req.session.email = "matheskulick@hotmail.com";
    res.send("Sessao gerada");
});

app.get("/leitura", (req, res) => {
    res.json({treinamento: req.session.treinamento, ano: req.session.ano, email: req.session.email});
});

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("home", {
                articles: articles,
                categories: categories,
                filtred: false //filtred e para remover a paginacao nas paginas filtradas - fix later
            });
        });
    });
    
});

app.get("/homeAdmin", (req, res) => {
    res.render("admin/homeAdmin");
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {
                    article: article,
                    categories: categories
                });
            });
        }
        else {
            res.redirect("/");
        }
    }).catch(Error => {
        res.redirect("/");
    })
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("home", {articles: category.articles, categories: categories, filtred: true}); //filtred e para remover a paginacao nas paginas filtradas - fix later
            })
        }
        else {
            res.redirect("/");
        }
    }).catch(Error => {
        res.redirect("/");
    });
});



/*-- teste python
app.get("/teste", (req, res) => {
    console.log("oi")
    res.send({a: 'matheus', b: 'cagada'});
});
*/

app.listen(PORT, Error => {
    if(Error) {
        console.log("Erro, ao inicializar o servidor!")
    }
    else {
        console.log("Servidor inicializado com sucesso");
    }
});