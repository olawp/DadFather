import { describe, expect, test } from 'bun:test';
import { parseGifUrls } from './mog.js';

describe('parseGifUrls', () => {
  test('parses comma-separated URLs and trims whitespace', () => {
    expect(
      parseGifUrls(' https://example.com/one.gif,https://example.com/two.gif '),
    ).toEqual([
      'https://example.com/one.gif',
      'https://example.com/two.gif',
    ]);
  });

  test('ignores empty entries', () => {
    expect(parseGifUrls('one.gif, ,two.gif,,')).toEqual(['one.gif', 'two.gif']);
  });

  test('returns an empty list when no value is configured', () => {
    expect(parseGifUrls(undefined)).toEqual([]);
  });
});
