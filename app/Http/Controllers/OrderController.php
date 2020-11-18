<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class OrderController extends Controller
{

    public function create(Request $request)
    {
        sleep(1);
        return response("Success");
    }
}
