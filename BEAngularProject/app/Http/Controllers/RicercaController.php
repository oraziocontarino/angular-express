<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Dipendente;
use App\Models\SkillDipendente;
use App\angularproject\CommonFunction;
use Illuminate\Support\Facades\Log;
class RicercaController extends Controller
{
    public function __construct()
    {}

    public function getRisulatatiRicerca(Request $request){
        $token = $request->get('token');
        $tipo_ricerca = $request->get('tipo_ricerca');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            if($tipo_ricerca == 'dipendenti'){
                $list = Dipendente::get();
                Log::debug(print_r($list->toArray(),true));
                //where("nome", "=", $nome)
                return response()->json([
                    'success' => true, 
                    'data'=> $list->toArray()
                ]);
            }
            else{
                $list = Team::with('teamDipendente')->with("teamCapoTeam")->get();
                Log::debug(print_r($list->toArray(),true));
                //where("nome", "=", $nome)
                return response()->json([
                    'success' => true, 
                    'data'=> $list->toArray()
                ]);
            }
        }
    }

    public function dipendenteInfo(request $request){
        $token = $request->get('token');
        $id_dipendente = $request->get('id_dipendente');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $list = SkillDipendente::where("id_dipendente", "=", $id_dipendente)->with('dipendente')->with('skill')->get();
            Log::debug(print_r($list->toArray(),true));
            //where("nome", "=", $nome)
            return response()->json([
                'success' => true, 
                'data'=> $list->toArray()
            ]);
        }
    }

}