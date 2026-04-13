import { reactive, computed } from 'vue';
import type { ShippingRecordItem, ShippingRecordForm, ShippingRecordType } from '@/types';

const toLocalDatetime = (d: Date) => {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${mo}-${da}T${h}:${mi}`;
};

// ── モジュールレベル singleton（両画面で共有） ──
const form = reactive<ShippingRecordForm>({
  recordNumber: '',
  recordType: 'typeA',
  registeredAt: toLocalDatetime(new Date()),
  category: '',
  memo1: '',
  memo2: '',
});

const items = reactive<ShippingRecordItem[]>([]);
let nextId = 1;

// ── モック用スキャンデータ ──
const mockDataByType: Record<ShippingRecordType, Omit<ShippingRecordItem, 'id' | 'type' | 'scannedAt' | 'storageLoc' | 'remarks' | 'manualInputComplete'>[]> = {
  typeA: [
    { itemCode: 'A-001', quantity: 10, lotNumber: 'LA-2026-01' },
    { itemCode: 'A-002', quantity: 20, lotNumber: 'LA-2026-02' },
    { itemCode: 'A-003', quantity: 5,  lotNumber: 'LA-2026-03' },
  ],
  typeB: [
    { itemCode: 'B-001', quantity: 15, lotNumber: 'LB-2026-01' },
    { itemCode: 'B-002', quantity: 8,  lotNumber: 'LB-2026-02' },
    { itemCode: 'B-003', quantity: 30, lotNumber: 'LB-2026-03' },
  ],
  typeC: [
    { itemCode: 'C-001', quantity: 12, lotNumber: 'LC-2026-01' },
    { itemCode: 'C-002', quantity: 25, lotNumber: 'LC-2026-02' },
    { itemCode: 'C-003', quantity: 3,  lotNumber: 'LC-2026-03' },
  ],
};
const mockIndex: Record<ShippingRecordType, number> = { typeA: 0, typeB: 0, typeC: 0 };

export function useShippingRecordStore() {
  const filteredItems = computed(() =>
    items.filter((item) => item.type === form.recordType),
  );

  const filteredCount = computed(() => filteredItems.value.length);

  const totalCount = computed(() => items.length);

  const formatTime = (d: Date) => {
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const addScannedItem = () => {
    const type = form.recordType;
    const mockList = mockDataByType[type];
    const idx = mockIndex[type] % mockList.length;
    mockIndex[type]++;
    const mock = mockList[idx];

    // 奇数IDのアイテムは手入力が必要（デモ用）
    const needsManualInput = nextId % 2 === 1;

    items.unshift({
      ...mock,
      id: nextId++,
      type,
      storageLoc: needsManualInput ? '' : 'WH01-A01',
      remarks: needsManualInput ? '' : '自動入力済',
      manualInputComplete: !needsManualInput,
      scannedAt: formatTime(new Date()),
    });
  };

  const getItemById = (id: number) => items.find((item) => item.id === id);

  const updateItem = (id: number, updates: Partial<Pick<ShippingRecordItem, 'storageLoc' | 'remarks'>>) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (updates.storageLoc !== undefined) item.storageLoc = updates.storageLoc;
    if (updates.remarks !== undefined) item.remarks = updates.remarks;
    item.manualInputComplete = item.storageLoc !== '' && item.remarks !== '';
  };

  const removeItem = (id: number) => {
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) items.splice(idx, 1);
  };

  const clearAll = () => {
    items.splice(0, items.length);
    nextId = 1;
    mockIndex.typeA = 0;
    mockIndex.typeB = 0;
    mockIndex.typeC = 0;
  };

  const getUnfilledFields = (item: ShippingRecordItem): string[] => {
    const fields: string[] = [];
    if (!item.storageLoc) fields.push('保管場所');
    if (!item.remarks) fields.push('備考');
    return fields;
  };

  return {
    form,
    items,
    filteredItems,
    filteredCount,
    totalCount,
    addScannedItem,
    getItemById,
    updateItem,
    removeItem,
    clearAll,
    getUnfilledFields,
  };
}
