<template>
  <router-view/>
</template>
<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
<style lang="scss">
@import './components/common.scss';

html, body {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  position: absolute;
  top: 0;
  margin: 0;
  left: 0;
  font-family: $font-family;
}

#app {
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  font-family: $font-family
}
</style>
