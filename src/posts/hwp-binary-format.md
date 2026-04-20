---
title: "HWP 파일 포맷을 역공학한 이야기"
date: "2025-03-10"
tags: ["TypeScript", "바이너리", "역공학", "오픈소스"]
description: "표준 라이브러리 없이 HWP 파일 포맷을 분석해 서명 삽입 도구를 만든 과정"
---

## 왜 HWP인가

국내 행정 서류의 대부분은 HWP 형식이다.
서명을 매번 손으로 넣는 게 귀찮아서 자동화하려 했는데, **TypeScript로 HWP를 다루는 라이브러리가 없었다**.

선택지는 두 가지였다:
- 포기하고 다른 방법 찾기
- 직접 만들기

## 바이너리 포맷 분석

HWP는 OLE(Object Linking and Embedding) 복합 문서 포맷 기반이다.
파일을 hex editor로 열면 이렇게 생겼다:

```
D0 CF 11 E0 A1 B1 1A E1  // OLE 시그니처
```

서명 삽입 위치를 찾으려면 문서 구조 트리를 탐색해야 한다.

핵심 발견: HWP 내부에서 서명은 특정 스트림(stream)에 이미지 바이너리로 저장된다.
이 스트림의 오프셋만 알면 삽입이 가능하다.

## 구현 과정

1. cfb (Compound File Binary) 파서로 스트림 목록 추출
2. 서명 관련 스트림 식별 (이름 패턴 분석)
3. 이미지 바이너리를 해당 오프셋에 쓰기

```typescript
const cfb = CFB.read(fileBuffer)
const signatureStream = cfb.find('BinData/BIN0001')
// ... 서명 이미지 바이너리 삽입
```

## 오픈소스로 공개한 이유

나만 쓰기엔 아깝고, 이 문제로 고생하는 사람이 더 있을 것 같았다.
GitHub에 올렸더니 예상보다 반응이 좋았다.

**실용 도구의 수요는 생각보다 크다.**
