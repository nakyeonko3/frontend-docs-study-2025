# State를 보존하고 초기화하기

## State는 렌더트리의 위치에 연결이 됩니다.
- React는 컴포넌트가 아니라 UI 렌더 트리를 기준으로 state 값을 보존한다.
- React는 같은 렌더 트리 UI를 유지하면 state 값도 유지 된다.


## 같은 위치에서 state를 초기화하기
컴포넌트가 같은 위치를 유지 하면서 state를 초기화 하고 싶다면 두 가지 방안이 있다.

### 렌더 트리 상에서 위치를 다르게 바꿔서 state값을 초기화하기
- 화면에서 보일 때는 같은 위치처럼 보이지만, 컴포넌트를 **렌더 트리 상에서 다른 위치로 바뀌게 되면 React는 새로운 노드로 인식한다.**
- 이전 노드에 있는 state 값은 제거 되고 새로운 노드에 있는 state값이 초기화 되면서 컴포넌트의 state가 초기화 된다.

### 컴포넌트에 key값을 사용하여 state값을 초기화하기
- React는 key값이 변경되면 완전히 새로운 컴포넌트로 인식한다. 이를 이용해서 state 값을 초기화 한다. 


## 요약
- React에서 state는 UI 렌더 트리를 기준으로 저장이 된다.
- 컴포넌트가 렌더 트리에서 같은 위치를 유지하면 state도 보존이 된다.
- 컴포넌트가 제거가 될 때 해당 노드를 React가 제거하면서 state도 마찬가지로 제거 된다. 
- key값이 변경되면 React는 해당 노드를 새로운 노드로 인식하여 state가 초기화 된다.


## 첼린지

### 챌린지 1 of 5:입력 문자열이 사라지는 것 고치기 
- `showHint`의 값에 따라서 렌더링 되는 UI가 달라지기 때문에, `Form` 컴포넌트의 렌더 트리 상 위치가 바껴서 state가 초기화 된다.
- 아래 코드처럼 수정하면 `showHint`의 값에 따라서 렌더링 되는 UI가 달라지지 않는다.
```jsx
export default function App() {
  const [showHint, setShowHint] = useState(false);

  return (
    <div>
      {showHint && (
        <p>
          <i>Hint: Your favorite city?</i>
        </p>
      )}
      <Form />
      <button
        onClick={() => {
          setShowHint(true);
        }}
      >
        Show hint
      </button>
    </div>
  );
}
```

### 챌린지 2 of 5:두 필드를 맞바꾸기 
- `key` 값을 지정하게 되면 해당 컴포넌트의 위치가 바뀌어도 state가 초기화 되지 않는다.
```jsx
function Checkbox({ checked, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      Reverse order
    </label>
  );
}

export default function App() {
  const [reverse, setReverse] = useState(false);
    return (
      <>
      {reverse ? (
        <>
          <Field key="firstName" label="First name" />
          <Field key="lastName" label="Last name" />
          <Checkbox checked={reverse} onChange={setReverse} />
        </>
      ) : (
        <>
          <Field key="lastName" label="Last name" />
          <Field key="firstName" label="First name" />
          <Checkbox checked={reverse} onChange={setReverse} />
        </>
      )}
      </>
    );
  }
```

### 챌린지 3 of 5: 폼 세부내용 초기화하기
- `EditContact` 컴포넌트에 key값을 지정하게 되면 key값이 바뀔 때마다 이전 form 값이 초기화 된다.
```jsx
export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedId}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}
```
### 챌린지 4 of 5:이미지가 로딩될 동안 이미지가 안 보이게 하기
- `key` 값을 지정하면 이전 이미지 컴포넌트가 즉시 제거되고 새로운 이미지 컴포넌트가 렌더링 된다.

```jsx
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {images.length}
      </h3>
      <img key={`${index}-${image.src}`} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}
```

### 챌린지 5 of 5:배열에서 잘못 지정된 state 고치기
- li의 key값이 i로 지정되어 있기 때문에, 배열의 순서가 바뀌어도 key값이 바뀌지 않기 때문에 state가 초기화 되지 않는다.
- 아래 코드처럼 id값을 key값으로 지정하게 되면 state가 초기화 된다.

```jsx
export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          value={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map((contact, i) =>
          <li key={`${i}-${contact.id}`}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```


---






# state 로직을 reducer로 작성하기

## reducer를 사용하여 state 로직을 통합하기

### 왜 reduncer를 사용하는 게 좋을까?
- 컴포넌트의 규모가 커질 수록 state를 로직들이 증가하게 된다.
- 각각의 이벤트 핸들러에 state 업데이트 로직이 분산되면 코드 흐름을 파악하기 어려워 진다.
- reducer를 사용하면 흩어져 있던 state 관련 로직을 한 곳으로 모아서 관리하게 되면 state로직을 코드를 파악하기 쉬워진다.
- useState만 사용할 때보다 코드 응집도 증가
## [reducer로 전환하기](https://ko.react.dev/learn/extracting-state-logic-into-a-reducer#step-1-move-from-setting-state-to-dispatching-actions)

- 1단계: state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 바꾸기
- 2단계: reducer 함수 작성하기
- 3단계: 컴포넌트에서 reducer 사용하기

## `useState`와 `useReducer` 비교  

- 코드 크기
	- `useReducer` 를 사용하면 작성해야될 보일러플레이트가 많다.
	- 간단한 로직을 작성한다면 `useState`가 더 유리할 것이다.
- 가독성
	- state 를 업데이트하는 로직이 많다면 `useReducer`가 유리하다.
	- 간단한 state 업데이트 로직만 있는 경우는 `useState`가 더 낫다.
- 디버깅
	- `useReducer`가 더 state 변경이 어디서 되는지 상태 흐름을 추적하기 가 더 쉽다.
- 테스팅
	- redcuer 자체는 순수함수라서 테스팅이 쉽다.


## `reducer` 잘 작성하기

### reducer 작성할 때 도움이 되는 팁
- Reducer는 반드시 순수해야함.
- 여러 데이터를 변경할 수 있는 action이라도 하나의 action으로 만드는 것이 좋다.
- 객체나 배열을 변경한다면 immer 사용하는 것도 좋다.

---
# Context를 사용해 데이터를 깊게 전달하기

https://react.dev/learn/passing-data-deeply-with-context

## Props 전달하기의 문제점 
- prop drilling
- React의 Context 는 이러한 중간 컴포넌트들을 거치지 않고 다른 컴포넌트에서 해당 prop이 필요한 컴포넌트로 prop을 전달할 수 있다. 
### prop driling
- 상위 컴포넌트에서 하위 컴포넌트로 props를 전달 할 때 해당 props의 데이터를 사용하지 않는 중간 컴포넌트들도 props를 거쳐야되는 현상
	
## Context를 사용하기 전에 고려할 것

1. props로 전달할 수 있는지 확인하기
    - props로 전달하는 방식이 컴포넌트가 더 유지보수하기 쉽다.
    - props drilling이 심한 경우에만 Context를 사용하는 것이 좋다.

2. 컴포넌트를 추출하고 JSX를 사용하기
   - 컴포넌트를 추출하고 children props을 사용하기
   - 아래 예시처럼 Layout 컴포넌트가 props를 사용하지 않고 전달만 한다면, 아래 예시 처럼 Layout 에서 children prop을 props으로 받아서 사용하면된다.
```jsx
function App({ posts }) {
  return <Layout posts={posts} />;
}

function Layout({ posts }) {
  return (
    <Main>
      <Posts posts={posts} />
    </Main>
  );
}
```

```jsx
function App({ posts }) {
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <Main>
      {children}
    </Main>
  );
}
```

3. Context는 성능에 영향을 줄 수 있다.
    - Context를 사용하면 컴포넌트가 리렌더링 될 때, 해당 Context를 사용하는 모든 하위 컴포넌트도 리렌더링 된다.

## context 사용 예시
- 테마 지정
    - 다크 모드, 라이트 모드
- 현재 계정 정보
    - 로그인 여부 확인 
- 라우팅
	- React Router 는 내부적으로 context api를 사용함.
- 상태 관리
    - props drilling을 피하기 위해서 context api를 사용함.

[react-router/packages/react-router/lib/hooks.tsx at a3e4b8ed875611637357647fcf862c2bc61f4e11 · remix-run/react-router · GitHub](https://github.com/remix-run/react-router/blob/a3e4b8ed875611637357647fcf862c2bc61f4e11/packages/react-router/lib/hooks.tsx#L310)
![](https://i.imgur.com/kbr7msK.png)


- 컴파운드 패턴(Compound pattern)
    - 컴포넌트가 동일한 state와 로직을 공유하는 경우 컴파운드 패턴을 사용함. 이럴 때 context api를 사용함.
```jsx
// Flyout.jsx
const FlyOutContext = createContext()

function FlyOut(props) {
  const [open, toggle] = useState(false)

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {props.children}
    </FlyOutContext.Provider>
  )
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext)

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  )
}

function List({ children }) {
  const { open } = useContext(FlyOutContext)
  return open && <ul>{children}</ul>
}

function Item({ children }) {
  return <li>{children}</li>
}

FlyOut.Toggle = Toggle
FlyOut.List = List
FlyOut.Item = Item

export default FlyOut

// FlyoutMenu.jsx
export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  )
}
```

## 첼린지


### 첼린지 1 of 4

```jsx
export default function ContactList({ contacts, selectedId, dispatch }) {
  function handleSelect(contactId) {
    dispatch({
      type: 'changed_selection',
      contactId
    });
  }

  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => handleSelect(contact.id)}>
              {selectedId === contact.id ? (
                <b>{contact.name}</b>
              ) : (
                contact.name
              )}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

## 챌린지 2 of 4:message 전송 시, input 입력 값 지우기
```jsx
export default function Chat({
  contact,
  message,
  dispatch
}) {
  const onSend = e => {
    alert(`Sending "${message}" to ${contact.email}`);
    dispatch({
      type: 'edited_message',
      message: e.target.value
    });
  };
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={e => {
          dispatch({
            type: 'edited_message',
            message: e.target.value
          });
        }}
      />
      <br />
      <button onClick={onSend}>Send to {contact.email}</button>
    </section>
  );
}
```



# Reducer와 Context로 앱 확장하기

## Reducer와 context를 결합하기

- 다른 컴포넌트에서 사용하려면 props로 전달하고 prop drilling이 발생한다.
- 이를 해결하기 위해 context API를 사용하여 prop이 아니라 context로 전달한다.


## Reducer와 context를 결합하는 방법

### 1. Context를 생성합니다.
- 상태를 위한 컨텍스트와 디스패치 함수를 위한 컨텍스트를 각각 생성
```jsx
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

### 2. State와 dispatch 함수를 context에 넣습니다.
- useReducer를 사용해 상태와 디스패치 함수를 가져오기.

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
return (
  <TasksContext.Provider value={tasks}>
    <TasksDispatchContext.Provider value={dispatch}>
      {/* ... 하위 컴포넌트들 ... */}
    </TasksDispatchContext.Provider>
  </TasksContext.Provider>
);
```
### 3. 트리 안에서 context를 사용합니다.
- 상태나 디스패치 함수가 필요한 하위 컴포넌트에서 useContext 훅을 사용하여 부모 컨텍스트의 값을 직접 가져오기.

```jsx
export default function TaskList() {
  const tasks = useContext(TasksContext);
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}
```