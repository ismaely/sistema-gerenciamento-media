/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//login and logout
Route.get('/', 'LoginController.index')
Route.get('/login', 'LoginController.login')
Route.post('/login', 'LoginController.login')

// alterar senha padrão 
Route.get('/formulario/password', 'UsersController.formularioAlterarPassword')
Route.post('/alterar/password', 'UsersController.alterarPassword')

//Home
//Route.group(() => {
    Route.get('/home', 'HomeController.home')
    Route.get('/logout/user', 'LoginController.logout')
//}).middleware('auth')

//videos  .middleware('guest')
//Route.group(() => {
    Route.get('/listar/video', 'VideosController.listarVideo')
    Route.get('/gravar/video', 'VideosController.gravarVideo')
    Route.post('/salvar/video', 'VideosController.salvarVideo')
    Route.post('/editar/video', 'VideosController.editarVideo')
    Route.get('/video/canal', 'VideosController.gravarCanal')

    // Ecra
    Route.get('/gravar/ecra', 'VideosController.gravarEcra')
    Route.post('/salvar/ecra', 'VideosController.salvarEcra')

    // placa
    Route.get('/registar/placa', 'PlacasController.registarPalca')
    Route.post('/registar/placa', 'PlacasController.salvarDadosPlaca')
//}).middleware('auth')


// requisição ajax
//Route.group(() => {
   
    Route.post('/visualizar/video', 'VideosController.buscarVideo')

//}).middleware('auth')


//Route.group(() => {
    //utilizador
    Route.get('/registar/uilizador', 'UsersController.criarConta')
    Route.post('/registar/uilizador', 'UsersController.registarConta')

//}).middleware('auth')


