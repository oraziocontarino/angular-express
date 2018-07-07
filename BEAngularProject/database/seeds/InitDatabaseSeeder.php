<?php

use Illuminate\Database\Seeder;
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

class InitDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        self::initGestioneDipendenti();
        self::initGestionePermessi();
    }

    private function initGestionePermessi(){
        DB::statement("SET foreign_key_checks=0");
        Permessi::truncate();
        Sottoposti::truncate();
        DB::statement("SET foreign_key_checks=1");
        self::initPermessi();
        self::initSottoposti();
    }

    private function initPermessi(){
        Permessi::create([
            'id_dipendente' => 2,
            'note' => 'Emicrania',
            'tipologia' => 'malattia',
            'stato' => 'approvato',
            'certificatoBase64' => 'data:text/plain;base64,Q2VydGlmaWNhdG8gZGkgcHJvdmEhDQpIZWxsbyBDZXJ0aWZpY2F0by4=',
            'data_inizio' => Carbon::now(),
            'data_fine' => Carbon::now()->addDays(10)
        ]);
                
        Permessi::create([
            'id_dipendente' => 2,
            'note' => 'Emicrania',
            'tipologia' => 'malattia',
            'stato' => 'rifiutato',
            'certificatoBase64' => 'data:text/plain;base64,Q2VydGlmaWNhdG8gZGkgcHJvdmEhDQpIZWxsbyBDZXJ0aWZpY2F0by4=',
            'data_inizio' => Carbon::now(),
            'data_fine' => Carbon::now()->addDays(10)
        ]);
                
        Permessi::create([
            'id_dipendente' => 2,
            'note' => 'Emicrania',
            'tipologia' => 'malattia',
            'stato' => 'pending',
            'certificatoBase64' => 'data:text/plain;base64,Q2VydGlmaWNhdG8gZGkgcHJvdmEhDQpIZWxsbyBDZXJ0aWZpY2F0by4=',
            'data_inizio' => Carbon::now()->addDays(10),
            'data_fine' => Carbon::now()->addDays(20)
        ]);
    }
    private function initSottoposti(){
        Sottoposti::create([
            'id_capo' => 1,
            'id_dipendente' => 2
        ]);
    }


    private function initGestioneDipendenti(){
        DB::statement("SET foreign_key_checks=0");
        Dipendente::truncate();
        SkillDipendente::truncate();
        Team::truncate();
        TeamDipendente::truncate();
        Skill::truncate();
        DB::statement("SET foreign_key_checks=1");

        $output = self::generateDipendenteAndSkills();
        $capo_team = $output['capo_team'];
        $dipendente = $output['dipendente'];
        self::generateTeams($capo_team, $dipendente);
        self::generateSkills();
    }
    private function generateDipendenteAndSkills(){
        $mockList = [
            [
                'nome' => 'Orazio',
                'cognome' => 'Contarino',
                'email' => 'ocontarino@gmail.com',
                'codice_fiscale' => 'CNTRZO94P28C351T',
                'data_nascita' => Carbon::now(),
                'password' => Hash::make('prova123'),
                'iban' => '53535535353535353',
                'banca' => 'Poste Italiane',
                'bbc' => 'prova',
                'ruolo' => 'manager',
                'is_verified' => 1
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
                'ruolo' => 'dipendente',
                'is_verified' => 1
            ]
        ];
        $output = [];
        foreach($mockList as $key => $value){
            $element = Dipendente::create($value);
            SkillDipendente::create([
                'id_dipendente' => $element->id_dipendente,
                'id_skill' => '1'
            ]);
            if($value['nome'] == 'Giovanni'){
                $output['capo_team'] = $element->id_dipendente;          
            }else{
                $output['dipendente'] = $element->id_dipendente;
            }
        }
        return $output;
    }

    private function generateTeams($capo_team, $dipendente){
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

    private function generateSkills(){
        $skillMockList = [
            ['nome' => 'Angular'],
            ['nome' => 'Java'],
            ['nome' => 'PHP']
        ];
        foreach($skillMockList as $key => $value){
            $element = Skill::create($value);
        }
    }
}
