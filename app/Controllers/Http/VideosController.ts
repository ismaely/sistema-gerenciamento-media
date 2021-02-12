import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Video from 'App/Models/Video'
import Placa from 'App/Models/Placa'


export default class VideosController {

    /**
     * async listarVideo
     */
    public async listarVideo({view}: HttpContextContract) {
        
        const arrayItem =  await Video.all()
        return view.render('video/listarVideo', {arrayItem})
        
    }

    /**
     * async gravarVideo
     */
    public async gravarVideo({view}: HttpContextContract) {
        return view.render('video/gravarVideo')
    }


    /**
     * salvarVideo
     */
    public async salvarVideo({request, response, session}: HttpContextContract) {
        
        if (request.input('upload') && request.input('titulo')) {
            
            const file = request.file('video-blob')
            const titulo = request.input('titulo');
            const nome = request.input('video-filename')
            const caminho = Application.publicPath('uploads')

            if (!file) {
                console.log('o ficheiro não é video')
            }
            await file.move(caminho)
            const resp = await Video.create({
                titulo: titulo,
                nome: nome,
            })
            if (resp.id) {
                session.flash('msg', 'Midia gravada com sucesso')
            }
            else{
                session.flash('erro', 'Não foi possivel gravar a Mídia')
            }
        }
        return response.redirect().back()
    }

    /**
     * gravarEcra
     */
    public async gravarEcra({request,view}: HttpContextContract) {
        const placa = await Placa.all()
        return view.render('video/gravarEcra',{placa})
        
    }

    /**
     * salvar Ecra
     */
    public async salvarEcra({request, response,view}: HttpContextContract) {
        const file = request.file('video-blob')
        const titulo = request.input('titulo');
        const nome = request.input('video-filename')
         
        const caminho = Application.publicPath('uploads')

        await file.move(caminho)
        
        const resp = await Video.create({
            titulo: titulo,
            nome: nome,
        })

    
        return response.redirect().back()
    }

    /**
     * editarVideo
     */
    public async editarVideo({request, response, session}: HttpContextContract) {

        const titulo = request.input('titulo')
        const id = request.input('idVideo')
        const nome = request.input('nome')

        const resp = await Video.find(id)

        //console.log(Application.tmpPath('uploads'));
        //await resp.save()
        
        session.flash('msg', 'Dados alterado com sucesso')
        return response.redirect().back()
    }
}
