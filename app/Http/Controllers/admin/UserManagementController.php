<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Layout;
use App\Models\User;
use DataTables;

class UserManagementController extends Controller
{
    public function index() {
        return view('admin/usermanagement');
    }

    public function getAllUserData(Request $req) {
        if ($req->ajax()) {
            $data = User::latest()->get();
            return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('last_update', function ($data) {
                    $updated_at = strtotime($data->updated_at);
                    return date('d-m-Y', $updated_at);
                })
                ->addColumn('count_layout', function($data){
                    $layout = 0;
                    $layout = Layout::where('id_user',$data->id)->get();
                    return $layout->count();
                })
                ->addColumn('action', function($data){
                    $actionBtn = '<a class="btn btn-sm btn-success">info</a>
                    <a class="btn btn-sm btn-danger">Turn off account</a>';
                    return $actionBtn;
                })
                ->rawColumns(['action'])
                ->make(true);
        }
    }
}