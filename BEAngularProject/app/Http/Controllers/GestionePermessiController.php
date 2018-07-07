<?php
/**
 * Autobot project.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Dipendente;
use App\Models\Permessi;
use App\Models\Sottoposti;
use Carbon\Carbon;
use App\angularproject\CommonFunction;
use Hash;
use JWTAuth;
/**
 *
 *@deprecated See WebHookVotaController
 */
class GestionePermessiController extends Controller
{
    public function __construct()
    {
        //$this->middleware('jwt.auth');
    }

    public function approvaPermesso(Request $request){
        return $this->cambiaStatoPermesso($request, 'approvato');
    }
    public function rifiutaPermesso(Request $request){
        return $this->cambiaStatoPermesso($request, 'rifiutato');
    }

    private function cambiaStatoPermesso(Request $request, $nuovoStato){
        $params = $request->only('token', 'id_permesso');
        $user = CommonFunction::tokenToDipendente($params['token']);

        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }
        $idList = Sottoposti::where('id_capo', '=', $user->id_dipendente)->pluck('id_dipendente');
        $count = Permessi::where('id', '=', $params['id_permesso'])
            ->whereIn('id_dipendente', $idList)
            ->where('stato', '!=', $nuovoStato)
            ->count();
        if($count == 0){
            return response()->json(['success' => false, 'error' => 'Non puoi eseguire questa operazione[ cambio stato in '.$nuovoStato.']']);
        }
        Permessi::where('id', '=', $params['id_permesso'])->update(['stato' => $nuovoStato]);
        return response()->json(['success' => true, 'data' => 'Operazione completata']);
    }

    public function getPermessiEnumArray(){
        return response()->json(['success' => true, 'data'=> Permessi::getPermessiEnumArray()]);
    }

    public function cancellaPermesso(Request $request){
        $params = $request->only('token', 'id_permesso');
        $user = CommonFunction::tokenToDipendente($params['token']);

        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }
        $count =  Permessi::where('id', '=', $params['id_permesso'])
            ->where('id_dipendente', '=', $user->id_dipendente)
            ->where('stato', '!=', 'approvato')
            ->count();
        if($count == 0){
            return response()->json(['success' => false, 'error' => 'Non puoi elminare ferie approvate!']);
        }
        $rawPermessi = Permessi::where('id', '=', $params['id_permesso'])->where('id_dipendente', '=', $user->id_dipendente)->delete();
        return response()->json(['success' => true, 'data' => 'Permesso eliminato']);
    }

    public function getListaPermessiDipendente(Request $request){
        $params = $request->only('token');
        $user = CommonFunction::tokenToDipendente($params['token']);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }
        return $this->getPermessi($request, [$user->id_dipendente]);
    }

    public function getListaPermessiSubordinati(Request $request){
        $params = $request->only('token');
        $user = CommonFunction::tokenToDipendente($params['token']);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }
        $idList = Sottoposti::where('id_capo', '=', $user->id_dipendente)->pluck('id_dipendente')->toArray();
        return $this->getPermessi($request, $idList);
    }

    private function getPermessi(Request $request, $idList){
        $ruolo = JWTAuth::user()->ruolo;
        $rawPermessi;
        if($ruolo == 'manager'){
            $rawPermessi = Permessi::whereIn('id_dipendente', $idList)->with('dipendente')->get();
        }else{
            $rawPermessi = Permessi::whereIn('id_dipendente', $idList)->get();
        }
        $fixedPermessi = [];
        foreach($rawPermessi as $permesso){
            $data_inizio = new Carbon($permesso->data_inizio);
            $data_fine = new Carbon($permesso->data_fine);
            $element = [
                'id' => $permesso->id,
                'data_inizio' => $data_inizio->format('d-m-Y'),
                'data_fine' => $data_fine->format('d-m-Y'),
                'totale_giorni' => $data_inizio->diffInDays($data_fine, false),
                'stato_richiesta' => $permesso->stato,
                'certificatoBase64' => $permesso->certificatoBase64,
                'note' => $permesso->note
            ];
            if($ruolo == 'manager'){
                $element['codice_fiscale']=$permesso->dipendente->codice_fiscale;
                $element['nome']=$permesso->dipendente->nome;
                $element['cognome']=$permesso->dipendente->cognome;
            }
            array_push($fixedPermessi, $element);
        }
        return response()->json(['success' => true, 'data' => $fixedPermessi]);
    }

    public function registraPermesso(Request $request){
        $params = $request->all();
        $dataInizio = Carbon::createFromDate(
            $params['dataInizio']['year'], 
            $params['dataInizio']['month'],
            $params['dataInizio']['day']
        );  
        $dataFine = Carbon::createFromDate(
            $params['dataFine']['year'], 
            $params['dataFine']['month'],
            $params['dataFine']['day']
        );  
        $user = CommonFunction::tokenToDipendente($params['token']);
        
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else if($dataInizio > $dataFine){
            return response()->json(['success' => false, 'error' => 'Form non compilato correttamente, verifica i campi relativi alle date!']);
        }
        else{
            $soab = Carbon::now()->endOfDay()->toDateTimeString();
            $soab2 = Carbon::now()->toDateTimeString();
            $permesso = [
                'id_dipendente' => $user->id_dipendente,
                'data_inizio' => $dataInizio,
                'data_fine' => $dataFine,
                'note' => $params['note'],
                'tipologia' => $params['tipologia'],
                'stato' => 'pending',
                'certificatoBase64' => $params['certificatoBase64'],
            ];
            Permessi::create($permesso);
            return response()->json(['success' => true, 'data' => 'Permesso registrato']);
        }




        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }
        
        $dipendente = Dipendente::create([
            'nome' => $credentials['nome'], 
            'cognome' => $credentials['cognome'], 
            'email' => $credentials['email'], 
            'codice_fiscale' => $credentials['codiceFiscale'], 
            'data_nascita' => $credentials['dataDiNascita'], 
            'password' => Hash::make($credentials['password']),
            'is_verified' => 1
        ]);
    }


//deprecati

    public function generateMockData(Request $request)
    {
        //endpoint
        //http://localhost/angularproject/be/generateMockData

        //Empty DB
        DB::statement("SET foreign_key_checks=0");
        Dipendente::truncate();
        Sottoposti::truncate();
        Permessi::truncate();
        DB::statement("SET foreign_key_checks=1");
        
        //Fill DB
        $mockList = [
            [
                'nome' => 'Orazio',
                'cognome' => 'Contarino',
                'email' => 'ocontarino@gmail.com',
                'ruolo' => 'manager',
                'codice_fiscale' => 'cntrzo94p28c351t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Giovanni',
                'cognome' => 'Longo',
                'email' => 'aaa@gmail.com',
                'ruolo' => 'manager',
                'codice_fiscale' => 'cntrzo94p28c352t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Mario',
                'cognome' => 'Rossi',
                'email' => 'bbb@gmail.com',
                'ruolo' => 'dipendente',
                'codice_fiscale' => 'cntrzo94p28c353t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Turi',
                'cognome' => 'Bianchi',
                'email' => 'ccc@gmail.com',
                'ruolo' => 'dipendente',
                'codice_fiscale' => 'cntrzo94p28c354t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Carmelo',
                'cognome' => 'Verdi',
                'email' => 'ddd@gmail.com',
                'ruolo' => 'dipendente',
                'codice_fiscale' => 'cntrzo94p28c355t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
        ];

        $manager_id = null;
        $random_dipendente_id = null;
        foreach($mockList as $key => $value){
            $element = Dipendente::create($value);
            if($value['nome']=='Orazio'){
                $manager_id = $element->id_dipendente;
            }else if($value['nome']!='Giovanni'){
                Sottoposti::create([
                    'id_capo' => $manager_id,
                    'id_dipendente' => $element->id_dipendente,
                ]);
                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::now(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'ferie',
                    'stato' => 'approvato',
                    'certificatoBase64' => 'x'
                ]); 
                
                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::tomorrow(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'ferie',
                    'stato' => 'rifiutato',
                    'certificatoBase64' => 'x'
                ]); 

                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::yesterday(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'ferie',
                    'stato' => 'pending',
                    'certificatoBase64' => 'x'
                ]); 

                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::now(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'malattia',
                    'stato' => 'approvato',
                    'certificatoBase64' => 'x'
                ]); 
                
                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::tomorrow(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'malattia',
                    'stato' => 'rifiutato',
                    'certificatoBase64' => 'x'
                ]); 

                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::yesterday(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'malattia',
                    'stato' => 'pending',
                    'certificatoBase64' => 'x'
                ]); 
            }
        }

    }
}
