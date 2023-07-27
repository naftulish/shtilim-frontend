import { Store, iNotification, NOTIFICATION_TYPE } from "react-notifications-component";

class Notification {
  
  
  success(title:string, msg:string = "" ) {
    return this.print(title, msg, "success" );
  }
  
  error(title:string = "ארעה שגיאה בשמירת הנתונים או ביבוא הנתונים", msg:string = "") {
    return this.print(title, msg, "danger");
  }

  remove(id:string) {
    Store.removeNotification( id );
  }

  print(title:string, msg:string, type:NOTIFICATION_TYPE  ) {

    const msgObj:iNotification = {
      title: title,
      message: msg,
      type: type,
      insert: "top",
      container: "bottom-left",
      dismiss: {
        duration: 2000,
      },
    }
    return Store.addNotification( msgObj );
  }
}

const notification = new Notification();
export default notification;
