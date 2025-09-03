import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appName: "Procurement Portal",
      navigation: {
        dashboard: "Dashboard",
        prImport: "PR Import",
        rfq: "RFQs",
        supplierResponses: "Supplier Responses",
        priceComparison: "Price Comparison",
        masterData: "Master Data",
        suppliers: "Suppliers",
        items: "Items",
        categories: "Categories",
      },
      actions: {
        import: "Import",
        upload: "Upload",
        generate: "Generate",
        send: "Send",
        view: "View",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        confirm: "Confirm",
        compare: "Compare",
        select: "Select Supplier",
      },
    },
  },
  th: {
    translation: {
      appName: "พอร์ทัลจัดซื้อ",
      navigation: {
        dashboard: "แดชบอร์ด",
        prImport: "นำเข้า PR",
        rfq: "ขอใบเสนอราคา",
        supplierResponses: "การตอบกลับ",
        priceComparison: "เปรียบเทียบราคา",
        masterData: "ข้อมูลหลัก",
        suppliers: "ซัพพลายเออร์",
        items: "สินค้า",
        categories: "หมวดหมู่",
      },
      actions: {
        import: "นำเข้า",
        upload: "อัปโหลด",
        generate: "สร้าง",
        send: "ส่ง",
        view: "ดู",
        edit: "แก้ไข",
        delete: "ลบ",
        save: "บันทึก",
        cancel: "ยกเลิก",
        confirm: "ยืนยัน",
        compare: "เปรียบเทียบ",
        select: "เลือกซัพพลายเออร์",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
