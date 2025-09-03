import React from "react";
import { rfqs, suppliers, supplierResponses } from "../../data/sampleData";
import { Link } from "react-router-dom";

export default function SupplierPortalRFQs() {
  const mySupplierId = "SUP-001"; // mock logged in supplier
  const myRFQs = rfqs.filter((r) =>
    r.lines.some((l) => l.targetSuppliers.includes(mySupplierId))
  );
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My RFQs</h1>
      <table className="w-full text-sm border divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-2 py-1 text-left">RFQ</th>
            <th className="px-2 py-1 text-left">PR</th>
            <th className="px-2 py-1">Lines</th>
            <th className="px-2 py-1">Status</th>
            <th className="px-2 py-1">Your Response</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myRFQs.map((r) => {
            const resp = supplierResponses.find(
              (s) => s.rfqId === r.id && s.supplierId === mySupplierId
            );
            return (
              <tr
                key={r.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                <td className="px-2 py-1 font-medium">{r.id}</td>
                <td className="px-2 py-1">{r.prId}</td>
                <td className="px-2 py-1 text-center">{r.lines.length}</td>
                <td className="px-2 py-1 text-center">{r.status}</td>
                <td className="px-2 py-1 text-center">
                  {resp ? resp.status || "Submitted" : "—"}
                </td>
                <td className="px-2 py-1 text-right">
                  <Link
                    to={`/portal/rfqs/${r.id}`}
                    className="text-brand-600 hover:underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-xs text-gray-500">
        Mock supplier view for SUP-001. Role switching sets portal navigation.
      </p>
    </div>
  );
}
