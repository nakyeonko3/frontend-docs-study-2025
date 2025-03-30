
# 에디터 설정하기 

## 린팅(Linting)과 포맷팅(Formatting)의 차이

| 개념               | 설명                                             | 예시                                                   |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------- |
| 린팅 (Linting)     | 코드에서 오류, 버그, 일관성 없는 스타일 등을 찾아 경고하거나 자동 수정하는 도구 | `ESLint`를 사용하여 미사용 변수를 경고하거나, `console.log()` 사용을 제한 |
| 포맷팅 (Formatting) | 코드 스타일(들여쓰기, 따옴표 스타일 등)을 자동으로 정리하는 도구          | `Prettier`를 사용하여 코드 줄 바꿈, 공백 정리, 따옴표 통일              |

## eslint-plugin-react-hooks
- **[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)** 는 [Hook의 규칙 – React](https://ko.react.dev/reference/rules/rules-of-hooks) 를 어길 경우 경고를 표시한다. 
### - Rules of Hooks
- 훅은 함수 컴포넌트 최상위에서 호출해야 한다.
	- 조건문, 반복문 안에서 훅을 선언해서는 안된다.
	- 이벤트 핸들러에서 Hook을 호출하면 안된다.
- 훅은 리액트 함수 컴포넌트에서만 호출해야 한다.

```jsx
function FriendList() {
  const [onlineStatus, setOnlineStatus] = useOnlineStatus(); // ✅
}

function setOnlineStatus() { // ❌ 컴포넌트나 커스텀 Hook이 아닙니다!
  const [onlineStatus, setOnlineStatus] = useOnlineStatus();
}
```


- 내부적으로 순서에 의존하는 링크드 리스트 형태로 훅 정보를 저장하기 때문에 순서가 뒤바뀔 경우 Fiber 내부에 생성한 상태 순서가 꼬이게 된다.
	- [How hooks work \| How React Works](https://incepter.github.io/how-react-works/docs/react-dom/how.hooks.work/)
	-   `ReactFiberHooks.js` 

![300x300](https://i.imgur.com/BaVCE7m.png)

![300x500](https://i.imgur.com/JyFKfMi.png)



# Typescript 사용하기

## tsconfig 설정하기

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

## tsconfig 옵션들

### `jsx` 
- `jsx` 옵션을 `preserve`를 사용하면 대부분의 앱에서 유효하지만  `react-jsx` 등 옵션을 사용하는 것이 권장된다.
	- `jsx` 옵션은  JSX파일의 출력 파일을 지정해준다. 유형 검사에는 영향을 주지 않는다.
	-  `preserve` 를 사용하게 되면 컴파일 과정에서 jsx를 js로 변환하지 않는다. 이후에 SWC나 babel이 jsx를  js 코드로 변환한다.

- `react-jsx`를 사용하면 더 최적화된 변환값을 제공한다.
- [TypeScript: TSConfig Reference - Docs on every TSConfig option](https://www.typescriptlang.org/tsconfig/#jsx)
> `react-jsx`: Emit `.js` files with the JSX changed to `_jsx` calls optimized for production

```js
//`preserve`
import React from 'react';
export const HelloWorld = () => <h1>Hello world</h1>;

//`react-jsx`
import { jsx as _jsx } from "react/jsx-runtime";
export const HelloWorld = () => _jsx("h1", { children: "Hello world" });
```


### `lib`
-  lib에서 `dom` 을 반드시 추가해줘야한다.
-  타입스크립트 컴파일러가 사용할 타입 정의 파일을 지정하는 옵션이다.
- `target` 옵션에 의해 정해진 내장 타입 정의 파일을 변경할 수 있다.
	-  `targe` 옵션에 지정된 버전보다 폴리필로 높은 사양의 JavaScript 기능을 사용하게 될 때, 해당 기능에 대한 타입이 필요할 때 유용함.
	-  ES5 런타임을 사용중이지만 `promise`의 폴리필을 사용하고 있다면 `lib` 옵션을 이렇게 설정
```json
{
  "compilerOptions": {
    "lib": [
      "es5",
      "dom",
      "dom.iterable",
      "ES2015.Promise"
    ]
  }
}
```


## Hooks 예시
- `@types/react`의 타입 정의에 Hooks에 대한 타입들이 포함되어 있음.
- 대부분의 경우 [추론된 타입](https://www.typescriptlang.org/ko/docs/handbook/type-inference.html) 을 통해 타입이 지정됨. 

### `useState`
- 초기에 전달된 값으로 타입 추론이 일어나서 타입이 결정됨.
- [State 구조화 원칙](https://ko.react.dev/learn/choosing-the-state-structure#principles-for-structuring-state)에서 권장하는 대로, 관련 state를 객체로 그룹화하는 것이 좋음.
	- 연관된 상태값들은 하나의 객체로 그룹화해서 중복을 줄이면 좋음.

```jsx
// 타입을 "boolean"으로 추론합니다
const [enabled, setEnabled] = useState(false);


type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");
```


# React 개발자 도구
- 웹 브라우저 확장 프로그램을 설치하면 사용 가능함
- 각 컴포넌트 요소들이 트리 형태로 표시가 됨.
- 각 컴포넌트 요소들의 props와 해당 컴포넌트의 코드를 바로 확인할 수 있음. 이를 이용해서 디버깅을 할 때 유용함.

# React 컴파일러
- `useMemo`,  `React.memo`, `useCallback` 를 사용하지 않아도 컴파일러가 자동으로 최적화를 적용함.
- vite.config.ts에 설정한 대로 빌드 과정에서 Babel 플러그인으로 동작함. 즉 빌드 타임에 코드를 분석하여 자동으로 메모이제이션을 적용한 코드를 만듬.