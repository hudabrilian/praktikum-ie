<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function create(Request $request, Course $course) {
        $isAssistant = $request->user()->rolesList->contains('name', 'assistant');

        if (!$isAssistant) {
            return Redirect::route('course.details', $course)->with(['error' => true, 'message' => 'You are not an assistant.']);
        }

        $isCourseAssistant = $course->assistants()->wherePivot('user_id', '=', $request->user()->id)->first();

        if (!$request->user()->hasRole('administrator') && !$isCourseAssistant) {
            return Redirect::route('course.details', $course)->with(['error' => true, 'message' => 'You are not being assistant on this course.']);
        }

        // if (!$isCourseAssistant) {
        //     return Redirect::route('course.details', $course)->with(['error' => true, 'message' => 'You are not being assistant on this course.']);
        // }

        return Inertia::render("Module/Create", [
            'course' => $course
        ]);
    }

    public function store(Course $course, Request $request) {
        $request->validate([
            'name' => ['required'],
            'content' => ['required']
        ]);
        
        $course->modules()->create([
            'name' => $request->name,
            'content' => $request->content
        ]);

        return redirect()->route('course.details', $course)->with('message', 'Module created successfully.');
    }

    public function detail(Course $course, Module $module) {
        $course->load(['assistants']);
        
        return Inertia::render('Module/Detail', [
            'course' => $course,
            'module' => $module
        ]);
    }

    public function update(Course $course, Module $module, Request $request) {
        $request->validate([
            'name' => ['required'],
            'content' => ['required']
        ]);

        $module->update([
            'name' => $request->name,
            'content' => $request->content
        ]);

        return redirect()->route('module.detail', ['course' => $course, 'module' => $module])->with('message', 'Module updated successfully.');
    }
}
