<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Input OTP</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>Basic</h2>
      <p>デフォルトは4桁。1文字入力するごとに次のセルへ自動フォーカスが移る。スロットに再送リンクなどを配置可能。</p>
      <ion-input-otp>
        コードが届かない場合は <a href="#">再送する</a>
      </ion-input-otp>

      <h2>Length (桁数)</h2>
      <p>length 属性で桁数を変更。4桁 (デフォルト) と 6桁の比較。SMS認証コードなど用途に応じて設定する。</p>
      <ion-input-otp>4桁 (default)</ion-input-otp>
      <ion-input-otp :length="6">6桁</ion-input-otp>

      <h2>Type (入力種別)</h2>
      <p>type="number" (デフォルト) は数字のみ、type="text" は英数字も受け付ける。</p>
      <ion-input-otp>数字のみ (number)</ion-input-otp>
      <ion-input-otp type="text">英数字 (text)</ion-input-otp>

      <h2>Size (サイズ)</h2>
      <p>size 属性で各セルの大きさを変更。small / medium / large の3段階。</p>
      <ion-input-otp size="small">Small</ion-input-otp>
      <ion-input-otp size="medium">Medium</ion-input-otp>
      <ion-input-otp size="large">Large</ion-input-otp>

      <h2>Disabled / Readonly</h2>
      <p>disabled は入力不可かつグレーアウト、readonly は表示のみで編集不可。</p>
      <ion-input-otp :disabled="true" value="1234">Disabled</ion-input-otp>
      <ion-input-otp :readonly="true" value="1234">Readonly</ion-input-otp>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonInputOtp,
} from '@ionic/vue';
</script>
