/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 5
*/



// file: header.js

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



// file: guns/pm.js

ShootLib.addGun({
    id:"pm",
    name:"PM",
    ammo:"ammohandgun",
    accuracy:6,
    recoil:4,
    rate:10,
    texture:{
        name:"pm",
        meta:0
    },
    shotType:ShotType.NORMAL,
    buttonType:ButtonType.CLICK,
    bullet:{
        speed:10,
        count:8,
        damage:5
    },
    fov:{
        level:2
    },
    sounds:{
        shot:"pm/shot.ogg",
        empty:"EmptyGun.mp3",
        reload:"pm/reload.ogg"
    }
});




// file: guns/m9.js

ShootLib.addGun({
    id:"m9",
    name:"M9",
    ammo:"ammohandgun",
    accuracy:6,
    recoil:4,
    rate:10,
    texture:{
        name:"m9",
        meta:0
    },
    shotType:ShotType.NORMAL,
    buttonType:ButtonType.CLICK,
    bullet:{
        speed:10,
        count:15,
        damage:5
    },
    fov:{
        level:2
    },
    sounds:{
        shot:"m9/shot.ogg",
        empty:"EmptyGun.mp3",
        reload:"pm/reload.ogg"
    }
});



// file: ammos.js

ShootLib.addAmmos([{
    id:"ammohandgun",
    name:"Handgun Ammo",
    texture:{
        name:"ammohandgun",
        meta:0
    }
}]);



// file: translate.js

//ammos.js
Translation.addTranslation("Handgun Ammo",{
    ru:"Патроны к пистолету",
    en:"Handgun Ammo"
});

//guns/pm.js
Translation.addTranslation("PM",{
    ru:"ПМ",
    en:"PM"
});
