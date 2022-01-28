const knex = require("../database/connection");
var bcrypt = require("bcrypt") 

class User{
    async findAll(){
        try{
            let result = await knex.select("*").from("Usuarios")
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
    async delete(id){
        let exist = await this.findUser(id)
        if(exist.length > 0){
            try{
                await knex.delete().where({id:id}).table("Usuarios")
            }catch(err){
                console.log(err)
                return {status : false, err : err}
            }
            return {status : true}
        }else{
            return {status : false , err: "Usuario inexistente no Banco"} 
        }
    }
    async update(id,name,email,role){
        let user = await this.findUser(id)

        if(user.length > 0){
            let editUser = {}
            if (email != undefined){
                if(email != user.email){
                    let result = await this.findEmail(email)
                    if(result.length == []){
                        editUser.email = email
                    }else{
                        return {status : false, err : "O email já está cadastrado"}
                    }
                }
            }
            editUser.name = name
            editUser.role = role 

            try{
                await knex.update(editUser).where({id : id}).table("Usuarios")
            }catch(err){
                return {status : false , err : err}
            }
            return {status : true}
        }else{
            return {status : false, err : "Usuário não existe"}
        }
    }
}

module.exports = new User()