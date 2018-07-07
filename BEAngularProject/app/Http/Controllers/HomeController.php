<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\angularproject\CommonFunction;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {}

    public function getDatiUtente(Request $request){
        /* $request->only("token","nome")*/
        $token = $request->get("token");
        $utente = CommonFunction::tokenToDipendente($token);
        return response()->json([
            'success' => true, 
            'data'=> $utente->toArray()
        ]);
    }
}
