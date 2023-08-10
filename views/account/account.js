const express = require('express');
const joi = require('joi')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { Account } = require('../../models');
const secretKey = require('../../config/jwt');
const router = express.Router();


const chkAccountSchema = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(8)
        .required(),
})


router.post('/signUp', async (req, res) => {
    try {
        const { email, password } = await chkAccountSchema.validateAsync(req.body);
        const user = await Account.findOne({
            where: { email }
        })

        if (user != null) {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "회원가입 실패",
                modal_body: "중복된 이메일입니다."
            });
        } else {
            const hashedPassword = await bcryptjs.hash(password, 12);
            await Account.create({ email, password: hashedPassword });
            res.status(200).send({
                result: "success",
                status: 200,
                modal_title: "회원가입 성공",
                modal_body: "회원이 되신것을 축하드립니다!"
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "회원가입 실패",
            modal_body: "양식에 맞지 않습니다."
        });
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = await chkAccountSchema.validateAsync(req.body);
        const user = await Account.findOne({
            where: { email }
        })

        if (!user) {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "로그인 실패",
                modal_body: "이메일을 확인해주세요."
            });
        } else {
            const match = await bcryptjs.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ email: user.email }, secretKey);
                res.status(200).send({
                    token: token,
                    status: 200,
                    result: "success",
                    modal_title: "로그인 성공",
                    modal_body: email + "님 환영합니다."
                });
            } else {
                res.status(400).send({
                    result: "fail",
                    status: 400,
                    modal_title: "로그인 실패",
                    modal_body: "패스워드를 확인해주세요."
                });
            }
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "로그인 실패",
            modal_body: "양식에 맞지 않습니다."
        });
    }
})

module.exports = router;


module.exports = router;