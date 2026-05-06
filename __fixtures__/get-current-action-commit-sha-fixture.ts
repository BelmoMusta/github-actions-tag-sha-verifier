import { jest } from '@jest/globals'

export const getCurrentCommitForActionReference =
  jest.fn<
    typeof import('../src/get-current-action-commit-sha.js').getCurrentCommitForActionReference
  >()
