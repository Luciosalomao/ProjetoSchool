<template>
  <div>
    <titulo :texto="professorid != undefined ? 'Professor:' + professor.nome : 'Todos os Alunos'"/>
    
    <div v-if="professorid != undefined"> 
        <input id="alNome" type="text" placeholder="Nome do Aluno" v-model="nome"
        v-on:keyup.enter="addAluno()">
        <button class="btn btnInput" @click=" addAluno()">Adicionar</button>
    </div>

      <table>
        <thead>
            <th class="colPequeno">Matrícula</th>
            <th>Nome</th>
            <th class="colPequeno">Opções</th>
        </thead>
        <tbody v-if="alunos.length">
          <tr v-for="(aluno, index) in alunos" :key="index">
            <td class="colPequeno">{{aluno.id}}</td>
            <router-link :to="`/alunoDetalhe/${aluno.id}`" tag="td" style="cursor: pointer">
              {{aluno.nome}} {{aluno.sobrenome}}
            </router-link>
            <td class="colPequeno">
              <button class="btn btn_Danger" @click="removerAluno(aluno)">Remover</button>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="!alunos.length">
          <tr>
            <td colspan="3" style="text-align: center">
               <h5>Nenhum Aluno Encontrado</h5>
            </td>
          </tr>           
        </tfoot>
    </table>

  </div>
</template>

<script>
import Titulo from '../_share/titulo.vue'

export default {
  components:{
    Titulo
  },
  data() {
    return {
      titulo: "Alunos",
      nome: "",
      professorid: this.$route.params.prof_id,
      alunos: [],
      professor: {}
    }    
  },
  created() {
    if ( this.professorid ) {
      this.carregarProfessores();
      this.$http.get(`https://localhost:7093/api/aluno/ByProfessor/${this.professorid}`)
      .then(res => res.json())
      .then(alunos => this.alunos = alunos);
    } else {
      this.$http.get("https://localhost:7093/api/aluno")
      .then(res => res.json())
      .then(alunos => this.alunos = alunos);
    }
  },
  props: {

  },
    methods:{
    addAluno(){
      let _aluno = {
        nome: this.nome,
        sobrenome: "",
        dataNasc: "",
        professorid: this.professor.id
      }

    this.$http.post("https://localhost:7093/api/aluno", _aluno)
    .then(res => res.json())
    .then(alunoRetornado => {
      this.alunos.push(alunoRetornado);
      this.nome = '';
    })      
    },
    removerAluno(aluno){

    this.$http.delete(`https://localhost:7093/api/aluno/${aluno.id}`)
    .then(() => {
      let indice = this.alunos.indexOf(aluno);
      this.alunos.splice(indice, 1);
      })
    },
    carregarProfessores() {
          this.$http.get("https://localhost:7093/api/Professor/" + this.professorid)
          .then(res => res.json())
          .then(professor => {
            this.professor = professor            
      });
    }
  }
}
</script>

<style>

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
  width:100%;

}
table tr td{
  background-color: rgb(146, 214, 236) !important;
  font-size: 1.3em;
  padding: 10px 0px;
  margin-bottom: 2px;
}
table th{
  background-color: rgb(95, 196, 230);
  font-size: 1.2em;
  padding: 10px 0px;
  text-align: center !important;
}
.colPequeno {
  width: 5%;
  text-align: center;
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
  width: calc(100% - 195px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color:dimgray;
  display: inline;
}
.btnInput{
  width: 150px;
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


