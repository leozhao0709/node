import { describe, it, expect } from 'vitest';

describe('index', () => {
  it('should always pass', () => {
    document.querySelector('body')!.innerHTML = `<div>123</div>`;
    expect(document.querySelector('div')).toBeVisible();
  });
});
