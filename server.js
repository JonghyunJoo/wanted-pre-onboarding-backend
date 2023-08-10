const express = require('express');
const { Account, Board } = require('./models')
const db = require('./models');
const authMWRouter = require('./authentication/auth_login');
const accountRouter = require('./views/account/account');
const basicBoardRouter = require('./views/basicBoard/basicBoard');

const app = express();
const port = 3000;
module.exports = app;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

db.sequelize.sync();

app.use('/api', basicBoardRouter)
app.use('/accountAPI', accountRouter)

app.get('/login', (req, res) => {
    res.render('./account/login');
})

app.get('/signUp', (req, res) => {
    res.render('./account/signUp');
})

app.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5; 

    try {
        const totalCount = await Board.count();

        const boards = await Board.findAll({
            order: [['day', 'DESC']],
            limit: perPage,
            offset: (page - 1) * perPage
        });

        res.render('./basicBoard/basicBoard', {
            boards: boards,
            currentPage: page,
            totalPages: Math.ceil(totalCount / perPage)
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.get('/readBoard', async (req, res) => {
    let boardId = req.query.boardId;
    try {
        const read = await Board.findOne({
            where: {
                boardId
            }
        });

        res.render('./basicBoard/readBoard', {
            boardId,
            readBoard: read,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

app.get('/auth/writeBoard', authMWRouter, async (req, res) => {
    res.status(200).send({
        result: "success",
        status: 200,
    });
})
app.get('/writeBoard', async (req, res) => {
    res.render('./basicBoard/writeBoard');
})


app.get('/updateBoard', async (req, res) => {
    let boardId = req.query.boardId;

    try {
        const read = await Board.findOne({
            where: {
                boardId
            }
        });

        res.render('./basicBoard/updateBoard', {
            boardId,
            readBoard: read,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})