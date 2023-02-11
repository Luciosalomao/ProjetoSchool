<template>
    <div v-if="!loading">
    
        <titulo :texto="`Aluno: ${aluno.nome}`" />

        <div>
            <button @click="editar()" class="btn btnEditar">Editar</button>
        </div>

        <table>
            <tbody>
                <tr>
                    <td class="colPequeno">Matrícula:</td>
                    <td>
                       <label>
                            {{aluno.id}}
                       </label> 
                    </td>
                </tr>
                <tr>
                    <td class="colPequeno">Nome:</td>
                    <td>
                       <label v-if="visualizar">
                          {{aluno.nome}}                       
                       </label> 
                       <input v-else v-model="aluno.nome" type="text"/>
                      </td>
                </tr>
                <tr>
                    <td class="colPequeno">Sobrenome:</td>
                    <td>
                       <label v-if="visualizar">
                           {{aluno.sobrenome}}
                       </label>    
                       <input v-else v-model="aluno.sobrenome" type="text"/>                        
                    </td>
                </tr>
                <tr>
                    <td class="colPequeno">Data Nascimento:</td>
                    <td>
                       <label v-if="visualizar">
                          {{aluno.dataNasc}}
                       </label>    
                       <input v-else v-model="aluno.dataNasc" type="text"/>                       
                   </td>
                </tr>
                <tr>
                    <td class="colPequeno">Professor:</td>
                    <td>
                       <label v-if="visualizar">{{aluno.professor.nome}}</label>  
    
                       <select v-else v-model="aluno.professor.id">
                          <option v-for="(professor, index) in professores" :key="index" v-bind:value="professor.id">
                                {{professor.nome}}
                          </option>
                        </select>
                        
                    </td>
                </tr>
            </tbody>
        </table> 

        <div style="margin-top: 10px">
            <div>
                <button class="btn btnSalvar" @click="salvar(aluno)">Salvar</button>
                <button class="btn btnCancelar" @click="cancelar()">Cancelar</button>
            </div>    
        </div>  

    </div>
</template>

<script>
    import Titulo from '../_share/titulo.vue'

    export default {
        components: {
            Titulo
        },
        data() {
            return{
                aluno:{},
                idaluno: this.$route.params.id,
                professores: [],
                visualizar: true,
                loading: true
            }
        },
        methods:{
            editar() {
                this.visualizar = !this.visualizar;
            },
            salvar() {
                let _alunoEditar = {
                    id: this.aluno.id,
                    nome: this.aluno.nome,
                    sobrenome: this.aluno.sobrenome,
                    dataNasc: this.aluno.dataNasc,
                    professorId: this.aluno.professor.id
                }
                      
            this.$http.put(`https://localhost:7093/api/aluno/${_alunoEditar.id}`, _alunoEditar)
            .then(res => res.json())
            .then(aluno => this.aluno = aluno)
            .then(() => this.visualizar = true);   
            this.visualizar = !this.visualizar;         
            },
            cancelar() {
                this.visualizar = !this.visualizar;
            },
            carregarProfessor(){
               this.$http.get("https://localhost:7093/api/Professor")
              .then(res => res.json())
              .then(professor => {
                this.professores = professor;
                this.carregarAluno();
                });
            },
            carregarAluno(){
               this.$http.get(`https://localhost:7093/api/aluno/${this.idaluno}` )
               .then(res => res.json())
               .then(aluno => {
                this.aluno = aluno;
                this.loading = false;
                }); 
            }
        },
        created(){
            this.carregarProfessor()
        }
    }
</script>

<style  scoped>
    .colPequeno {
        width: 20%;
        text-align: right;
        background-color: rgb(125, 217, 245);
        font-weight: bold;
    }
    input, select {
        margin: 0px;
        padding: 5px 10px;
        font-size: 0.9em;
        border: 1px solid silver;
        border-radius: 5px;
        font-family: "Montserrat", sans-serif;
        width: 95%;
        background-color: rgb(245, 245, 245);
    }
    select{
        height: 38px;
        width: 99%;
    }
    .btnEditar {
        background-color: rgb(120, 190, 247);  
        color: rgb(6, 53, 31);   
        margin-left: 5px;    
    }
    .btnSalvar {
        background-color: rgb(6, 131, 83);  
        color: rgb(232, 240, 236);
        margin-left: 5px; 
        margin-right: 5px;     
    }
    .btnCancelar {
        background-color: rgb(234, 238, 16);  
        color: rgb(0, 0, 0);      
    }
</style>