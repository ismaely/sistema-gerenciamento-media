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
    public async logout({response, view}: HttpContextContract ) {

        response.redirect().toRoute('LoginController.index')
        
    }
}
