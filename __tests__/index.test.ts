import { jest } from '@jest/globals'
import { getInputs } from '../__fixtures__/inputs.js'
import { setOutputs } from '../__fixtures__/outputs.js'
import { summary } from '../__fixtures__/summary.js'
import { check } from '../__fixtures__/actions-check.js'
import { getLockedActions } from '../__fixtures__/actions-lock.js'
import { Inputs } from '../src/types.js'

jest.unstable_mockModule('../src/inputs.js', () => ({
  getInputs
}))
jest.unstable_mockModule('../src/outputs.js', () => ({
  setOutputs
}))
jest.unstable_mockModule('../src/summary.js', () => ({ summary }))
jest.unstable_mockModule('../src/actions-checker.js', () => ({
  check
}))
jest.unstable_mockModule('../src/actions-lock.js', () => ({
  getLockedActions
}))
describe('index.ts', () => {
  beforeEach(() => {})

  afterEach(() => {})

  it('Should call index', async () => {
    const inputs = {
      lockFileLocation: '',
      writeToJobSummary: false,
      githubToken: ''
    }
    getInputs.mockImplementation(() => {
      return inputs as Inputs
    })
    await import('../src/index.js')

    expect(getInputs).toHaveBeenCalledTimes(1)
    expect(getLockedActions).toHaveBeenCalledTimes(1)
    expect(check).toHaveBeenCalledTimes(1)
    expect(summary).toHaveBeenCalledTimes(1)
    expect(setOutputs).toHaveBeenCalledTimes(1)
  })
})
