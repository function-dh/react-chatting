## 실행 방법

- 사용 패키지
    - node 14.17.0
    - react 17.0.2
    - axios, dayjs, node-sass, react-router-dom, styled-components, gh-pages
- npm install 후 npm run start 시 local 서버 실행
- 해당 url에서 확인 가능

    [](https://function-dh.github.io/react-chatting)

## 구현 내용

### 초기 세팅

1. create react app 사용하여 react 환경 세팅
    - 초기 세팅에서 불필요한 부분 정리
    - meta, og 태그 관련 추가
    - scss (reset, font, mixin, layout) 관련 전역 초기 세팅
    ⇒ scss 설정에서 createGlobalStyle 활용하여 전역 초기 세팅 변경
2. styled-components 사용하여 스크립트 내부 css 선언
3. 스타일 가이드에 맞추어 color, fonts 등 공통 변수 추가 (ThemeProvider 활용)

### 채팅 리스트 (/list)

1. ChatItem.jsx 파일 내에 더미 데이터 추가 및 채팅 리스트 작업 진행
2. react-router-dom 사용하여 페이지 이동 구현
    - Redirect 사용하여 / 경로 접근 시 list로 url 변경
    - room/:room_id 경로에 사용자의 id에 따라 url 변경

6. axios로 더미 데이터 호출 후 useState 활용하여 데이터 전달

7. 제시 조건에 맞게 채팅방 리스트 데이터 값 삽입

### 채팅방 (/room)

1. Link to 경로와 함께 room에 해당 유저 관련 데이터 전달
2. ios notch 관련하여 css 처리 추가

    ```jsx
    calc(constant(safe-area-inset-bottom));
    calc(env(safe-area-inset-bottom));
    ```

3. dayjs 활용하여 시간 관련 처리 추가
    - list - 현재 날짜 기준 하루가 지나면 요일 표시
    - format 메소드 사용 한 자릿수 숫자 '0' 추가
4. 메시지 관련 데이터 구조 변경 + 읽지 않은 메시지 수 표시
5. 채팅 메시지 전송 구현
    - 자신이 보낸 메시지는 axios post 메소드로 DB전달하는 과정 구현
    - 1분 동안 메시지를 연속해서 보낸다면, 마지막 메시지만 전송 시간을 표시 (유저, 사용자 구별)
    - 빈 텍스트 입력 시 전송되지 않게 처리
    - scrollIntoView() 메소드 사용하여 채팅 입력 시 스크롤 맨 아래로 이동
6. 날짜 변경 시 채팅방 내 날짜 구분선 추가
7. 채팅방 사진 추가 기능 구현
    - useState에서 set 부분을 자식에게 넘겨 자식 컴포넌트에서 부모로 state값을 변환

## 추가 정리

- <React.StrictMode>
    1. Fragment와 같이 UI를 렌더링하지 않으며, 자식들에 대하여 검사과 경고를 활성화 함
    2. `StrictMode`는 아래와 같은 부분에서 동작함
        - [안전하지 않은 생명주기를 사용하는 컴포넌트 발견](https://ko.reactjs.org/docs/strict-mode.html#identifying-unsafe-lifecycles)
        - [레거시 문자열 ref 사용에 대한 경고](https://ko.reactjs.org/docs/strict-mode.html#warning-about-legacy-string-ref-api-usage)
        - [권장되지 않는 findDOMNode 사용에 대한 경고](https://ko.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
        - [예상치 못한 부작용 검사](https://ko.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)
        - [레거시 context API 검사](https://ko.reactjs.org/docs/strict-mode.html#detecting-legacy-context-api)