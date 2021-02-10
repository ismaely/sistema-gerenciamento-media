import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import env from 'env'

export default class UsersController {
    

    public async criarConta({response, view}: HttpContextContract) {
        
        return view.render('users/registarUtilizador')
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
                'telefone.unique': 'O numero já existe registrado'
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
        
        return response.redirect('/registar/uilizador')
    }


    /**
     * formularioAlterarPassword
     */
    public async formularioAlterarPassword({ response, view,session}: HttpContextContract) {
        

        return view.render('users/alterarPassword')
        
    }

     /**
     * alterarPassword
     */
    public async alterarPassword({request, response, auth, session}: HttpContextContract) {
       
        if (!request.input('termo')) {
          session.flash('msg', 'Aceita o termo de responsablidade')
          return response.redirect().back()

        }
        else{
            const email = request.input('email')
            const password = request.input('password')
            const confirma = request.input('confirma')
            const termo = request.input('termo')

            if (password != confirma){
                session.flash('msg', 'A password não é compativel')
                return response.redirect().back()
            }
           try {
            const dados = await User.findBy('email',email)

             if (Number(dados.estado) == 1) {
                session.flash('msg', 'O E-mail não te pertence')
                return response.redirect().back()
             }
             else{
                 if (dados.estado == 0) {
                     
                    dados.password =password
                    dados.estado = 1
                    const resp = dados.save()

                    if ((await resp).estado == 1) {
                        await auth.attempt(email, password)
                        return response.redirect('/home')
                    }
                   
                 }
             }

           } catch (error) {
               console.log('erro ao trocar senha');
               session.flash('msg', 'O email não é valido')
           }
            
        }
        

        return response.redirect().back()
        
    }
}
