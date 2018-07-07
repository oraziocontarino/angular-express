<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
class Dipendente extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'dipendente';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_dipendente';

    public $timestamps = false;
    
    protected $fillable = [
        'nome',
        'cognome',
        'email',
        'ruolo',
        'codice_fiscale',
        'data_nascita',
        'email',
        'password',
        'iban',
        'banca',
        'bbc',
        'is_verified'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public function sottoposti()
    {
        return $this->hasMany('App\Sottoposti', 'id_capo', 'id_dipendente');
    }

    public function skill()
    {
        return $this->hasMany('App\Models\SkillDipendente', 'id_dipendente', 'id_dipendente');
    }

    public function teamDipendente(){
        return $this->hasMany('App\TeamDipendente', 'id_capo_team', 'id_dipendente');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
