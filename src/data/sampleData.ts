export interface PRItem {
  line: number;
  itemCode: string;
  description: string;
  qty: number;
  uom: string;
  category: string;
}
export interface PurchaseRequisition {
  id: string;
  source: string;
  vessel?: string;
  vehicle?: string;
  requestedDate: string;
  status: string;
  items: PRItem[];
}
export interface Supplier {
  id: string;
  name: string;
  email: string;
  categories: string[];
  rating: number;
}
export interface RFQLine {
  line: number;
  itemCode: string;
  qty: number;
  uom: string;
  targetSuppliers: string[];
  responses: any[];
}
export interface RFQ {
  id: string;
  prId: string;
  issueDate: string;
  status: string;
  lines: RFQLine[];
}
export interface SupplierLinePrice {
  itemCode: string;
  price: number;
  currency: string;
  leadTimeDays: number;
}
export interface SupplierResponse {
  rfqId: string;
  supplierId: string;
  submittedAt: string;
  attachments: { id: string; name: string }[];
  linePrices: SupplierLinePrice[];
  status?: "Draft" | "Submitted";
}
export interface Category {
  id: string;
  name: string;
  description: string;
}
export interface Item {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  uom: string;
}

export const purchaseRequisitions: PurchaseRequisition[] = [
  {
    id: "PR-2025-0001",
    source: "Navision",
    vessel: "AMA Victory",
    requestedDate: "2025-08-01",
    status: "Imported",
    items: [
      {
        line: 1,
        itemCode: "OIL-15W40",
        description: "Engine Oil 15W40",
        qty: 200,
        uom: "L",
        category: "Lubricants",
      },
      {
        line: 2,
        itemCode: "FILTER-ENG",
        description: "Engine Filter",
        qty: 10,
        uom: "pcs",
        category: "Filters",
      },
    ],
  },
  {
    id: "PR-2025-0002",
    source: "Manual",
    vehicle: "Truck-12",
    requestedDate: "2025-08-02",
    status: "RFQ Generated",
    items: [
      {
        line: 1,
        itemCode: "TIRE-22",
        description: 'Truck Tire 22"',
        qty: 8,
        uom: "pcs",
        category: "Tyres",
      },
    ],
  },
];

export const suppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Blue Ocean Supplies",
    email: "quote@blueocean.com",
    categories: ["Lubricants", "Filters"],
    rating: 4.6,
  },
  {
    id: "SUP-002",
    name: "EngineParts Co",
    email: "sales@engineparts.co",
    categories: ["Filters"],
    rating: 4.2,
  },
  {
    id: "SUP-003",
    name: "Fleet Tires Ltd",
    email: "sales@fleettires.com",
    categories: ["Tyres"],
    rating: 4.0,
  },
];

export const rfqs: RFQ[] = [
  {
    id: "RFQ-2025-0101",
    prId: "PR-2025-0001",
    issueDate: "2025-08-03",
    status: "Draft",
    lines: [
      {
        line: 1,
        itemCode: "OIL-15W40",
        qty: 200,
        uom: "L",
        targetSuppliers: ["SUP-001", "SUP-002"],
        responses: [],
      },
      {
        line: 2,
        itemCode: "FILTER-ENG",
        qty: 10,
        uom: "pcs",
        targetSuppliers: ["SUP-001", "SUP-002"],
        responses: [],
      },
    ],
  },
  {
    id: "RFQ-2025-0102",
    prId: "PR-2025-0001",
    issueDate: "2025-08-04",
    status: "Draft",
    lines: [
      {
        line: 1,
        itemCode: "OIL-15W40",
        qty: 100,
        uom: "L",
        targetSuppliers: ["SUP-001", "SUP-002"],
        responses: [],
      },
      {
        line: 2,
        itemCode: "FILTER-ENG",
        qty: 5,
        uom: "pcs",
        targetSuppliers: ["SUP-001", "SUP-002"],
        responses: [],
      },
    ],
  },
  {
    id: "RFQ-2025-0201",
    prId: "PR-2025-0002",
    issueDate: "2025-08-05",
    status: "Draft",
    lines: [
      {
        line: 1,
        itemCode: "TIRE-22",
        qty: 8,
        uom: "pcs",
        targetSuppliers: ["SUP-003"],
        responses: [],
      },
    ],
  },
];

export const supplierResponses: SupplierResponse[] = [
  {
    rfqId: "RFQ-2025-0101",
    supplierId: "SUP-001",
    submittedAt: "2025-08-04T10:15:00Z",
    attachments: [{ id: "ATT-100", name: "BlueOceanQuote.pdf" }],
    linePrices: [
      { itemCode: "OIL-15W40", price: 5.2, currency: "USD", leadTimeDays: 5 },
      { itemCode: "FILTER-ENG", price: 18.5, currency: "USD", leadTimeDays: 7 },
    ],
    status: "Submitted",
  },
  {
    rfqId: "RFQ-2025-0101",
    supplierId: "SUP-002",
    submittedAt: "2025-08-04T11:10:00Z",
    attachments: [{ id: "ATT-101", name: "EnginePartsQuote.pdf" }],
    linePrices: [
      { itemCode: "FILTER-ENG", price: 17.9, currency: "USD", leadTimeDays: 6 },
    ],
    status: "Submitted",
  },
];

export const categories: Category[] = [
  { id: "CAT-01", name: "Lubricants", description: "Oils and lubricants" },
  { id: "CAT-02", name: "Filters", description: "All types of filters" },
  { id: "CAT-03", name: "Tyres", description: "Vehicle tyres" },
];

export const items: Item[] = [
  {
    id: "IT-001",
    code: "OIL-15W40",
    name: "Engine Oil 15W40",
    categoryId: "CAT-01",
    uom: "L",
  },
  {
    id: "IT-002",
    code: "FILTER-ENG",
    name: "Engine Filter",
    categoryId: "CAT-02",
    uom: "pcs",
  },
  {
    id: "IT-003",
    code: "TIRE-22",
    name: 'Truck Tire 22"',
    categoryId: "CAT-03",
    uom: "pcs",
  },
];
