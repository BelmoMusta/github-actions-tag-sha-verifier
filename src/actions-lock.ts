import fs from 'fs-extra'
import * as path from 'path'
import {LockedActionInformation} from './types.js'

export function getLockedActions(lockFileLocation: string) {
    let filePath
    if (lockFileLocation) {
        filePath = lockFileLocation
    } else {
        // fallback to the current actions-lock file
        const githubActionPath = process.env['GITHUB_ACTION_PATH'] || '.'
        filePath = path.resolve(githubActionPath, './actions-lock.json')
    }
    const jsonString = fs.readFileSync(filePath, 'utf8')
    const data: LockedActionInformation[] = JSON.parse(jsonString)
    return data;
}
