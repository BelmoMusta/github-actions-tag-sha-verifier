import { jest } from '@jest/globals'

export const getLockedActions =
  jest.fn<typeof import('../src/actions-lock.js').getLockedActions>()
