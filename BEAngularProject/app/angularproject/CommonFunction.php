<?php

namespace App\angularproject;
use JWTAuth;

class CommonFunction{

    public static function tokenToDipendente($token){
        try {
            return JWTAuth::setToken($token)->toUser();
        } catch (\Exception $e) {
            return null;
        }
    }

    public static function genericUnauthorizedAccess(){
        return response()->json(['success' => false, 'error' => 'Unauthorized access!'], 401);
    }

}