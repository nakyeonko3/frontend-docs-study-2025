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