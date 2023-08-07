<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Layout;
use File;

class CreativeModeController extends Controller
{
    public function index()
    {
        //return view
        return inertia('creative-mode/CreativeMode');
    }

    public function store(Request $req){

        $this->validate($req, [
            'idUser'     => 'required|max:10',
            'layoutName'     => 'required|max:60',
            'layoutData'  => 'required',
            'imageLayout'  => 'required',
        ]);

        $saveFileTo = null;
        if ($req->imageLayout) {
            $folderPath = "images/";
            $base64Image = explode(";base64,", $req->imageLayout);
            $explodeImage = explode("image/", $base64Image[0]);
            $imageType = $explodeImage[1];
            $image_base64 = base64_decode($base64Image[1]);

            $fileName = uniqid() . '.'.$imageType;
            $saveFileTo = $folderPath . $fileName;

            //check for directory/folder
            $directoryPath = public_path().'/images';
            File::isDirectory($directoryPath) or File::makeDirectory($directoryPath, 0777, true, true);

            try {
                file_put_contents($saveFileTo, $image_base64);
            } catch (Throwable $e) {
                return back()->with(['error'=> $e]);
            }
        }

        try {
            $create = Layout::create([
                'id_user' => $req->idUser,
                'name_layout' => $req->layoutName,
                'preview_layout' => $fileName,
                'layout_data' => json_encode($req->layoutData),
            ]);
            return back()->with(['success'=> 'success saving layout, now you can run tes', 'data' => $create]);
        } catch (Throwable $e) {
            return back()->with(['error'=> $e]);
        }
    }

    public function update(Request $req,Layout $layout) {

        $this->validate($req, [
            'idUser'     => 'required|max:10',
            'layoutName'     => 'required|max:60',
            'layoutData'  => 'required',
            'imageLayout'  => 'required',
        ]);

        $findData = Layout::find($req->id);

        if($findData) {
            
            $fileName = "";
            if ($req->imageLayout) {
                $folderPath = "images/";
                $folderPathOld = public_path()."/images/";
                //delete old image
                $file_old = $folderPathOld.$findData->preview_layout;
                
                if(file_exists($file_old)){
                    unlink($file_old);
                }

                //upload new image
                $base64Image = explode(";base64,", $req->imageLayout);
                $explodeImage = explode("image/", $base64Image[0]);
                $imageType = $explodeImage[1];
                $image_base64 = base64_decode($base64Image[1]);

                $oldFileName = explode(".",$findData->preview_layout);
                $fileName = $oldFileName[0] . '.'.$imageType;
                $saveFileTo = $folderPath . $fileName;

                //check for directory/folder
                $directoryPath = public_path().'/images';
                File::isDirectory($directoryPath) or File::makeDirectory($directoryPath, 0777, true, true);
                
                try {
                    file_put_contents($saveFileTo, $image_base64);
                } catch (Throwable $e) {
                    return back()->with(['error'=> $e]);
                }
            }


            try {
                $findData->name_layout = $req->layoutName;
                $findData->preview_layout = $fileName != "" ? $fileName : null;
                $findData->layout_data = json_encode($req->layoutData);
                $findData->save();
                return back()->with(['success'=> 'success update layout, now you can run tes']);
            } catch (Throwable $e) {
                return back()->with(['error'=> $e]);
            }

        }


    }
}