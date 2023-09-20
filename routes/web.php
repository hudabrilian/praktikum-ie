<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard')->breadcrumb(fn() => Auth::user()->name.'’s dashboard');;

Route::middleware('auth')->group(function () {
    Route::put('/changerole', [ProfileController::class, 'changeRole'])->name('profile.role');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/accounts', [ProfileController::class, 'accounts'])->name('profile.accounts');

    Route::get('/course', [CourseController::class, 'index'])->name('course.index')->breadcrumb('Courses');
    Route::get('/course/create', [CourseController::class, 'create'])->name('course.create')->breadcrumb('Create', 'course.index');
    Route::post('/course/store', [CourseController::class, 'store'])->name('course.store');
    Route::get('/course/{course}', [CourseController::class, 'details'])->name('course.details')->breadcrumb(fn(Course $course) => $course->name, 'course.index');
    Route::post('/course/{course}/add-assistants', [CourseController::class, 'addAssistant'])->name('course.addAssistant');
    Route::post('/course/{course}/remove-assistants', [CourseController::class, 'removeAssistant'])->name('course.removeAssistant');

    Route::get('/course/{course}/module/create', [ModuleController::class, 'create'])->name('module.create')->breadcrumb('Create Module', 'course.details');
    Route::post('/course/{course}/module/store', [ModuleController::class, 'store'])->name('module.store');
    Route::get('/course/{course}/module/{module}', [ModuleController::class, 'detail'])->name('module.detail')->breadcrumb(fn(Course $course, Module $module) => $module->name, 'course.details');
    Route::put('/course/{course}/module/{module}', [ModuleController::class, 'update'])->name('module.update');
});

require __DIR__.'/auth.php';
