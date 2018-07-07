<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $table = 'team';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_team';

    public $timestamps = false;
    
    protected $fillable = [
        'nome',
        'id_capo_team'
    ];

    public function teamDipendente()
    {
        return $this->hasMany('App\Models\TeamDipendente', 'id_team', 'id_team');
    }

    public function teamCapoTeam()
    {
        return $this->hasMany('App\Models\Dipendente', 'id_dipendente', 'id_capo_team');
    }
}
