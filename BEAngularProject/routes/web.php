<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth routes
Route::match(array('GET','POST'), 'validateToken', 'AuthController@validateToken');
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
//Route::post('recover', 'AuthController@recover');
Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('logout', 'AuthController@logout');
    Route::get('test', function(){
        return response()->json(['foo'=>'bar']);
    });
});

//Routes Orazio Contarino (Gestione permessi)
//----Registra permesso
Route::match(array('GET','POST'),'getPermessiEnumArray', 'GestionePermessiController@getPermessiEnumArray');
Route::match(array('GET','POST'),'getListaPermessiDipendente', 'GestionePermessiController@getListaPermessiDipendente');
Route::match(array('GET','POST'),'getListaPermessiSubordinati', 'GestionePermessiController@getListaPermessiSubordinati');
Route::match(array('GET','POST'),'registraPermesso', 'GestionePermessiController@registraPermesso');
Route::match(array('GET','POST'),'approvaPermesso', 'GestionePermessiController@approvaPermesso');
Route::match(array('GET','POST'),'rifiutaPermesso', 'GestionePermessiController@rifiutaPermesso');
Route::match(array('GET','POST'),'cancellaPermesso', 'GestionePermessiController@cancellaPermesso');

//----deprecati
Route::match(array('GET','POST'),'generateMockData', 'GestionePermessiController@generateMockData');

//Routes Giovanni Emanuele Longo
Route::match(array('GET','POST'),'generateMockDataGiovanni', 'SkillAndTeamController@generateMockDataGiovanni');
Route::match(array('GET','POST'),'getDatiUtente', 'HomeController@getDatiUtente')->middleware('jwt.auth');
Route::match(array('GET','POST'),'getSkills', 'SkillsController@getSkills')->middleware('jwt.auth');
Route::match(array('GET'),'getListSkills', 'SkillsController@getListSkills');
Route::match(array('POST'),'aggiungiModificaSkill', 'SkillsController@aggiungiModificaSkill');
Route::match(array('POST'),'rimuoviSkill', 'SkillsController@rimuoviSkill');
Route::match(array('PUT'),'updateUser', 'UtenteController@updateUser');
Route::match(array('GET','POST'),'ricerca', 'RicercaController@getRisulatatiRicerca');
Route::match(array('GET','POST'),'dipendenteInfo', 'RicercaController@dipendenteInfo');
Route::match(array('GET','POST'),'getTeam', 'TeamsController@getTeam');
Route::match(array('GET','POST'),'deleteEmployerInTeam', 'TeamsController@deleteEmployerInTeam')->middleware('jwt.auth');
Route::match(array('GET','POST'),'addEmployerInTeam', 'TeamsController@addEmployerInTeam')->middleware('jwt.auth');
Route::match(array('GET','POST'),'addTeam', 'TeamsController@addTeam')->middleware('jwt.auth');
Route::match(array('GET','POST'),'addDipendente', 'UtenteController@addUser');
Route::match(array('GET','POST'),'checkPasswordUtente', 'UtenteController@checkPasswordUtente');

