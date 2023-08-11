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

#### request :

##### URL :
/accountAPI/signUp

##### Method :
POST

##### Body :
{
  "email": "example@example.com",
  "password": "securepassword"
}

#### response :

##### 성공 :

{
  "result": "success",
  "status": 200,
  "modal_title": "회원가입 성공",
  "modal_body": "회원이 되신 것을 축하드립니다!"
}

##### 중복 이메일  :

{
  "result": "fail",
  "status": 400,
  "modal_title": "회원가입 실패",
  "modal_body": "중복된 이메일입니다."
}

##### 양식에 맞지 않는 요청 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "회원가입 실패",
  "modal_body": "양식에 맞지 않습니다."
}

### 2. 로그인



#### request:
##### URL:
/accountAPI/login

##### Method:
POST

##### Body :
{
  "email": "example@example.com",
  "password": "securepassword"
}

#### response:

##### 성공 :

{
  "token": "jsonwebtoken",
  "status": 200,
  "result": "success",
  "modal_title": "로그인 성공",
  "modal_body": "example@example.com님 환영합니다."
}

##### 이메일 불일치 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "로그인 실패",
  "modal_body": "이메일을 확인해주세요."
}

##### 패스워드 불일치 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "로그인 실패",
  "modal_body": "패스워드를 확인해주세요."
}

##### 양식에 맞지 않는 요청 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "회원가입 실패",
  "modal_body": "양식에 맞지 않습니다."
}

### 3. 게시글 목록

#### request :

##### URL :
/

##### Method :
GET

#### response :

{
  "boards": [
    {
      "boardId": 1,
      "title": "게시글 제목",
      "email": "example@example.com",
      "day": "2023-08-09"
    },
  ],
  "currentPage": 1,
  "totalPages": 5
}

### 4. 게시글 조회

#### request :

##### URL :
/readBoard/?boardId=게시글ID

##### Method :
GET

#### response :

{
  "boardId": 1,
  "title": "게시글 제목",
  "email": "example@example.com",
  "day": "YYYY-MM-DD",
  "contents": "게시글 내용"
}

### 5. 게시글 생성

#### request :

##### URL :
/api/writeBoard

##### Method :
GET

##### Body :

{
  "title": "게시글 제목",
  "contents": "게시글 내용"
}

#### response :

##### 성공 :
{
  "result": "success",
  "status": 200,
  "modal_title": "저장 성공",
  "modal_body": "글이 성공적으로 저장 되었습니다."
}

##### 양식에 맞지 않는 요청 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "저장 실패",
  "modal_body": "양식에 맞지 않습니다."
}

### 6. 게시글 수정


#### request :

##### URL :
/api/modifyBoard

##### Method :
POST

##### Body :
{
  "boardId": 1,
  "title": "수정된 게시글 제목",
  "contents": "수정된 게시글 내용"
}

#### response :

##### 성공 :
{
  "result": "success",
  "status": 200,
  "modal_title": "수정 성공",
  "modal_body": "글이 성공적으로 수정 되었습니다."
}

##### 양식에 맞지 않는 요청 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "수정 실패",
  "modal_body": "양식에 맞지 않습니다."
}

### 7. 게시글 삭제

#### request:

##### URL:
/api/deleteBoard

##### Method:
POST

##### Body

{
 "boardId": 1
}

#### response:

##### 성공 :
{
  "result": "success",
  "status": 200,
  "modal_title": "삭제 성공",
  "modal_body": "글이 성공적으로 삭제 되었습니다."
}

##### 양식에 맞지 않는 요청 :

{
  "result": "fail",
  "status": 400,
  "modal_title": "삭제 실패",
  "modal_body": "양식에 맞지 않습니다."
}


## test 코드 실행 방법

npm test

## docker-compose 실행 방법


Doker Desktop 설치

docker-compose up -d

http://localhost:3000으로 접속
