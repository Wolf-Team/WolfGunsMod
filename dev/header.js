/**
* __        __     _  __  ____                   __  __           _ 
* \ \      / /___ | |/ _|/ ___|_   _ _ __   ____|  \/  | ___   __| |
*  \ \ /\ / // _ \| | |_| |  _| | | | '_ \ / ___| |\/| |/ _ \ / _` |
*   \ V  V /| (_) | |  _| |_| | |_| | | | |\__ \| |  | | (_) | (_| |
*    \_/\_/  \___/|_|_|  \____|\__,_|_| |_|____/|_|  |_|\___/ \__,_|
*                                                                                      
**/

IMPORT("ShootLib", "ShootLib");

var ShotType = ShootLib.ShotType;
var ButtonType = ShootLib.ButtonType;

ShootLib.init({
    crosshairGUI:{
        bitmap:{
            coords:{
                width:2048,
                height:512
            },
            size:{
                width:4000,
                height:1000
            }
        }
    }
});