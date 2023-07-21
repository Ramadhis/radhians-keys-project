<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TransController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\admin\AdmindashboardController;
use App\Http\Controllers\admin\UserManagementController;
use App\Http\Controllers\KeyboardTesController;
use App\Http\Controllers\CreativeModeController;
use App\Http\Controllers\MylayoutController;
use App\Http\Controllers\AuthClient\RegisterClientController;
use App\Http\Controllers\AuthClient\LoginClientController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Middleware\CheckRoles;
use App\Http\Controllers\AuthClient\ForgotPasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
// Route::resource('/posts', PostController::class);
route::resource('/layout', CreativeModeController::class);


// Auth::routes();


// Route::post('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/', [KeyboardTesController::class, 'index']);
Route::get('/keyboard-tes/{id}', [KeyboardTesController::class, 'selectedlayouts']);
Route::get('/creative-mode', [CreativeModeController::class, 'index'])->name('creative');
Route::put('/layout', [CreativeModeController::class, 'update'])->name('update-layout');
Route::post('/register-user', [RegisterClientController::class, 'create']);
Route::post('/login-user', [LoginClientController::class, 'login']);
Route::post('/logout-user', [LoginClientController::class, 'destroy'])->middleware('auth');
Route::get('/my-layout', [MylayoutController::class,'index'])->name('my-layout');
Route::delete('/my-layout/{id}', [MylayoutController::class,'deleteLayout'])->name('my-layout-delete');
Route::get('/loadLayout/{id}', [MylayoutController::class,'loadLayout'])->name('load-layout');

//admin
Route::get('/admin-dashboard-radhians', [LoginController::class, 'showLoginForm'])->name('admin-dashboard-radhians');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::post('/submitforgotpassword', [ForgotPasswordController::class, 'submitForgotPassword'])->name('submitForgotPassword');
Route::get('/resetpassword/{token}', [ForgotPasswordController::class, 'resetPassword'])->name('resetpassword');
Route::post('/resetpassword', [ForgotPasswordController::class, 'submitResetPassword'])->name('submitresetpassword');


Route::middleware(['auth'])->group(function(){
  Route::post('/update-user', [RegisterClientController::class, 'update']);
  Route::post('/change-password', [RegisterClientController::class, 'changePassword']);

});

//must authenticate administrator roles
//check middleware checkroles in kernel
Route::middleware(['checkRoles', 'auth'])->group(function(){
  Route::get('/usermanagement', [UserManagementController::class, 'index'])->name('usernamagement');
  Route::get('/getAllUserData', [UserManagementController::class, 'getAllUserData'])->name('getAllUserData');
  Route::get('/dashboard', [AdmindashboardController::class, 'index'])->name('dashboard');
  
});