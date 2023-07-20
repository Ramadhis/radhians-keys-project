@extends('layouts.app')

@section('content')
<h1 class="mt-4">{{ __('Dashboard') }}</h1>
<ol class="breadcrumb mb-4">
  <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
  <li class="breadcrumb-item active">{{ __('Dashboard') }}</li>
  <!-- <li class="breadcrumb-item active">{{ __('Dashboard') }}</li> -->
</ol>
<div class="container-fluid">
  <div class="row">
    <div class="col-xl-3 col-md-6 ms-0 ps-0">
      <div class="card bg-primary text-white mb-4">
        <div class="card-body pb-1">Total User</div>

        <div class="card-footer d-flex align-items-center justify-content-between">
          <div class="h3">180</div>
          <!-- <div class="small text-white"><i class="fas fa-angle-right"></i></div> -->
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 ms-0 ps-0">
      <div class="card bg-primary text-white mb-4">
        <div class="card-body pb-1">User registered</div>

        <div class="card-footer d-flex align-items-center justify-content-between">
          <div class="h3">180</div>
          <!-- <div class="small text-white"><i class="fas fa-angle-right"></i></div> -->
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 ms-0 ps-0">
      <div class="card bg-primary text-white mb-4">
        <div class="card-body pb-1">Layout Created</div>

        <div class="card-footer d-flex align-items-center justify-content-between">
          <div class="h3">180</div>
          <!-- <div class="small text-white"><i class="fas fa-angle-right"></i></div> -->
        </div>
      </div>
    </div>

    <div class="row pe-0">
      <div class="col-md-12 px-0">
        <div class="card me-0">
          <div class="card-header">{{ __('Dashboard') }}</div>

          <div class="card-body">
            @if (session('status'))
            <div class="alert alert-success" role="alert">
              {{ session('status') }}
            </div>
            @endif

            {{ __('Login berhasil') }}
          </div>
        </div>
      </div>
    </div>
  </div>
  @endsection