## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# chap 03: Fonts and Images

## 폰트 최적화
- 빌드 타임 최적화: 폰트를 빌드 타임에 다운로드하여 다른 정적 자산들(js,html,css, image, 등)과 함께 호스팅함.
- 브라우저에서 Nextjs앱이 랜더링된 이후에 따로 네트워크 요청을 통해 font들을 가져오지 않음.
	- React에서도 마찬가지로 빌드 타임에 폰트를 포함하게면 Nextjs의 폰트 최적화와 비슷한 효과를 가져오지 않을까?
		- Layout Shift(웹페이지가 로딩되면서 요소 위치가 의도치 않게 이동하는 현상) 방지 기능 없음.
		- 자동 서브셋팅 기능 없음.(필요한 문자만 다운로드)

## 이미지 최적화
- Lazy Loading
- 뷰포트에 맞케 크기를 잘라서 보내기
- WebP 또는 AVIF로 이미지를 바꾸기
- 이미지 로드시 레이아웃 이동 방지


# chap 4: Creating Layouts and Pages

## Nested routing
- 파일 시스템 구조에 맞춰서 라우팅이 진행됨.
- 폴더명이 URL 세그먼트가 됨.  

## partial rendering
- 다른 페이지 이동시 페이지 레이아웃 컴포넌트(layout.tsx)는 다시 랜더링되지 않고 일부분만 랜더링됨
- dashboard 폴더 하위의 모든 페이지 컴포넌트가 같은 layout.tsx 컴포넌트를 공유하게됨
- Root Layout: `app/layout.tsx` 는 모든 페이지에서 공유하는 루트 레이아웃이 됨.

```
app/
├── dashboard/
│   ├── page.tsx        
│   └── invoices/
│       └── page.tsx  
```

# chap 5: Navigating Between Pages

## The <Link> component
- `a` 태그를 사용하게 해당 링크 클릭시 해당 전체 페이지가 다시 재랜더링
- 사용자가 링크를 클릭 할 때까지 대상 페이지의 코드가 백그라운드에서 로드됨(prefetch)
	- 해당 페이지에서 뷰포트에 Link 태그가 보이게 되면 해당 경로의 컴포넌트를 prefetch를 통해 미리 가져오게됨.

### How are Client Components rendered?

[how-are-client-components-rendered](https://nextjs.org/docs/app/building-your-application/rendering/client-components#how-are-client-components-rendered)

1. 서버 컴포넌트(Server Component)를 RSC Payload라는 특수 데이터 형식으로 렌더링
2. **RSC Payload와 클라이언트 컴포넌트(Client Component)를 HTML로 렌더링**
	- `use client`를 명시한 클라이언트 컴포넌트의 초기 HTML도 서버에서 렌더링됨.
3. 브라우저는 서버에서 받은 HTML를 초기 페이지를 렌더링함
4. 이후 클라이언트 컴포넌트에 hydrate를 통해 JavaScript가 주입됨.


# chap 6: Setting Up Your Database


# chap 7: Fetching Data

## Choosing how to fetch data 
- API layer 
	- 서드파티 서비스 API 사용시 유용
- Database queries
	- API 엔드 포인트 없이 데이터베이스에 직접 접근하여 데이터를 가져올 수 있음.
	- 서버 컴포넌트에서 데이터베이스에 접근하기 때문에 데이터베이스 보안 정보가 클라이언트에서 노출되지 않음.


## Using Server Components to fetch data 서버 컴포넌트를 사용하여 데이터를 가져올 때의 장점
- 추가 API 계층없이 데이터베이스를 직접 쿼리하게 되서 작성하고 유지관리해야 될 코드가 감소함.
- 비용이 많이 드는 데이터 가져오기와 로직을 서버에서 처리하고 결과만 클라이언트로 전송할 수 있음.

## What are request waterfalls?
- 한 요청(fetch)가 완료된 후에만 다음 요청이 시작됨
- 특정 요청은 이전 요청이 완료된 이후에 진행되어야만 하는 경우가 존재함.
	- ex) 사용자 ID 값을 요청한 다음에 해당 사용자 ID로 사용자 프로필 데이터를 요청해야 되는 경우

### Parallel data fetching
- 모든 데이터 가져오기를 동시에 시작하여 총 시간 단축시킬 수 있는 방법
- Promise.all() 또는 Promise.allSettled()를 사용함.

```tsx
  // const latestInvoices = await fetchLatestInvoices();
  // const revenue = await fetchRevenue();
  // const {
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  //   numberOfCustomers,
  //   numberOfInvoices,
  // } = await fetchCardData();

  const [latestInvoices, revenue, cardData] = await Promise.all([
    fetchLatestInvoices(),
    fetchRevenue(),
    fetchCardData(),
  ]);

  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfCustomers,
    numberOfInvoices,
  } = cardData;
```


# chap 8: Static and Dynamic Rendering

### 동적 렌더링과 정적 렌더링
- 정적 렌더링
  - CDN 서비스를 이용해 캐싱 가능
  - 매번 동적 페이지를 만들지 않아 서버 로드 감소
  - 인덱싱이 쉬워서 검색 엔진 순위 향상, SEO 향상
  - 매번 업데이트가 필요한 페이지(ex 데시보드)에는 적합하지 않음.
- 동적 렌더링
  - 실시간 데이터, 사용자별로 각각 다른 페이지가 보이게 렌더링 할 수 있음.
  - 여러 데이터 요청 중 하나라도 느리게 처리되면 병목 현상이 되어 전체 페이지 렌더링이 지연됨.

# chap 9: Streaming

## 문제
- promise.all를 사용하더라도 가장 늦은 데이터 fetch가 끝날 때까지 기다리게 된다.
- **어떻게 해야 사용자가 원하는 데이터를 빠르게 전달할 수 있을까?**

## 스트리밍(Streaming)과 점진적 렌더링
- 로딩 컴포넌트 적용
- suspense
- 스트리밍이란?
	- 스트리밍을 적용해서 해당 페이지의 모든 부분이 랜더링 될 때 까지 기다리지 않고, UI와 상호 작용 가능하게함
		- 초기 HTML 전송: 먼저 골격 HTML(페이지 레이아웃과 폴백 UI)을 빠르게 전송
		- 점진적 렌더링: 서버에서 각 컴포넌트가 준비되면 추가 HTML 청크로 스트리밍
		- 하이드레이션: 컴포넌트별로 인터랙티브 기능 활성화
	- 웹 페이지도 일부분씩 사용자에게 전달
	- 데이터를 점진적으로 가져오기
![|500](https://i.imgur.com/ei8SGpR.png)


- 어떻게 데이터를 가져오기 때문에 성능이 향상될까?
	- 이전에는 데이터를 한 번에 revenue, invoices 데이터를 한번에 가져오고 둘 다 클라이언트에 가져올 때까지 로딩화면이 보였다. 
	- 지금은 revenue 를 가져오는 동안에만 해당 부분만 로딩이 걸리고, invoices를 가져오는 동안에는 오류가 걸리지 않았다.

- 스트리밍을 적용하면 스타일링이 망가질 수 있다.
	- Grouping components
	- 여러개의 card 데이터를 가져와야된다. 그런데 각 카드를 개별로 가져오고 렌더링하게 되면 레이아웃이 망가질 것이다.
	- 카드 컴포넌트들을 하나로 묶고 이를 suspense로 감싼다

- suspense 를 적용할 때 유의해야 될 점
	- 스트리밍이 필요한 곳에만 적용을 한다.
		- suspense가 필요한 곳에만 부분적으로 적용한다
		- 전체 페이지에 적용하면 모든 데이터 fetch가 끝날 때까지 로딩이 보일 것이다.
	- 컴포넌트를 묶어서 suspense를 사용한다
		- 부분적으로 스트리밍을 사용하게 되면 UI popping
		(불규칙적으로 UI 요소들이 렌더링되는 현상)이 일어날 수 있다. 
		- 래퍼 컴포넌트로 감싸고 여기에 suspense를 사용한다.

# chap 8: Partial Prerendering

## 부분 사전 렌더링이란? What is Partial Prerendering?
- 만약 사용자가 페이지에 접속한다면?
  1. 정적 라우트 셸(static route shell)이 먼저 렌더링되고 화면에 나타남.
    - 메뉴바, 제품 정보 같은 **정적인 부분**이 먼저 렌더링 되도록함.
  2. 정적 라우트 쉘(static route shell)에 동적인 콘텐츠들은 빈 공간(구멍)으로 남겨둠
  3. 이 빈 공간(구멍)들은 병렬로 스트리밍 되어 전체 페이지의 로드 시간이 단축됨.
