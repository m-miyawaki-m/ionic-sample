<template>
  <ion-page>
    <ion-content>
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-infinite-scroll-content をカスタマイズする例。ローディング表示のテキストやスピナーを変更できる。</p>
        <ion-list>
          <ion-item v-for="(item, index) in items">
            <ion-avatar slot="start">
              <img :src="'@/assets/img/demos/placeholder.svg' + index" alt="avatar" />
            </ion-avatar>
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll>
          <div class="infinite-scroll-content">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 100 100"
              xml:space="preserve"
            >
              <circle fill="none" stroke="#1b6dff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48" />
              <line
                fill="none"
                stroke-linecap="round"
                stroke="#1b6dff"
                stroke-width="4"
                stroke-miterlimit="10"
                x1="50"
                y1="50"
                x2="85"
                y2="50.5"
              >
                <animateTransform
                  attributeName="transform"
                  dur="2s"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </line>
              <line
                fill="none"
                stroke-linecap="round"
                stroke="#1b6dff"
                stroke-width="4"
                stroke-miterlimit="10"
                x1="50"
                y1="50"
                x2="49.5"
                y2="74"
              >
                <animateTransform
                  attributeName="transform"
                  dur="15s"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>
        </ion-infinite-scroll>
      
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
  IonAvatar,
  IonContent,
  IonInfiniteScroll,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
 } from '@ionic/vue';
  import { reactive } from 'vue';

const sourceCode = `<style>
  svg {
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .infinite-scroll-content {
    text-align: center;
    padding: 20px 0;
  }
</style>

<template>
  <ion-content>
    <ion-list>
      <ion-item v-for="(item, index) in items">
        <ion-avatar slot="start">
          <img :src="'@/assets/img/demos/placeholder.svg' + index" alt="avatar" />
        </ion-avatar>
        <ion-label>{{ item }}</ion-label>
      </ion-item>
    </ion-list>
    <ion-infinite-scroll>
      <div class="infinite-scroll-content">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          xml:space="preserve"
        >
          <circle fill="none" stroke="#1b6dff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48" />
          <line
            fill="none"
            stroke-linecap="round"
            stroke="#1b6dff"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="85"
            y2="50.5"
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
          <line
            fill="none"
            stroke-linecap="round"
            stroke="#1b6dff"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="49.5"
            y2="74"
          >
            <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
        </svg>
      </div>
    </ion-infinite-scroll>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent, IonInfiniteScroll, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/vue';
  import { reactive } from 'vue';

  const items = reactive([]);

  for (let i = 1; i < 51; i++) {
    items.push(\`Item \${i}\`);
  }
<\/script>`;


  const items = reactive([]);

  for (let i = 1; i < 51; i++) {
    items.push(`Item ${i}`);
  }
</script>

<style>
  svg {
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .infinite-scroll-content {
    text-align: center;
    padding: 20px 0;
  }
</style>
