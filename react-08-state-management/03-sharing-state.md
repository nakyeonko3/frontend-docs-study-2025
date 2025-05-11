# [컴포넌트 간 State 공유하기](https://ko.react.dev/learn/sharing-state-between-components)

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

---

이전: [State 구조 선택하기](02-state-structure.md)
