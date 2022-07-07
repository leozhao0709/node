import fetchData from '@app/fetchData';

jest.mock('axios', () => ({
  get: (url) => ({ data: url }),
}));

describe('fetchData', () => {
  beforeAll(() => {
    // global.fetch = jest.fn((url) => ({ json: url })) as jest.Mock;
  });

  it('should fetch successfully', async () => {
    const data = await fetchData();
    expect(data).toBe('/something');
  });
});
