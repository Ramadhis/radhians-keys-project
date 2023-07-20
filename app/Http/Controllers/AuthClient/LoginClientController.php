<?php

namespace App\Http\Controllers\AuthClient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginClientController extends Controller
{
    public function login(Request $req) {

        //get email and password from request
        $credentials = $req->only('email', 'password');
        
        $this->validate($req, [
            'email'     => 'required|email|max:60',
            'password'  => 'required|min:6|max:60',
        ]);
        
        //attempt to login
        if (Auth::attempt($credentials)) {

            //regenerate session
            $req->session()->regenerate();

            //redirect route dashboard
            // return to_route('creative');
            return back()->with('success', 'Login Berhasil !');
        }

        //if login fails
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function destroy()
    {
        auth()->logout();

        return back()->with('success', 'Logout Berhasil !');
    }
}