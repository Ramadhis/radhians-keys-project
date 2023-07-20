<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Layout;
use Illuminate\Support\Facades\Auth;
class MylayoutController extends Controller
{
    public function index() {

        if(Auth::check()){
            $listLayout = Layout::select('id','id_user', 'name_layout', 'preview_layout','updated_at')->where('id_user',Auth::user()->id)->orderByDesc("id")->get();
            return response()->json(['data' => $listLayout]);
        }
        return response()->json(['error' => "auth failed"]);
    }

    public function deleteLayout($id) {
        if(Auth::check()){
            $findData = Layout::find($id);
            if($findData) {
                if($findData->id_user == Auth::user()->id){
                    $folderPathOld = public_path()."/images/";
                    //delete old image
                    $file_old = $folderPathOld.$findData->preview_layout;
                    
                    if(file_exists($file_old)){
                        unlink($file_old);
                    }
                    
                    $del = $findData->delete();
                    return response()->json(['success' => $del]);
                }
            }
        }
        return response()->json(['error' => "auth failed"]);
    }

    public function loadLayout($id) {
        try {
            $findData = Layout::find($id);
            if ($findData) {
                return response()->json(['data' => $findData]);
            }
        } catch (Throwable $e) {
            return back()->with(['error'=> $e]);
        }

    }


}