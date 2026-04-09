<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Item / Content Types Metadata</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">メタデータ（ノート・バッジなど）を含む ion-item のコンテンツタイプの例。</p>
        <ion-list :inset="true">
          <ion-item :button="true">
            <ion-icon color="danger" slot="start" :icon="listCircle" size="large"></ion-icon>
            <ion-label>General</ion-label>
            <ion-note slot="end">6</ion-note>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="tertiary" slot="start" :icon="listCircle" size="large"></ion-icon>
            <ion-label>Shopping</ion-label>
            <ion-note slot="end">15</ion-note>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="success" slot="start" :icon="listCircle" size="large"></ion-icon>
            <ion-label>Cleaning</ion-label>
            <ion-note slot="end">3</ion-note>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="warning" slot="start" :icon="listCircle" size="large"></ion-icon>
            <ion-label>Reminders</ion-label>
            <ion-note slot="end">8</ion-note>
          </ion-item>
        </ion-list>
    
        <ion-list :inset="true">
          <ion-item :button="true" detail="false">
            <div class="unread-indicator-wrapper" slot="start">
              <div class="unread-indicator"></div>
            </div>
            <ion-label>
              <strong>Rick Astley</strong>
              <ion-text>Never Gonna Give You Up</ion-text><br />
              <ion-note color="medium" class="ion-text-wrap">
                Never gonna give you up Never gonna let you down Never gonna run...
              </ion-note>
            </ion-label>
            <div class="metadata-end-wrapper" slot="end">
              <ion-note color="medium">06:11</ion-note>
              <ion-icon color="medium" :icon="chevronForward"></ion-icon>
            </div>
          </ion-item>
          <ion-item :button="true" detail="false">
            <div class="unread-indicator-wrapper" slot="start"></div>
            <ion-label>
              <strong>Ionitron</strong>
              <ion-text>I have become sentient</ion-text><br />
              <ion-note color="medium" class="ion-text-wrap">That is all.</ion-note>
            </ion-label>
            <div class="metadata-end-wrapper" slot="end">
              <ion-note color="medium">03:44</ion-note>
              <ion-icon color="medium" :icon="chevronForward"></ion-icon>
            </div>
          </ion-item>
          <ion-item :button="true" detail="false">
            <div class="unread-indicator-wrapper" slot="start">
              <div class="unread-indicator"></div>
            </div>
            <ion-label>
              <strong>Steam</strong>
              <ion-text>Game Store Sale</ion-text><br />
              <ion-note color="medium" class="ion-text-wrap">
                That game you added to your wish list 2 years ago is now on sale!
              </ion-note>
            </ion-label>
            <div class="metadata-end-wrapper" slot="end">
              <ion-note color="medium">Yesterday</ion-note>
              <ion-icon color="medium" :icon="chevronForward"></ion-icon>
            </div>
          </ion-item>
          <ion-item :button="true" detail="false">
            <div class="unread-indicator-wrapper" slot="start"></div>
            <ion-label>
              <strong>Ionic</strong>
              <ion-text>Announcing Ionic 7.0</ion-text><br />
              <ion-note color="medium" class="ion-text-wrap">This version is one more than Ionic 6!</ion-note>
            </ion-label>
            <div class="metadata-end-wrapper" slot="end">
              <ion-note color="medium">Yesterday</ion-note>
              <ion-icon color="medium" :icon="chevronForward"></ion-icon>
            </div>
          </ion-item>
        </ion-list>
      
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
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { chevronForward, listCircle } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Example</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">
    <ion-list :inset="true">
      <ion-item :button="true">
        <ion-icon color="danger" slot="start" :icon="listCircle" size="large"></ion-icon>
        <ion-label>General</ion-label>
        <ion-note slot="end">6</ion-note>
      </ion-item>
      <ion-item :button="true">
        <ion-icon color="tertiary" slot="start" :icon="listCircle" size="large"></ion-icon>
        <ion-label>Shopping</ion-label>
        <ion-note slot="end">15</ion-note>
      </ion-item>
      <ion-item :button="true">
        <ion-icon color="success" slot="start" :icon="listCircle" size="large"></ion-icon>
        <ion-label>Cleaning</ion-label>
        <ion-note slot="end">3</ion-note>
      </ion-item>
      <ion-item :button="true">
        <ion-icon color="warning" slot="start" :icon="listCircle" size="large"></ion-icon>
        <ion-label>Reminders</ion-label>
        <ion-note slot="end">8</ion-note>
      </ion-item>
    </ion-list>

    <ion-list :inset="true">
      <ion-item :button="true" detail="false">
        <div class="unread-indicator-wrapper" slot="start">
          <div class="unread-indicator"></div>
        </div>
        <ion-label>
          <strong>Rick Astley</strong>
          <ion-text>Never Gonna Give You Up</ion-text><br />
          <ion-note color="medium" class="ion-text-wrap">
            Never gonna give you up Never gonna let you down Never gonna run...
          </ion-note>
        </ion-label>
        <div class="metadata-end-wrapper" slot="end">
          <ion-note color="medium">06:11</ion-note>
          <ion-icon color="medium" :icon="chevronForward"></ion-icon>
        </div>
      </ion-item>
      <ion-item :button="true" detail="false">
        <div class="unread-indicator-wrapper" slot="start"></div>
        <ion-label>
          <strong>Ionitron</strong>
          <ion-text>I have become sentient</ion-text><br />
          <ion-note color="medium" class="ion-text-wrap">That is all.</ion-note>
        </ion-label>
        <div class="metadata-end-wrapper" slot="end">
          <ion-note color="medium">03:44</ion-note>
          <ion-icon color="medium" :icon="chevronForward"></ion-icon>
        </div>
      </ion-item>
      <ion-item :button="true" detail="false">
        <div class="unread-indicator-wrapper" slot="start">
          <div class="unread-indicator"></div>
        </div>
        <ion-label>
          <strong>Steam</strong>
          <ion-text>Game Store Sale</ion-text><br />
          <ion-note color="medium" class="ion-text-wrap">
            That game you added to your wish list 2 years ago is now on sale!
          </ion-note>
        </ion-label>
        <div class="metadata-end-wrapper" slot="end">
          <ion-note color="medium">Yesterday</ion-note>
          <ion-icon color="medium" :icon="chevronForward"></ion-icon>
        </div>
      </ion-item>
      <ion-item :button="true" detail="false">
        <div class="unread-indicator-wrapper" slot="start"></div>
        <ion-label>
          <strong>Ionic</strong>
          <ion-text>Announcing Ionic 7.0</ion-text><br />
          <ion-note color="medium" class="ion-text-wrap">This version is one more than Ionic 6!</ion-note>
        </ion-label>
        <div class="metadata-end-wrapper" slot="end">
          <ion-note color="medium">Yesterday</ion-note>
          <ion-icon color="medium" :icon="chevronForward"></ion-icon>
        </div>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonText,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
  import { chevronForward, listCircle } from 'ionicons/icons';
<\/script>

<style scoped>
  .unread-indicator {
    background: var(--ion-color-primary);

    width: 10px;
    height: 10px;

    border-radius: 100%;

    position: absolute;

    inset-inline-start: 12px;
    top: 12px;
  }

  .metadata-end-wrapper {
    position: absolute;

    top: 10px;
    inset-inline-end: 10px;

    font-size: 0.8rem;

    display: flex;
    align-items: center;
  }

  ion-label strong {
    display: block;

    max-width: calc(100% - 60px);

    overflow: hidden;

    text-overflow: ellipsis;
  }

  ion-label ion-note {
    font-size: 0.9rem;
  }
</style>`;

</script>

<style scoped>
  .unread-indicator {
    background: var(--ion-color-primary);

    width: 10px;
    height: 10px;

    border-radius: 100%;

    position: absolute;

    inset-inline-start: 12px;
    top: 12px;
  }

  .metadata-end-wrapper {
    position: absolute;

    top: 10px;
    inset-inline-end: 10px;

    font-size: 0.8rem;

    display: flex;
    align-items: center;
  }

  ion-label strong {
    display: block;

    max-width: calc(100% - 60px);

    overflow: hidden;

    text-overflow: ellipsis;
  }

  ion-label ion-note {
    font-size: 0.9rem;
  }
</style>
