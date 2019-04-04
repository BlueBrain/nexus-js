export const mockGetStatistics = jest.fn();

const mockStatisticsClass = jest.fn().mockImplementation(() => ({
  getStatistics: mockGetStatistics,
}));

export default mockStatisticsClass;
