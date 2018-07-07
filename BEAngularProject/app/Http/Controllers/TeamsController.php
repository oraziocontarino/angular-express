<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\angularproject\CommonFunction;
use App\Models\Team;
use App\Models\TeamDipendente;
class TeamsController extends Controller
{
    public function __construct()
    {}

    public function getTeam(Request $request){
        $token = $request->get('token');
        $id_team = $request->get('id_team');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $team = Team::where("id_team", "=", $id_team)->with('teamDipendente.dipendente.skill.skill')->with("teamCapoTeam")->get();
            return response()->json([
                'success' => true, 
                'data'=> $team->toArray()
            ]);
        }
    }

    public function deleteEmployerInTeam(Request $request){
        $token = $request->get('token');
        $id_team = $request->get('id_team');
        $id_dipendente = $request->get('id_dipendente');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            TeamDipendente::where([["id_team","=", $id_team],
            ["id_dipendente", "=", $id_dipendente]])->delete();
        }
        return response()->json([
            'success' => true, 
        ]);
    }

    public function addEmployerInTeam(Request $request){
        $token = $request->get('token');
        $id_team = $request->get('id_team');
        $id_dipendente = $request->get('id_dipendente');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            TeamDipendente::create([
                'id_team'=> $id_team,
                'id_dipendente'=> $id_dipendente]);
        }
        return response()->json([
            'success' => true, 
        ]);
    }

    
    public function addTeam(Request $request){
        $token = $request->get('token');
        $nome_team = $request->get('nome_team');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{

            $team = Team::where([
                ['nome','=',$nome_team],
                ['id_capo_team','=',$user->id_dipendente]
            ])->get();
            if(!count($team)){
                $team = Team::create([
                    'nome'=> $nome_team,
                    'id_capo_team'=> $user->id_dipendente]);
                return response()->json([
                    'success' => true, 
                    'data' => $team->toArray()
                ]);    
            }
            else{
                return response()->json([
                    'success' => false, 
                    'error' => 'Nome team già presente'
                ]); 
            }
        }
    }
}