<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $user_id = $request->user()->id;
            $tasks = Task::where('is_deleted', 0)->where('user_id', $user_id)->get();
            $allTasks = Task::where('is_deleted', 0)->get();
            $members = User::select('id','name')->where('id', '!=', $user_id)->get();
            $new_members = array();
            for ($x = 0; $x < count($members); $x++) {
                $new_members[$members[$x]['id']] = $members[$x]['name'];
            };
            $new_tasks = array();
            for ($x = 0; $x < count($allTasks); $x++) {
                $task_members = json_decode($allTasks[$x]['members']);
                if (in_array($user_id, $task_members))
                    array_push($new_tasks, $allTasks[$x]);
            };
            return response()->json([
                'status' => true,
                'tasks' => $tasks->merge($new_tasks),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            if (!$request->user() || !$request->user()->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Forbidden',
                ], 403);
            }
            $validateTask = Validator::make($request->all(), 
            [
                'title' => 'required',
                'description' => 'required',
                'status' => 'required', 
                'priority' => 'required',
                'deadline' => 'required',
                'members' => 'required'
            ]);
            if($validateTask->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateTask->errors()
                ], 401);
            }
            $task = Task::create([
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status, 
                'priority' => $request->priority,
                'deadline' => $request->deadline,
                'members' => json_encode($request->members),
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Task Created Successfully',
                'task' => $task
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $task = Task::find($id);
            if (!$task || $task->is_deleted) {
                return response()->json([
                    'status' => false,
                    'message' => 'invalid request',
                ], 400);
            }
            if ($request->title)
                $task->title = $request->title;
            if ($request->description)
                $task->description = $request->description;
            if ($request->status)
                $task->status = $request->status;
            if ($request->priority)
                $task->priority = $request->priority;
            if ($request->deadline)
                $task->deadline = $request->deadline;
            if ($request->members)
                $task->members = $request->members;
            $task->save();
            return response()->json([
                'status' => true,
                'message' => 'Task Updated.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Task::where('id', $id)->update(['is_deleted' => 1]);
            return response()->json([
                'status' => true,
                'message' => 'Task Deleted.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}