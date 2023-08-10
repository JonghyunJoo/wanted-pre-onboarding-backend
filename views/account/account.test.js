const app = require("../../server");
const supertest = require("supertest");
jest.mock("../../models");
const { Account } = require("../../models");

test("이메일 형식을 띄어야 합니다", async () => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      email: "admin",
      password: "1234",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual("양식에 맞지 않습니다.");
});

test("비밀번호는 8자 이상이어야 합니다", async () => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      email: "uko02218",
      password: "123",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual("양식에 맞지 않습니다.");
});

describe("addFollowing", () => {
  test("데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 '중복된 닉네임입니다.' 라는 에러메세지가 발생합니다.", async () => {
    Account.findOne = jest.fn();
    Account.create = jest.fn();

    const res = await supertest(app)
      .post("/accountAPI/signUp")
      .set("Accept", "application/json")
      .type("application/json")
      .send({
        email: "admin@admin.com",
        password: "12345678",
      });
    expect(Account.findOne).toHaveBeenCalledTimes(1);
  });

  test("데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 '중복된 닉네임입니다.' 라는 에러메세지가 발생합니다.", async () => {
    Account.findOne = jest.fn();
    Account.create = jest.fn();
    const res = await supertest(app)
      .post("/accountAPI/signUp")
      .set("Accept", "application/json")
      .type("application/json")
      .send({
        email: "newAdmin@admin.com",
        password: "12345678",
      });

    expect(Account.findOne).toHaveBeenCalledTimes(1);
    expect(Account.create).toHaveBeenCalledTimes(1);
    expect(JSON.parse(res.text)["modal_body"]).toEqual(
      "회원이 되신것을 축하드립니다!"
    );
  });
});
