const MenusKey = 'PERMISSIONS_MENUS';
const RoutersKey = 'PERMISSIONS_ROUTERS';
const PathKey = 'PERMISSIONS_PATH';

export function savePermissionMenus(data) {
    localStorage.setItem(MenusKey, JSON.stringify(data));
}

export function getPermissionMenus() {
    return JSON.parse(localStorage.getItem(MenusKey));
}

export function savePermissionRouters(data) {
    localStorage.setItem(RoutersKey, JSON.stringify(data));
}

export function getPermissionRouters() {
    return JSON.parse(localStorage.getItem(RoutersKey));
}

export function savePermissionPath(data) {
    localStorage.setItem(PathKey, JSON.stringify(data));
}

export function getPermissionPath() {
    return JSON.parse(localStorage.getItem(PathKey));
}