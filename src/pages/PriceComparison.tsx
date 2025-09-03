import React from "react";
import { supplierResponses, SupplierResponse } from "../data/sampleData";

const PriceComparison: React.FC = () => {
  const items = Array.from(
    new Set(
      supplierResponses.flatMap((r) => r.linePrices.map((lp) => lp.itemCode))
    )
  );
  const supplierIds = Array.from(
    new Set(supplierResponses.map((r) => r.supplierId))
  );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Price Comparison</h1>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left px-2 py-1">Item</th>
                {supplierIds.map((s) => (
                  <th key={s} className="text-left px-2 py-1">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-2 py-1 font-medium">{item}</td>
                  {supplierIds.map((s) => {
                    const price = supplierResponses
                      .find((r) => r.supplierId === s)
                      ?.linePrices.find((lp) => lp.itemCode === item);
                    return (
                      <td key={s} className="px-2 py-1">
                        {price ? `${price.price} ${price.currency}` : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-3 py-1.5 text-xs rounded bg-gray-200 dark:bg-gray-700">
            Download
          </button>
          <button className="px-3 py-1.5 text-xs rounded bg-brand-600 text-white">
            Print
          </button>
          <button className="px-3 py-1.5 text-xs rounded bg-emerald-600 text-white">
            Select Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceComparison;
