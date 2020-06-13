import * as Permissions from "expo-permissions";

export const getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
    }
};

export const getGalleryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
    }
};