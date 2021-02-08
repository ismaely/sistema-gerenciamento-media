import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Placa from 'App/Models/Placa'

export default class PlacasController {

    /**
     * registarPalca
     */
    public async registarPalca({view}: HttpContextContract) {

        return view.render('placa/registarPlaca')
        
    }

    /**
     * salvarDadosPlaca
     */
    public async salvarDadosPlaca({request, response,  session}: HttpContextContract) {
       
        const placa = new Placa()
            try {
                placa.nome = request.input('nome')
                placa.mac = request.input('mac')
                placa.numero = request.input('numero')
                
                const resp = placa.save()
                if((await resp).id){
                    session.flash('msg', 'Placa registrada com sucesso')
                }
                
            } catch (error) {
                session.flash('error', 'Placa registrada com sucesso')
                
            }
       
        return response.redirect('/registar/placa')
        
    }
}
