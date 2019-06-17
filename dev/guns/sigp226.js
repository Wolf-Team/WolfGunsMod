
ShootLib.addGun({
    id:"sigp226",
    name:"SIGP226",
    ammo:"ammohandgun",
    accuracy:6,
    recoil:3,
    rate:1,
    texture:{
        name:"sigp226",
        meta:0
    },
    shotType:ShotType.NORMAL,
    buttonType:ButtonType.CLICK,
    bullet:{
        speed:10,
        count:10,
        damage:6
    },
    fov:{
        level:2
    },
    sounds:{
        shot:"sigp/shot.ogg",
        empty:"EmptyGun.mp3",
        reload:"deserteagle/reload.ogg"
    }
});

GunRecipe.add("sigp226", ["pi"], {i:{id:265}, "p":{id:ItemID["pistol_base"]}});