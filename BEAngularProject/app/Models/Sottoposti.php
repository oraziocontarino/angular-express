<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sottoposti extends Model
{
    protected $table = 'sottoposti';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id';
    
    public $timestamps = false;
    
    protected $fillable = [
        'id_capo',
        'id_dipendente'
    ];

    public function dipendente()
    {
        return $this->hasOne('App\Models\Dipendente', 'id_dipendente', 'id_dipendente');
    }
    public function capo()
    {
        return $this->hasOne('App\Models\Dipendente', 'id_capo', 'id_dipendente');
    }
}
