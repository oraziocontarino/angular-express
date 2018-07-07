<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Dipendente;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB, Hash, Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use App\angularproject\CommonFunction;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * API Register
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $credentials = $request->only(
            'nome', 
            'cognome', 
            'email', 
            'codiceFiscale', 
            'dataDiNascita', 
            'password'
        );       
        
        $rules = [
            'nome' => 'required|max:255',
            'cognome' => 'required|max:255',
            'email' => 'required|email|max:255',
            'codiceFiscale' => 'required|max:16|unique:dipendente',
            'dataDiNascita' => 'required|max:255',
            'password' => 'required|max:255'
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }
        
        $dipendente = Dipendente::create([
            'nome' => $credentials['nome'], 
            'cognome' => $credentials['cognome'], 
            'email' => $credentials['email'], 
            'codice_fiscale' => $credentials['codiceFiscale'], 
            'data_nascita' => $credentials['dataDiNascita'], 
            'password' => Hash::make($credentials['password']),
            'is_verified' => 1
        ]);
        /*
        $verification_code = str_random(30); //Generate verification code
        DB::table('dipendente_verifications')->insert(['dipendente_id'=>$dipendente->id,'token'=>$verification_code]);
        $subject = "Please verify your email address.";
        Mail::send('email.verify', ['name' => $name, 'verification_code' => $verification_code],
            function($mail) use ($email, $name, $subject){
                $mail->from(getenv('FROM_EMAIL_ADDRESS'), "From Dipendente/Company Name Goes Here");
                $mail->to($email, $name);
                $mail->subject($subject);
            });
        return response()->json(['success'=> true, 'message'=> 'Thanks for signing up! Please check your email to complete your registration.']);
        */
        return response()->json(['success'=> true, 'message'=> 'Registrazione completata! Da questo momento potrai accedere al tuo pannello personale.']);
    }

    /**
     * API Verify Dipendente
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyDipendente($verification_code)
    {
        $check = DB::table('Dipendente_verifications')->where('token',$verification_code)->first();
        if(!is_null($check)){
            $dipendente = Dipendente::find($check->Dipendente_id);
            if($dipendente->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }
            $dipendente->update(['is_verified' => 1]);
            DB::table('Dipendente_verifications')->where('token',$verification_code)->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'You have successfully verified your email address.'
            ]);
        }
        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);
    }

    /**
     * API Login, on success return JWT Auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('codice_fiscale', 'password');
        
        $rules = [
            'codice_fiscale' => 'required',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }
        
        $credentials['is_verified'] = 1;
        
        try {
            // attempt to verify the credentials and create a token for the Dipendente
            if (! $token = JWTAuth::attempt($credentials)) {
                /* return response()->json(['success' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 401); */
                return response()->json(['success' => false, 'error' => 'Dati errati']);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Si e\' verificato un errore, riprova.'], 500);
        }
        // all good so return the token
        //return response()->json(['success' => true, 'data'=> [ 'token' => $token ]]);
                // all good so return user info

        try{
            $user = Auth::user();
            return response()->json([
                'success' => true, 
                'data'=> [ 
                    'token' => $token,
                    'nome' => $user->nome,
                    'cognome' => $user->cognome,
                    'ruolo' => $user->ruolo,
                    'email'=>$user->email,
                    'codiceFiscale'=>$user->codice_fiscale,
                    'dataDiNascita'=> $data = ((new Carbon($user->data_nascita))->format('Y-m-d')),
                    'iban'=>$user->iban,
                    'banca'=>$user->banca,
                    'bbc'=>$user->bbc,
                    'id'=>$user->id_dipendente
                ]
            ]);
        }catch(\Exception $e){
            return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
        }
    }
    /**
     * Log out
     * Invalidate the token, so Dipendente cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => true, 'message'=> "You have successfully logged out."]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }
    }

     /**
     * API Recover Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recover(Request $request)
    {
        $dipendente = Dipendente::where('email', $request->email)->first();
        if (!$dipendente) {
            $error_message = "Your email address was not found.";
            /* return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);*/
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]]);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            /* return response()->json(['success' => false, 'error' => $error_message], 401); */
            return response()->json(['success' => false, 'error' => $error_message]);
        }
        return response()->json([
            'success' => true, 'data'=> ['message'=> 'A reset email has been sent! Please check your email.']
        ]);
    }

    public function testUserLogged(Request $request){
        $token = $request->only("token");
        try {
            if (! $tokenObject = JWTAuth::parseToken()) {
                return response()->json(['success' => false, 'error' => 'Token is invalid.'], 500);
            }
            $user = JWTAuth::toUser($tokenObject);
            return response()->json(['success' => true, 'data'=> [ 'token' => $token ]]);
        } catch (\Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['success' => false, 'error' => 'Token is invalid.'], 500);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['success' => false, 'error' => 'Token has expired.'], 500);
            } else if ( $e instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
                return response()->json(['success' => false, 'error' => 'JWTException error.'], 500);
            }else{
                return response()->json(['success' => false, 'error' => 'Generic error.'], 500);
            }
        }
    }


    public function validateToken(Request $request){
        $token = $request->get('token');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            return response()->json([
                'success' => true, 
                'data'=> [ 
                    'token' => $token,
                    'nome' => $user->nome,
                    'cognome' => $user->cognome,
                    'ruolo' => $user->ruolo,
                    'email'=>$user->email,     
                    'codiceFiscale'=>$user->codice_fiscale,
                    'dataDiNascita'=>$data = ((new Carbon($user->data_nascita))->format('Y-m-d')),
                    'iban'=>$user->iban,
                    'banca'=>$user->banca,
                    'bbc'=>$user->bbc,
                    'id'=>$user->id_dipendente
                ]
            ]);
        }
    }
}