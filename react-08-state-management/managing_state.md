# State 를 사용해 Input 다루기

## 선언형 UI와 명령형 UI 비교

> 선언형은 어떻게(how)보다는 무엇을(what)에 집중한다. 

- 명령형 UI
	- **UI를 구성하는 절차를 하나하나씩 지시(명령)하는** 방식이다.
	- 개발자가 직접 DOM을 조작하거나 변경하는 코드를 하나씩 전부다 작성해야 한다. (예,`document.createElement, appendChild, innerText`) 
	- 단순한 화면에서는 문제가 없지만, 관리해야된 상태가 늘어나게 되면 **코드 복잡도가 크게 증가한다.**

- 선언형 UI
	- **UI가 어떤 상태로 보여야 될지를 선언하는 방식**이다.
	- 개발자는 상태(state)에 따라 어떤 화면을 보여야하는지 과정들을 명시하지 않고 결과에만 집중하면 된다. DOM을 조작하고 변경하는 부분은 라이브러리(또는 프레임워크)가 담당한다.
	- 관리해야 될 상태가 늘어난다 하더라도 명령형 UI에 비해서는 **복잡도가 크게 증가하지 않는다.**
	- 개발자는 상태 관리와 해당 상태에 대한 UI만 정의하면 되기 때문에, **인지부하가 감소한다.**


## UI를 선언적인 방식으로 생각하기
선언적인 방식으로 React에서 UI 구현하는 과정
1. 컴포넌트의 다양한 시각적 state 확인
2. 무엇이 state 변화를 트리거하는지 알아내기
3. `useState`를 사용해서 메모리의 `state`를 표현
4. 불필요한 `state` 변수를 제거
5. `state` 설정을 위해 이벤트핸들러를 연결


## 1. 컴포넌트의 다양한 시각적 state 확인
- 사용자가 볼 수 있는 UI의 모든 state를 시각화하는 과정이다.
	- 오류, 작성중, 성공에 대한 모든 state들을 일단 모두 시각화 해야 한다.
	- ex) 폼에 대한 상태 값은 다음과 같을 수 있다. Error(에러), Submitting(폼 제출), Typing(작성중)
- 유한 상태 기계(Finite-state machine, FSM)
	- 유한 상태 기계는 어떠한 사건(Event)에 의해 한 상태에서 다른 상태로 변화할 수 있으며, 이를 전이(Transition)이라 한다 
	- 아래 그림에서는 광부의 상태를 순서도로 표현한 그림이다. 여기서 광부가 특정 사건(Event)마다 다른 상태로 전이(Transition)되는 걸 볼 수 있다.
![|300](https://i.imgur.com/YSMX0bI.png)


## 2. 무엇이 state 변화를 트리거하는지 알아내기
- 어떤 걸로 인해 상태(state)가 또 다른 상태로 전이되는 확인하는 과정이다.
	- 예) 사용자가 폼을 제출하고 네트워크 요청이 실패하면 반드시 Error 상태로 변해야 된다.
- 순서도를 그려서 시작화 하면 구현하기 전에 state 변화 흐름을 파악하고, 버그를 찾아낼 수 있다.


## 3. `useState`를 사용해서 메모리의 `state`를 표현
- 이전 단계에서 만든 시각적 state를 `useState`를 이용해서 표현하는 과정이다.
- 상태는(`state`)는 적을 수록 좋다.
- 불필요한  state가 많으면 어떻게 될까?
	- 불필요한 리렌더링이 증가한다
	- `state`간 동기화가 어려워져 버그 가능성이 증가 한다.
	- 디버깅도 어려워 진다.

##  4. 불필요한 `state` 변수를 제거

- 중복을 피하고 필수적은 `state`만을 남기기 위한 과정

- 아래 조건들을 만족하면 state로 만드는 것이 좋다.
	- 다른 props나 state로 계산할 수 없는 값이다.
	- 상태(state) 간에 논리적 모순이 발생하지 않는다.


- isTyping은 현재 사용자가 텍스트 인풋을 변경 중인지 아닌지 여부 나타내기 위한 상태고, </br> isSubmitting은 제출 버튼을 클릭하고 네트워크 응답을 기다리고 있는지 확인하기 위해 만든 상태다.
- 이 둘이 동시에 참일 수는 없다.
```jsx
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
```


### 5. `state` 설정을 위해 이벤트핸들러를 연결

- state 변수와 이벤트 헨들러와 연결하기
- 사용자의 입력을 처리하기 위해서는 이벤트 헨들러가 필요하다.

# State 구조 선택하기

## State 구조화 원칙
- `state`를 만들 때 지켜야 될 원칙들이 존재한다.
	1. 연관된 `state` 그룹화하기
	2. `State` 의 논리적 모순 피하기
	3. 불필요한 `state` 피하기
	4. `State` 중복 피하기
	5. 깊게 중첩된 `state` 피하기

- 이와 같은 원칙을 지켜야 하는 이유는 **오류 없이 상태를 쉽게 업데이트** 하기 위해서이다.
- **“당신의 state를 가능한 한 단순하게 만들어야 한다, 더 단순하게 가 아니라.”**

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

# [컴포넌트 간 State 공유하기 – React](https://ko.react.dev/learn/sharing-state-between-components)

## state 끌어올리기
- 두 컴포넌트가 같은 `state` 를 공유하고 싶다면 어떻게 할것인가?
- state를 제거하고 가장 가까운 부모 컴포넌트로 옮기고 props로 전달하는 것이 제일 좋은 방법일 것이다. 이 방법을 *state 끌어올리기* 라고 한다.

## 제어와 비제어 컴포넌트

- 제어 컴포넌트(Controlled Components)
	- 컴포넌트의 상태를 직접 관리 하지 않고, 부모 컴포넌트로부터 `props`를 통해 괸리된다.
	- 부모로부터 `props`로 값을 전달 받고, 값이 변경 될 때 `props`로 받은 콜백 함수를 호출하여 상태 값을 제어한다.  
- 비제어 컴포넌트 (Uncontrolled Components)
	- 컴포넌트의 상태를 컴포넌트가 가진 `지역 state`를 통해 관리 된다.
- 엄격하게 제어/비제어 컴포넌트로 나뉘지 않고 각 컴포넌트들은 이 두 방식을 혼합하여 사용한다.

- atom에 해당하는 가장 작은 컴포넌트들(버튼, 입력 필드, 등)은 가능하면 `props` 로 제어되도록 하면 좋을 것 같다.
- 
```jsx
function InputField({ text, onTextChange }) {
  return (
    <input
      type="text"
      value={text} // 부모로부터 받은 상태
      onChange={(e) => onTextChange(e.target.value)} // 상태 변경 요청을 부모에게 전달
      placeholder="여기에 입력"
    />
  );
}
```

## 각 state 단일 진리의 원천
- SSOT(단일한 진리의 원천 원칙, Single source of truth)
	- **어떤 상태(데이터)에 대한 유일하고 권위 있는 출처가 단 하나만 존재해야 한다는 원칙**이다.
	- 동일한 데이터가 여러곳에 중복되서 존재하고 각기 다른 값을 가지게 된다면, 유지 보수 과정에서 혼란과 버그를 초래할 가능성이 높다.
	- 이를 방지하기 위해서 SSOT는 데이터는 단 하나의 출처에서 관리하고 이를 참조하거나 파생된 값으로만 활용하도록 권장한다.

- 만약 여러 컴포넌트가 동일한 상태를 공유해야 되는 경우 컴포넌트 간에 각각 독립된 state 값을 선언하는 대신에 공통된 부모 컴포넌트로 부터 전달 받은 state를 사용한다.
- 이 공통 부모가 단일 진리 소유자(단일 진리의 원천)이 되고, props를 통해 자식 컴포넌트에 상태(state)를 전달한다.

