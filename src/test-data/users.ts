import { ENV } from '../utils/env';

export const USERS = {
  STANDARD: {
    username: ENV.STANDARD_USER,
    password: ENV.PASSWORD,
  },
  LOCKED_OUT: {
    username: ENV.LOCKED_OUT_USER,
    password: ENV.PASSWORD,
  },
  PROBLEM: {
    username: ENV.PROBLEM_USER,
    password: ENV.PASSWORD,
  },
  PERFORMANCE_GLITCH: {
    username: ENV.PERFORMANCE_GLITCH_USER,
    password: ENV.PASSWORD,
  },
} as const;