<script setup>
import InitPhaserGame from '../../init.js'
import { onMounted, ref } from 'vue'

const game = ref();

onMounted(() =>{
  let countItems = localStorage.getItem('countItems')

  if (!countItems) {
    countItems = Math.floor(Math.random() * (15 - 10 + 1) + 10)

    localStorage.setItem('countItems', String(countItems))
  }

  game.value = InitPhaserGame()
})

</script>

<template>
  <div id="game-container" />
</template>