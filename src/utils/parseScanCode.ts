import type { ParsedScanCode } from '@/types';

/** 分解パターンの定義 */
export interface ParsePattern {
  id: string;
  label: string;
  description: string;
  example: string;
}

export const parsePatterns: ParsePattern[] = [
  {
    id: 'warehouse-shelf-item',
    label: '倉庫-棚-品目',
    description: 'ハイフン区切り 4部位以上',
    example: 'WH01-A03-02-ITEM9876',
  },
  {
    id: 'shelf-item',
    label: '棚-品目',
    description: 'ハイフン区切り 3部位',
    example: 'A03-02-ITEM9876',
  },
  {
    id: 'item-only',
    label: '品目コードのみ',
    description: 'バーコード全体を品目コードとして扱う',
    example: 'ITEM9876',
  },
  {
    id: 'csv',
    label: 'カンマ区切り',
    description: '倉庫,棚番,品目コード',
    example: 'WH01,A03-02,ITEM9876',
  },
];

/**
 * バーコード値を指定パターンで分解する
 */
export function parseScanCode(raw: string, patternId = 'warehouse-shelf-item'): ParsedScanCode {
  switch (patternId) {
    case 'warehouse-shelf-item': {
      const parts = raw.split('-');
      if (parts.length >= 4) {
        return {
          warehouseCode: parts[0],
          shelfCode: parts[1] + '-' + parts[2],
          itemCode: parts.slice(3).join('-'),
          raw,
        };
      }
      return { warehouseCode: '', shelfCode: '', itemCode: raw, raw };
    }

    case 'shelf-item': {
      const parts = raw.split('-');
      if (parts.length >= 3) {
        return {
          warehouseCode: '',
          shelfCode: parts[0] + '-' + parts[1],
          itemCode: parts.slice(2).join('-'),
          raw,
        };
      }
      return { warehouseCode: '', shelfCode: '', itemCode: raw, raw };
    }

    case 'item-only': {
      return { warehouseCode: '', shelfCode: '', itemCode: raw, raw };
    }

    case 'csv': {
      const parts = raw.split(',');
      return {
        warehouseCode: parts[0]?.trim() ?? '',
        shelfCode: parts[1]?.trim() ?? '',
        itemCode: parts.slice(2).join(',').trim() || raw,
        raw,
      };
    }

    default:
      return { warehouseCode: '', shelfCode: '', itemCode: raw, raw };
  }
}
