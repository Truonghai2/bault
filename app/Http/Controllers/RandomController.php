<?php
namespace App\Http\Controllers;

use App\Models\Random;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

use App\ConfigPusher\PusherClient;
class RandomController extends Controller{
    public function findMatch(Request $request)
    {
        
        // Logic tìm kiếm người dùng phù hợp
        $currentUser = auth()->user();
        $matchedUsers = Random::where('user_id', '!=', $currentUser->id)->where('ready_random',1)->orderByDesc('updated_at')->first();
        
        if($matchedUsers){
            $pusher = new PusherClient();
            $pusher->push("matching.".$currentUser->id,'success-matching',[
                'from_id' => $currentUser->id,
                'to_id' => $matchedUsers->id,
            ]);
            $pusher->push("matching.".$matchedUsers->id,'success-matching',[
                'from_id' => $currentUser->id,
                'to_id' => $matchedUsers->id,
            ]);
        }
        else{
            
        }


        
    }
}