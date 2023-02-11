import Vue from 'vue';
import Router from 'vue-router';
import Alunos from './components/Alunos/Alunos'
import Professor from './components/Professores/Professor'
import Sobre from './components/Sobre/Sobre'
import AlunoDetalhe from './components/Alunos/AlunoDetalhe'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/professores',
            nome: 'Professores',
            component: Professor
        },
        {
            path: '/Alunos/:prof_id',
            nome: 'Alunos',
            component: Alunos
        },
        {
            path: '/todosAlunos',
            nome: 'Alunos',
            component: Alunos
        },
        {
            path: '/sobre',
            nome: 'Sobre',
            component: Sobre
        },
        {
            path: '/alunoDetalhe/:id',
            nome: 'AlunoDetalhe',
            component: AlunoDetalhe
        }
    ]
})