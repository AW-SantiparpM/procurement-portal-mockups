import React, { useState } from "react";
import { suppliers as supplierSeed, Supplier } from "../data/sampleData";

const Suppliers: React.FC = () => {
  const [list, setList] = useState<Supplier[]>(supplierSeed);
  const [filter, setFilter] = useState<string>("");
  const filtered = list.filter((s) =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">
          Add Supplier
        </button>
      </header>
      <div className="flex gap-2">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter..."
          className="px-2 py-1 border rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-sm"
        />
        <button className="px-3 py-1.5 text-xs rounded bg-gray-200 dark:bg-gray-700">
          Export
        </button>
        <button className="px-3 py-1.5 text-xs rounded bg-gray-200 dark:bg-gray-700">
          Import
        </button>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-3 py-2">ID</th>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Email</th>
              <th className="text-left px-3 py-2">Categories</th>
              <th className="text-left px-3 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-3 py-2 font-medium">{s.id}</td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2">{s.email}</td>
                <td className="px-3 py-2 text-xs">{s.categories.join(", ")}</td>
                <td className="px-3 py-2">{s.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
