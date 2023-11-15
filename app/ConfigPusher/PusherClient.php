<?php 
namespace App\ConfigPusher;

use Pusher\Pusher;

class PusherClient{

    public $pusher;



    public function __construct()
    {
        $this->pusher = new Pusher(
            config('chatify.pusher.key'),
            config('chatify.pusher.secret'),
            config('chatify.pusher.app_id'),
            config('chatify.pusher.options'),
        );
    }


// trigger an event using Pusher
    public function push($channel, $event, $data){
        return $this->pusher->trigger($channel,$event,$data);
    }
}