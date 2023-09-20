<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'administrator' => [
            'users' => 'c,r,u,d',
            'profile' => 'r,u',
            'course' => 'c,r,u,d',
            'module' => 'c,r,u,d',
        ],
        'assistant' => [
            'profile' => 'r,u',
            'course' => 'r',
            'module' => 'c,r,u,d',
        ],
        'student' => [
            'profile' => 'r,u',
            'course' => 'r',
            'module' => 'r',
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
    ],
];
