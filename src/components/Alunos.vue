<template>
  <div >
    <titulo texto="Alunos"/>
    <div>
        <input id="alNome" type="text" placeholder="Nome do Aluno" v-model="nome"
        v-on:keyup.enter="addAluno()">
        <button class="btn btnInput" @click=" addAluno()">Adicionar</button>
    </div>


    <table>
        <thead>
          <b>
            <th>Matricula</th>
            <th>Nome</th>
            <th>Opções</th>
          </b>
        </thead>
        <tbody v-if="alunos.length">
          <tr v-for="(aluno, index) in alunos" :key="index">
            <td>{{index + 1}}</td>
            <!--<td>{{aluno.id}}</td>-->
            <td>{{aluno.nome}}</td>
            <td>
              <button class="btn btn_Danger" @click="removerAluno(aluno)">Remover</button>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="!alunos.length">
          Nenhum Aluno Encontrado
        </tfoot>
    </table>

  </div>
</template>

<script>
import Titulo from './_share/titulo.vue';

export default {
  components:{
    Titulo
  },
  data(){
    return{
      titulo: "Aluno",
      nome: '',
      alunos: []
    }    
  },
  created() {
     this.$http.get("http://localhost:3000/alunos")
    .then(res => res.json())
    .then(alunos => this.alunos = alunos);
  },
  props: {
    
  },
  methods:{
    addAluno(){
      let _aluno = {
        nome: this.nome
      }
      this.alunos.push(_aluno);
      this.alunos.forEach(aluno => {
        console.log(aluno);
      });
      this.nome = '';
    },
    removerAluno(aluno){
      let indice = this.alunos.indexOf(aluno);
      this.alunos.splice(indice, 1);
    }
  }
}
</script>

<!-- Ao usar "scoped" o css fica limitado somente a este componente -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap");

body{
  background-color: #eee;
  font-family: "Montserrat", sans-serif;
  display: grid;
  justify-items: center;
}
body, html{
  margin: 0;
  height: 100%;
}
table{
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  width: 100%;

}
table tr td{
  background-color: rgb(113, 207, 238) !important;
  font-size: 1.3em;
  padding: 10px 0px;
  margin-bottom: 2px;
}
table thead th{
  background-color: rgb(184, 208, 216);
  font-size: 1.2em;
  padding: 10px 0px;
  text-align: center !important;
}
.colPequeno {
  width: 5%;
}
.btn{
  background-color: red;
  padding: 10px 20px;
  border: 1px solid black;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border-bottom: 3px solid black;
}
.btn:hover{
  text-shadow: 1px 1px 1px  black;
  margin-top: 3px;
  border-bottom: 1px solid black;
}
.btn_Danger{
  background-color: red;
}
</style>

<style scoped>
input {
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color:dimgray;
  display: inline;
}
.btnInput{
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  background-color: dimgrey;
  display: inline;
}
.btnInput:hover{
  padding: 20px;
  margin: 0px;
  border: 0px;
}
</style>
