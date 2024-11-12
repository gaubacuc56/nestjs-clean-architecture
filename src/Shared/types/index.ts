/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

// Common type for a typed request
export type RequestBody<TBody = object, TParams =object, TQuery = object> = Request<TParams, any, TBody, TQuery>;

// Common type for a typed response
export type ResponseBody<TResBody = any> = Response<TResBody>;