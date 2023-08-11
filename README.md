# wanted-pre-onboarding-backend

## 이름
주종현


## 애플리케이션의 실행 방법 (엔드포인트 호출 방법 포함)


npm install

node server.js

http://localhost:3000으로 접속


## 데이터베이스 테이블 구조


|Column|Data Type|Constraints|
|-----|-----|-------|
|email|STRING|Primary Key, Not Null|
|password|STRING|Not Null|
|createdAt|DATE|Not Null|
|updatedAt|DATE|Not Null|


|Column|Data Type|Constraints|
|-----|-----|-------|
|boardId|INTEGER|Primary Key, Not Null, Auto Inc|
|email|STRING||
|title|STRING||
|contents|STRING||
|day|DATE||
|createdAt|DATE|Not Null|
|updatedAt|DATE|Not Null|


## 구현한 API의 동작을 촬영한 데모 영상 링크


## 구현 방법 및 이유에 대한 간략한 설명


## API 명세(request/response 포함)

### 1. 회원가입
URL: /accountAPI/signUp

Method: POST

request:

{
  "email": "example@example.com",
  "password": "securepassword"
}

response:

{
  "result": "success",
  "status": 200,
  "modal_title": "회원가입 성공",
  "modal_body": "회원이 되신 것을 축하드립니다!"
}

{
  "result": "fail",
  "status": 400,
  "modal_title": "회원가입 실패",
  "modal_body": "중복된 이메일입니다."
}

## docker-compose 실행 방법


Doker Desktop 설치

docker-compose up -d

http://localhost:3000으로 접속
