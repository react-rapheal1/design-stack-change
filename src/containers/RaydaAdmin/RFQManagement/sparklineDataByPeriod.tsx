/* eslint-disable */
// @ts-nocheck
const sparklineDataByPeriod: Record<string, Record<string, number[]>> = {
  "12 months": {
    "Sent to Customer": [10, 12, 13, 14, 16, 15, 17, 18, 19, 20, 21, 22],
    Accepted: [15, 18, 22, 24, 26, 28, 30, 31, 33, 34, 36, 38],
    Rejected: [5, 6, 4, 7, 5, 6, 8, 7, 6, 5, 7, 8],
  },
  "30 days": {
    "Sent to Customer": [4, 5, 5, 6, 5, 7, 6, 7, 8, 8],
    Accepted: [9, 10, 11, 10, 12, 11, 13, 12, 14, 13],
    Rejected: [2, 3, 2, 3, 4, 3, 2, 3, 4, 3],
  },
  "7 days": { "Sent to Customer": [2, 3, 2, 3, 4, 3, 5], Accepted: [4, 5, 6, 7, 7, 8, 9], Rejected: [1, 2, 1, 1, 2, 1, 2] },
  "24 hours": { "Sent to Customer": [0, 0, 1, 1, 2, 2], Accepted: [0, 1, 1, 2, 2, 3], Rejected: [0, 0, 0, 1, 1, 1] },
};
export { sparklineDataByPeriod };
