import {jest} from '@jest/globals'
import * as fss from '../__fixtures__/fs.js'

jest.mock('fs-extra', () => fss)

const {getLockedActions} = await import('../src/actions-lock.js')

describe('action-lock.ts', () => {
    beforeEach(() => {
        const lock = `[
  {
    "name": "actions/setup-java",
    "versioningType": "patch-major",
    "refs": [
      {
        "type": "tag",
        "name": "v5",
        "commit": "be666c2fcd27ec809703dec50e508c2fdc7f6654",
        "aliases": [
          "v5.2.0"
        ]
      },
      {
        "type": "tag",
        "name": "v5.1.0",
        "commit": "f2beeb24e141e01a676f977032f5a29d81c9e27e"
      },
      {
        "type": "branch",
        "name": "main",
        "commit": "b622de1dfa918ecc0ab28f40cd42e3c3752cd6c5"
      }
    ]
  },
  {
    "name": "hashicorp/vault-action",
    "versioningType": "patch-major",
    "refs": [
      {
        "type": "tag",
        "name": "v3",
        "commit": "4c06c5ccf5c0761b6029f56cfb1dcf5565918a3b",
        "aliases": [
          "v3.4.0"
        ]
      },
      {
        "type": "tag",
        "name": "v3.0.0",
        "commit": "000000000000000000000000000000000000000"
      }
    ]
  }
]`
        ;(fss.readFileSync as any).mockImplementation(() => lock)
    })

    afterEach(() => {
        jest.resetAllMocks()
        delete process.env['GITHUB_ACTION_PATH']
    })

    it('Should get the list of the locked actions from a given file', async () => {
        const lockedActions = getLockedActions('locked-actions.json');
        expect(fss.readFileSync).toHaveBeenCalledWith("locked-actions.json", "utf8")
        expect(lockedActions[0].name).toEqual("actions/setup-java")
    })

    it('Should get the list of the locked actions from the default file', async () => {
        process.env['GITHUB_ACTION_PATH'] = 'workspace'
        const lockedActions = getLockedActions('');
        expect(fss.readFileSync).toHaveBeenCalledWith(expect.stringContaining('workspace/actions-lock.json'), "utf8")
        expect(lockedActions[0].name).toEqual("actions/setup-java")
    })

    it('Should get the list of the locked actions from the default file when the workspace is not set', async () => {
        const lockedActions = getLockedActions('');
        expect(fss.readFileSync).toHaveBeenCalledWith(expect.stringContaining('actions-lock.json'), "utf8")
        expect(lockedActions[0].name).toEqual("actions/setup-java")
    })
})
