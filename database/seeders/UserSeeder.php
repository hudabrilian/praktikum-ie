<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Huda Brilian',
            'username' => 'hudabrilian',
            'email' => 'hudabrilian@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user->rolesList()->attach(1);
        $user->rolesList()->attach(2);
        $user->rolesList()->attach(3);
        $user->addRole('administrator');
    }
}
