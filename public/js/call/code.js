
const csrfToken = $('meta[name= csrf-token]').attr('content');
const getUserID = () => $('meta[name = id]').attr('content');
const setUserId = (id) => $('meta[name=id]').attr('content',id);


// get user id

const user_id = $('meta[name= user-id]').attr('content');

// connections pusher

    const pusher = new Pusher('44462a9ee7a77a4ed9b3', {
        cluster: 'ap1'
    });
// check connect pusher
    pusher.connection.bind('connected', function() {
        console.log('ok');
    });


    pusher.connection.bind('disconnected', function(){
        console.log('mất kết nối');
    })

    pusher.connection.bind('error',function(err){
        console.log(err);
    })
// end check connect

// subscribe to the channel 

    const channelName = "call-video";
    var channel = pusher.subscribe(`${channelName}.${user_id}`);
    var clientSendChannel;
    var clientListenChannel;


    function initClientChannelCall(){
        if(getUserID()){
            clientSendChannel = pusher.subscribe(`${channelName}.${getUserID()}`);
            clientListenChannel = pusher.subscribe(`${channelName}.${user_id}`);
        }
        
    }


// call functions



// event click btn actions random

function actionsRandom(){
    $.ajax({
        url:'actionsRandom',
        method:'POST',
        data:{
            '_token': csrfToken,
        },
        success:function(){
            // location.reload();
        }
    })
}
// function request data to controller
function requestData(){
    fetch('/find-match', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken, // Token Laravel CSRF
        },
        body: JSON.stringify({}) // Gửi yêu cầu tìm đối tác ghép cặp
    })
    .then(response => {
        // Xử lý response nếu cần
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// listening event matching 

const testEvent = pusher.subscribe(`matching.${user_id}`);
var User_to_id;
testEvent.bind('success-matching', function(data){
    
    notifyUser(data.to_id, data.from_id, 'success-matching');
   
});
function notifyUser(userId, fromId, eventType) {
    const notifyChannel = pusher.subscribe(`matching.${userId}`);
    notifyChannel.bind(eventType, function(notificationData) {
        if (notificationData.from_id === fromId) {
            console.log('Received match-found event for user:', userId);
            // Xử lý thông báo hoặc các thao tác khác cho người dùng
        }
    });
}
