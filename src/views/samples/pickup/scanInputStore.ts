import { ref } from 'vue';

export interface ScanItem {
  id: number;
  itemCode: string;
  itemName: string;
  location: string;
  quantity: number;
  lotNumber: string;
  status: 'OK' | 'NG';
  selected: boolean;
  errorCode: string;
  errorMessage: string;
}

export const items = ref<ScanItem[]>([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', location: 'A-01', quantity: 150, lotNumber: 'L2025-001', status: 'OK', selected: false, errorCode: '', errorMessage: '' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', location: 'B-03', quantity: 8, lotNumber: 'L2025-002', status: 'NG', selected: false, errorCode: 'E-1023', errorMessage: '在庫数が安全在庫を下回っています。' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', location: 'C-05', quantity: 45, lotNumber: 'L2025-003', status: 'OK', selected: false, errorCode: '', errorMessage: '' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', location: 'D-02', quantity: 30, lotNumber: 'L2025-004', status: 'OK', selected: false, errorCode: '', errorMessage: '' },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', location: 'A-07', quantity: 200, lotNumber: 'L2025-005', status: 'OK', selected: false, errorCode: '', errorMessage: '' },
]);

export const addItem = (item: Omit<ScanItem, 'id' | 'selected' | 'status' | 'errorCode' | 'errorMessage'>) => {
  const nextId = Math.max(0, ...items.value.map((i) => i.id)) + 1;
  items.value.push({
    id: nextId,
    selected: false,
    status: 'OK',
    errorCode: '',
    errorMessage: '',
    ...item,
  });
};
