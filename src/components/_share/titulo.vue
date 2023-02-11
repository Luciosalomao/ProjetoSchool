<template>
    <div>
        <h1>{{texto}}</h1>
        <div class="voltar">
            <button  class="btn btnVoltar" @click="voltar()">Voltar</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            texto : String
        },
        methods: {
            voltar() {
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    .voltar {
        width: 50%;
        position: relative;
        float: right;      
    }
    .btnVoltar{
        float: right;
        background-color: rgba(233, 179, 1, 0.911);
        color: black;
        margin-right: 5px;
    }
</style>