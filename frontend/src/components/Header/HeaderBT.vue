<template>
  <div class="header-container">
    <div class="title-container">
      <span>Bolttech TODO List</span>
    </div>
    <div class="name-container" v-on:click="setOpenMenu">
      <div class="name-user">{{nameUser}}</div>
      <img class="open-menu-icon" src="../../assets/down-arrow.png"/>
    </div>
    <div class="menu" v-if="openMenu">
      <div class="item-menu" v-on:click="logoff">
        <span class="logoff-label">Logoff</span>
        <img class="logoff-icon" src="../../assets/exit_logoff.svg"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import RequestService from '@/util/request.service';

export default {
  name: 'HeaderBT',
  components: {
  },
  computed: {
    nameUser() {
      return store.state.user.userName
    }
  },
  data() {
    return {
      openMenu: false
    }
  },
  methods: {
    logoff() {
      RequestService.Logoff()
    },
    setOpenMenu() {
      this.openMenu = !this.openMenu
    }
  }
}
</script>
<style lang="scss" scoped>
@import './HeaderBT.scss';
</style>