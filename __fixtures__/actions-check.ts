import { jest } from '@jest/globals'

export const check = jest.fn<typeof import('../src/actions-checker.js').check>()
