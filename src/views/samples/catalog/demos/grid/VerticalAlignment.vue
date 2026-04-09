<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Grid / Vertical Alignment</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">垂直方向の整列を変更するグリッドレイアウトの例。</p>
      <b>Columns aligned at the top</b>
        <ion-grid>
          <ion-row class="ion-align-items-start">
            <ion-col> 1 </ion-col>
            <ion-col> 2 </ion-col>
            <ion-col> 3 </ion-col>
            <ion-col>
              4 <br />
              # <br />
              # <br />
              # <br />
            </ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Columns aligned at the center</b>
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col> 1 </ion-col>
            <ion-col> 2 </ion-col>
            <ion-col> 3 </ion-col>
            <ion-col>
              4 <br />
              # <br />
              # <br />
              # <br />
            </ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Columns aligned at the bottom</b>
        <ion-grid>
          <ion-row class="ion-align-items-end">
            <ion-col> 1 </ion-col>
            <ion-col> 2 </ion-col>
            <ion-col> 3 </ion-col>
            <ion-col>
              4 <br />
              # <br />
              # <br />
              # <br />
            </ion-col>
          </ion-row>
        </ion-grid>
      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <b>Columns aligned at the top</b>
  <ion-grid>
    <ion-row class="ion-align-items-start">
      <ion-col> 1 </ion-col>
      <ion-col> 2 </ion-col>
      <ion-col> 3 </ion-col>
      <ion-col>
        4 <br />
        # <br />
        # <br />
        # <br />
      </ion-col>
    </ion-row>
  </ion-grid>

  <b>Columns aligned at the center</b>
  <ion-grid>
    <ion-row class="ion-align-items-center">
      <ion-col> 1 </ion-col>
      <ion-col> 2 </ion-col>
      <ion-col> 3 </ion-col>
      <ion-col>
        4 <br />
        # <br />
        # <br />
        # <br />
      </ion-col>
    </ion-row>
  </ion-grid>

  <b>Columns aligned at the bottom</b>
  <ion-grid>
    <ion-row class="ion-align-items-end">
      <ion-col> 1 </ion-col>
      <ion-col> 2 </ion-col>
      <ion-col> 3 </ion-col>
      <ion-col>
        4 <br />
        # <br />
        # <br />
        # <br />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCol, IonGrid, IonRow } from '@ionic/vue';
<\/script>

<style scoped>
  ion-col {
    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
</style>`;

</script>

<style scoped>
  ion-col {
    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
</style>
