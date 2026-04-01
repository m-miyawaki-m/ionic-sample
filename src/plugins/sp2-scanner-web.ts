import { WebPlugin } from '@capacitor/core';
import type { SP2ScannerPlugin } from './sp2-scanner';
import type { ScannerStatus } from '@/types';

export class SP2ScannerWeb extends WebPlugin implements SP2ScannerPlugin {
  async initialize(): Promise<{ success: boolean }> {
    console.log('[SP2Scanner Web Mock] initialize');
    return { success: true };
  }

  async startScan(): Promise<void> {
    console.log('[SP2Scanner Web Mock] startScan - simulating scan...');
    setTimeout(() => {
      this.notifyListeners('scanResult', {
        value: 'MOCK-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        format: 'CODE128',
      });
    }, 1000);
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
