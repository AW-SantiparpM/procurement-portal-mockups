import React, { useState } from "react";
import {
  rfqs,
  suppliers,
  purchaseRequisitions,
  RFQ,
  Supplier,
} from "../data/sampleData";

const RFQList: React.FC = () => {
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalRFQ, setModalRFQ] = useState<RFQ | null>(null);

  // Group RFQs by PR
  const prMap: Record<string, RFQ[]> = {};
  rfqs.forEach((rfq) => {
    if (!prMap[rfq.prId]) prMap[rfq.prId] = [];
    prMap[rfq.prId].push(rfq);
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">RFQs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Auto-generated from imported PRs for supplier quotation.
          </p>
        </div>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">
          Generate RFQ from PRs
        </button>
      </header>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          {Object.entries(prMap).map(([prId, rfqList]) => (
            <div
              key={prId}
              className="border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="px-3 py-2 font-semibold text-brand-700 border-b border-gray-100 dark:border-gray-700">
                PR: {prId}
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {rfqList.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRFQ(r)}
                    className={`p-3 cursor-pointer text-sm ${
                      selectedRFQ?.id === r.id
                        ? "bg-brand-50 dark:bg-brand-900/30"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-medium">{r.id}</div>
                    <div className="text-xs text-gray-500">
                      Issued: {r.issueDate}
                    </div>
                    <div className="text-xs">Status: {r.status}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          {selectedRFQ ? (
            <RFQDetail
              rfq={selectedRFQ}
              onSend={() => {
                setModalRFQ(selectedRFQ);
                setShowModal(true);
              }}
            />
          ) : (
            <div className="p-4 text-sm text-gray-500 border border-dashed rounded-lg">
              Select an RFQ to view details.
            </div>
          )}
        </div>
      </div>
      {showModal && modalRFQ && (
        <SendModal rfq={modalRFQ} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default RFQList;

interface RFQDetailProps {
  rfq: RFQ;
  onSend: () => void;
}
const RFQDetail: React.FC<RFQDetailProps> = ({ rfq, onSend }) => {
  // Check all lines have same suppliers
  const supplierSet =
    rfq.lines.length > 0 ? rfq.lines[0].targetSuppliers.join(",") : "";
  const allSame = rfq.lines.every(
    (l) => l.targetSuppliers.join(",") === supplierSet
  );
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{rfq.id}</h2>
          <p className="text-xs text-gray-500">Issued {rfq.issueDate}</p>
        </div>
        <button
          className="px-3 py-1.5 text-xs rounded bg-brand-600 text-white hover:bg-brand-700"
          onClick={onSend}
          disabled={!allSame}
          title={
            !allSame ? "All RFQ lines must have same suppliers" : undefined
          }
        >
          Send to Suppliers
        </button>
      </div>
      {!allSame && (
        <div className="text-xs text-red-500">
          All RFQ lines must have the same suppliers to send.
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left px-2 py-1">Line</th>
              <th className="text-left px-2 py-1">Item</th>
              <th className="text-left px-2 py-1">Qty</th>
              <th className="text-left px-2 py-1">Suppliers</th>
            </tr>
          </thead>
          <tbody>
            {rfq.lines.map((l) => (
              <tr
                key={l.line}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-2 py-1">{l.line}</td>
                <td className="px-2 py-1">{l.itemCode}</td>
                <td className="px-2 py-1">
                  {l.qty} {l.uom}
                </td>
                <td className="px-2 py-1">
                  {l.targetSuppliers
                    .map((id) => suppliers.find((s) => s.id === id)?.name)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Modal for sending RFQ
const SendModal: React.FC<{ rfq: RFQ; onClose: () => void }> = ({
  rfq,
  onClose,
}) => {
  const supplierNames = rfq.lines[0]?.targetSuppliers
    .map((id) => suppliers.find((s) => s.id === id)?.name)
    .join(", ");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Send RFQ to Suppliers</h3>
        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          You are about to send <span className="font-bold">{rfq.id}</span> for
          PR <span className="font-bold">{rfq.prId}</span> to suppliers:{" "}
          <span className="font-bold">{supplierNames}</span>.
        </div>
        <div className="mb-4">
          <table className="min-w-full text-xs mb-2">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left px-2 py-1">Line</th>
                <th className="text-left px-2 py-1">Item</th>
                <th className="text-left px-2 py-1">Qty</th>
                <th className="text-left px-2 py-1">UOM</th>
              </tr>
            </thead>
            <tbody>
              {rfq.lines.map((l) => (
                <tr
                  key={l.line}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-2 py-1">{l.line}</td>
                  <td className="px-2 py-1">{l.itemCode}</td>
                  <td className="px-2 py-1">{l.qty}</td>
                  <td className="px-2 py-1">{l.uom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">
            Message to Suppliers
          </label>
          <textarea
            className="w-full border rounded px-2 py-1 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm"
            rows={3}
            defaultValue={`Dear Supplier,\nPlease provide your quotation for the following items.`}
          ></textarea>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-brand-600 text-white hover:bg-brand-700">
            Send RFQ
          </button>
        </div>
      </div>
    </div>
  );
};
