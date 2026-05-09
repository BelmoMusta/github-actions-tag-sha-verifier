import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

jest.unstable_mockModule('@actions/core', () => core)
const { summary } = await import('../src/summary.js')

describe('summary.ts', () => {
  beforeEach(() => {})

  afterEach(() => {
    //  jest.resetAllMocks()
  })

  it('Should set the summary with writeToJobSummary = false', async () => {
    const summaryReport = await summary(
      [
        {
          actualSHA: 'abcdef123456abcdef123456abcdef1234',
          expectedSHA: 'abcdef123456abcdef123456abcdef1234',
          match: true,
          name: 'actions/setup-java',
          ref: 'v3'
        }
      ],
      {
        writeToJobSummary: false
      }
    )
    expect(summaryReport).toEqual({
      markdown: 'MARKDOWN',
      json: JSON.stringify([
        {
          actualSHA: 'abcdef123456abcdef123456abcdef1234',
          expectedSHA: 'abcdef123456abcdef123456abcdef1234',
          match: true,
          name: 'actions/setup-java',
          ref: 'v3'
        }
      ])
    })

    expect(core.summary.addHeading).toHaveBeenCalledWith('Summary')
  })

  it('Should set the summary with writeToJobSummary = true', async () => {
    const summaryReport = await summary(
      [
        {
          actualSHA: 'abcdef123456abcdef123456abcdef1234',
          expectedSHA: 'abcdef123456abcdef123456abcdef1234',
          match: true,
          name: 'actions/setup-java',
          ref: 'v3'
        }
      ],
      {
        writeToJobSummary: true
      }
    )
    expect(summaryReport).toEqual({
      markdown: 'MARKDOWN',
      json: JSON.stringify([
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

  it('Should set the summary with writeToJobSummary = false and match false', async () => {
    const summaryReport = await summary(
      [
        {
          actualSHA: 'abcdef123456abcdef123456abcdef1234',
          expectedSHA: '00000000000000000000000000000000',
          match: false,
          name: 'actions/setup-java',
          ref: 'v3'
        }
      ],
      {
        writeToJobSummary: false
      }
    )
    expect(summaryReport).toEqual({
      markdown: 'MARKDOWN',
      json: JSON.stringify([
        {
          actualSHA: 'abcdef123456abcdef123456abcdef1234',
          expectedSHA: '00000000000000000000000000000000',
          match: false,
          name: 'actions/setup-java',
          ref: 'v3'
        }
      ])
    })
  })
})
