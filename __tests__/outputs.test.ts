import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

jest.unstable_mockModule('@actions/core', () => core)
const { setOutputs } = await import('../src/outputs.js')

describe('outputs.ts', () => {
  beforeEach(() => {})

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Should set the outputs', async () => {
    setOutputs({ json: '{}', markdown: 'MARKDOWN' })
    expect(core.setOutput).toHaveBeenCalledWith('json-report', '{}')
    expect(core.setOutput).toHaveBeenCalledWith('markdown-report', 'MARKDOWN')
  })
})
