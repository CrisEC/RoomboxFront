<template>
  <div class="body">
    <Header />
    <!-- <div class="container" v-if="result"> -->
    <div class="container">

      <form action="" class="form-vertical">
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">User and center </label>
          <br />
          <div class="col-sm-15">
            <a style="margin-right: 15px">{{ this.emailUser }}</a>
            <a> -------- </a>
            <a style="margin-left: 15px">{{ this.center }}</a>
            <br />
          </div>
        </div>
        <br />
        <div class="form-group left">
          <label for="" class="control-label col-sm-2">New Center</label>
            <select required name="select" v-model="transfer.newCenter" > 
                        <option selected>Select center</option>
                        <option v-for="cent in centersList" :key="cent.account_id" 
                        v-bind:value="cent.accountID">
                            {{cent.accountName}}</option>
                        </select>
          <br />
        </div>

        <div>
          <div>
            <button type="button" class="btn btn-warning" v-on:click="saveNewCenter(transfer)">Save</button>
            <button type="submit" class="btn btn-success" v-on:click="exit()">Exit</button>
            <br /><br /><br />
          </div>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
export default {
  name: "ChangeCenter",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      emailUser: this.$route.params.mail,
      center: "",
      userID:"",
      centersList:null,
      transfer:{
        newCenter:"",
        changeID:""}
    };
  },
  mounted() {
     let dirección =
        "http://localhost/proyectoApiRest/users?mail=" + this.emailUser;
      axios.get(dirección).then((datos) => {
          console.log(datos.data);
          this.center = datos.data.user.Account.name;
          this.userID=datos.data.user.id;
          console.log(this.userID);
      });
      this.getAllCenters();
  },
  methods: {
    exit() {
      console.log("Salir");
      this.$router.push("/dashboard");
    },
    getAllCenters(){
        let dirección ="http://localhost/proyectoApiRest/users?user";
            axios.get(dirección).then((datos) => {
            console.log(datos.data);
            this.centersList=datos.data;
            
      });
    },
    saveNewCenter($centerid){
        $centerid.changeID=this.userID;
        console.log($centerid);
        axios.post("http://localhost/proyectoApiRest/users", $centerid)
                .then((datos) => {
                console.log(datos.data);
                });
        
    }
  },
};
</script>

<style>
.body {
  font-family: "Poppins", sans-serif;
  background-image: url(../assets/Background.jpg);
  background-size: center cover;
  height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
a{
    margin-right: 15px;
    margin-left: 15px;
}
</style>