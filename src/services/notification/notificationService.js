import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setNotification } from "../../api/notification/api";

const sock = new SockJS(
   "https://erc-notification-service.herokuapp.com/ws-message"
);
let stompClient = Stomp.over(sock);
stompClient.debug = null;
export const OnNotificationSocket = (access, dispatch) => {
   //const dispatch = useDispatch();
   sock.onopen = function () {
      console.log("open");
   };
   stompClient.connect(
      {
         Authorization: access,
      },
      function (frame) {
         stompClient.subscribe("/topic/message", function (greeting) {
            //console.log(JSON.parse(greeting.body));
         });

         stompClient.subscribe(
            "/user/topic/private-message",
            function (payload) {
               console.log(JSON.parse(payload.body));
               dispatch(setNotification(JSON.parse(payload.body)));
            }
         );
      }
   );
};

export const closeNotificationSocket = () => {
   stompClient.disconnect();
};
