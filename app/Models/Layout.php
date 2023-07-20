<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'name_layout',
        'preview_layout',
        'layout_data'
    ];
}