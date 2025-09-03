import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  rfqs,
  supplierResponses,
  SupplierResponse,
} from "../../data/sampleData";

export default function SupplierPortalRFQDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const mySupplierId = "SUP-001";
  const rfq = rfqs.find((r) => r.id === id);
  const existing = supplierResponses.find(
    (r) => r.rfqId === id && r.supplierId === mySupplierId
  );
  const [draft, setDraft] = useState<SupplierResponse>(
    existing || {
      rfqId: id!,
      supplierId: mySupplierId,
      submittedAt: "",
      attachments: [],
      linePrices: rfq
        ? rfq.lines.map((l) => ({
            itemCode: l.itemCode,
            price: 0,
            currency: "USD",
            leadTimeDays: 0,
          }))
        : [],
      status: "Draft",
    }
  );
  if (!rfq) return <div>RFQ not found</div>;
  const updateLine = (
    code: string,
    field: "price" | "leadTimeDays",
    value: number
  ) => {
    setDraft((d) => ({
      ...d,
      linePrices: d.linePrices.map((lp) =>
        lp.itemCode === code ? { ...lp, [field]: value } : lp
      ),
    }));
  };
  const saveDraft = () => {
    alert("Draft saved locally (mock).");
  };
  const submit = () => {
    setDraft((d) => ({
      ...d,
      status: "Submitted",
      submittedAt: new Date().toISOString(),
    }));
    alert("Submitted (mock).");
    nav("/portal/rfqs");
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{rfq.id}</h1>
        <Link to="/portal/rfqs" className="text-sm text-brand-600">
          &larr; Back
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-500">PR</div>
          <div className="font-medium">{rfq.prId}</div>
        </div>
        <div>
          <div className="text-gray-500">Issue Date</div>
          <div>{rfq.issueDate}</div>
        </div>
        <div>
          <div className="text-gray-500">Status</div>
          <div>{rfq.status}</div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="space-y-4"
      >
        <table className="w-full text-sm border divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-2 py-1 text-left">Item</th>
              <th className="px-2 py-1 text-right">Qty</th>
              <th className="px-2 py-1 text-right">Unit Price</th>
              <th className="px-2 py-1 text-right">Lead Time (days)</th>
            </tr>
          </thead>
          <tbody>
            {rfq.lines.map((l) => {
              const lp = draft.linePrices.find(
                (x) => x.itemCode === l.itemCode
              )!;
              return (
                <tr
                  key={l.line}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
                >
                  <td className="px-2 py-1">{l.itemCode}</td>
                  <td className="px-2 py-1 text-right">
                    {l.qty} {l.uom}
                  </td>
                  <td className="px-2 py-1 text-right">
                    <input
                      type="number"
                      className="w-28 text-right bg-white dark:bg-gray-900 border rounded px-1 py-0.5"
                      value={lp.price}
                      onChange={(e) =>
                        updateLine(
                          l.itemCode,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td className="px-2 py-1 text-right">
                    <input
                      type="number"
                      className="w-24 text-right bg-white dark:bg-gray-900 border rounded px-1 py-0.5"
                      value={lp.leadTimeDays}
                      onChange={(e) =>
                        updateLine(
                          l.itemCode,
                          "leadTimeDays",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={saveDraft}
            className="px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-brand-600 hover:bg-brand-700 text-white text-sm"
          >
            Submit Quote
          </button>
        </div>
      </form>
    </div>
  );
}
