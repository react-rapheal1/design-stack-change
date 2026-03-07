/* eslint-disable */
// @ts-nocheck
function truncateDeviceName(name: string, maxLength = 32): string {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
}
export { truncateDeviceName };
