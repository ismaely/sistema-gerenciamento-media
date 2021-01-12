import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import env from 'env'

export default class UsersController {

    constructor(){
       
      
        
    }
    public async criarConta({response, view}: HttpContextContract) {
        
        return view.render('users/criarConta')
    }


    public async registarConta({request, auth, response, session, view}: HttpContextContract) {

        const validarSchema = schema.create({
            nome: schema.string({trim: true}, [
                rules.minLength(6),
                
            ]),
            genero: schema.string({trim: true}),
            telefone: schema.string({trim: true}, [
                rules.maxLength(64),
                rules.unique({ table: 'users', column: 'telefone'}),
            ]),
            //estado: schema.number(),
            //desiguinacao: schema.string(),
            email: schema.string({trim: true}, [
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),
        })
        const validoDados = await request.validate({
            schema: validarSchema,
            messages: {
                'nome.maxLength': 'O nome Não é valido',
                'email.unique': 'já existe este E-mail',
            }
        })
        
        //const user = await User.create(validoDados)
        

        const user = new User()
        user.nome = validoDados.nome
        user.genero = validoDados.genero
        user.telefone = validoDados.telefone
        user.estado = 0
        user.email = validoDados.email
        user.password = Env.get('PASSWORD_PADRAO')
        const resp = await user.save()
       
        if(resp.id){
            session.flash('msg', 'Conta criada com sucesso')
        }
        //await auth.login(user)
        
        return response.redirect('/criar-conta')
    }
}
