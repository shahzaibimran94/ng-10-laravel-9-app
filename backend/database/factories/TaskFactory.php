<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => '1',
            'title' => 'Complete Front-end',
            'description' => 'This task include development of frontend in Angular and connecting it with a laravel APIs',
            'status' => 'IN-PROGRESS', 
            'priority' => 'NORMAL',
            'deadline' => '2023-03-28 13:45:38',
            'members' => json_encode([]),
            'comments' => json_encode([]),
            'is_deleted' => false,
        ];
    }

}
