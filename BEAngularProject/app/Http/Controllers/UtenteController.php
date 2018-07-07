<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\angularproject\CommonFunction;
use App\Models\Dipendente;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Validator, JWTAuth;

class UtenteController extends Controller
{
    public function __construct()
    {}
    
    public function checkPasswordUtente(Request $request){
        $credentials = $request->only('codice_fiscale', 'password');
        
        $rules = [
            'codice_fiscale' => 'required',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json([
                'success' => false, 
                'error' => "La password inserita è errata" 
            ]);
        }
        try {
            // attempt to verify the credentials and create a token for the Dipendente
            if (! $token = JWTAuth::attempt($credentials)) {
                /* return response()->json(['success' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 401); */
                return response()->json(['success' => false, 'error' => 'La password inserita è errata']);
            }else{
                return response()->json(['success' => true]);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
        }
    }

       /*  $utente = Dipendente::where([["id_dipendente", "=", $user->id_dipendente],
        ["password","=",$password]
        ])->get();
        if(!count($utente)){
            return response()->json([
                'success' => false, 
                'error' => "La password inserita è errata" 
            ]); 
        }else{
            return response()->json([
                'success' => true, 
            ]); 
        } */
    

    public function updateUser(Request $request){
        $user = CommonFunction::tokenToDipendente($request->get('token'));

        $nome = $request->get('nome');
        $cognome = $request->get('cognome');
        $email= $request->get('email');
        $data_nascita=new Carbon($request->get('dataDiNascita'));
        $iban=$request->get('iban');
        $banca=$request->get('banca');
        $bbc=$request->get('bbc');
        $vecchiaPassword=$request->get('vecchiaPassword');
        $nuovaPassword=$request->get('nuovaPassword');
        $ripetiNuovaPassword=$request->get('ripetiNuovaPassword');
        
       // $vecchiaPassword=($request->get('vecchiaPassword'));
      //  $nuovaPassword=($request->get('nuovaPassword'));
       // $ripetiNuovaPassword=($request->get('ripetiNuovaPassword'));
        if(!empty($vecchiaPassword)){
            if(!Hash::check($vecchiaPassword, $user->password)){
                return response()->json(['success' => false, 'error' => 'La vecchia password e\' errata!']);
            }else if(empty($nuovaPassword) || empty($ripetiNuovaPassword)){
                return response()->json(['success' => false, 'error' => 'Questa nuova password non puo\' essere impostata!']);
            }else if($nuovaPassword != $ripetiNuovaPassword){
                return response()->json(['success' => false, 'error' => 'Le password non coincidono!']);
            }
            $nuovaPassword = Hash::make($nuovaPassword);
        }else{
            $nuovaPassword = $user->password;
        }



        Dipendente::where([["id_dipendente", "=", $user->id_dipendente]])
        ->update([
            "nome" => $nome,
            "cognome" => $cognome,
            "email"=> $email,
            "iban"=>$iban,
            "data_nascita"=> $data_nascita,
            "banca"=>$banca,
            "bbc"=>$bbc,
            "password"=>$nuovaPassword
        ]);

        return response()->json([
            'success' => true, 
        ]);
    }

    public function addUser(Request $request){
        $user = CommonFunction::tokenToDipendente($request->get('token'));

        $nome = $request->get('nome');
        $cognome = $request->get('cognome');
        $email= $request->get('email');
        $password=Hash::make($request->get('password'));
        $codice_fiscale=$request->get('codice_fiscale');
        $ruolo=$request->get('ruolo');
        $data_nascita = new Carbon($request->get('data'));
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $utente = Dipendente::where("codice_fiscale","=",$codice_fiscale)->get();
            if(!count($utente)){
                $utente = Dipendente::where("email","=",$email)->get();
                if(!count($utente)){
                    $utente = Dipendente::create([
                        'nome'=> $nome,
                        'cognome'=> $cognome,
                        'email'=>$email,
                        'password'=>$password,
                        'codice_fiscale'=>$codice_fiscale,
                        'ruolo'=>$ruolo,
                        'data_nascita' => $data_nascita,
                        'iban' => 'iban',
                        'banca' => 'Poste Italiane',
                        'bbc' => 'bbc',
                        'is_verified' => '1']);
                    return response()->json([
                        'success' => true, 
                        'data' => $utente->toArray()
                    ]);   
                }else{
                    return response()->json([
                        'success' => false, 
                        'error' => 'Email già presente'
                    ]); 
                } 
            }else{
                return response()->json([
                    'success' => false, 
                    'error' => 'Codice Fiscale già presente'
                ]); 
            }
        }
    }
    
}