<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Item;
use Faker\Generator as Faker;

$factory->define(Item::class, function (Faker $faker) {
    $faker->addProvider(new \Bezhanov\Faker\Provider\Commerce($faker));

    return [
        "title" => $faker->productName(),
        "description" => $faker->text(2000),
        "price" => $faker->numberBetween($min = 100, $max = 10000)
    ];
});
