<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from './js/store'
import { Konami } from "./js/konami";

import Nav from './components/Nav.vue'
import Actress from './components/Actress.vue';

const store = useStore();

const easterEgg = new Konami(function () {
  store.isExperimentalMode = !store.isExperimentalMode;
});

watchEffect(() => document.getElementsByTagName('body')[0].setAttribute('lang', store.language));
</script>

<template>
  <div class="h-100">
    <Nav />
    <Actress />
  </div>
</template>