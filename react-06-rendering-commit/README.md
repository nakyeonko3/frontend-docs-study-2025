# 이벤트에 응답하기

## 이벤트 핸들러 추가하기
- 주로 컴포넌트 내부에서 정의 된다.
- 이벤트 핸들러는 클릭, 마우스 호버, submit, 등 사용자와 상호작용에 따라 유발되는 사용자 정의 함수다.

## 이벤트 헨들러 명명법
- `handle + (이벤트명)`으로 이벤트 헨들러 함수를 명명함.
- ex) `handleClick, handleSubmit`

```jsx
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

- 주의) 아래와 같이 이벤트 헨들러를 전달하게 되면 해당 컴포넌트가 렌더링 되는 즉시 `handleClick` 함수가 실행된다.

```jsx
<button onClick={handleClick()}>
```
- 버튼을 클릭 할 때만 실행되도록 하려면 이렇게 작성한다.
```jsx
<button onClick={handleClick}> 
```
## 이벤트 전파 (이벤트 버블링)
- 이벤트 버블링
  - 해당 컴포넌트(해당 요소에서) 상위 요소로 이벤트가 전달되는 현상을 말한다.
- 이를 이용해서 이벤트 핸들러가 해당 컴포넌트의 자식 컴포넌트의 이벤트를 수신할 수 있다.

### 전파 멈추기 (이벤트 버블링 멈추기)
- `e.stopPropagation()`를 이벤트 헨들러에서 호출하면 해당 컴포넌트에서 상위 컴포넌트로 이벤트가 전달되지 않는다.
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

### 단계별 이벤트 캡처
- 이벤트 전파가 중단된 상황이라도 자식 컴포넌트의 모든 이벤트를 캡처해서 확인해야 되는 경우가 존재한다.
- 이벤트명 마지막에 `Capture`를 추가하면 `이벤트 캡처링`을 이용하여 이벤트 헨들러가 호출되도록 설정할 수 있다.

```jsx
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

### DOM 이벤트 전파 흐름
- (캡처링 단계)
  - 이벤트가 루트 요소 → 목표 요소(타킷 요소)로 이벤트가 전달된다.
  - `onClickCapture` 같은 이벤트 캡처를 사용하는 핸들러가 실행된다.
- (목표 단계)
  - 실제 이벤트가 발생한 요소(목표 요소)에 도달
- (버블링 단계)
  - 이벤트가 목표 요소에서 루트 요소로 이벤트가 전달된다.
  - `onClick` 같은 이벤트 버블링을 하숑하는 핸들러가 실행된다.

[bubbling-and-capturing](https://ko.javascript.info/bubbling-and-capturing)
![이벤트 버블링과 캡처링 예시](https://ko.javascript.info/article/bubbling-and-capturing/eventflow.svg)


# State: 컴포넌트의 기억 저장소



## 일반 변수로 충분하지 않은 경우
- 지역 변수는 렌더링을 유발하지도 않고, 렌더링 간의 유지되지도 않는다.


### (번외) 일반 변수로 충분한 경우
- 반대로 *변하지 않는 값(상수), 렌더링을 유발하지 않아도 되는 값, 다른 props나 state를 통해 계산될 수 있는 값 등* 은 지역변수로 사용해도 된다. 

```jsx
// 리액트 공식문서 튜토리얼 tic-tac-toc 코드 일부
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; 
  // xIsNext는 렌더링을 유발하지 않아도 되고, currentMove 값으로 계산될 수 있는 값이다. 
  // 그래서 state가 아닌 지역 변수를 사용했다.
  const currentSquares = history[currentMove];
```

## 첫 번째 훅 만나기
- "use”로 시작하는 다른 모든 함수를 훅이라고 한다.
- 훅(use로 시작하는 함수들)은 컴포넌트의 최상위 수준 또는 커스텀 훅에서만 호출할 수 있다.

### [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
1. Hook은 반드시 함수 컴포넌트 또는 커스텀 Hook의 최상위(Top Level)에서만 호출해야 한다.
 - 항상 함수 컴포넌트 또는 커스텀 Hook의 최상단에서 호출해야 한다.
 - 반복문, 조건문, 중첩 함수, try/catch/finally, 이벤트 핸들러, useMemo/useEffect/useReducer 등 내부에서 Hook을 호출하면 안된다.
2. Hook은 오직 React 함수 컴포넌트 또는 커스텀 Hook에서만 호출해야 한다.
 - 일반 JavaScript 함수, 클래스 컴포넌트 등에서는 Hook을 사용 불가


- 대부분의 리액트 프로젝트에서는 기본적으로 `eslint-plugin-react-hooks` 를 이용해서 리액트 훅 룰을 eslint를 이용해서 검사하도록한다. 
```js
import reactHooks from 'eslint-plugin-react-hooks'
// ~~~~ 생략 ~~~~
  rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
```


## useState 해부하기
- useState 훅은 state와 해당 state를 업데이트 하는 setState 함수를 반환한다.

```jsx
const [index, setIndex] = useState(0);
```

## 컴포넌트에 여러 state 변수 지정하기
- 하나의 컴포넌트의 여러개의 state 변수를 지닐 수 있다.

## State는 격리되고 비공개로 유지됩니다.
- **state는 컴포넌트 내부에만 존재하며, 외부에서 접근할 수 없다.**
- **동일 컴포넌트 여러 번 렌더링 시 각 인스턴스마다 독립적인 state를 가진다.**


## React의 렌더링과 커밋 이해
React에서 UI가 화면에 그려지는 과정은 크게 **세 단계**로 이루어짐.  
1. **렌더링 트리거**
2. **컴포넌트 렌더링**
3. **커밋**


## 1단계: 렌더링 트리거
- **렌더링이 시작되는 계기(trigger)**
- 대표적으로 두 가지 상황에서 트리거가 발생한다.
  - 초기 렌더링: 루트 컴포넌트가 호출될 때를 의미함. 컴포넌트가 처음 화면에 나타날 때, render 메서드를 통해 초기 렌더링이 실행 될 때
  - 리렌더링: 컴포넌트의 state나 props가 변경되어 다시 그려져야 할 때

### 2단계: React 컴포넌트 렌더링 
- **React가 컴포넌트 함수를 호출하여, 어떤 UI를 그릴지 계산하는 단계. 가상 DOM 트리를 만드는 단계**
- 이때 컴포넌트 트리를 따라 재귀적으로 모든 자식 컴포넌트들도 호출된다.
- 각 컴포넌트는 JSX를 반환하고, React는 이를 내부적으로 가상 DOM(React Element) 트리로 만든다.
- **렌더 단계는 아직 실제 DOM을 변경하지 않는다.**  "어떻게 바뀔지"를 계산만 한다.
- 다음 단계인 커밋 단계 전까지는 DOM을 변경하지 않는다.

### 3단계: React가 DOM에 변경사항을 커밋
- **렌더 단계에서 계산된 변경사항을 실제 DOM에 반영하는 단계**
- **초기 렌더링**에서는 모든 필요한 DOM 노드를 생성해 화면에 그림.
- **리렌더링**에서는 이전 렌더와 비교해 변경된 부분만 최소한으로 DOM에 적용한다.
  - **렌더링 결과가 이전과 같으면 React는 DOM을 건드리지 않는다.**
- 이 과정이 끝나면 브라우저가 실제로 화면을 다시 그린다.(브라우저 페인트)