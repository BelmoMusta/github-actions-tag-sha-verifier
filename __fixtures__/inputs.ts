import { jest } from '@jest/globals'

export const getInputs = jest.fn<typeof import('../src/inputs.js').getInputs>()
