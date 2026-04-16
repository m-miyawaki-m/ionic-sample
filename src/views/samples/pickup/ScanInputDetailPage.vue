<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pattern/scan-input" />
        </ion-buttons>
        <ion-title>登録詳細</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-list-header>
          <ion-label>基本情報</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-input label="品目コード" label-placement="stacked" v-model="form.itemCode" />
        </ion-item>
        <ion-item>
          <ion-input label="品目名" label-placement="stacked" v-model="form.itemName" />
        </ion-item>
        <ion-item>
          <ion-input label="数量" label-placement="stacked" type="number" v-model="form.quantity" />
        </ion-item>
        <ion-item>
          <ion-input label="ロット番号" label-placement="stacked" v-model="form.lotNumber" />
        </ion-item>

        <ion-item>
          <ion-select label="ロケーション" label-placement="stacked" v-model="form.location" interface="popover">
            <ion-select-option value="A-01">A-01</ion-select-option>
            <ion-select-option value="A-07">A-07</ion-select-option>
            <ion-select-option value="B-03">B-03</ion-select-option>
            <ion-select-option value="C-05">C-05</ion-select-option>
            <ion-select-option value="D-02">D-02</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-grid class="ion-no-padding">
          <ion-row>
            <ion-col size="6">
              <ion-item>
                <ion-input label="開始日" label-placement="stacked" :value="form.startDate" readonly id="start-date-trigger" />
              </ion-item>
              <ion-popover trigger="start-date-trigger" :keep-contents-mounted="true">
                <ion-datetime
                  presentation="date"
                  v-model="form.startDate"
                  show-default-buttons
                />
              </ion-popover>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-input label="終了日" label-placement="stacked" :value="form.endDate" readonly id="end-date-trigger" />
              </ion-item>
              <ion-popover trigger="end-date-trigger" :keep-contents-mounted="true">
                <ion-datetime
                  presentation="date"
                  v-model="form.endDate"
                  show-default-buttons
                />
              </ion-popover>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-list-header>
          <ion-label>ステータス</ion-label>
        </ion-list-header>
        <ion-radio-group v-model="form.status">
          <ion-item>
            <ion-radio value="OK">OK</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="NG">NG</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="HOLD">保留</ion-radio>
          </ion-item>
        </ion-radio-group>

        <ion-list-header>
          <ion-label>オプション</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-checkbox v-model="form.options.urgent">緊急対応</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox v-model="form.options.fragile">取扱注意</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox v-model="form.options.coolKeep">冷蔵保管</ion-checkbox>
        </ion-item>

        <ion-list-header>
          <ion-label>操作不可項目（参照）</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-input label="登録ID" label-placement="stacked" value="REG-20260417-001" :disabled="true" />
        </ion-item>
        <ion-item>
          <ion-input label="登録日時" label-placement="stacked" value="2026-04-17 09:30" readonly />
        </ion-item>
        <ion-item>
          <ion-select label="区分" label-placement="stacked" value="入荷" :disabled="true">
            <ion-select-option value="入荷">入荷</ion-select-option>
            <ion-select-option value="出荷">出荷</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-radio-group value="approved">
          <ion-item>
            <ion-radio value="approved" :disabled="true">承認済</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="pending" :disabled="true">承認待ち</ion-radio>
          </ion-item>
        </ion-radio-group>
        <ion-item>
          <ion-checkbox :checked="true" :disabled="true">出荷確定</ion-checkbox>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="outline" color="primary">更新</ion-button>
          <ion-button fill="outline" color="medium">リセット</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="outline" color="medium" :disabled="true">承認</ion-button>
          <ion-button fill="clear" color="danger">削除</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton,
  IonContent, IonFooter, IonList, IonListHeader, IonItem, IonLabel, IonInput,
  IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonCheckbox,
  IonDatetime, IonPopover, IonGrid, IonRow, IonCol,
} from '@ionic/vue';

const form = reactive({
  itemCode: 'BP-001',
  itemName: 'ボールペン（黒）',
  quantity: 150,
  lotNumber: 'L2025-001',
  location: 'A-01',
  startDate: '2026-04-01',
  endDate: '2026-04-17',
  status: 'OK',
  options: { urgent: false, fragile: false, coolKeep: false },
});
</script>
