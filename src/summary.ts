import {SummaryTableRow} from "@actions/core/lib/summary.js";
import * as core from "@actions/core";
import {ActionRefReport, Summary, SummaryOptions} from "./types.js";

export async function summary(actionRefReports: ActionRefReport [], summaryOptions: SummaryOptions): Promise<Summary> {
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
    const summary = core.summary
        .addHeading("Summary")
        .addTable(table)
    if (summaryOptions.writeToJobSummary) {
        ;(await summary
            .write())
            .stringify()
    }
    const json = JSON.stringify(actionRefReports)
    const markdown = summary.stringify()
    return {json, markdown}
}