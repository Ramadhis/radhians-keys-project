<!DOCTYPE html>
<html lang="en">

<head>
  <title>Radhians-key</title>
  <meta charset="UTF-8" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="icon" href="{{ asset('/assets/image/icon-head.png') }}">
  <link href="{{ asset('/assets/css/style.css')}}">
  <link href="{{ asset('/assets/css/creativeMode.css')}}">
  <!-- @viteReactRefresh -->
  @vite('resources/js/app.jsx')
  @inertiaHead
</head>

<body>
  @inertia
</body>

</html>