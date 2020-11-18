<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $start = $request["start"] ?? 0;
        $limit = $request["limit"] ?? 100;

        sleep(0.5);

        return Item::offset($start)->limit($limit)->get();
    }
}
