# Effect에서 이벤트 분리하기

## 이벤트 핸들러와 Effect 중에 선택하기

- 이벤트 헨들러가 적합한 경우
    - 특정 상호 작용이 발생했을 때만 실행되는 로직

- Effect가 적합한 경우
    - 동기화가 필요한 경우
    - 컴포넌트가 상호작용(사용자 입력, 클릭이나 스크롤 같은 이벤트)과 상관없이 특정 상태 값이 변경 될 때 동기화가 필요한 경우


## 반응형 값과 반응형 로직

- 반응형 값
    - 리렌더링 시점 마다 변경 될 수 있는 값

- 반응형 로직
    - 반응형 값이 변경 될 때마다 실행되는 로직

- 비 반응형 로직
    - 반응형 값이 변경 될 때마다 실행되지 않는 로직
    - 값이 변경 될 때가 아니라 상호작용이 발생했을 때 실행되어야 하는 로직은 반응형 로직이라고 하지 않는다. 

- 반응형 값이 변경 될 때마다 실행되어야 하는 로직은 Effect 내부에 작성하고, 그게 아니라 특정 상호작용이 발생했을 때 실행되어야 하는 로직은 이벤트 핸들러 내부에 작성한다.


### 이벤트 핸들러 내부의 로직은 반응형이 아니다
- `handleSendClick` 함수는 `message` 값이 변경 될 때마다 실행되는 로직이 아니다.
- 따라서 반응형 로직이 아니므로, 이벤트 헨들러에서 실행시키는게 맞다.
```jsx
  function handleSendClick() {
    sendMessage(message);
  }
```


### Effect 내부의 로직은 반응형이다
- `roomId` 라는 채팅방 이름이 변경 될 때마다 createConnection을 통해 채팅방에 연결을 해야한다.
- `roomId` 라는 반응형 값이 변경 될 때마다 실행되어야 하니 Effect 내부에 작성한다.
```jsx
useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId]);
```


## Effect에서 비반응형 로직 추출하기
- `useEffectEvent` 훅을 사용하면 Effect 내부에서 비반응형 로직을 추출하기

### Effect 이벤트 선언하기

- 만약 `theme`값이 변경 될 때마다 채팅방에 연결되는 건 비정상적인 동작이다.
- `theme`라는 반응형 값이 변경 될 때마다 `showNotification` 함수를 실행시키는 건 비정상적인 동작이므로, 비반응형 로직에 해당한다.
- `showNotification`함수 부분 `useEffectEvent` 훅을 사용하면 `useEffect` 의 의존성 배열에 `theme`를 제거하고, roomId가 변경 될 때마다 `showNotification` 함수를 실행시킬 수 있다.

```jsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('연결됨!', theme); // 비반응형 로직
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 모든 의존성이 선언됨
  // ...
```

### 대안으로 의존성 린터를 억제하는 것은 괜찮은가요?
- 의존성 린터를 억제하는 것은 권장되지 않음.
- 오래된 값 또는 참조하게 되서 `useEffect`가 실행될 때마다 최신의 값을 참조하지 못하게 되거나 변경된 최신의 함수로 실행되지 않는 오류가 발생할 수 있다.


```jsx
import { useState, useEffect, useCallback } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const handleMove = useCallback(function (e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }, [canMove]); // 이렇게 하면 canMove가 변경될 때마다 새로운 함수를 생성

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [handleMove]); 


  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        점 움직이게 하기
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
```

## Effect 이벤트의 한계


- `useEffectEvent` 훅의 사용 조건
    - `Effect` 내부에서만 호출해야 한다.
    - 절대로 다른 컴포넌트나 Hook에 전달하면 안된다.

- 그리고 `useEffectEvent`는 아직 React Experimental 로 프로덕션에서 사용하기에는 무리가 있어 보인다.



## 첼린지

### 1. 

```jsx
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);
```


### 2. 
- 기존 로직에서 `초당 증가량:` 버튼을 클릭 했을 때 1초 동안 카운터가 멈추는 현상이 발생했다.
- 원인은 `increment` 값이 변경되면 `clearInterval`이 호출되고, 이후 새로운 `setInterval`이 설정되기 전까지 1초 동안 카운터가 멈추는 현상이 발생
- 아래 코드에서는 `increment` 값이 변경 되더라도 `clearInterval`이 호출되지 않도록 `useEffectEvent`를 사용하여 이벤트를 분리함.

```jsx
  const onIncreament = useEffectEvent( () => {
    setCount(c => c + increment);
  })

  useEffect(() => {
    const id = setInterval(() => {
      onIncreament()
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
```

### 3. 

- 기존 코드에서는 `delay` 값이 변경 되어도 변경된 `delay` 값이 적용되지 않고 같은 속도로 카운터가 증가하는 현상이 발생했다.
-  `delay`를 의존성 배열에 넣어서 `delay` 값이 변경 될 때 새로운 `onMount` 호출되도록 했다.
```jsx
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [delay, setDelay] = useState(100);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  const onMount = useEffectEvent((delayTime) => {
    return setInterval(() => {
      onTick();
    }, delayTime);
  });

  useEffect(() => {
    const id = onMount(delay);
    return () => {
      clearInterval(id);
    }
  }, [delay]);
```


### 4. 
- `onConnected`함수에 매개변수로 `roomId` 를 전달하게 되면, onConnected 함수에서 최신 `roomId`가 아니라 이전 `roomId`를 참조하게 된다.
- 콜백에서 2초 후에 `onConnected`를 호출하는데 여기서 `roomId`가 그 당시의 useEffect 실행 시점에서 캡처한 값이 들어가게 된다.
- 마지막 메시지만 뜨게 하고 싶다면 cleanup에서 `clearTimeout`을 호출하면 된다.
    - 이렇게 하면 이전 `setTimeout`이 취소되고, 새로운 `setTimeout`이 설정되기 때문에 항상 최신 `roomId`가 사용된다.

```jsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent((joinedRoomId) => {
    showNotification(joinedRoomId + '에 오신 것을 환영합니다', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    let timeoutId;
    connection.on('connected', () => {
      timeoutId = setTimeout(() => {
        onConnected(roomId);
      }, 2000);
    });
    connection.connect();
    return () => {
      connection.disconnect();
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [roomId]);

  return <h1>{roomId} 방에 오신 것을 환영합니다!</h1>
}
```

# Effect의 의존성 제거하기

## 의존성은 코드와 일치해야 합니다.

- `useEffect` 를 작성 할 때 본문(setup)에는 동기화 시작 방법을 명시하고, cleanup에는 동기화 종료 방법을 명시한다.
    - `effect`는 컴포넌트 생명주기로 생각하기보다는 동기화/동기화중지에 집중해야 한다.
- 의존성 배열에는 `Effect`가 사용하는 반응형 값들을 명시해줘야 한다.


### 의존성을 변경하려면 코드를 변경하세요

1. 먼저 Effect에 사용되는 반응형값과 선언 방식을 변경
    - 이벤트 헨들러로 옮기기
    - 다른 프로세스라면 분리해서 다른 `Effect`로 옮기기
    - 업데이터 함수 사용하기(ex: `setCount(c => c + 1)`)
    - `useEffectEvent` 를 사용하기
    - 컴포넌트 외부로 객체와 함수를 옮기기
    - Effect 내부에서 동적 객체와 함수를 생성하기
    - 함수나 객체에서 원시값을 추출해서 해당 원시값을 의존성 배열로 사용하기
2. 그런 다음, 변경한 코드에 맞게 의존성 배열을 수정
3. 의존성 배열 목록이 마음에 들지 않으면 다시 첫 번째 단계로 돌아가기



## 첼린지

### 1. 

[codesandbox](https://codesandbox.io/p/sandbox/react-dev-forked-zpwyxh?file=%2Fsrc%2FApp.js%3A15%2C16)

```jsx
import { useState, useEffect } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);

  const onTick = useEffectEvent(() => {
    setCount((c) => c + 1);
  });

  useEffect(() => {
    console.log("✅ Creating an interval");
    const id = setInterval(() => {
      console.log("⏰ Interval tick");
      onTick();
    }, 1000);
    return () => {
      console.log("❌ Clearing an interval");
      clearInterval(id);
    };
  }, []); 

  return <h1>Counter: {count}</h1>;
}
```

```jsx
import { useState, useEffect } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("✅ Creating an interval");
    const id = setInterval(() => {
      console.log("⏰ Interval tick");
      setCount((c) => c + 1);
    }, 1000);
    return () => {
      console.log("❌ Clearing an interval");
      clearInterval(id);
    };
  }, []); 

  return <h1>Counter: {count}</h1>;
}
```


### 2. 
https://codesandbox.io/p/sandbox/inspiring-lucy-ksdncv?file=%2Fsrc%2FApp.js%3A15%2C19

```jsx
import { useState, useEffect, useRef } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";
import { FadeInAnimation } from "./animation.js";

function Welcome({ duration }) {
  const ref = useRef(null);

  const startAnimation = useEffectEvent((animation) => {
    animation.start(duration);
  });

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    startAnimation(animation);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: "white",
        padding: 50,
        textAlign: "center",
        fontSize: 50,
        backgroundImage:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
      }}
    >
      Welcome
    </h1>
  );
}
```

### 3. 

https://codesandbox.io/p/sandbox/p4d27l?file=%2Fsrc%2FApp.js

- theme가 변경 될 때 부모 컴포넌트가 렌더링 되면서 `ChatRoom` 컴포넌트가 다시 렌더링 되지만, `options` 객체가 아닌 `serverUrl`과 `roomId`를 의존성 배열에 넣어서 이 둘이 변경 될 때만 `useEffect`가 실행되도록 했다.

```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {
  const { serverUrl, roomId } = options;
  useEffect(() => {
    const connection = createConnection({serverUrl, roomId});
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]);

  return <h1>Welcome to the {options.roomId} room!</h1>;
}
```

### 4. 

https://codesandbox.io/p/sandbox/silent-bush-lf8s7d?file=%2Fsrc%2FApp.js%3A32%2C61

```jsx
import { useState, useEffect, memo } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from "./chat.js";

const ChatRoom = memo(({ roomId, onMessage, isEncrypted }) => {
  useEffect(() => {
    const createConnection = () => {
      const options = {
        serverUrl: "https://localhost:1234",
        roomId: roomId,
      };
      if (isEncrypted) {
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    };
    const connection = createConnection();
    connection.on("message", (msg) => onMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted, onMessage]);

  return <h1>Welcome to the {roomId} room!</h1>;
});

export default ChatRoom;
```

# 커스텀 Hook으로 로직 재사용하기

## 커스텀 Hook: 컴포넌트간 로직 공유하기
- 중복되는 로직이 있다면 그 부분을 커스텀 Hook으로 추출하여 재사용하는 것이 좋다.

### 커스텀훅 작명 규칙
- 커스텀 훅은 `use`로 시작하는 함수로 작성해야 한다.
- 컴포넌트 이름은 항상 대문자로 시작해야 한다.(ex: `useCounter`)

## 언제 커스텀 Hook을 사용해야 하는지
- 컴포넌트 간에 중복되는 로직이 있을 때
    - 다만 자잘한 중복된 로직까지 분리 할 필요 X

## 여러 방법이 존재합니다.
- 커스텀 훅 작성시 주요 로직을 Class 내부에 작성할 수도 있고
- 특정 로직은 CSS 로 작성하는게 더 간단하고 효율적일 수 있다.


### 1. 

```jsx
import { useState, useEffect } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return { count };
}
```

### 2. 

```jsx
import { useState, useEffect } from 'react';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}
```

### 3. 

```jsx
function useInterval(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

### 4. 

```jsx
import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(onTick, delay) {

  const handleTick = useEffectEvent(()=>onTick());
  useEffect(() => {
    const id = setInterval(handleTick, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

```

### 5. 

- 다음 `useEffect` 가 설정될 때 `clearTimeout`을 호출하면 이전 상태가 끝까지 실행되지 않고 취소되기 때문에, `clearTimeout`을 호출하지 않도록 함.
```jsx
import { useState, useEffect } from 'react';

function useDelayedValue(value, delay) {
  const [delayedState, setDelayedState] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedState(value);
    }, delay);

    // return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return delayedState;
}
```
