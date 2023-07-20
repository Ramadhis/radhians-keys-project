<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Layout;

class KeyboardTesController extends Controller
{
    public function index()
    {
        $layoutData = Layout::whereNotNull('layout_data')->first();
        //return view
        return inertia('keyboard-tes/KeyboardTes', [
            'layoutData' => $layoutData,
        ]);
    }

    public function selectedlayouts($id) {
        $layoutData = Layout::find($id);
        //return view
        if($layoutData){
            return inertia('keyboard-tes/KeyboardTes', [
                'layoutData' => $layoutData,
            ]);
        }else {
            //layoutData not found
            return false;
        }

    }



}