import React, { useState } from "react";
import { purchaseRequisitions, PurchaseRequisition } from "../data/sampleData";

const PRImport: React.FC = () => {
  const [format, setFormat] = useState<"Navision" | "Manual">("Navision");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">PR Import</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Import PRs from Navision export or manual Excel.
        </p>
      </header>
      <section className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "Navision" | "Manual")}
            className="border rounded px-2 py-1 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          >
            <option value="Navision">Navision (เรือ)</option>
            <option value="Manual">Manual (รถ)</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
          <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">
            Import
          </button>
          {file && <span className="text-xs text-gray-500">{file.name}</span>}
        </div>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Recently Imported PRs</h2>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="text-left px-3 py-2">PR ID</th>
                <th className="text-left px-3 py-2">Source</th>
                <th className="text-left px-3 py-2">Date</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Items</th>
              </tr>
            </thead>
            <tbody>
              {purchaseRequisitions.map((pr: PurchaseRequisition) => (
                <tr
                  key={pr.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-3 py-2 font-medium text-brand-700">
                    {pr.id}
                  </td>
                  <td className="px-3 py-2">{pr.source}</td>
                  <td className="px-3 py-2">{pr.requestedDate}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-brand-100 text-brand-700 dark:bg-brand-700 dark:text-white">
                      {pr.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">{pr.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PRImport;
