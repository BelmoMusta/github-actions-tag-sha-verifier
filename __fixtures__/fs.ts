import { jest } from '@jest/globals'
import fs from 'fs-extra'
export const readFileSync = jest.fn<typeof fs.readFileSync>()
export const existsSync = jest.fn<typeof fs.existsSync>()
