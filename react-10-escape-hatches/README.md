# 탈출구

## Ref
- 렌더링을 유발하지 않고 컴포넌트의 데이터를 업데이트하거나 저장을 위해 사용
- 또는 DOM 요소에 직접 접근하기 위해 사용
- Ref의 `current` 값은 렌더링을 유발하지 않으며, 컴포넌트가 렌더링될 때 `current` 값은 유지됨.

## Effect
- 외부 시스템과 상호작용하기 위해 사용되는 React 훅.
- 컴포넌트가 렌더링 된 후에 실행이됨.
- 컴포넌트가 언마운트 될 때 정리(cleanup)에 명시한 함수를 실행 됨.

## Effect가 필요하지 않은 경우
- 데이터를 변환하거나 계산하는 경우 
- 사용자 이벤트를 처리하는 경우
```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

## React Effect의 생명주기
- 컴포넌트가 마운트 될 때 setup 함수가 실행됨.
- 컴포넌트가 업데이트 될 때는 이전 effect의 cleanup 함수가 실행되고, 새로운 setup 함수가 실행됨.
- 컴포넌트가 언마운트 될 때는 cleanup 함수가 실행됨.
- Effect가 의존성 배열을 가지고 있다면, 해당 배열의 값이 변경될 때마다 cleanup 함수가 실행되고 새로운 setup 함수가 실행됨.

## Effect에서 이벤트 분리하기
- `useEffectEvent` 를 사용하여 이벤트 헨들러

## Effect의 의존성 제거하기
- 불필요한 의존성을 제거하기.
- 잘못된 의존성은 무한 루프를 발생시킬 수 있음.

```jsx
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);
```


```jsx
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```

## 커스텀 Hook으로 로직 재사용하기
- 커스텀 Hook을 사용하여 로직을 재사용할 수 있음.


# useRef
- 해당 데이터 값을 변경할 때 랜더링을 유발하고 싶지 않고, 해당 컴포넌트에서 해당 데이터를 계속 `기억` 하고 싶을 때 쓰임.
- ref.current 값을 변경해도 컴포넌트가 다시 랜더링 되지 않음.

  ```jsx
  const ref = useRef(0)
  ```
- ref는 current 단일 속성을 가진 객체를 반환함.
```js
  { 
  current: 0 // The value you passed to useRef
  }
```

## Ref와 State의 차이
- useState는 데이터를 변경할 때 컴포넌트를 다시 렌더링해야 될 경우 사용함.


|refs|state|
|---|---|
|`useRef(initialValue)` 는 `{ current: initialValue }` 을 반환합니다.|`useState(initialValue)` 은 state 변수의 현재 값과 setter 함수 `[value, setValue]` 를 반환합니다.|
|state를 바꿔도 리렌더 되지 않습니다.|state를 바꾸면 리렌더 됩니다.|
|Mutable-렌더링 프로세스 외부에서 `current` 값을 수정 및 업데이트할 수 있습니다.|”Immutable”—state 를 수정하기 위해서는 state 설정 함수를 반드시 사용하여 리렌더 대기열에 넣어야 합니다.|
|렌더링 중에는 `current` 값을 읽거나 쓰면 안 됩니다.|언제든지 state를 읽을 수 있습니다. 그러나 각 렌더마다 변경되지 않는 자체적인 state의 [snapshot](https://ko.react.dev/learn/state-as-a-snapshot)이 있습니다.|


## Ref를 사용할 시기
- Timeout ID를 저장  
  - ex) setTimeout으로 생성한 타이머의 ID를 ref에 저장하여, 필요할 때 clearTimeout으로 해제할 수 있음.
```jsx
const timeoutId = useRef();
timeoutId.current = setTimeout(() => { /* ... */ }, 1000);

clearTimeout(timeoutId.current);
```

- DOM 엘리먼트 저장 및 조작  
    - ex) input같은 특정 DOM 요소에 직접 접근해서, focus를 줄 때 사용함.

```jsx
import { useRef } from 'react';

function FocusableInput() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return (
        <div>
            <input ref={inputRef} type="text" placeholder="입력하세요" />
            <button onClick={handleFocus}>focus</button>
        </div>
    );
}
```
- JSX를 계산하는 데 필요하지 않은 다른 객체 저장 

## throttle과 debounce 차이
- throttle은 일정 주기마다 함수 실행을 보장함.
    - 입력 주기를 방해하지 않고, 일정 시간 동안의 입력을 모아서, 일정 주기 마다 한번씩 실행한다.
- debounce는 입력이 연속적으로 발생할 때, 마지막 입력 이후 일정 시간이 지나면 한 번만 함수를 실행함.

# Ref로 DOM 조작하기

## React가 ref를 부여할 때
- DOM 노드가 생성된 이후인 commit 단계에서 `ref.current` 가 설정됨.
- `ref.current`의 초기값은 `null` 로 설정됨.
- `ref`에 대한 접근은 주로 이벤트 핸들러나 `useEffect` 훅에서 이루어짐.

### flushSync로 state 변경을 동적으로 플러시하기

- `flushSync`는 React의 상태 업데이트를 즉시 동기적으로 처리할 때 사용함.
- 일반적으로 React의 상태 업데이트는 비동기적으로 처리되지만, `flushSync`를 사용하면 상태 업데이트가 동기적으로 처리되어 즉시 DOM이 업데이트됨.

```jsx
import { flushSync } from 'react-dom';

 function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
```
## ref로 DOM을 조작한 모범 사례
- Ref는 `React에서 벗어나야 될 때`만 사용해야함.
- 특정 DOM 요소를 조작해서 삭제하거나 추가하는 등의 작업은 React의 상태 관리와 충돌할 수 있음.

- 아래 예시에서는 DOM 요소를 ref로 직접 삭제하는 바람에 show 상태도 변경하지 못하고 오류가 발생함.
```jsx
import {useState, useRef} from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```