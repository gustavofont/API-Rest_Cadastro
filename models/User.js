const knex = require("../database/connection");
var bcrypt = require("bcrypt") 

class User{
    async findAll(){
        try{
            var result = await knex.select("*").from("Usuarios")
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }
    async findUser(id){
        try{
            let user = await knex.select("*").from("Usuarios").where({id : id})
            return user
        }catch(err){
            console.log(err)
            return []
        }
    }
    async create(name, email, role, password){
        try{
            var crypPass = await bcrypt.hash(password,10)
            await knex.insert({name, email, role, password : crypPass}).table("Usuarios")
        }catch(err){
            console.log(err)
        }
    }
    async findEmail(email){
        try{
            var emailfinded = await knex.select("*").from("Usuarios").where({email: email})
            return emailfinded
        }catch(err){
            console.log(err)
            return false
        }
    }
}

module.exports = new User()