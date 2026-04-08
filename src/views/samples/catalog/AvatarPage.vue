<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Avatar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-avatar は丸く切り抜いたプロフィール画像を表示する。img タグを内側に置く。</p>
      <div class="ion-padding" style="display:flex; gap:16px; align-items:center;">
        <ion-avatar>
          <img src="https://i.pravatar.cc/100?img=1" alt="avatar 1" />
        </ion-avatar>
        <ion-avatar>
          <img src="https://i.pravatar.cc/100?img=2" alt="avatar 2" />
        </ion-avatar>
        <ion-avatar>
          <img src="https://i.pravatar.cc/100?img=3" alt="avatar 3" />
        </ion-avatar>
      </div>

      <h2 class="ion-padding">In list item</h2>
      <p class="ion-padding-horizontal">ion-item の start スロットに置くとリスト内のアバターとして機能する。</p>
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <img src="https://i.pravatar.cc/100?img=10" alt="user 1" />
          </ion-avatar>
          <ion-label>
            <h2>山田 太郎</h2>
            <p>倉庫担当</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img src="https://i.pravatar.cc/100?img=20" alt="user 2" />
          </ion-avatar>
          <ion-label>
            <h2>佐藤 花子</h2>
            <p>管理者</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img src="https://i.pravatar.cc/100?img=30" alt="user 3" />
          </ion-avatar>
          <ion-label>
            <h2>鈴木 一郎</h2>
            <p>出荷担当</p>
          </ion-label>
          <ion-badge slot="end" color="danger">3</ion-badge>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">In chip</h2>
      <p class="ion-padding-horizontal">ion-chip 内に入れてアバター付きチップを作れる。</p>
      <div class="ion-padding" style="display:flex; gap:8px; flex-wrap:wrap;">
        <ion-chip>
          <ion-avatar>
            <img src="https://i.pravatar.cc/40?img=5" alt="chip avatar" />
          </ion-avatar>
          <ion-label>田中 誠</ion-label>
        </ion-chip>
        <ion-chip color="primary">
          <ion-avatar>
            <img src="https://i.pravatar.cc/40?img=6" alt="chip avatar 2" />
          </ion-avatar>
          <ion-label>中村 あい</ion-label>
        </ion-chip>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonAvatar, IonList, IonItem, IonLabel, IonBadge, IonChip,
} from '@ionic/vue';
</script>
