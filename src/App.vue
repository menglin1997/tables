<!--
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-05-29 12:13:08
 * @LastEditors: zml
 * @LastEditTime: 2020-05-29 14:20:51
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
