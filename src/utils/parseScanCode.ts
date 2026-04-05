import type { ParsedScanCode } from '@/types';

/**
 * バーコード値をハイフン区切りで分解する
 * 例: "WH01-A03-02-ITEM9876" → { warehouseCode: "WH01", shelfCode: "A03-02", itemCode: "ITEM9876", raw: "..." }
 */
export function parseScanCode(raw: string): ParsedScanCode {
  const parts = raw.split('-');
  if (parts.length >= 4) {
    return {
      warehouseCode: parts[0],
      shelfCode: parts[1] + '-' + parts[2],
      itemCode: parts.slice(3).join('-'),
      raw,
    };
  }
  // パースできない場合はそのまま返す
  return {
    warehouseCode: '',
    shelfCode: '',
    itemCode: raw,
    raw,
  };
}
