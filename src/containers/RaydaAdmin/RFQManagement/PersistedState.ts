/* eslint-disable */
// @ts-nocheck
import { FilterTab, RequestFilters, SortDirection, SortField } from "../shared";

interface PersistedState {
  q: string;
  tab: FilterTab;
  sort: SortField | null;
  dir: SortDirection;
  page: number;
  filters: RequestFilters;
  pageSize?: number;
}
export { PersistedState };
