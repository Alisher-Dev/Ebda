import { Pagination } from "./pagination";

export const apiResponse = <T>(data: T, pagination?: Pagination) => {
  return {
    data,
    pagination: pagination || null,
    date: new Date(),
  };
};
