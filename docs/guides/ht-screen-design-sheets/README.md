# HT 画面設計シート 保存ディレクトリ

このディレクトリには、各HT画面について作成した **画面設計シート** を1ファイル1画面で配置する。

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](../18-ht-common-design-guideline.md)
- [画面設計シート テンプレート](../19-ht-screen-design-sheet-template.md)

## 命名規則

`<画面名(kebab-case)>.md`

例:
- `receiving-inspection.md` (入荷検品)
- `shipping-pick.md` (出荷ピッキング)
- `stocktaking.md` (棚卸し)
- `inventory-lookup.md` (在庫照会)
- `relocation.md` (ロケーション移動)

## 新規追加手順

1. [テンプレート](../19-ht-screen-design-sheet-template.md) をコピー
2. 本ディレクトリ配下に上記命名規則で配置
3. STEP 0 判定（A/B/C）を最初に決める
4. 各セクションを埋める。共通ガイドラインと同じ箇所は「ガイド準拠」と書く
5. 画面項目マッピング表（必須）を埋める
6. レビュー → コミット

## 既存シート一覧

(まだ無し。追加されたらここにリストする)
