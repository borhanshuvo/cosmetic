import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const [expoPushToken, setExpoPushToken] = React.useState("");
const [notification, setNotification] = React.useState(false);
const notificationListener = React.useRef();
const responseListener = React.useRef();

React.useEffect(() => {
  registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      setNotification(notification);
    }
  );

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {});

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
