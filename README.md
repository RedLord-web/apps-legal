# apps-legal

스튜디오 노트랩(Studio Knotlab)에서 운영하는 모바일 애플리케이션의 약관 및 개인정보처리방침 모음.

## URL

GitHub Pages: <https://redlord-web.github.io/apps-legal/>

## 구조

```
apps-legal/
├── index.html        ← 전체 앱 목록 (랜딩)
├── style.css         ← 공통 스타일
├── everylotto/       ← 모두의 로또 (한국, com.knotlab.everylotto)
│   ├── index.html
│   ├── privacy.html
│   └── terms.html
├── minanoloto/       ← みんなのロト / 모두의 로또 일본판 (com.knotlab.minanoloto)
│   ├── index.html
│   ├── privacy.html
│   └── terms.html
├── nihongo/          ← にほんGO / 일본어 학습 (com.knotlab.nihongo)
│   ├── index.html
│   ├── privacy.html
│   └── terms.html
└── baeugo/           ← 배우GO / 한국어 학습·TOPIK (com.knotlab.baeugo)
    ├── gen-baeugo.mjs                 ← 다국어 문서 생성기 (단일 소스)
    ├── index.html / index.{ko,ja,zh,vi}.html
    ├── privacy.html / privacy.{ko,ja,zh,vi}.html
    └── terms.html / terms.{ko,ja,zh,vi}.html
```

## 새 앱 추가

1. 새 폴더 생성 (영문 슬러그)
2. `index.html`, `privacy.html`, `terms.html` 작성 (기존 폴더 복사 후 수정)
3. 루트 `index.html`의 `app-grid`에 새 앱 카드 추가
4. 커밋 + 푸시 → GitHub Pages 자동 갱신

### 다국어 앱 (배우GO)

배우GO는 앱이 5개 언어(en/ko/ja/zh/vi)를 지원하므로 문서도 언어별로 둔다.
영어가 기본(`privacy.html`)이고 나머지는 접미사(`privacy.ko.html` 등)를 붙인다.
문서는 `baeugo/gen-baeugo.mjs`가 언어별 문자열을 한 소스로 관리해 생성한다.

```
cd baeugo && node gen-baeugo.mjs   # 15개 파일(3종 × 5언어) 재생성
```

내용 수정 시 HTML을 직접 고치지 말고 생성기의 문자열을 고친 뒤 재생성할 것.

## 문의

knotlabdev@gmail.com
