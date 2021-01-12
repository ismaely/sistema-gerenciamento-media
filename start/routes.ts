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
Route.get('/login', 'LoginController.index')
Route.get('/login/home', 'LoginController.login')
Route.post('/login/home', 'LoginController.login')
Route.get('/logout/user', 'LoginController.logout')


//videos
Route.get('/listar/video', 'VideosController.listarVideo')
Route.get('/gravar/video', 'VideosController.gravarVideo')
Route.post('/salvar/video', 'VideosController.salvarVideo')
Route.post('/editar/video', 'VideosController.editarVideo')


//utilizador
Route.get('/criar-conta', 'UsersController.criarConta')
Route.post('/criar-conta', 'UsersController.registarConta')
