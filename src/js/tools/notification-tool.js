export const sendNotification = (title, body, icon) => {
    const messageNotification = new Notification(title, {
        body,
        icon,
    });

    setTimeout(() => {
        messageNotification.close();
    }, 5000);
};

export const requestNotificationPermission = () => {
    if (Notification && Notification.permission === 'default') {
        Notification.requestPermission((permission) => {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
        });
    }
};
