import {SummaryTableRow} from "@actions/core/lib/summary.js";
import * as core from "@actions/core";
import {ActionRefReport} from "./lockedActionInformation.js";

export async function summary(actionRefReports: ActionRefReport []) {
    const headers = [
        {data: "name", header: true},
        {data: "ref", header: true},
        {data: "expectedSHA", header: true},
        {data: "actualSHA", header: true},
        {data: "Matched", header: true}]
    const table = [headers] as SummaryTableRow[]

    for (const reportElement of actionRefReports) {
        const row = [reportElement.name,
            reportElement.ref,
            reportElement.expectedSHA,
            reportElement.actualSHA,
            `${reportElement.match}`]
        table.push(row)
    }
    await core.summary
        .addHeading("Summary")
        .addTable(table)
        .write()
}