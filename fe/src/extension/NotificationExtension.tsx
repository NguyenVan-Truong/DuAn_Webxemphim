import { notifications } from "@mantine/notifications";
import {
    IconCheck,
    IconInfoCircle,
    IconNote,
    IconX,
} from "@tabler/icons-react";
const _autoClose = 5000;
const _autoPushBrowser = 5000;
function Success(noti: string | undefined) {
    if (noti)
        //toast.success(noti, setting);
        notifications.show({
            title: "Thông báo",
            message: noti,
            withCloseButton: true,
            autoClose: _autoClose,
            // onClose: () => console.log('unmounted'),
            // onOpen: () => console.log('mounted'),
            color: "green",
            icon: <IconCheck />,
        });
}
function Fails(noti: React.ReactNode | string) {
    if (noti)
        notifications.show({
            title: "Thông báo",
            message: noti,
            withCloseButton: true,
            autoClose: _autoClose,
            // onClose: () => console.log('unmounted'),
            // onOpen: () => console.log('mounted'),
            color: "red",
            icon: <IconX />,
        });
    // toast.error(noti, setting);
}

function Info(noti: string) {
    if (noti)
        notifications.show({
            title: "Thông báo",
            message: noti,
            withCloseButton: true,
            autoClose: _autoClose,
            // onClose: () => console.log('unmounted'),
            // onOpen: () => console.log('mounted'),
            color: "",
            icon: <IconInfoCircle />,
        });
    // toast.info(noti, setting);
}

function Warn(noti: string) {
    if (noti)
        notifications.show({
            title: "Thông báo",
            message: noti,
            withCloseButton: true,
            autoClose: _autoClose,
            // onClose: () => console.log('unmounted'),
            // onOpen: () => console.log('mounted'),
            color: "orange",
            icon: <IconNote />,
        });
    // toast.info(noti, setting);
}

export const NotificationExtension = {
    Success,
    Fails,
    Info,
    Warn,
};
