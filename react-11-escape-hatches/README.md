


# Effect로 동기화하기

## Effect란 무엇이고 이벤트와는 어떻게 다른가요? 
컴포넌트 내부의 2가지 로직 유형
- 렌더링 코드(Rendering code)
	- state와 props 를 이용하여 JSX를 반환하는 코드
	- 부수 효과(Side effect)가 있으면 안된다.
	- 순수 함수 처럼 작성해야 한다. 

- 이벤트 핸들러(Event handlers)
	- 사용자의 특정 행동(이벤트)에 반응하여 실행되는 함수
	- 부수 효과(Side effect)가 있는 코드를 작성할 수 있다.


## 1단계: Effect 선언하기

### VideoPlayer 컴포넌트 코드가 올바르지 않은 이유는?
1. 렌더링 코드가 순수하지 않다.
	- 렌더링 코드에서 외부 상태값인 DOM을 직접 조작을 하고 있다.
2. 초기 렌더링시 ref.current 가 null이다.
	- `return <video ref={ref} ... /> ` 이 부분이 실제 DOM에 반영되기 전에는 ref.current가 ref.current가 null이라서 오류가 발생하게 된다.
3.  React의 의도와 불일치
	- React는 `렌더` 단계에서 DOM 변경 사항을 계산하고, '커밋' 단계에서 실제 DOM을 업데이트합니다. 렌더링 중에 직접 DOM을 조작하는 것은 React의 제어 흐름을 벗어나는 행위입니다.

```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // 렌더링 중에 이를 호출하는 것이 허용되지 않습니다.
  } else {
    ref.current.pause(); // 역시 이렇게 호출하면 바로 위의 호출과 충돌이 발생합니다.
  }

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '일시정지' : '재생'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

해결 방법은 useEffect로 부수 효과를 가진 로직을 감싸면 된다.

- 렌더링 코드는 순수해진다.
- useEffect안의 코드는 실제 DOM이 반영된 이후에 실행된다. ref.current가 `<video>` DOM 요소를 가르키고 있을 때 ref.current.play()를 실행한다.
```jsx
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}
```

## Effect가 필요 없을지도 모릅니다.
- 외부 시스템과 동기화하기 위해서만 사용하기를 권장한다.
- 아래 코드는 무한 리렌더링이 일어나게 된다.
	1. 초기 렌더링시 count 값이 0인 상태로 렌더링이 되고 DOM에 반영된다.
	2. 이후 setCount 가 호출되서 count 값은 1이 되고 새로운 렌더링이 트리거 된다.
	3. 재렌더링 시점에서 다시 setCount가 호출되서 count 값은 2가 되고 또 다시 새로운 렌더링이 트리거 된다.
	4. 무한 반복
- 의존성 배열을 생략하면 모든 렌더링 후에 Effect가 실행된다.
```jsx
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```


## 2단계: Effect의 의존성 지정하기

의존성 배열을 생략하면 모든 렌더링 후에 Effect가 실행된다.
React에게 Effect가 의존성 배열에 명시한 값이 바뀔 때만 실행하도록 할 수 있다.


- 아래 코드에서는 `isPlaying`이 달라질 때마다 Effect를 실행하게 된다. 
```jsx
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('video.play() 호출');
      ref.current.play();
    } else {
      console.log('video.pause() 호출');
      ref.current.pause();
    }
  }, [isPlaying]); 

  return <video ref={ref} src={src} loop playsInline />;
}
```
### 왜 ref는 의존성 배열에서 생략해도 되나요?

안정된 식별성(stable identity) 를 가지는 값들은 의존성 배열에서 생략을 해도 된다.

- useRef를 이용해서 생성된 `ref`값은 참조변수로 해당 변수가 저장한 메모리 주소는 리렌더링시에도 바뀌지 않는다.
- `ref.current` 값은 언제든지 바뀔 수 있다.
- 안정된 식별성을 가지는 값들
	- useState가 반환하는 setState 함수
	- useRef가 반환하는 ref 객체
	- useReducer가 반환하는 dispatch 함수


## 3단계: 필요하다면 클린업을 추가하세요

의존성 배열을 빈 배열로 두면 해당 컴포넌트의 처음 렌더링 시점에서만 실행된다.
클린업은 컴포넌트가 의존성 배열에 명시한 값이 변경 될 때와 컴포넌트가 언마운트 될 때 실행된다.


- 아래 코드에서는 컴포넌트가 처음 마운트 될 때 연결이 되고, 컴포넌트가 언마운트 될 때 연결이 해제 된다.
- 연결이 계속 쌓이는 것을 방지할 수 있다.
```jsx
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);
```
- 다음과 같은 상황에서 클린업이 유용하게 사용된다.
	- 기존 객체 초기화: 메모리 누수 방지를 위한 객체 정리
	- WebSocket 연결 해제
	- 외부 API 구독 해제

### 개발 환경에서 Effect의 동작

개발 모드 (Strict Mode)에서는 Effect 가 두 번씩 실행되게 된다.
처음 마운트 될 때 Effect의 셋업 함수가 실행되고, 이후 한 번더 마운트 되면서 클린업 함수가 실행되고 그 다음에 셋업 함수가 실행된다.
아래 코드에서 세 개의 콘솔 로그가 찍히는 것을 확인할 수 있다.

1."✅ 연결 중..."
2. "❌ 연결 해제됨"
3. "✅ 연결 중..."

```
export function createConnection() {
  // 실제 구현은 정말로 채팅 서버에 연결하는 것이 되어야 합니다.
  return {
    connect() {
      console.log('✅ 연결 중...');
    },
    disconnect() {
      console.log('❌ 연결 해제됨');
    }
  };
}

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>채팅에 오신걸 환영합니다!</h1>;
}
```


## 개발 중에 Effect가 두 번 실행되는 경우를 다루는 방법

클린업 함수를 이용해서 다시 마운트 된후에도 작동 되도록 고쳐라.

# Effect가 필요하지 않은 경우

## 불필요한 Effect를 제거하는 방법 

Effect가 필요하지 않은 두 가지 일반적인 경우
1. 렌더링을 위해 데이터를 변환하는 데 Effect가 필요하지 않습니다.
	- 변환하는 작업은 해당 컴포넌트 최상위에서 변환하면 된다.

```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ 좋습니다: 렌더링 중에 계산됨
  const fullName = firstName + ' ' + lastName;
  // useEffect(() => {
  //  setFullName(firstName + ' ' + lastName);
  // }, [firstName, lastName]);
  // ...
}
```


2. 사용자 이벤트를 처리하는 데 Effect가 필요하지 않습니다
	- 사용자 이벤트는 이벤트 헨들러를 이용하여 처리한다.

## 비용이 많이 드는 계산 캐싱하기

Effect에서 state를 처리하기 보다는,
최상위 레벨에서 계산을 수행하고 오래 걸리는 작업이라면 `useMemo` 를 사용하면 좋다.

```
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ todos나 filter가 변경되지 않는 한 getFilteredTodos()를 다시 실행하지 않습니다.
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```

### 오래 걸리는 작업 시간 측정하기

해당 작업이 오래걸리는 지는 console.time 을 사용하여 측정 할 수 있다.
```
console.time('filter array');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // todos와 filter가 변경되지 않은 경우 건너뜁니다
}, [todos, filter]);
console.timeEnd('filter array');
```
## prop이 변경될 때 일부 state 조정하기

React는 컴포넌트가 같은 렌더 트리 위치에 렌더링 되면 state를 보존한다.
이때 기존 값을 초기화하고 싶다면 useEffect를 이용해서 초기화하는 방법도 있겠지만,
이 방법은 비효율적이다.

- 아래 코드와 같이 key를 전달해서 key값이 변경 될 때마다 Profile의 comment 상태가 초기화되도록 설정할 수 있다.

```jsx
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ 이 state 및 아래의 다른 state는 key 변경 시 자동으로 재설정됩니다.
  const [comment, setComment] = useState('');
  // ...
  
  // 🔴 피하세요: Effect에서 prop 변경 시 state 초기화
  //useEffect(() => {
  //  setComment('');
  // }, [userId]);
  // ...
}
```

## prop이 변경될 때 일부 state 조정하기


-렌더링 중에 직접 상태 조정
	-`setPrevItems`와 `setSelection`을 렌더링 도중에 직접 호출한다.
	- DOM 업데이트나 자식 컴포넌트 렌더링 전에 이뤄지므로, 자식들이 stale `selection` 값을 보지 않게 된다.
	- 무한 루프를 피하기 위해 `items !== prevItems`와 같은 조건문이 필요하다.
```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

   // 더 좋습니다: 렌더링 중 state 조정
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items); 
    setSelection(null);  
  }
  // ...
}
```


- 렌더링 중에 모든 것 계산하기 
	- 초기화하는 대신, 선택된 아이템의 ID를 상태(`selectedId`)로 저장한다.
	- `selection`은 렌더링 시 `items` prop과 `selectedId`를 이용해 계산한다.
```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null); 

  // ✅ 최고예요: 렌더링 중에 모든 것을 계산
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```
## 이벤트 핸들러 간 로직 공유 

-  공통 로직을 함수로 추출하여 이벤트 핸들러에서 호출하기
```jsx
function ProductPage({ product, addToCart }) {
  // ✅ 좋습니다: 이벤트 핸들러에서 이벤트별 로직이 호출됩니다.
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```

## POST 요청 보내기

- jsonToSubmit 상태가 다른 이유로 (버튼 클릭이 아닌) 바뀌게 된다면, 의도치 않게 POST 요청이 또 나갈 수도 있다.

```jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 좋습니다: 컴포넌트가 표시되었으므로 이 로직이 실행되어야 합니다.
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 피하세요: Effect 내부의 이벤트별 로직
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```

- `post('/api/register', jsonToSubmit);`같은 해당 POST 요청은 사용가 버튼을 누를 때만 실행되는 것이니 이벤트 헨들러 내부에 넣는게 낫다.

```jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 좋습니다: 컴포넌트가 표시되었으므로 이 로직이 실행됩니다.
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ 좋습니다: 이벤트별 로직은 이벤트 핸들러에 있습니다.
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```

## 데이터 가져오기

- 검색은 이벤트 헨들러 보다 Effect가 더 적합
	- URL 에서 미리 채워지는 경우나 '뒤로가기/앞으로 가기' 버튼을 통해 페이지를 이동할 때도 서버에 데이터를 요청해야함.
- 문제는 경쟁 상태(race condition)이 발생할 수 있다.
	- 여러 입력이 동시에 발생할 어떤 순서로 응답 결과가 도착할지 보장을 못함.
	- "hello" 라고 입력했을 때 이전 입력인 "hell"에 대한 응답이 먼저 도착하는 오류가 발생할 수 있다.

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 피하세요: 정리 로직 없이 가져오기
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

- 클린업을 사용하여 가장 마지막 입력에 대해서만 `setResults` 를 호출하도록 수정할 수 있다.
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```
- 경쟁 조건 외에도 다른 요구사항들이 있다.
- 응답 캐싱, SSR, 네트워크 워터폴 방지등을 구현해야 하는데 이는 React에서 제공하는 API들로는 구현하기 어려우니 모던 프레임워크를 사용하는 방법을 권장한다.

```jsx
export function useSearchResults(query, page) {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["searchResults", query, page],
    queryFn: () => fetchSearchResultsAPI(query, page),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
}
```

# React Effect의 생명주기


## effect의 생명주기

### 컴포넌트 라이프사이클 
- 마운트(Mount): 컴포넌트가 처음 랜더링 될 때
- 업데이트(Update): 상태 변경에 의해 다시 랜더링 되는 단계
- 언마운트(Unmount): 화면에서 제거됨. 렌더 트리에서 해당 컴포넌트가 제거 되는 단계


## React가 Effect를 재동기화하는 방법

- `roomId`가 변경될 때:  
  - 클린업 실행 (이전 방에서 연결 해제)
  - 이펙트 다시 실행 (새로운 방에 연결)
- 언마운트될 때:  
  - 클린업 실행 (현재 방에서 연결 해제)

- 실행 순서 예시
  1. 마운트: `roomId = "general"` → "general" 방에 연결
  2. 업데이트: `roomId = "travel"` → "general" 방에서 연결 해제, "travel" 방에 연결
  3. 업데이트: `roomId = "music"` → "travel" 방에서 연결 해제, "music" 방에 연결
  4. 언마운트: "music" 방에서 연결 해제


## Effect의 관점에서 생각하기

- 단일 시작/중지 사이클에 집중하기
  - 동기화를 어떻게 시작하는지
  - 동기화를 어떻게 멈추는지
- 이렇게 하면 이펙트는 필요한 만큼 시작되고 멈출 수 있다.


## React가 이펙트의 재동기화 가능성을 확인하는 방법

- 개발 환경에서 React는 각 컴포넌트를 한 번씩 다시 마운트한다.
- 개발 환경에서의 로그 예시:
```
✅ "general" 방에 https://localhost:1234로 연결 중...
❌ "general" 방에서 https://localhost:1234 연결 해제.
✅ "general" 방에 https://localhost:1234로 연결 중...
```



## React가 언제 다시 동기화해야 하는지 아는 방법

- 의존성 배열에 의존성을 지정한다.
- React는 현재와 이전 의존성을 비교한다.
- 의존성이 하나라도 변경되면 Effect가 다시 동기화된다.


```jsx
useEffect(() => {
  // ...
}, [roomId]); // Effect가 roomId에 의존함
```

- `roomId`가 변경되면: Effect가 다시 동기화됨
- `roomId`가 동일하면: Effect는 연결 상태 유지


## 각 Effect는 별도의 동기화 프로세스를 나타냅니다.

- 서로 관련 없는 로직을 같은 Effect에 넣으면 안된다.
- 방문 기록 로깅과 채팅 방 연결은 별도의 프로세스다. 분리가 필요하다.
- 각 Effect는 독립적인 동기화 프로세스를 나타내야 한다.


```jsx
useEffect(() => {
  logVisit(roomId);
}, [roomId]);

useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  // ...
}, [roomId]);
```


