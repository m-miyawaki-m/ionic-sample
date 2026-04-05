/** スキャン結果 */
export interface ScanResult {
  /** 読み取った値（バーコード値やQR内容） */
  value: string;
  /** フォーマット（CODE128, QR_CODE, etc.） */
  format: string;
}

/** スキャナの接続状態 */
export type ScannerStatus = 'connected' | 'disconnected' | 'unknown';

/** API レスポンスの共通型 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/** ActionMenuの項目 */
export interface MenuAction {
  label: string;
  action: string;
  icon?: string;
}

/** DataListの行 */
export interface DataListItem {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
}

/** SelectPopupの選択肢 */
export interface SelectOption {
  label: string;
  value: string;
}

/** 入荷検品の暫定項目 */
export interface ReceivingItem {
  location: string;
  itemCode: string;
  quantity: number;
  lotNumber?: string;
}

/** 出荷検品の暫定項目 */
export interface ShippingItem {
  shippingOrderId: string;
  itemCode: string;
  quantity: number;
}

/** 棚卸しの暫定項目 */
export interface StocktakingItem {
  location: string;
  itemCode: string;
  actualQuantity: number;
}

/** 在庫照会の暫定結果 */
export interface InventoryInfo {
  itemCode: string;
  itemName: string;
  location: string;
  quantity: number;
}

/** ロケーション移動の暫定項目 */
export interface RelocationItem {
  fromLocation: string;
  toLocation: string;
  itemCode: string;
  quantity: number;
}

/** バーコード分解結果 */
export interface ParsedScanCode {
  warehouseCode: string;
  shelfCode: string;
  itemCode: string;
  raw: string;
}
