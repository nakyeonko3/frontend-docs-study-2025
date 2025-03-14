## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# 메모

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