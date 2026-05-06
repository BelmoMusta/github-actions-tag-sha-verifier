import { jest } from '@jest/globals'

export const summary = jest.fn<typeof import('../src/summary.js').summary>()
