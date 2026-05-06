import {jest} from '@jest/globals'
import * as core from '../__fixtures__/core.js'

jest.unstable_mockModule('@actions/core', () => core)
const { getInputs } = await import('../src/inputs.js')

describe('inputs.ts', () => {
    beforeEach(() => {
        core.getInput.mockImplementation((key: string) => {
            switch (key) {
                case 'lock-file-location':
                    return "locked-actions.json"
                case 'github-token':
                    return "1234"
            }
            return '';
        })
        core.getBooleanInput.mockImplementation(() => true)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Should get the list of the inputs', async () => {
        const inputs = getInputs();
        expect(core.getInput).toHaveBeenCalledTimes(2)
        expect(core.getBooleanInput).toHaveBeenCalledTimes(1)
        expect(inputs.lockFileLocation).toEqual('locked-actions.json')
        expect(inputs.writeToJobSummary).toBeTruthy()
        expect(inputs.githubToken).toEqual('1234')
    })
})
