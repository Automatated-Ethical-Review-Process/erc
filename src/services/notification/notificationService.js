import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { SOCKET } from "config/endpoints";
import routes from "config/routes";

import { setNotification } from "../../api/notification/api";

const stompClient = Stomp.over(new SockJS(SOCKET));

// stompClient.debug = null; // TODO: remove this line

export const OnNotificationSocket = (access, dispatch, notify, navigate) => {
  stompClient.connect({ Authorization: access }, (frame) => {
    stompClient.subscribe("/topic/message", (greeting) => {});

    stompClient.subscribe("/user/topic/private-message", (payload) => {
      const body = JSON.parse(payload.body);
      dispatch(setNotification(body));

      notify("Notification Received..!", "info", {
        onClick: () => navigate(routes.notification, { state: body.id }),
        label: "View",
      });
    });
  });
};

export const closeNotificationSocket = () => stompClient.disconnect();
