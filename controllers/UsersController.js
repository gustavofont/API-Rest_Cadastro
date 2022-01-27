var User = require("../models/User")
class UserController{
    async index(req,res){
        try{
            var users = await User.findAll()
            res.status(200)
            res.json(users)
        }catch(err){
            console.log(err)
        }
    }
    async findUser(req,res){
        let id = req.params.id
        try{
            let user = await User.findUser(id)
            res.json(user)
        }catch(err){
            console.log(err)
        }
    }
    async create(req,res){
        var {name, email, role, password} = req.body

        if(email == undefined){
            res.status(400)
            res.json({err : "email inválido"})
            return
        }
        var result = await User.findEmail(email)
        if(result.length > 0){
            res.status(400)
            res.json({err : "email já está cadastrado"})
            return
        }
        res.status(200)
        User.create(name,email,role,password)
        res.send("tudo ok")
    }
}

module.exports = new UserController()