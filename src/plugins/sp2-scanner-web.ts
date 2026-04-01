import { WebPlugin } from '@capacitor/core';
import type { SP2ScannerPlugin } from './sp2-scanner';
import type { ScannerStatus } from '@/types';

// モックスキャンで返すサンプルデータ
const mockScanValues = [
  'ITEM-001', 'ITEM-002', 'ITEM-003', 'ITEM-004',
  'ITEM-005', 'ITEM-006', 'ITEM-007', 'ITEM-008',
  'ITEM-009', 'ITEM-010', 'ITEM-011', 'ITEM-012',
  'A-01-01', 'A-01-02', 'A-02-01', 'B-01-01',
  'C-01-01', 'D-01-01', 'LOT-2026-001', 'LOT-2026-002',
  'SHIP-0001', 'SHIP-0002', 'SHIP-0003',
];
let mockIndex = 0;

export class SP2ScannerWeb extends WebPlugin implements SP2ScannerPlugin {
  async initialize(): Promise<{ success: boolean }> {
    console.log('[SP2Scanner Web Mock] initialize');
    return { success: true };
  }

  async startScan(): Promise<void> {
    const value = mockScanValues[mockIndex % mockScanValues.length];
    mockIndex++;
    console.log(`[SP2Scanner Web Mock] startScan - will return: ${value}`);
    setTimeout(() => {
      this.notifyListeners('scanResult', {
        value,
        format: value.startsWith('ITEM') ? 'CODE128' : 'QR_CODE',
      });
    }, 500);
  }

  async stopScan(): Promise<void> {
    console.log('[SP2Scanner Web Mock] stopScan');
  }

  async getStatus(): Promise<{ status: ScannerStatus }> {
    return { status: 'connected' };
  }

  async destroy(): Promise<void> {
    console.log('[SP2Scanner Web Mock] destroy');
  }
}
