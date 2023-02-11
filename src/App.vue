<template>
  <div id="app">
    <Nav></Nav>
    <div class="marginPrincipal">
      <!--É importante usar o :key="$route.fullPath para que seja analisada a rota inteira-->
      <!--Se não usar sai ser analisado apenas se houve alteração do componente-->
       <router-view :key="$route.fullPath"></router-view>
    </div>    
  </div>
</template>

<script>
import Nav from './components/_nav/Nav'
import Alunos from './components/Alunos/Alunos'
import Professor from './components/Professores/Professor'
import Sobre from './components/Sobre/Sobre'

export default {
  name: 'App',
  components: {
    Alunos,
    Professor,
    Nav,
    Sobre,

  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap");

#app {
  width: 100%;
}
</style>
