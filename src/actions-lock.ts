import fs from 'fs-extra'
import * as path from 'path'
import { LockedActionInformation } from './types.js'

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function getLockedActions(lockFileLocation: string) {
  let filePath
  if (lockFileLocation) {
    filePath = lockFileLocation
  } else {
    // fallback to the current actions-lock file
    filePath = path.resolve(__dirname, './actions-lock.json')
    console.log('filePath', filePath)
  }
  let data: LockedActionInformation[] = []
  if (fs.existsSync(filePath)) {
    const jsonString = fs.readFileSync(filePath, 'utf8')
    data = JSON.parse(jsonString)
  }
  return data
}
