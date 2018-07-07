<?php
/**
 * Autobot project.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Dipendente;
use App\Models\Permessi;
use App\Models\Sottoposti;
use App\Models\Skill;
use App\Models\SkillDipendente;
use App\Models\Team;
use App\Models\TeamDipendente;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
/**
 *
 *@deprecated See WebHookVotaController
 */
class SkillAndTeamController extends Controller
{
    public function __construct()
    {
    }
    public function generateMockDataGiovanni(Request $request)
    {
/*         Dipendente::truncate();
        Permessi::truncate();
        Skill::truncate();
        SkillDipendente::truncate();
        Team::truncate();
        TeamDipendente::truncate(); */

        $skillMockList = [
            ['nome' => 'Angular'],
            ['nome' => 'Java'],
            ['nome' => 'PHP']
        ];

        $mockList = [
            [
                'nome' => 'Orazio',
                'cognome' => 'Contarino',
                'email' => 'ocontarino@gmail.com',
                'codice_fiscale' => 'ORZCNT93P12C351Q',
                'data_nascita' => Carbon::now(),
                'password' => Hash::make('prova123'),
                'iban' => '53535535353535353',
                'banca' => 'Poste Italiane',
                'bbc' => 'prova',
                'ruolo' => 'manager'
            ],
            [
                'nome' => 'Giovanni',
                'cognome' => 'Longo',
                'email' => 'giovanniemanuelelongo@gmail.com',
                'codice_fiscale' => 'LNGGNN93P12C351O',
                'data_nascita' => Carbon::now(),
                'password' => Hash::make('prova321'),
                'iban' => '535355353353',
                'banca' => 'Poste Italiane',
                'bbc' => 'prova',
                'ruolo' => 'dipendente'
            ],
        ];
        foreach($skillMockList as $key => $value){
            $element = Skill::create($value);
        }

        $capo_team = null;
        $utente = null;
        foreach($mockList as $key => $value){
            $element = Dipendente::create($value);
            SkillDipendente::create([
                'id_dipendente' => $element->id_dipendente,
                'id_skill' => '1'
            ]);
            if($value['nome'] == 'Giovanni'){
                $capo_team = $element->id_dipendente;          
            }else{
                $dipendente = $element->id_dipendente;
            }
        }
        
        Team::create([
            'nome' => 'Capitan America',
            'id_capo_team' => $capo_team
        ]);
        Team::create([
            'nome' => 'Iron Man',
            'id_capo_team' => $capo_team
        ]);

        TeamDipendente::create([
            'id_dipendente' => $dipendente,
            'id_team' => '1'
        ]);
    }

}