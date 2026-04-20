import {SummaryTableRow} from "@actions/core/lib/summary.js";
import * as core from "@actions/core";
import {ActionRefReport} from "./lockedActionInformation.js";

export async function summary(actionRefReports: ActionRefReport []) {
    const headers = [
        {data: "name", header: true},
        {data: "ref", header: true},
        {data: "expectedSHA", header: true},
        {data: "actualSHA", header: true}]
    const table = [headers] as SummaryTableRow[]

    for (const reportElement of actionRefReports) {
        const icone = reportElement.match ? '✅' : '❌'
        const row = [
            `<a href="https://github.com/${reportElement.name}">${reportElement.name}</a>`,
            `<a href="https://github.com/${reportElement.name}/tree/${reportElement.ref}">${icone} ${reportElement.ref}</a>`,
            `<code>${reportElement.expectedSHA}</code>`,
            `<code>${reportElement.actualSHA}</code>`]
        table.push(row)
    }
    await core.summary
        .addHeading("Summary")
        .addTable(table)
        .write()
}