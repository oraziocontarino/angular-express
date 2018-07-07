<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommonController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getToken()
    {
        return response(json_encode(["_token" => csrf_token()]), 200);
    }
    public function customLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
    }
}
