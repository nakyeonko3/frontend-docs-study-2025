# 조건부 렌더링

- null은 JSX 상에서 렌더링 되지 않는다.
- 삼항 연산자로 조건부 렌더링하기
- &&를 왼쪽에 숫자를 두면 안된다.
  - 왼쪽 숫자가 0일 때 0이 화면에 렌더링 된다.

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

# 컴포넌트를 순수하게 유지하기

## 순수성: 공식으로서의 컴포넌트
-  순수 함수
	- 같은 입력(같은 매개변수 값)에 대해 동일한 출력을 보장해야 한다.
	- 함수 내부에서 외부의 상태를 변경해서는 안된다.
- React의 모든 컴포넌트는 순수 함수일 거라 가정한다.
- 즉 **React 컴포넌트에 같은 입력이 주어지면 같은 JSX를 반환**한다.

- y = 2x
```jsx
function double(number) {
  return 2 * number;
}
```

## 사이드 이펙트: 의도하지 않은 결과
- 컴포넌트 외부에 선언된 값을 변경하는 경우
- strict mode
	- 컴포넌트를 의도적으로 두 번 호출하여 값을 비교한다.
	- 이때 두 값이 다르면 순수하지 않은 함수이다.
## 지역 변경: 컴포넌트의 작은 비밀 
- 컴포넌트 내부 변수값을 변경하는 것은 허용된다.



## 사이드 이펙트를 _일으킬 수 있는_ 지점
- [React의 규칙 – React](https://ko.react.dev/reference/rules)
- 사이드 이펙트 
	- fetch를 통해 데이터를 가져오는 경우
	- 파일에 데이터를 쓰는 경우
	- 화면에 무언가를 입력하는 경우
- 사이드 이펙트는 이벤트 헨들러 내부에 작성한다.
	- 컴포넌트 렌더링할 때 바로 실행되지 않고, 사용자의 상호작용에 의해 브라우저 이벤트 루프에 의해 실행된다.
	- ex) 버튼 클릭 이벤트 헨들러 함수가 onClick 매개변수로 전달되고 있으면, 해당 이벤트 헨들러 함수가 있는 컴포넌트가 렌더링될 때 즉시 실행되는게 아니라 클릭 이벤트 발생시에 이벤트 헨들러 함수가 호출된다.
- 그래도 안되면 `useEffect` 를 사용한다.
	- `useEffect`는 React가 **렌더링 후에** 부수 효과를 실행한다.
- React는 왜 순수함아 중요할까?
	- 입력이 같으면 출력도 같기 때문에 **서버, 클라이언트 환경에서 실행되어도 동작을 예측할 수 있다.**
	- 동일한 입력에 대해 메모리제이션을 통해 계산을 생략할 수 있다.
	- 오래걸리는 작업이나 데이터가 패칭을 할 때 렌더링을 중단하고 다시 렌더링하더라도 큰 문제가 없다. <- ?
	

# 트리로서 UI 이해하기

## 렌더 트리
- 단일 렌더링에서 React 컴포넌트 간의 중첩 관계
- 렌더 트리의 각 노드는 React 컴포넌트를 나타냄
- 루트 노드는 앱의 최상위 컴포넌트(보통 App 컴포넌트)를 의미함.
- 플랫폼에 독립적안 렌더 트리
	- React의 UI는 웹에서는 HTML 마크업을 사용하지만
	- 모바일에서는 UIView, 데스크톱 플랫폼에서는 FrameworkElement로 렌더링된다.

## 모듈 의존성 트리
- React 앱의 모듈 의존성
- 각 노드는 컴포넌트가 아닌 JavaScript 모듈을 나타냄.
- 각 가지(branch)는 해당 모듈의 import 문을 나타냄.
- 트리의 루트 노드는 루트 모듈을 의미함.
- 번들러가 모듈 의존성 트리를 사용함.
	- 리액트에서는 클라이언트에 제공할 필요한 JavaScript 모듈들을 번들로 묶는 빌드 단계가 존재함. 이 빌드 단계에서 번들러가 모듈의존성 트리를 사용하여 번들에 필요한 모듈들을 확인함.