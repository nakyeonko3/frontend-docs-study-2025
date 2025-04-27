# 스냅샷으로서의 State

## state를 설정하면 렌더링이 동작합니다 
- 클릭 즉시 UI가 직접 변경되는 것이 아니다.
- 클릭을 하면 state가 변경되고, 리렌더링이 요청 되고, 이후 변경된 state를 기반으로 UI가 렌더링 된다.
  - `ex) onClick 이벤트 헨들러 실행 -> state 변경 -> 리렌더링 요청 -> 렌더링`

## 렌더링은 그 시점의 스냅샷을 찍습니다
- 스냅샷
  - 사진을 찍는 것처럼 그 시점의 상태를 기록하는 것
  - 프로그래밍 용어로 스냅샷은 **특정 시점의 상태를 기록한 것을 의미함**
- 스냅샷 안에는 이벤트 핸들러, props가 포함되어 있다.
- state를 변경하면 그 시점의 스냅샷을 만들어지고, 그 스냅샷을 기반으로 UI를 렌더링한다.

- **state를 설정하면 다음 렌더링 시점에서만 반영이 된다.**

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

## 시간 경과에 따른 State
- state 스냅샷을 사용해서 UI를 렌더링한다. 
- 비동기 코드에서도 같은 스냅샷이 유지된다.
  - 렌더링 당시 예약된 state 스냅샷을 계속 사용한다.
  - 그래서 이벤트 핸들러가 실행될 때의 state가 아니라, 렌더링 시점의 state를 참조하게 된다.


# state 업데이트 큐

## React state batches 업데이트 
- Batching
  - 여러 개의 state 업데이트를 하나로 모아서 처리하는 것
  - 같은 이벤트 핸들러에서 여러 번의 state 업데이트가 발생하면, React는 이를 하나의 업데이트로 묶어서 처리한다.
  - 그외에 비동기 코드(Promise,  setTimeout 등), useEffect 등에서도 Batching이 발생한다.
  - React18 버전에 추가된 기능임. https://github.com/reactwg/react-18/discussions/21

```jsx
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);


fetch(/*...*/).then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
})

```

## 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기 
- `setState(prev => 새로운 상태값)` 방식으로 state를 업데이트 하게 되면, 이전 값을 기준으로 새로운 값으로 업데이트 할 수 있다.
- 업데이트 함수는 반드시 **순수 함수**여야 한다.
  - 사이드 이펙트를 실행해서는 안된다.
- 명명 규칙
  - 해당 state 변수의 첫 글자로 지정하는 것이 일반적

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

# 객체 State 업데이트하기

## 변경(mutation)이란? 
- state는 사실상 읽기 전용(read-only)이다. 이를 업데이트 하기 위해서는 리렌더링이 필요하다.
- 다만 객체 state는 불변성을 위반해서 변경(mutation)할 수 있다. 그럼에도 **불변을 유지하는 것이 좋다** 
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 5;
```

## State를 읽기 전용인 것처럼 다루세요
- state를 직접 수정하면 안 된다. 대신 새로운 객체를 만들어서 리렌더링을 통해 업데이트 해야 한다.
- 지역 변경(local mutation)은 괜찮다.
  - 새로 만들어진 객체를 사용하고 해당 객체를 참조하는 것이 없고, 해당 지역(스코프)에서만 사용한다면 괜찮다.

## 전개 문법(스프레드 연산자)으로 객체 복사하기 
- 다만, 전개 문법을 사용하면 얕은 복사(shallow copy)가 된다.
- 얕은 복사
  - 객체의 최상위 속성만 복사하고, 중첩된 객체는 여전히 원본 참조를 유지하는 것


## Immer로 간결한 갱신 로직 작성하기 
- Immer는 불변성을 유지하면서도 간결한 갱신 로직을 작성할 수 있도록 도와주는 라이브러리이다.
-  “법칙을 깨고” 객체를 변경하는 것처럼 보일 수 있지만, 실제로는 불변성을 유지한다.
- Immer는 내부적으로 Proxy를 사용하여 객체의 변경을 감지하고, 최종적으로 불변 객체를 생성한다.


# 배열 State 업데이트하기

## 배열에 항목 추가하기
- 기존 배열을 복사한 뒤 새 항목을 추가한다.  
- state를 직접 수정하지 말고 항상 새 배열을 만들어서 업데이트한다.

```jsx
const [artists, setArtists] = useState([]);

function handleAdd() {
  const newArtist = { id: nextId++, name: name };
  setArtists([...artists, newArtist]);
}
```

### 배열에서 항목 삭제하기

- `filter` 메서드를 사용해서 특정 조건을 만족하지 않는 항목만 남긴다.

```jsx
function handleDelete(id) {
  setArtists(artists.filter(artist => artist.id !== id));
}
```

## Immer로 더 간단하게 업데이트하기

- **Immer**는 복잡한 `map`, `filter` 대신 **'직접 수정하는 것처럼'** 코드를 쓸 수 있게 해준다.
- Immer를 사용하면 불변성을 유지하면서도 간결한 코드를 작성할 수 있다. 


```jsx
  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }
```