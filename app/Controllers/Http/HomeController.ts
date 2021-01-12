 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

    public async home({view}: HttpContextContract) {

        return view.render('home/index')

    }
}
