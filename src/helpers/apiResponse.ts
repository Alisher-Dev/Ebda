import { Pagination } from "./pagination";

export const apiResponse = (data: any, pagination?: Pagination) => {
  return {
    data,
    pagination: pagination || null,
    date: new Date(),
  };
};
