<?php

namespace App\Models;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory, HasSlug;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * The users that belong to the course.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_user');
    }

    /**
     * The assistants that belong to the course.
     */
    public function assistants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_assistant');
    }

    /**
     * Get the modules for the blog post.
     */
    public function modules(): HasMany
    {
        return $this->hasMany(Module::class);
    }
}
