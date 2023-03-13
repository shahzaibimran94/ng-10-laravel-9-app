<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        // ]);

        // \App\Models\Task::factory()->create([
        //     'user_id' => '1',
        //     'title' => 'Complete Front-end',
        //     'description' => 'This task include development of frontend in Angular and connecting it with a laravel APIs',
        //     'status' => 'IN-PROGRESS', 
        //     'priority' => 'NORMAL',
        //     'deadline' => '2023-03-28 13:45:38',
        //     'members' => json_encode([]),
        //     'comments' => json_encode([]),
        //     'is_deleted' => false,
        // ]);
        \App\Models\Task::factory()->create([
            'user_id' => '1',
            'title' => 'Complete Front-end',
            'description' => 'This task include development of frontend in Angular and connecting it with a laravel APIs',
            'status' => 'IN-PROGRESS', 
            'priority' => 'NORMAL',
            'deadline' => '2023-12-28 13:45:38',
            'members' => json_encode([]),
            'comments' => json_encode([]),
            'is_deleted' => false,
        ]);
        \App\Models\Task::factory()->create([
            'user_id' => '1',
            'title' => 'Complete Back-end',
            'description' => 'This task include development of frontend in Angular and connecting it with a laravel APIs',
            'status' => 'IN-PROGRESS', 
            'priority' => 'HIGH',
            'deadline' => '2023-11-28 13:45:38',
            'members' => json_encode([]),
            'comments' => json_encode([]),
            'is_deleted' => false,
        ]);
        \App\Models\Task::factory()->create([
            'user_id' => '1',
            'title' => 'Complete Database',
            'description' => 'This task include development of frontend in Angular and connecting it with a laravel APIs',
            'status' => 'IN-PROGRESS', 
            'priority' => 'LOW',
            'deadline' => '2023-07-28 13:45:38',
            'members' => json_encode([]),
            'comments' => json_encode([]),
            'is_deleted' => false,
        ]);
    }
}
