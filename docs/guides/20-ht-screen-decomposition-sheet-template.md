# 20. HT 画面分解シート テンプレート

[Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md) における Layer 2.5（分解レベル）に相当するシート。
**親 Web 画面ごとに 1 枚** 作成し、その Web 画面を何枚の HT 画面に分解するかを決める。

## 使い方

1. 本ファイルを `ht-screen-design-sheets/decomposition/<親Web画面名>.md` にコピー
2. 親 Web 画面の概要設計（画面遷移・業務フロー）を読み、本シートを埋める
3. 「HT 画面への分解」表で N 枚の個別 HT シートに分けることを決める
4. その N 枚分の個別シート (テンプレ 19) をコピーして作業を続ける

---

## 親 Web 画面 (転記元)

| 項目 | 値 |
|---|---|
| Web 画面名 |  |
| Web ルート / ID |  |
| 概要設計ドキュメント参照 | (URL or 章番号) |
| 業務上の役割 | (1-2行) |
| 関連ドメインエンティティ | (主要なものをリスト) |

## STEP 0 判定

Web→HT画面検討チェックリスト設計書 §5.2 の判定区分。

| 区分 | 値 |
|---|---|
| HT化区分 | A / B / C / D |
| 判定根拠 |  |

> D（HT化しない）と判定したらここで作業終了。シートは保存して記録に残す。

## 業務フロー（Web画面内の操作シーケンス）

Web 画面内でユーザが行う操作を順序付きで洗い出す。

1.
2.
3.

## HT 画面への分解

上記フローを HT 画面に分解する。1 行 = 1 HT 画面。

| # | HT 画面ファイル名 | 役割 | 主たる入力 | 確定操作 |
|---|---|---|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |

## HT 画面間の遷移

(矢印付きの簡易フロー or 文章。ASCII 図でも可)

```
[HT画面1] → [HT画面2] → [HT画面3] → 完了
              ↑         ↓
              └── エラー戻り
```

## 個別シートへのリンク

(分解後、テンプレ 19 をコピーして作成する個別シートへのリンクを置く)

- [shipping-pick-instruction.md](../shipping-pick-instruction.md)
- [shipping-pick-scan.md](../shipping-pick-scan.md)
- [shipping-pick-confirm.md](../shipping-pick-confirm.md)

---

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](18-ht-common-design-guideline.md)
- [画面設計シート テンプレート](19-ht-screen-design-sheet-template.md)
- [画面設計シート 保存ディレクトリ](ht-screen-design-sheets/README.md)
