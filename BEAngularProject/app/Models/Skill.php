<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $table = 'skill';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_skill';

    public $timestamps = false;
    
    protected $fillable = [
        'nome'
    ];

    public function skillDipendente()
    {
        return $this->hasOne('App\SkillDipendente', 'id_skill', 'id_skill');
    }
}
