 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {


    /**
     * async login
     */
    public async index({view }: HttpContextContract) {
    return view.render('logins/login')

    }

    public async login({request, response, auth, session }: HttpContextContract) {
        
        try {
            //const {email, password} = request.all()
            //const resp = await auth.attempt(email, password)
           
            //if (resp.estado!=1) {
               // await auth.logout()
                //return response.redirect('/formulario/password')
            //} 
            
            return response.redirect('/home')
      } catch (error) {
          session.flash('msg', 'Dados invalidos')
        
          return response.redirect().back()
      }
       
    }

    /**
     * logaut
     */
    public async logout({ auth, response}: HttpContextContract ) {
        await auth.logout()
        return response.redirect().toRoute('LoginController.index')
        
    }
}
