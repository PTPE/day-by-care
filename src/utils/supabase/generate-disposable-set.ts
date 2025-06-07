/* eslint-disable no-bitwise */
function generateDisposableId(): string {
  const template = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx';
  const id = template.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 10);
    return c === 'x' ? r.toString() : ((r & 0x3) | 0x8).toString();
  });

  const checksum = [1, 6, 8, 10].reduce((sum, i) => {
    const char = id.charAt(i);
    let val = 0;
    if (/^\d+$/.test(char)) {
      val = parseInt(char, 10);
    } else if (/^[A-Za-z]$/.test(char)) {
      val = char.charCodeAt(0);
    }
    return sum + val;
  }, 0);

  return `${id}.${checksum}`;
}

function randomString(length: number): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}

function generateKeyAndT1(disposableId: string): { key: string; t1: string } {
  const suffix = randomString(5);
  const encoded = btoa(`${disposableId}-${suffix}`);

  const mode = Math.random() < 0.5 ? 1 : 2;
  const randomIndex = Math.floor(Math.random() * 10);

  let key = '';
  let t1 = '';
  if (mode === 1) {
    const insertChar = randomString(1);
    key =
      encoded.slice(0, randomIndex) + insertChar + encoded.slice(randomIndex);
    t1 = `1-${randomIndex}-${insertChar}--${suffix}`;
  } else {
    const removedChar = encoded.charAt(randomIndex);
    key = encoded.slice(0, randomIndex) + encoded.slice(randomIndex + 1);
    t1 = `2-${randomIndex}--${removedChar}-${suffix}`;
  }

  return {
    key: btoa(key),
    t1,
  };
}

export default function generateDisposableSet() {
  const disposableId = generateDisposableId();
  const { key, t1 } = generateKeyAndT1(disposableId);

  return {
    disposableId,
    key,
    t1,
  };
}
