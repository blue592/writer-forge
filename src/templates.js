export const genres = {
  screenplay: { title: '영화 시나리오', sections: ['로그라인', '등장인물', '3막 구조', '장면 목록', '대사 초안'] },
  blog: { title: '블로그 글', sections: ['독자와 문제', '핵심 주장', '근거와 사례', '실행 방법', '요약과 다음 행동'] },
  poetry: { title: '시', sections: ['이미지', '감각어', '전환', '리듬', '퇴고 메모'] },
  essay: { title: '수필', sections: ['경험의 장면', '개인적 질문', '관찰과 성찰', '현재의 의미', '마무리 문장'] },
  children: { title: '어린이 동화', sections: ['주인공의 바람', '안전한 갈등', '반복되는 장치', '해결과 배움', '낭독 점검'] },
  fantasy: { title: '판타지 소설', sections: ['세계의 규칙', '주인공과 결핍', '세력과 갈등', '퀘스트와 반전', '결말의 대가'] }
  ,resume: { title: '이력서', sections: ['한 줄 소개', '핵심 역량', '경력과 성과', '프로젝트', '지원 동기'] }
  ,advertisement: { title: '광고 글', sections: ['고객의 문제', '제품 약속', '차별점', '증거와 혜택', '행동 유도'] }
  ,sms: { title: '문자 마케팅', sections: ['수신자와 목적', '첫 문장', '혜택', '긴급성 또는 신뢰', '짧은 행동 유도'] }
  ,presentation: { title: '발표문', sections: ['청중과 목표', '문제 제기', '핵심 메시지', '사례와 전환', '마무리'] }
  ,report: { title: '보고서', sections: ['요약', '배경과 범위', '데이터와 관찰', '해석과 위험', '결론과 제안'] }
};

export function createProject(genre, title = '새 글') {
  const template = genres[genre]; if (!template) throw new Error(`Unknown genre: ${genre}`);
  return { title, genre, originality: { sourceNote: 'Write from your own ideas; do not imitate living authors.', references: [] }, characters: [], sections: template.sections.map(name => ({ name, content: '' })) };
}

