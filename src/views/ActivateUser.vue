<template>
<div class="body" >
    <Header />
    <div class="container" v-if="result">
      <form action="" class="form-vertical">
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Email</label>
          <div class="col-sm-15">
            <input type="text" style="text-align: left" class="form-control" readonly="readonly" name="email" id="email" v-model="this.emailUser"/>
          </div>
          <br />
        </div>
        <div class="form-group left">
          <label for="" class="control-label col-sm-5" v-if="this.active">This user is <strong>active</strong>. Do you want to inactivate it? </label>
          <label for="" class="control-label col-sm-5" v-else>This user is <strong>inactive</strong>. Do you want to activate it? </label>
          <br />
        </div>

        <div>
          <div>
            <button type="button" class="btn btn-warning" v-if="this.active" v-on:click="activate(userID)"> Inactivate user </button>
            <button type="button" class="btn btn-warning" v-else v-on:click="activate(userID)"> Active User </button>

            <button type="submit" class="btn btn-success" v-on:click="exit()">Exit</button>
            <br /><br /><br />
          </div>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
  name: "ActivateUser",
  components: {
    Header,
    Footer
  },
  data:function(){
      return{
          emailUser:this.$route.params.mail,
          userID:null,
          active:false,
          id:"",
          result:null
      }
  },
  created(){
        let dirección ="http://localhost/proyectoApiRest/users?mail=" + this.emailUser;
        axios.get(dirección).then((datos) => {
          this.result=datos.data;
            this.userID=datos.data.user.id;
            this.active=datos.data.user.active;
        })
    },
    methods:{
        activate(id){
            this.userID=id;
            let dirección ="http://localhost/proyectoApiRest/users?id=" + this.userID;
            axios.get(dirección).then((datos) => {
                console.log(datos.data);
                

                
        });
        location.reload();
        },
        exit() {
            this.$router.push("/dashboard");
    },
    }
};
</script>

<style>
</style>