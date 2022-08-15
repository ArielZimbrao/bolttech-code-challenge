<template>
  <div class="menu-container">
    <div class="title-container">
      <span>Bolttech TODO List</span>
    </div>
    <div class="name-container">
      <div class="name-user">{{nameUser}}</div>
      <img class="open-menu-icon" src="../../assets/down-arrow.png"/>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'MenuBT',
  components: {
  },
  computed: {
    nameUser() {
      return store.state.user.userName
    }
  }
}
</script>
<style lang="scss" scoped>
@import './MenuBT.scss';
</style>