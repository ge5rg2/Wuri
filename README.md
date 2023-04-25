# Wuri

## Side project “Wuri”

우리들의 다이어리, Wuri라고 불리는 사이드 프로젝트

> Wuri는 사용자가 일기, 연인과의 데이트, 육아 활동을 기록할 수 있는 사이드 프로젝트 앱입니다. Firebase를 통한 OAuth 로그인, 연인과의 일기 공유, 일기 작성 및 댓글 등의 기능을 제공할 예정입니다. 기술 스택으로는 React, Styled-Components, Firebase, NotionDB가 사용됩니다. 프로젝트는 환영 페이지, 메인 페이지, 일기 페이지, 새 글 페이지, 로그아웃 페이지, 계정 페이지 및 커플 다이어리 페이지를 포함합니다. ERD 다이어그램도 제공됩니다.

## Background

---

액션 포인트

1. 하루 일기를 기록하는 앱.
2. 연인과의 데이트 일기를 기록합니다.
3. 육아 활동 기록.

## Project goal

---

1. Firebase를 이용한 oauth 기능 및 로그인 구현
2. 연인 설정 시, 입력한 연인 정보가 서로 일치하면 일기를 공유할 수 있도록 함.
3. 작성 또는 댓글(수정 포함)

## Technology stack

---

클라이언트 - React, styled-component

서버 - firebase

DB - NotionDB || firebase

배포 - firebase

## Schedule

---

## Page component

---

Welcome page → 인증 방법 표시 / 로그인, 가입

Main page → 일기 미리보기 / 새 글 작성 / Nav var

1. 일기 미리보기: 각 미리보기 일기를 클릭하면 해당 일기를 편집, 댓글(커플 다이어리만)을 달 수 있는 일기 페이지로 이동합니다.
2. 새 글 작성: 새 글 버튼을 클릭하면 새로운 일기를 작성할 수 있는 새 글 페이지로 이동합니다.
3. Nav var → 로그아웃, 계정, 커플 다이어리
   1. 로그아웃: 로그아웃하고 환영 페이지로 이동합니다.
   2. 계정: 사용자 정보, 계정 삭제를 표시하는 계정 페이지로 이동합니다.
   3. 커플 다이어리: ....

커플 다이어리: 커플 다이어리에 등록되지 않은 사용자는 커플 정보를 등록하도록 팝업 대화 상자를 표시합니다. 그렇지 않으면 커플 다이어리 페이지로 이동합니다.

## ERD diagram

---

[개발자 및 분석가를 위한 무료 데이터베이스 디자이너](https://dbdiagram.io/d/63f3006c296d97641d822e33)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a7ca1cea-5a87-4da2-b478-025e789f4da5/Copy_of_Untitled_Diagram.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a7ca1cea-5a87-4da2-b478-025e789f4da5/Copy_of_Untitled_Diagram.png)
