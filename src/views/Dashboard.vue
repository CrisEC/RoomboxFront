<template>
    <html>
    <div v-if="result">
        <Header />
        <div class="container">
            <nav class="navbar" style="float:right">
            <form class="form-inline" >
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            </nav>
           
            <table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in usersList" :key="user.userID" >
      <td>{{user.userMail}}</td>
      <td v-if="user.userActive==1">Active</td>
      <td v-else>Inactive</td>
      <td>
          <button type="button" class="btn btn-warning btn-sm" v-on:click="editPass(user.userMail)">
              Change Password
          </button>
          <button type="button" class="btn btn-danger btn-sm" v-on:click="eliminar(user.userID)">
              Delete User
          </button>
           <button type="button" class="btn btn-info btn-sm" v-on:click="changeCenter(user.userMail)">
              Change Center
          </button>
           <button type="submit" class="btn btn-success btn-sm" v-on:click="activate(user.userMail)" v-if="user.userActive==1">
            Inactivate
          </button>
          <button type="submit" class="btn btn-light btn-sm" v-on:click="activate(user.userMail)" v-else>
            Activate
          </button>
      </td>
    </tr>
  </tbody>  
</table>
<br>
<div class="col text-center">
        <button type="submit" class="btn btn-warning" v-on:click="añadirUsuarios()">Add Users</button>
    </div>
        </div>
        <br><br><br><br><br><br>
        <!-- <Footer /> -->

    </div>
</html>
</template>

<script>
import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
import axios from 'axios'
export default {
    name:'Dashboard',
    data(){
        return{
        usersList:null,
        pagina: 1,
        user:[],
        token:"",
        valido:null,
        mail:"",
        editUser:null,
        result:null,
        }
    },
    components:{
        Header,
        // Footer
    },
    created(){
        this.recuperarDatos();
    },
    methods:{
        recuperarDatos(){
            this.token=localStorage.token;
            let direcciónToken="http://localhost/proyectoApiRest/users?token=" + this.token;
            axios.get(direcciónToken).then(data=>{
                console.log(data.data);
                this.valido=data.data.statusMsg.status;
                if(this.valido){
                    let dirección="http://localhost/proyectoApiRest/users?page=" + this.pagina;
                    axios.get(dirección).then(data=>{
                        this.result=data.data;
                        console.log(data.data);
                        this.usersList=data.data;
                    })
                }
                else{
                    alert("Your session has expired. Login again!")
                    this.$router.push('/');
                }
                
            })
            
            
        },
        editPass(mail){
            localStorage.mail=mail;
            this.$router.push('/editPassword/' + mail);
        },
        activate(mail){
            this.$router.push('/activateUser/' + mail);
        },

        changeCenter(mail){
           this.$router.push('/changeCenter/' + mail);
        },
        añadirUsuarios(){
           this.$router.push('addUser');
        },
        eliminar(id){
            var enviar = {
                "userID":id
            };
            var bool=confirm("do you want to delete this user?");
            if(bool){
                axios.delete("http://localhost/proyectoApiRest/users", { headers : enviar})
                .then( datos => {
                    console.log(datos);
                    alert("User deleted");
                    location.reload();
            
            });
            }
            
        }

    }
}
</script>

<style >
 .table {
        border-collapse: collapse;
        border-spacing: 10;
        border: 1px solid black;
        border-radius: 20px;
        -moz-border-radius: 20px;
        padding: 2px;
        border-radius: 1.25rem;
    }
    .btn{
        margin-right: 15px;
    }
html {
        background: url(../assets/Background.jpg) no-repeat center center fixed;
        background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
}
</style>