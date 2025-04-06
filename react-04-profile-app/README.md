# 첫 번째 컴포넌트

##  React 컴포넌트
 - 마크업, CSS, JavaScript를 포함하는 **앱의 재사용 가능한 UI 요소**다
 - 재사용 가능성
	 - 버튼, 폼, 모달 등 자주 사용되는 UI 요소를 공통 컴포넌트로 만들어 여러 곳에서 활용 가능
	 -  [Material UI](https://material-ui.com/) 같은 외부 라이브러리의 컴포넌트를 프로젝트에 쉽게 통합하여 사용 가능

## 컴포넌트 정의하기
- React 컴포넌트는 **마크업으로 뿌릴 수 있는 JavaScript 함수**다

```jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```


## 중첩된 컴포넌트 정의를 피해야 하는 이유
- 컴포넌트 함수를 다른 컴포넌트 내부에 정의하는 것은 피해야함.
- 해당 함수는 랜더링시마다 다시 새롭게 재정의됨.
```jsx
// 🔴 절대 컴포넌트 안에 다른 컴포넌트를 정의하면 안 됩니다!
export default function Gallery() {
  function Profile() {
    return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
  }
  
  return (
    <section>
      <Profile />
      <Profile />
    </section>
  );
}
```

```jsx
const PostItem = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  
  // 🔴
  const handleAddComment = (text) => {
    const newComment = { id: Date.now(), text, author: currentUser };
    setComments([...comments, newComment]);
    saveCommentToAPI(post.id, text);
  };
  
  return (
    <div className="post-container">
      <PostContent content={post.content} />
      <CommentList comments={comments} />
      <CommentInput onAddComment={handleAddComment} />
    </div>
  );
}


const CommentInput = ({ onAddComment }) => {
	const [commentTmpText, setCommentTmpText] = useState("");
	
	// ....
	useEffect(()=> {
	if (commentText.length > 0) {
      onAddComment(commentTmpText);
    }
	//	...
	},[onAddComment])
}
// ...
})
```

# 컴포넌트 import 및 export 하기

## Root 컴포넌트란
- React 애플리케이션의 진입점에서 처음으로 렌더링되는 컴포넌트
- **앱 전체를 감싸는 최상위 컴포넌트**


## 컴포넌트를 import 하거나 export 하는 방법
- default export를 한 값을 named import를 해서는 안됨. 
- 보편적으로 한 파일에서 하나의 컴포넌트만 export 할 때 default export 방식을 사용하고 여러 컴포넌트를 export 할 경우엔 named export 방식을 사용함

|Syntax|Export 구문|Import 구문|
|---|---|---|
|Default|`export default function Button() {}`|`import Button from './button.js';`|
|Named|`export function Button() {}`|`import { Button } from './button.js';`|
# JSX로 마크업 작성하기

## JSX: JavaScript에 마크업 넣기
- React에서 JSX를 사용한 이유
	- Web이 인터랙티브하게 하면서 로직이 내용을 결정하는 경우가 많아짐. JavaScript가 HTML를 담당하게됨.
	- 랜더링 로직과 마크업을 분리하지 않고 하나의 컴포넌트로 묶게됨. 
	- [Separation of Concerns. At this point, we have used JSX to… \| by Firat Atalay \| Medium](https://medium.com/@firatatalay/separation-of-concerns-ceaed45bd53c)
![|500](https://i.imgur.com/1O0QNda.png)

## JSX의 규칙
- 하나의 루트 엘리먼트 반환하기
- 모든 태그는 닫아주기
- JSX의 어트리뷰트는 캐멀 케이스(camelCase)로 작성하기

```jsx
function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
```


# 중괄호가 있는 JSX 안에서 자바스크립트 사용하기

## 중괄호 사용하는 이유
- 해당 마크업 내부의 동적인 프로퍼티를 참조
- 해당 마크업 JavaScript 표현식을 사용하고 싶을 때

## 중괄호 사용하기: JavaScript 세계로 연결하는 창
- 텍스트로 JSX 태그 내부에 직접 사용하거나 어트리뷰트로 사용
```jsx
export default function Avatar() {
const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  return (
    <img
      className="avatar"
      src={avatar}
      alt="Gregorio Y. Zara"
    />
  );
}

```

- JavaScript 표현식을 사용
```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```


## ”이중 중괄호” 사용하기: JSX의 CSS와 다른 객체
- JSX의 중괄호 안에 JavaScript 객체를 전달하기
	- 인라인 스타일이 필요할 때 `style` 어트리뷰트에 객체를 전달
```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

# 컴포넌트에 props 전달하기

## 친숙한 props 
- props는 HTML 속성과 유사하게 작동하지만 객체, 배열, 함수 등 모든 JavaScript 값을 전송할 수 있다

## 컴포넌트에 props 전달하기
- props는 컴포넌트에 대한 유일한 인자
- React 컴포넌트 함수는 하나의 인자, 즉 `props` 객체를 받는다.
- 덕분에 컴포넌트 내부에서 무엇이 렌더링 되는지 “알” 필요는 없다

## Props의 특징
- 단방향
	- 데이터는 부모에서 자식 컴포넌트로만 흐른다.
- 동적
	- 컴포넌트가 시간에 따라 다른 props를 받을 수 있음. Props는 항상 고정되어 있지 않다
- 불변성
	- props를 변경해야 되는 경우 이전의 props는 제거하고 메모리에서 회수한 다음에 새로운 props 객체를 만드는 방식으로 작동한다.