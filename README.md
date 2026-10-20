# Writer Forge — 작가를 위한 오픈소스 작업실

영화 시나리오, 블로그 글, 시, 수필, 어린이 동화, 판타지 소설을 하나의 로컬 프로젝트 형식으로 관리하는 독립 오픈소스입니다.

## 참고한 생태계와 개선점

- Scriptum·ActOne 계열의 시나리오 포맷 장점은 장르 템플릿으로 일반화했습니다.
- Kindling·Novalist 계열의 로컬 파일·아웃라인 장점은 JSON 기반 story bible로 단순화했습니다.
- story-skills·Open-Write 계열의 캐릭터·연속성 관리 아이디어는 특정 프롬프트나 코드를 복사하지 않고 독립 구조로 다시 설계했습니다.

해결하려는 문제는 데스크톱 앱마다 파일 형식이 달라 옮기기 어렵고, AI 글쓰기 도구가 작가의 문체를 모방하거나 출처를 기록하지 않아 저작권 오해가 생기는 점입니다.

## 시작

```bash
writer-forge genres
writer-forge init --genre screenplay --title "나의 영화" --out screenplay.json
writer-forge init --genre fantasy --title "새 세계" --out fantasy.json
```

각 프로젝트에는 로그라인, 등장인물, 장면/챕터 구조, 세계관 메모, 독창성·참고자료 기록이 들어갑니다. AI adapter를 추가하더라도 사용자 아이디어와 참고자료를 분리하고, 살아 있는 작가의 문체 모방을 기본값으로 제공하지 않습니다.

## License

MIT. 기존 프로젝트의 코드·프롬프트·문장·캐릭터를 복사하지 않은 독립 구현입니다.

