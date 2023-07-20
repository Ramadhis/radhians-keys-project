<?php

namespace App\Http\Controllers\AuthClient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use DB; 

class RegisterClientController extends Controller
{
    public function create (Request $req) {

        $this->validate($req, [
            'name' => 'required|min:3|max:60',
            'email'     => 'required|min:3|email|max:60',
            'password'  => 'required|min:6|max:60',
            'confirm_password' => 'required|same:password|min:6|max:60'
        ]);

        $checkEmailRegistered = User::where('email',$req['email'])->first();

        if(!$checkEmailRegistered){
            $create = User::create([
                'name' => $req['name'],
                'email' => $req['email'],
                'roles' => 3,
                'password' => Hash::make($req['password']),
            ]);
        }else{
            //if login fails
            return back()->withErrors([
                'email' => 'Email has been used, please try with another email',
            ]);
        }

        
        if($create){
            $credentials = $req->only('email', 'password');
            //attempt to login
            if (Auth::attempt($credentials)) {

                //regenerate session
                $req->session()->regenerate();

            //redirect route dashboard
            // return to_route('creative');
            return back()->with('success', 'Success create Account & Login !');
            }
            
            //if login fails
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }
        //redirect
        // return redirect()->route('creative')->with('success', 'Data Berhasil Disimpan!');
        return back()->with('success', 'Data Berhasil Disimpan!');
    }

    public function update (Request $req) { 
        $this->validate($req, [
            'name' => 'required|min:3|max:60',
            'email'     => 'required|min:3|email|max:60',
        ]);

        $find = User::find(Auth::user()->id);

        if($find) {
            $find->name = $req->name;
            $find->email = $req->email;
            $find->save();
            return back()->with(['success'=> 'success update account']);
        }
        return back()->with(['error'=> 'failed update account']);
    }

    public function changePassword(Request $req) {
        $req->validate([
            'currentPassword' => 'required|min:6|max:60',
            'newPassword' => 'required|min:6|max:60',
            'confirmNewPassword' => 'required|same:newPassword|min:6|max:60'
        ]);

        $email = Auth::user()->email;
        $accountData = DB::table('users')->where('email', $email)->first();

        if($accountData){
            if(Hash::check($req->currentPassword,$accountData->password)){
                $updatePassword = User::where('email', $accountData->email)->update(['password' => Hash::make($req->newPassword)]);
                return back()->with('success', 'success change password');
            }
            return back()->withErrors([
                'currentPassword' => 'wrong current password!',
            ]);
        }

        return back()->withErrors([
            'currentPassword' => 'invalid account!!',
        ]);

    }
}