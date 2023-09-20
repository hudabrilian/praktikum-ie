<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
/**
     * Display the dashboard.
     */
    public function index(Request $request): Response
    {
        // $courses = Course::get();
        $courses = $request->user()->courses()->get();
        if ($request->user()->hasRole('administrator')) {
            $courses = Course::get();
        }

        return Inertia::render('Dashboard', [
            'courses' => $courses,
        ]);
    }
}
