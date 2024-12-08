<script setup>
import InitPhaserGame from '../../init.js'
import { onMounted, ref } from 'vue'

const game = ref();

onMounted(() => game.value = InitPhaserGame())

</script>

<template>
  <div id="game-container" />
</template>