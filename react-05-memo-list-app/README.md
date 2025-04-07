# 조건부 렌더링

- null은 JSX 상에서 렌더링 되지 않는다.
- 삼항 연산자로 조건부 렌더링하기
- &&를 왼쪽에 숫자를 두면 안된다.
  - 왼쪽 숫자가 0일 때 0이 화면에 렌더링 된다.

```
 <li>의 두 가지 다른 “인스턴스”를 만들 수 있기 때문에 객체 지향 프로그래밍에서는 위의 두 예가 미묘하게 다르다고 생각할 수 있습니다. 그러나 JSX 엘리먼트는 내부 상태를 보유하지 않으며 실제 DOM 노드가 아니기 때문에 “인스턴스”가 아닙니다. 이것은 청사진처럼 간단한 설명입니다. 따라서 위의 두 가지 예시 코드는 실제로 완전히 동일합니다. 상태를 보존하고 초기화하기에서는 이 기능이 어떻게 작동하는지 자세히 설명합니다.
```

## 자바스크립트 조건문 유의해야 될 점

- JavaScript에서 falsy로 취급되는 값들
  - `0, '', null, undefined, false` 
- truthy로 취급되는 값들
  - `{}, [], -1, '가', '0', true`
- `&&`는 falsy, `||`는 truthy가 되는 값을 리턴한다.

# 리스트 렌더링

## 배열을 데이터로 렌더링하기 
- map과 filter 사용하기
-  고유하게 식별할 수 있는 문자열 또는 숫자를 key로 지정하기
- map() 호출 내부의 JSX 엘리먼트에는 항상 key가 필요하다


- list 요소에 key값이 없는 경우 아래와 같은 경고가 표시된다.
```
Each child in a list should have a unique "key" prop.

Check the render method of `List`. See https://react.dev/link/warning-keys for more information. Stack: 
```

## key를 가져오는 곳
- 데이터베이스의 데이터에 사용되는 ID 값을 사용하기.
  - key/ID 값을 사용하기
  - 컴포넌트명과 같이 사용하기 `컴포넌트명-{ID}` 
- 로컬에서 생성된 데이터라면 `crypto.randomUUID()` 또는 `uuid` 사용하기

## key규칙
- 같은 배열(같은 형제 컴포넌트) 상에서는 key값을 사용한다
