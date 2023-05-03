# **Project [Wuri.](https://ge5rg2.github.io/Wuri/)** 📒

![](https://img.shields.io/badge/version-1.0.2-green)

### ChangeLog

| Version | Change Date |
| ------- | ----------- |
| 1.0.0   | 2023-04-22  |
| 1.0.1   | 2021-04-28  |
| 1.0.2   | 2021-05-03  |

<br/>

### 변경상세 내용

1.0.1

- 이미지 삭제 시 실제 db 삭제
- 댓글 edit일 때 focus 기능
- 이미지 업로드 시 용량 축소
- 프로필 페이지 사진 클릭 시 확대
- 프로필 사진 정방향으로 보이게 전환
- title, conetent 글자 수 제한
- 로딩 스피너 추가
- 터치 이벤트 적용

<br/>

1.0.2

- 커플 다이어리 달력, 페이지네이션 기능 추가
- 다이어리 하루에 한 개만 업로드 가능
- 커플 다이어리일 경우 삭제 시 댓글도 함께 삭제

<br/>

**우리들의 다이어리, Wuri**

> Wuri는 사용자가 일기, 연인과의 데이트, 육아 활동을 기록할 수 있는 사이드 프로젝트 앱입니다. Firebase를 통한 OAuth 로그인, 연인과의 일기 공유, 일기 작성 및 댓글 등의 기능을 제공할 예정입니다. 기술 스택으로는 React, Styled-Components, Firebase이 사용됩니다. 프로젝트는 환영 페이지, 메인 페이지, 일기 페이지, 새 글 페이지, 로그아웃 페이지, 계정 페이지 및 커플 다이어리 페이지를 포함합니다.

<br/>

## Background 🌐

<br/>

액션 포인트

1. 하루 일기를 기록하는 앱.
2. 연인과의 데이트 일기를 기록합니다.
3. 육아, 반려동물 활동 기록.

<br/>

## Project goal 📆

<br/>

1. Firebase를 이용한 oauth 기능 및 로그인 구현
2. 연인 설정 시, 입력한 연인 정보가 서로 일치하면 일기를 공유 기능
3. 작성 또는 댓글(수정 포함)
4. 그 외 추가 기능 포함

<br/>

## Technology stack 👨‍🔧

<br/>

클라이언트 - React, styled-component

서버 - firebase

DB - firebase

배포 - gh-pages, firebase

<br/>

## Page component 📃

<br/>

Welcome page → 인증 방법 표시 / 로그인, 가입

Main page → 일기 미리보기 / 새 글 작성 / Nav var

1. 일기 미리보기: 각 미리보기 일기를 클릭하면 해당 일기를 편집, 댓글(커플 다이어리만)을 달 수 있는 일기 페이지로 이동합니다.
2. 새 글 작성: 새 글 버튼을 클릭하면 새로운 일기를 작성할 수 있는 새 글 페이지로 이동합니다.
3. Nav var → 로그아웃, 계정, 커플 다이어리
   1. 로그아웃: 로그아웃하고 환영 페이지로 이동합니다.
   2. 계정: 사용자 정보, 계정 삭제를 표시하는 계정 페이지로 이동합니다.
   3. 커플 다이어리: ....

커플 다이어리: 커플 다이어리에 등록되지 않은 사용자는 커플 정보를 등록하도록 팝업 대화 상자를 표시합니다. 그렇지 않으면 커플 다이어리 페이지로 이동합니다.

<br/>

## ERD diagram

<br/>

![다이어그램](/public/img/diagram.png)

<br/>

### More

[Wuri. Notion URL ✍️](https://inquisitive-opera-47e.notion.site/Side-project-Wuri-c4435c8bd7464b6fb7376b7308af8195)
