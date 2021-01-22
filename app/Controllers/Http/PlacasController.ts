import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlacasController {

    /**
     * registarPalca
     */
    public async registarPalca({response, view}: HttpContextContract) {

        return view.render('placa/registarPlaca')
        
    }
}
