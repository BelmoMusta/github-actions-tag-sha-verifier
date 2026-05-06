import { jest } from '@jest/globals'

const value = {
  data: {
    object: {
      sha: 'abcdef123456abcdef123456abcdef1234'
    }
  }
}

export const Octokit = jest.fn(() => ({
  rest: {
    git: {
      // @ts-ignore
      getRef: jest.fn().mockResolvedValue(value)
    }
  }
}))
