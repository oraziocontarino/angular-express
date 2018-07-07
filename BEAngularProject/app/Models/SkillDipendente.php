<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillDipendente extends Model
{
    protected $table = 'skill_dipendente';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id';

    public $timestamps = false;
    
    protected $fillable = [
        'id_skill',
        'id_dipendente'
    ];

    public function skill()
    {
        return $this->hasMany('App\Models\Skill', 'id_skill', 'id_skill');
    }

    public function dipendente()
    {
        return $this->hasOne('App\Models\Dipendente', 'id_dipendente', 'id_dipendente');
    }
}
