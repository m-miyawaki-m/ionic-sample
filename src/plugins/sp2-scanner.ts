import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';
import type { ScanResult, ScannerStatus } from '@/types';

export interface SP2ScannerPlugin {
  /** SDK初期化・スキャナ接続 */
  initialize(): Promise<{ success: boolean }>;

  /** スキャン開始（1回読み取り） */
  startScan(): Promise<void>;

  /** スキャン停止 */
  stopScan(): Promise<void>;

  /** スキャナの接続状態を取得 */
  getStatus(): Promise<{ status: ScannerStatus }>;

  /** SDK解放・切断 */
  destroy(): Promise<void>;

  /** スキャン結果イベントリスナー */
  addListener(
    eventName: 'scanResult',
    listenerFunc: (result: ScanResult) => void,
  ): Promise<PluginListenerHandle>;

  /** 全リスナー削除 */
  removeAllListeners(): Promise<void>;
}

/**
 * SP2Scanner プラグイン
 *
 * ネイティブ側: android/app/src/main/java/.../sp2/SP2Plugin.java
 * Web側ではモック動作（開発・テスト用）
 */
export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
