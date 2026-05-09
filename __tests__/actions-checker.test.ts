import { jest } from '@jest/globals'

const { getCurrentCommitForActionReference } =
  await import('../__fixtures__/get-current-action-commit-sha-fixture.js')
jest.unstable_mockModule('../src/get-current-action-commit-sha.js', () => ({
  getCurrentCommitForActionReference
}))
const { check } = await import('../src/actions-checker.js')

describe('actions-checker.ts', () => {
  beforeEach(() => {
    getCurrentCommitForActionReference.mockImplementation(() =>
      Promise.resolve('abcdef123456abcdef123456abcdef1234')
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Should check the commits of the tag', async () => {
    const report = await check(
      [
        {
          name: 'actions/setup-java',
          versioningType: 'minorMajor',
          refs: [
            {
              type: 'tag',
              name: 'v3',
              commit: 'abcdef123456abcdef123456abcdef1234',
              aliases: []
            }
          ]
        }
      ],
      { githubToken: '' }
    )

    expect(report).toEqual([
      {
        actualSHA: 'abcdef123456abcdef123456abcdef1234',
        expectedSHA: 'abcdef123456abcdef123456abcdef1234',
        match: true,
        name: 'actions/setup-java',
        ref: 'v3'
      }
    ])
  })
})
