@extends('layouts.app')

@section('content')

<style>
#DataTables_Table_0_filter>label {
  float: right !important;
}

#DataTables_Table_0_paginate>.pagination {
  float: right !important;
}
</style>

<h1 class="mt-4">{{ __('User Management') }}</h1>
<ol class="breadcrumb mb-4">
  <li class="breadcrumb-item"><a href="index.html">User Management</a></li>
  <li class="breadcrumb-item active"></li>
  <!-- <li class="breadcrumb-item active">{{ __('Dashboard') }}</li> -->
</ol>
<div class="container-fluid">
  <div class="row">
    <div class="col-md-12 px-0">
      <div class="card">
        <div class="card-header">{{ __('User Management') }}</div>

        <div class="card-body">
          @if (session('status'))
          <div class="alert alert-success" role="alert">
            {{ session('status') }}
          </div>
          @endif
          <div class="w-100" style="overflow-y: auto;">
            <table class="table table-bordered datatable-user">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col">Last Update</th>
                  <th scope="col">Layout created</th>
                  <th scope="col">option</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>21/2/2023</td>
                  <td>10</td>
                  <td>
                    <button class="btn btn-sm btn-success">info</button>
                    <button class="btn btn-sm btn-danger">Turn off account</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
<script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>

<script type="text/javascript">
$(function() {

  var table = $('.datatable-user').DataTable({
    processing: true,
    serverSide: true,
    ajax: "{{ route('getAllUserData') }}",
    columns: [{
        data: 'DT_RowIndex',
        name: 'DT_RowIndex'
      },
      {
        data: 'name',
        name: 'name'
      },
      {
        data: 'email',
        name: 'email'
      },
      {
        data: 'last_update',
        name: 'last_update'
      },
      {
        data: 'count_layout',
        name: 'count_layout'
      },
      {
        data: 'action',
        name: 'action'
      },
    ]
  });

});
</script>
@endsection