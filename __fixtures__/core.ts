import type * as core from '@actions/core'
import { jest } from '@jest/globals'

export const debug = jest.fn<typeof core.debug>()
export const error = jest.fn<typeof core.error>()
export const info = jest.fn<typeof core.info>()
export const getInput = jest.fn<typeof core.getInput>()
export const getBooleanInput = jest.fn<typeof core.getBooleanInput>()
export const setOutput = jest.fn<typeof core.setOutput>()
export const setFailed = jest.fn<typeof core.setFailed>()
export const warning = jest.fn<typeof core.warning>()
export const summary = {
  addTable: jest.fn(() => {}),
  addHeading: jest.fn(() => {
    return {
      addTable: jest.fn(() => {
        return {
          write: jest.fn(() => {
            return {
              stringify: jest.fn(() => 'MARKDOWN')
            }
          }),
          stringify: jest.fn(() => 'MARKDOWN')
        }
      })
    }
  })
}
