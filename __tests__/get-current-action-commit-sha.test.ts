import { jest } from '@jest/globals'
import * as mockedOctokit from '../__fixtures__/octokit-fixture.js'

jest.unstable_mockModule('octokit', () => mockedOctokit)
const { getCurrentCommitForActionReference } =
  await import('../src/get-current-action-commit-sha.js')

describe('get-current-action-commit-sha.ts', () => {
  beforeEach(() => {})

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('Should check the commits of the tag', async () => {
    const commit = await getCurrentCommitForActionReference({
      action: 'actions/something',
      githubToken: '',
      reference: 'v5',
      type: 'tag'
    })

    expect(commit).toEqual('abcdef123456abcdef123456abcdef1234')
  })

  it('Should check the commits of the branch', async () => {
    const commit = await getCurrentCommitForActionReference({
      action: 'actions/something',
      githubToken: '',
      reference: 'main',
      type: 'branch'
    })

    expect(commit).toEqual('abcdef123456abcdef123456abcdef1234')
  })

  it('Should check the commits of a reference with no /', async () => {
    const commit = await getCurrentCommitForActionReference({
      action: 'actions',
      githubToken: '',
      reference: 'main',
      type: 'branch'
    })

    expect(commit).toEqual('abcdef123456abcdef123456abcdef1234')
  })
})
