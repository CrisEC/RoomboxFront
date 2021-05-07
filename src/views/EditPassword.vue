<template>
  <div class="body" v-if="this.result">
    <Header />
    <div class="container">
      <form action="" class="form-vertical">
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Email</label>
          <div class="col-sm-15">
            <input
              type="text"
              style="text-align: left"
              class="form-control"
              readonly="readonly"
              name="email"
              id="email"
              v-model="form.email"
            />
          </div>
          <br />
        </div>
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">Center</label>
          <div class="col-sm-15">
            <input
              type="text"
              style="text-align: left"
              class="form-control"
              readonly="readonly"
              name="center"
              id="center"
              v-model="form.center"
            />
          </div>
          <br />
        </div>
        <div class="form-group left">
          <label for="" class="control-label col-sm-5"
            >Set/Change Password</label
          >
          <div class="col-sm-15">
            <input
              type="password"
              style="text-align: left"
              class="form-control"
              placeholder="Insert new password"
              name="password"
              id="password"
              v-model="userCredentials.newpassword"
            />
          </div>
          <br />
        </div>

        <div>
          <div>
            <button type="button" class="btn btn-warning" v-on:click="editPass()">Save</button>
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
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue';
import axios from "axios";

export default {
  name: "EditPassword",
  components: {
    Header,
    Footer,
  },
  data: function () {
    return {
        result:null,
        form: {
            email: "",
            center: "",
            password: "",
            active: "",
            token: "",
      },
        userCredentials: {
            id: "",
            newpassword: "",
        },
    };
  },
  created() {
    this.recuperarDatos();
  },
  methods: {
      recuperarDatos(){
        this.form.email = localStorage.getItem("mail");
        this.form.token=localStorage.getItem("token");
        let direcciónToken="http://localhost/proyectoApiRest/users?token=" + this.form.token;
        axios.get(direcciónToken).then(data=>{
            console.log(data.data);
            this.valido=data.data.statusMsg.status;
            if(this.valido){
                let dirección ="http://localhost/proyectoApiRest/users?mail=" + this.form.email;
                axios.get(dirección).then((datos) => {
                    this.result=datos.data;
                    this.form.center = datos.data.user.Account.name;
                    this.form.active = datos.data.user.active;
                    this.userCredentials.id = datos.data.user.id;
                });
            }else{
                alert("Your session has expired. Login again!");
                this.$router.push('/');
                }
                });
      },
    editPass() {
      if (this.userCredentials.newpassword == "") {
        this.$router.push("/dashboard");
      } else {
        this.userCredentials = {
          id: this.userCredentials.id,
          newpassword: this.userCredentials.newpassword,
        };
        var bool=confirm("do you want to change your password?");
        if(bool){
            axios
                .post("http://localhost/proyectoApiRest/users", this.userCredentials)
                .then((datas) => {
                console.log(datas);
                alert("Your pass is changed");
                });
        
        this.$router.push("/dashboard");
        }
        else{
            alert("You have canceled the request");
            this.$router.push("/dashboard");
        }
      }
    },
    exit() {
      console.log("Salir");
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scooped>
.left {
  text-align: left;
}
.body {
  font-family: "Poppins", sans-serif;
  background-image: url(../assets/Background.jpg);
  background-size: center cover;
  height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
.control-label {
  color: black;
}
/* .container{
    opacity: 1;
    background-color: rgb(228, 220, 220);
    width: 980px;
} */
.input {
  text-align: left;
  font-family: "Poppins", sans-serif;
  width: 117%;
}
</style>