import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Video from 'App/Models/Video'


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
        return view.render('video/gravar')
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

            await Video.create({
                titulo: titulo,
                nome: nome,
            })
            
        }
            
        session.flash('msg', 'Midia gravada com sucesso')
        
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
        //resp.titulo = titulo
        console.log(Application.tmpPath('uploads'));
        

        //await resp.save()
        
        session.flash('msg', 'Dados alterado com sucesso')
        return response.redirect().back()
    }
}