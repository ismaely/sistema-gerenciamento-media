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
            const nome = (Math.floor(Math.random()*1000)+1)+""+request.input('video-filename')
           
            const caminho = Application.publicPath('uploads')
           
            if (!file) {
                console.log('o ficheiro não é video')
            }
            if (file) {
            await file.move(caminho,{name: nome,"overwrite":true});
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
        }
        return response.redirect().back()
    }

  

  

    public async gravarTv({request,view}: HttpContextContract) {
        const placa = await Placa.all()
        return view.render('video/tv',{placa})
        
    }



    /**
     * editarVideo
     */
    public async editarVideo({request, response, session}: HttpContextContract) {

        const titulo = request.input('titulo')
        const id = request.input('idVideo')
        
        const resp = await Video.find(id)

       
         resp.titulo=titulo;
        //console.log(Application.tmpPath('uploads'));
        await resp.save()
        
        session.flash('msg', 'Dados alterado com sucesso')
        return response.redirect().back()
    }
    
    public async buscarVideo({request, response, session}: HttpContextContract) {

        const id = request.input('id')
        const arrayItem =  await Video.findBy('id', id)
        
        return arrayItem
    }
}
