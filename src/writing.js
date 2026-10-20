import fs from 'node:fs/promises';
import path from 'node:path';

export function countText(text) { return { characters: [...String(text)].length, words: String(text).trim() ? String(text).trim().split(/\s+/).length : 0, lines: String(text).split(/\r?\n/).length }; }
export function flowCheck(text) {
  const sentences = String(text).split(/[.!?。！？]+/).map(x => x.trim()).filter(Boolean);
  const repeated = sentences.filter((s, i) => i && s === sentences[i - 1]);
  return { sentences: sentences.length, repeated, empty: sentences.length === 0, advice: repeated.length ? '반복 문장을 합치거나 구체적인 사례를 추가하세요.' : '문장 흐름이 자연스럽습니다.' };
}
export function expressionHints(topic = '') { return { onomatopoeia: ['톡톡', '살랑살랑', '반짝', '두근두근'], imagery: [`${topic}을 오감으로 묘사하기`, '짧은 비유 한 문장 넣기'], originality: '사실·경험·수치를 본인 말로 구체화하세요.' }; }
export async function backup(file) { const backupPath = `${file}.${new Date().toISOString().replaceAll(':', '-')}.bak`; await fs.copyFile(file, backupPath); return path.resolve(backupPath); }

