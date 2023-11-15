<?php
namespace App\Services;

use App\Repositories\UserRepository;

class UpdateAllService{
    protected $userRepository;
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;

    }
    public function Update($user_id,$newData,$column){
        
        return $this->userRepository->Update($user_id,$newData,$column);
    }

    
}