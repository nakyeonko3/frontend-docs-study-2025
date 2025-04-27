# Server Components
- 클라이언트 앱(Clinet App)과 SSR 서버(Server-Side Rendering 서버) 와는 별도의 환경에서 미리 렌더링되어 결과만 클라이언트로 보내지는 새로운 타입의 컴포넌트를 말함.
	- 서버 컴포넌트는 클라이언트에 JavaScript 코드를 로드하는 하이드레이션이 일어나지 않음.
- 빌드 시점에 한 번만 만들어지거나, 웹 서버를 이용해서 각 요청 마다 만들어질 수 있음.

## Server Components without a Server
- 서버 없는 서버 컴포넌트 
- 서버 컴포넌트는 웹서버 없이 **빌드 시점에 실행 될 수 있음**
	- ex) 블로그를 만들거나, CMS에서 정적 데이터를 읽고 싶을 때 유용함.
- HTML로 SSR 되어 CDN에 업로드하는 것도 가능함.


## Server Components with a Server
- 서버를 사용한 서버 컴포넌트
- 웹서버 환경에서 실행되는 서버 컴포넌트를 말함.
- 서버 컴포넌트와 클라이언트 컴포넌트를 하나의 번들로 만들어서 SSR로 초기 HTML 페이지를 만들 수 있음.
- 서버컴포넌트 내에서 API없이 데이터 계층(DB)에 접근 가능하다.

```jsx
import db from './database';

async function Note({id}) {
  // NOTE: loads *during* render.
  const note = await db.notes.get(id);
  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

async function Author({id}) {
  // NOTE: loads *after* Note,
  // but is fast if data is co-located.
  const author = await db.authors.get(id);
  return <span>By: {author.name}</span>;
}
```


## Adding interactivity to Server Components 
- 서버 컴포넌트에 상호작용 추가하기
- 서버 컴포넌트 자체적으로는 상호작용 (DOM 이벤트 헨들링)를 할 수 없다.
- 대신, 클라이언트 컴포넌트를 사용하여 상호작용을 추가한다.
	- 클라이언트 컴포넌트를 서버 컴포넌트에 import 해서 사용한다.
```jsx
import Expandable from './Expandable';

async function Notes() {
  const notes = await db.notes.getAll();
  return (
    <div>
      {notes.map(note => (
        <Expandable key={note.id}>
          <p note={note} />
        </Expandable>
      ))}
    </div>
  )
}
```
```jsx
"use client"

export default function Expandable({children}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
    </div>
  )
}
```


## Async components with Server Components
- 서버 컴포넌트를 이용한 비동기 컴포넌트
- 서버 컴포넌트는 async 키워드를 붙여서 컴포넌트를 작성 할 수 있다.
- async 컴포넌트에서는 await를 사용하면 해당 Promise가 완료 상태(fulfilled, rejected )가 될 때까지 렌더링을 멈춘다.
	- fullfilled 가 되면 렌더링을 재개한다.
	- rejected 가 되면 에러를 던진다(throw), 그러면 ErrorBoundary 에러 처리 컴포넌트에서 잡히거나 기본 fallback으로 처리 된다.
	- 이를 이용해서 Suspense를 통한 점진적 로딩(streaming)도 가능해짐.
```tsx
export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoDetailContent itemId={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
```


# Server Functions
- [Server Functions – React](https://react.dev/reference/rsc/server-functions)
- "use server"를 붙이면, 클라이언트 컴포넌트가 서버에 요청을 보내서 그 함수를 실행시킬 수 있다.
	- 프레임워크가 자동으로 서버 함수의 참조를 생성해서 클라이언트에 전달하고 클라이언트에서 해당 함수가 호출되면, React가 서버에 요청을 보내 함수를 실행하고 결과를 반환함. 
- 서버 액션
	- 현재는 action 내부 또는  action props로 전달되는 경우에만 '서버 함수'를 '서버 액션'이라고 부른다. 


## 사용 방법
### 서버 컴포넌트에서 서버 함수 사용하기 
- 서버 함수 안에 스코프 상단에 "use server" 지시문를 적어주면 된다.
```jsx
// Server Component
import Button from './Button';

function EmptyNote () {
  async function createNoteAction() {
    // Server Function
    'use server';
    
    await db.notes.create();
  }

  return <Button onClick={createNoteAction}/>;
}
```


### 클라이언트 컴포넌트에서 서버 함수 사용하기
- 서버 컴포넌트와 클라이언트 컴포넌트에서 서버 함수를 정의하는 방법이 다르므로 이점을 유의해야한다.
- 클라언트 컴포넌트에서는 서버 함수가 작성된 파일 최상단에 "use server" 지시문을 추가하고, 해당 함수를 클라이언트 컴포넌트에서 import해서 사용한다.
- [Data Fetching: Server Actions and Mutations \| Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

```tsx
'use server'
 // app/actions.ts
export async function create() {}
```

```tsx
'use client'
 // app/button.tsx
import { create } from './actions'
 
export function Button() {
  return <button onClick={() => create()}>Create</button>
}
```


# `<Suspense>`
- `<Suspense>` 를 사용하면 자식 컴포넌트들이 로딩을 완료할 때까지 fallback에 정의한 대체 UI를 표시 할 수 있다.
- async 컴포넌트에서는 await를 사용하면 해당 Promise가 완료 상태(fulfilled, rejected )가 될 때까지 렌더링을 멈춘다.
	- fullfilled 가 되면 렌더링을 재개한다.
	- rejected 가 되면 에러를 던진다(throw), 그러면 ErrorBoundary 에러 처리 컴포넌트에서 잡히거나 기본 fallback으로 처리 된다.
	- 이를 이용해서 Suspense를 통한 점진적 로딩(streaming)도 가능해짐.
