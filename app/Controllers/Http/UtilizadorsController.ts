import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UtilizadorsController {


    public async criarConta({response, view}: HttpContextContract) {
        
        return view.render('utilizador/criarConta')
    }

}
