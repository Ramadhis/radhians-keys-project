<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>Forget Password Email</h1>

  You can reset password from bellow link:
  <br />
  <a href="{{route('resetpassword',$data['token'])}}">{{route('resetpassword',$data['token'])}}</a>
  <!-- <p>{{$data['body']}}</p> -->
  <br />
  <br />
  <br />
  <div>
    Best Regards,<br />Radhians-keys team
  </div>
</body>

</html>