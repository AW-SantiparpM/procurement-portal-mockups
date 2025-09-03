import React, { useState } from "react";
import {
  supplierResponses,
  suppliers,
  SupplierResponse,
  Supplier,
} from "../data/sampleData";

const SupplierResponsesPage: React.FC = () => {
  const [selected, setSelected] = useState<SupplierResponse | null>(null);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Supplier Responses</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-1">
          {supplierResponses.map((r) => (
            <div
              key={r.supplierId}
              onClick={() => setSelected(r)}
              className={`p-3 rounded-lg border cursor-pointer text-sm ${
                selected?.supplierId === r.supplierId
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-400"
              }`}
            >
              <div className="font-medium">
                {suppliers.find((s) => s.id === r.supplierId)?.name}
              </div>
              <div className="text-xs text-gray-500">RFQ: {r.rfqId}</div>
              <div className="text-xs">Lines: {r.linePrices.length}</div>
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          {selected ? (
            <ResponseDetail response={selected} />
          ) : (
            <div className="p-4 text-sm text-gray-500 border border-dashed rounded-lg">
              Select a response to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierResponsesPage;

const ResponseDetail: React.FC<{ response: SupplierResponse }> = ({
  response,
}) => {
  const supplier = suppliers.find((s) => s.id === response.supplierId);
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{supplier?.name}</h2>
          <p className="text-xs text-gray-500">
            Submitted {new Date(response.submittedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs rounded bg-gray-200 dark:bg-gray-700">
            Download
          </button>
          <button className="px-3 py-1.5 text-xs rounded bg-brand-600 text-white">
            Print
          </button>
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left px-2 py-1">Item</th>
              <th className="text-left px-2 py-1">Price</th>
              <th className="text-left px-2 py-1">Currency</th>
              <th className="text-left px-2 py-1">Lead Time (days)</th>
            </tr>
          </thead>
          <tbody>
            {response.linePrices.map((lp) => (
              <tr
                key={lp.itemCode}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-2 py-1">{lp.itemCode}</td>
                <td className="px-2 py-1">{lp.price.toFixed(2)}</td>
                <td className="px-2 py-1">{lp.currency}</td>
                <td className="px-2 py-1">{lp.leadTimeDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
