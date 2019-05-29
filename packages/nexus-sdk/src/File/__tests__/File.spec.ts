describe('testing api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('calls google and returns data to me', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

    //assert on the times called and arguments given to fetch
    expect(fetchMock.mock.calls.length).toEqual(0);
  });
});
