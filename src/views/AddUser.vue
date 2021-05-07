<template>
  <div class="body">
    <Header />
    <div class="container">
      <form action="" class="form-vertical">
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">First Name *</label>
          <div class="col-sm-15">
            <input required
              type="text"
              style="text-align: left"
              placeholder="First Name"
              class="form-control"
              name="name"
              id="name"
              v-model="userBasicData.firstName"
            />
          </div>
          <br />
        </div>
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Last Name *</label>
          <div class="col-sm-15">
            <input
            required
            placeholder="Last Name"
              type="text"
              style="text-align: left"
              class="form-control"
              name="lastName"
              id="lastName"
              v-model="userBasicData.lastName"
            />
          </div>
          <br />
        </div>
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Email *</label>
          <div class="col-sm-15">
            <input
            required
            placeholder="Insert an email"
              type="text"
              style="text-align: left"
              class="form-control"
              name="email"
              id="email"
               v-model="userBasicData.mail"
            />
            <label class="label-mail" for="">@elcorteingles.es</label>
          </div>
          
          <br />
        </div>
        <div class="form-group left">
          <label for="" class="control-label col-sm-5"
            >Password *</label
          >
          <div class="col-sm-15">
            <input
            required
              type="password"
              style="text-align: left"
              class="form-control"
              placeholder="Insert new password"
              name="password"
              id="password"
              v-model="userBasicData.password"
            />
          </div>
          
           <div class="form-group left">
          <label for="" class="control-label col-sm-5">Center *</label>
           <div class="col-sm-15">
                        <select required name="select" v-model="userBasicData.account_id" > 
                        <option selected>Select center</option>
                        <option v-for="cent in centerList" :key="cent.account_id" 
                        v-bind:value="cent.accountID">
                            {{cent.accountName}}</option>
                        </select>
                    <br />
                    </div>
            </div>
          <br />
        </div>

        <div>
          <div>
            <button type="button" class="btn btn-warning" v-on:click="saveNewUser(userBasicData)">Save</button>
            <button type="submit" class="btn btn-success" v-on:click="exit()">
              Exit
            </button>
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
import axios from 'axios'
export default {
    name:'AddUser',
    components:{
        Header,
        Footer
    },
    data(){
        return{
            token:null, 
            userBasicData:{
                active:true,
                userType:"client",
                firstName:"",
                lastName:"",
                mail:"",
                password:"",
                account_id:""
            },
                centerList:null,
                selectedCenter:null
        }
    },
    beforeMount(){
        this.getAllCenters();
    },

    methods:{
        saveNewUser($datosUsuario){
            axios.post("http://localhost/proyectoApiRest/users", $datosUsuario)
                .then((datos) => {
                if(datos.data.statusMsg.status){
                    alert("usuario creado correctamente");
                    this.$router.push('dashboard');
                }
                else{
                    alert(datos.data.statusMsg.message);
                }
                });
        },
        exit(){
            this.$router.push('dashboard');
        },
        getAllCenters(){
        let dirección ="http://localhost/proyectoApiRest/users";
            axios.get(dirección).then((datos) => {
            console.log(datos.data);
            this.centerList=datos.data;
      });

    }
    }

}
</script>

<style scooped>
.left{
    text-align: left;
}
.input{
    text-align: left;
    font-family: "Poppins", sans-serif;
    width: 117%;
}
.body {
    font-family: "Poppins", sans-serif;
    background: url(../assets/Background.jpg) ;
        background-size: center cover;
        height: 100vh;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
}
.label-mail{
    font-weight: 900;
    color:black;

}

</style>