const express = require('express');
const { Account, Board } = require('../../models')
const router = express.Router();
const authMWRouter = require('../../authentication/auth_login');


router.post('/writeBoard', authMWRouter, async (req, res) => {
    try {
        const { title, contents } = req.body;
        const { account } = res.locals;
        const email = account['dataValues']['email'];

        let boardId = await Board.findAll({
            order: [['boardId', 'DESC']],
            limit: 1
        });

        if (boardId.length == 0) {
            boardId = 1
        } else {
            boardId = boardId[0]['boardId'] + 1;
        }

        const today = new Date();
        const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

        const kr_today = new Date(utc + KR_TIME_DIFF + 32400000);
        const day = kr_today;

        await Board.create({ boardId, email, title, contents, day });

        res.status(200).send({
            result: "success",
            status: 200,
            modal_title: "저장 성공",
            modal_body: "글이 성공적으로 저장 되었습니다."
        });
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "저장 실패",
            modal_body: "내용 확인 후, 다시 작성해주세요."
        });
    }
})

router.post('/delete', authMWRouter, async (req, res) => {
    const { boardId } = req.body;

    Account.hasMany(Board, { foreignKey: 'email' });
    Board.belongsTo(Account, { foreignKey: 'email' });

    await Board.destroy({
        where: {
            boardId
        }
    });

    res.status(200).send({
        result: "success",
        status: 200,
        modal_title: "삭제 성공",
        modal_body: "글이 성공적으로 삭제 되었습니다."
    });
})

router.post('/updateBoard', async (req, res) => {
    try {
        const { boardId, title, contents, nowButton } = req.body;
        const findIdPw = await Board.findOne({
            where: {
                boardId
            }
        });


        if (findIdPw != null) {
            if (nowButton == 'updateButton') {
                await Board.update(
                    {
                        title: title,
                        contents: contents
                    },
                    {
                        where: {
                            boardId
                        }
                    },
                );

                res.status(200).send({
                    result: "success",
                    status: 200,
                    modal_title: "수정 성공",
                    modal_body: "글이 성공적으로 수정 되었습니다."
                });

            } else {

                await Board.destroy({
                    where: {
                        boardId
                    }
                });

                res.status(200).send({
                    result: "success",
                    status: 200,
                    modal_title: "삭제 성공",
                    modal_body: "글이 성공적으로 삭제 되었습니다."
                });
            }
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "삭제 실패",
            modal_body: "제목 혹은 내용을 확인해주세요."
        });
    }
})


module.exports = router;