<?php

namespace App\Http\Controllers\AuthClient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB; 
use Carbon\Carbon; 
use App\Models\User; 
use Mail;
use App\Mail\MailNotify;
use Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ForgotPasswordController extends Controller
{
    public function submitForgotPassword (Request $req) {
        $this->validate($req, [
            'email'     => 'required|email|exists:users|max:40',
        ],[
            'email.exists' => 'The provided credentials do not match our records.',
        ]);
        $token = Str::random(64);
        $data = [
            'subject' => 'Forgot password',
            'body' => '',
            'token' => $token,
        ];
        try {


            Mail::to($req->email)->send(new MailNotify($data));
            // return response()->json(['oke aja']);
            DB::table('password_resets')->insert([
                'email' => $req->email,
                'token' => $token, 
                'created_at' => Carbon::now()
            ]);
            
            return back()->with('forgotpassword', 'We have e-mailed your password reset link!. you can close this');
        } catch (Exception $th) {
            // return response()->json(['err']);
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

    }

    public function resetPassword($token) {

        $findwithToken = DB::table('password_resets')->where('token', $token)->first();

        if($findwithToken){
            return inertia('Auth/ResetPassword',['token' => $token]);
        }else{
            abort(404);
        }
        
    }

    public function submitResetPassword(Request $req) {
        
        $req->validate([
            'password' => 'required|string|min:6|max:60',
            'confirm_password' => 'required|same:password|min:6|max:60'
        ]);

        $findwithToken = DB::table('password_resets')->where('token', $req->token)->first();
        if($findwithToken){
            $updatePassword = User::where('email', $findwithToken->email)->update(['password' => Hash::make($req->password)]);
            //get email and password from request
            
            if (Auth::attempt(['email' => $findwithToken->email, 'password' => $req->password])) {
                DB::table('password_resets')->where(['email'=> $findwithToken->email])->delete();
                //regenerate session
                $req->session()->regenerate();

            //redirect route dashboard
            // return to_route('creative');
            return redirect('/creative-mode')->with('success', 'Success change Account password!');
            }
        }

        return back()->withErrors([
            'password' => 'invalid token',
        ]);
        // return true;
    }
}