import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formate une date en anglais US sans relatif', () => {
    expect(formatDate('2024-01-01')).toMatch(/January 1, 2024/);
  });

  it('formate une date en anglais US avec relatif', () => {
    const result = formatDate('2024-01-01', true);
    expect(result).toMatch(/January 1, 2024 \(.+\)/);
  });

  it('retourne Today pour la date du jour avec relatif', () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(formatDate(today, true)).toMatch(/Today/);
  });
}); 