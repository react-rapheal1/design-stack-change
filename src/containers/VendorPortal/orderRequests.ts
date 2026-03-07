/* eslint-disable */
// @ts-nocheck
import { OrderRequest } from "./OrderRequest";
import { generateOrderRequests } from "./generateOrderRequests";

const orderRequests: OrderRequest[] = generateOrderRequests(50);
export { orderRequests };
