<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectTo()
    {
        $user = Auth::user()->roles;
        if($user == 3) {
            $this->redirectTo = "/creative-mode";
            return $this->redirectTo;
        }else{
            $this->redirectTo = RouteServiceProvider::HOME;
            return $this->redirectTo;
        }
    }

    // protected function attemptLogin(Request $request)
    // {   


        // if( $this->guard()->attempt(
        //     $this->credentials($request), $request->filled('remember')
        // ) ) { // Credential auth was successful
        //     // Get user model
        //     $user = Auth::user();
        //     if($user->roles == 1){
        //         return true;
        //     };
        //     return route('logout');
            
        // }

        // return false;


    // }
}