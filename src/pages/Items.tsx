import React from "react";
import { items, categories, Item, Category } from "../data/sampleData";

const ItemsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Items</h1>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">
          Add Item
        </button>
      </header>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-3 py-2">Code</th>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Category</th>
              <th className="text-left px-3 py-2">UOM</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr
                key={i.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-3 py-2 font-medium">{i.code}</td>
                <td className="px-3 py-2">{i.name}</td>
                <td className="px-3 py-2">
                  {categories.find((c) => c.id === i.categoryId)?.name}
                </td>
                <td className="px-3 py-2">{i.uom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsPage;
