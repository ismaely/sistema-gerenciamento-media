 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {


    /**
     * async login
     */
    public async index({view }: HttpContextContract) {
    return view.render('logins/login')

    }

    public async login({request, response, view }: HttpContextContract) {
      
        return view.render('home/index')
    }

    /**
     * logaut
     */
    public async logout({ auth, response, session}: HttpContextContract ) {
        await auth.logout()
        return response.redirect().toRoute('LoginController.index')
        
    }
}
