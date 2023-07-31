<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
  <link href="{{ asset('assets/css/styles-template.css')}}" rel="stylesheet">
  <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>

</head>

<body>
  <div id="layoutAuthentication_content">
    <main>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
              <!-- <div class="card-header">
                <h3 class="text-center font-weight-light my-4">Login</h3>
              </div> -->
              <h3 class="text-center font-weight-light my-4">Login</h3>
              <div class="card-body">
                <form method="POST" action="{{ route('login') }}">
                  @csrf

                  <div class="row mb-3">



                    <div class="col-md-12 mb-3">

                      <div class="form-floating mb-1">
                        <input id="inputEmail" type="email" class="form-control @error('email') is-invalid @enderror"
                          name="email" value="{{ old('email') }}" placeholder="name@example.com" required>
                        <label for="inputEmail">{{ __('Email Address') }}</label>
                      </div>

                      @error('email')
                      <span class="form-text text-danger" role="alert">
                        <strong>{{ $message }}</strong>
                      </span>
                      @enderror
                    </div>
                  </div>

                  <div class="row mb-3">

                    <div class="col-md-12">

                      <div class="form-floating mb-3">
                        <input id="password" type="password"
                          class="form-control @error('password') is-invalid @enderror" name="password"
                          value="{{ old('password') }}" placeholder="name@example.com" autocomplete="current-password">
                        <label for="password">{{ __('Password') }}</label>
                      </div>

                      @error('password')
                      <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                      </span>
                      @enderror
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember"
                          {{ old('remember') ? 'checked' : '' }}>

                        <label class="form-check-label" for="remember">
                          {{ __('Remember Me') }}
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <button type="submit" class="btn btn-primary  float-end">
                        {{ __('Login') }}
                      </button>

                      @if (Route::has('password.request'))
                      <a class="btn btn-link" href="{{ route('password.request') }}">
                        {{ __('Forgot Your Password?') }}
                      </a>
                      @endif
                    </div>
                  </div>
                </form>
              </div>
              <!-- <div class="card-footer text-center py-3">
                <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                <div class="small"><a href="register.html">Forgotten password ?</a></div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- js file -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="{{ asset('/assets/js/scripts.js') }}"></script>
  <!-- end js file -->
</body>

</html>