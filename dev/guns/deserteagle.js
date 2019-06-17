ShootLib.addGun({
    id:"deserteagle",
    name:"Desert Eagle",
    ammo:"ammohandgun",
    accuracy:6,
    recoil:4,
    rate:1,
    texture:{
        name:"deserteagle",
        meta:0
    },
    shotType:ShotType.NORMAL,
    buttonType:ButtonType.CLICK,
    bullet:{
        speed:10,
        count:7,
        damage:10
    },
    fov:{
        level:2
    },
    sounds:{
        shot:"deserteagle/shot.ogg",
        empty:"EmptyGun.mp3",
        reload:"deserteagle/reload.ogg"
    }
});

GunRecipe.add("deserteagle", [" i", "ip"], {i:{id:265}, "p":{id:ItemID["pistol_base"]}});