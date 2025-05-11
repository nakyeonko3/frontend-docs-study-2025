# [State 구조 선택하기](https://ko.react.dev/learn/choosing-the-state-structure)

## State 구조화 원칙
- `state`를 만들 때 지켜야 될 원칙들이 존재한다.
	1. 연관된 `state` 그룹화하기
	2. `State` 의 논리적 모순 피하기
	3. 불필요한 `state` 피하기
	4. `State` 중복 피하기
	5. 깊게 중첩된 `state` 피하기

- 이와 같은 원칙을 지켜야 하는 이유는 **오류 없이 상태를 쉽게 업데이트** 하기 위해서이다.
- **"당신의 state를 가능한 한 단순하게 만들어야 한다, 더 단순하게 가 아니라."**

## 1. 연관된 `state` 그룹화하기
- 서로 밀접하거나 연관된 상태들을 단일 객체로 만들기
- 두개의 `state` 가 동시에 변경된다면 단일 `state` 변수로 만들기

```jsx
// const [isLoading, setIsLoading] = useState(false);
// const [data, setData] = useState(null);
// const [error, setError] = useState(null);

const [requestState, setRequestState] = useState({
  isLoading: false,
  data: null,
  error: null,
});
```

## 2. `State` 의 논리적 모순 피하기
- 존재할 수 없는 상태 조합이 나타나지 않도록 만들어야 한다.
	- `isLoading`이 `true`이면서 동시에 `error` 객체도 `true`를 가지고 있는 상태는 일반적으로는 모순된 상태이다. (로딩 중에는 아직 에러가 발생하지 않았거나, 에러가 발생했다면 로딩이 중단되었어야 함).
	- 이런 경우 데이터 요청 상태를 `status: 'loading' | 'success' | 'error'` 로 만들어서 하나의 문자열로 관리하면 편하다.

## 3. 불필요한 `state` 피하기
- 다른 `state` 나 `props` 로 계산될 수 있는 값은 `state` 로 선언하지 않는다.

## 4. `State` 중복 피하기
- 동일한 데이터가 여러 `state`에 중복되서 저장되어서는 안된다.
```jsx

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  // const [selectedItem, setSelectedItem] = useState(
  //  items[0]
  // );
  // selectedItem은 items와 동일한 객체라서 중복이 된다.

  const [selectedId, setSelectedId] = useState(0);
  const selectedItem = items.find(item =>
    item.id === selectedId
  );
```

## 5. 깊게 중첩된 `state` 피하기
- `state` 가 너무 중첩되어 있다면 평탄(정규화)한다.
	- 객체를 중첩을 하는 대신 ID를 사용하여 데이터를 참조하도록 할 수 있다.
- `immer` 같은 라이브러리를 사용하여 깊은 중첩 된 객체를 더 간결한 코드로 업데이트하도록 하는 것도 좋다.

---

이전: [State 를 사용해 Input 다루기](01-input-handling.md)
다음: [컴포넌트 간 State 공유하기](03-sharing-state.md)
