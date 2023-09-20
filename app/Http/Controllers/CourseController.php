<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request) {
        $courses = $request->user()->courses()->get();
        if ($request->user()->hasRole('administrator')) {
            $courses = Course::get();
        }

        return Inertia::render('Course/Index', [
            'courses' => $courses,
        ]);
    }

    public function create() {
        return Inertia::render("Course/Create");
    }

    public function store(CourseRequest $request) {
        $request->validated();

        $course = Course::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        $course->users()->attach($request->user());

        return redirect()->route('dashboard')->with('message', 'Course created successfully.');
    }

    public function details(Course $course) {
        $course->load(['assistants', 'modules']);

        Inertia::share('breadcrumbs', function(Request $request) {
            return $request->route()->breadcrumbs()->jsonSerialize();
        });

        return Inertia::render("Course/Detail", [
            'course' => $course
        ]);
    }

    public function addAssistant(Course $course, Request $request) {
        $request->validate([
            'assistant' => ['required']
        ]);

        $user = User::where('username', $request->assistant)->first();

        if (!$user) {
            return Redirect::back()->with(['error' => true, 'message' => 'User not found.']);
        }

        // $isAssistant = $user->hasRole('assistant');
        $isAssistant = $user->rolesList->contains('name', 'assistant');

        if (!$isAssistant) {
            return Redirect::back()->with(['error' => true, 'message' => 'User is not an assistant.']);
        }

        $isAlreadyAssistant = $course->assistants()->wherePivot('user_id', '=', $user->id)->first();

        if ($isAlreadyAssistant) {
            return Redirect::back()->with(['error' => true, 'message' => 'User is already being assistant on this course.']);
        }

        $course->users()->syncWithoutDetaching($user);
        $course->assistants()->attach($user->id);

        return Redirect::back()->with('message', 'Successfully adding assistant.');
    }

    public function removeAssistant(Course $course, Request $request) {
        $request->validate([
            'assistant' => ['required']
        ]);

        $user = User::where('username', $request->assistant)->first();

        $isAlreadyAssistant = $course->assistants()->wherePivot('user_id', '=', $user->id)->first();

        if (!$isAlreadyAssistant) {
            return Redirect::back()->with(['error' => true, 'message' => 'User is not being assistant on this course.']);
        }

        $course->assistants()->detach($user->id);

        return Redirect::back()->with('message', 'Successfully removing assistant.');
    }
}
