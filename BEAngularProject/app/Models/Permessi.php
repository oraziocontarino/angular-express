<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
class Permessi extends Model
{
    protected $table = 'permessi';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id';
    
    public $timestamps = false;
    
    protected $fillable = [
        'id_dipendente',
        'data_inizio',
        'data_fine',
        'note',
        'tipologia',
        'stato',
        'certificatoBase64'
    ];
    protected $dates = [
        'data_inizio',
        'data_fine'
    ];
    public function dipendente()
    {
        return $this->hasOne('App\Models\Dipendente', 'id_dipendente', 'id_dipendente');
    }

    public static function getPermessiEnumArray(){
        $type = DB::select(DB::raw('SHOW COLUMNS FROM permessi WHERE Field = "tipologia"'))[0]->Type;
        preg_match('/^enum\((.*)\)$/', $type, $matches);
        $values = array();
        foreach(explode(',', $matches[1]) as $value){
            $values[] = trim($value, "'");
        }
        return $values;
    }
}
