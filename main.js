/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 7
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



// file: craft_table.js

var CraftTableWindow = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "GunCraftTable", // содержание текста, обязательный параметр
            },
        },
        inventory: {standart:true},
        background: {standart: true}
    },
    elements:{
        "slotInput0":{x:350, y:80, type:"slot"},
        "slotInput1":{x:410, y:80, type:"slot"},
        "slotInput2":{x:470, y:80, type:"slot"},
        "slotInput3":{x:530, y:80, type:"slot"},

        "slotInput4":{x:350, y:140, type:"slot"},
        "slotInput5":{x:410, y:140, type:"slot"},
        "slotInput6":{x:470, y:140, type:"slot"},
        "slotInput7":{x:530, y:140, type:"slot"},

        "slotInput8":{x:350, y:200, type:"slot"},
        "slotInput9":{x:410, y:200, type:"slot"},
        "slotInput10":{x:470, y:200, type:"slot"},
        "slotInput11":{x:530, y:200, type:"slot"},

        "slotInput12":{x:350, y:260, type:"slot"},
        "slotInput13":{x:410, y:260, type:"slot"},
        "slotInput14":{x:470, y:260, type:"slot"},
        "slotInput15":{x:530, y:260, type:"slot"},

        "slotOutput":{x:600, y:170, type:"slot", isValid:function(){return false;}}
    }
});
IDRegistry.genBlockID("gun_craft_table");
Block.createBlock("gun_craft_table", [{
    name: "GunCraftTable", 
    texture: [
        ["work_table_bottom", 0], // bottom
        ["work_table_top", 0], // top
        ["work_table_side", 0], // back
        ["work_table_side", 1], // front
        ["work_table_side", 0], // left
        ["work_table_side", 0]  // right
    ], 
    inCreative: true 
}]) 

TileEntity.registerPrototype(BlockID["gun_craft_table"], {
    getGuiScreen: function(){
        return CraftTableWindow;
    },
    tick:function(){
        var i = 0;
        var slots = [[],[],[],[]];
        var changed = false;
        
        for(var i = 0; i < 4; i++){
            for(var ii = 0; ii < 4; ii++){
                var index = i * 4 + ii;
                var slot = this.container.getSlot("slotInput" + index);
                
                slots[i].push(slot);
                if(!this.data["slot" + index])
                    this.data["slot" + index] = {
                        id:0, data:0, count:0
                    };
                    
                if(this.data["slot" + index].id != slot.id ||
                    this.data["slot" + index].data!= slot.data ||
                this.data["slot" + index].count!= slot.count){
                    changed = true;
                }
                this.data["slot" + index] = {
                    id:slot.id,
                    data:slot.data,
                    count:slot.count
                }
            }   
        }
        
        if(changed===true){
            var a = GunRecipe.check(slots);
            if(a !== false)
                this.container.setSlot("slotOutput", ItemID[a.result], 1, 0)
            else
                this.container.clearSlot("slotOutput") 
        }
        
        if(!this.data["slotOut"])
            this.data["slotOut"] = { id:0, data:0, count:0 };
        
        var slot = this.container.getSlot("slotOutput");
        if(this.data["slotOut"].id != slot.id ||
           this.data["slotOut"].data!= slot.data ||
           this.data["slotOut"].count!= slot.count){
            if(slot.id == 0){
                 for(var i = 0; i < 16; i++){
                    var slot = this.container.getSlot("slotInput" + i);
                    if(slot.count > 0){
                        slot.count--;
                        if(slot.count == 0)
                            slot.data = slot.id = slot.count;
                        
                    }
                 }
            }
            this.data["slotOut"] = {
                id:slot.id,
                data:slot.data,
                count:slot.count
            }
        }
    }
});

var GunRecipe = {
    recipes:[],
    
    add:function(gun_id, recipe, ingridients){
      this.recipes.push({
        recipe:recipe,
        ingridients:ingridients,
        result:gun_id
      });
    },
    
    check:function(input){
        for(var i in this.recipes){
            var recipe = this.recipes[i];
            if(!recipe.ingridients.hasOwnProperty(" "))
                recipe.ingridients[" "] = {id:0, data:0};
            
            var state = 0;
            
            var _i = 0, _ii = 0;
            
            for(var i = 0; i < 4; i++){//lines
                for(var ii = 0; ii < 4; ii++){//columns
                    if(i < (5 - recipe.recipe.length) && ii < (5 - recipe.recipe[0].length)){
                        if(state == 0){
                            _i = i;
                            _ii = ii;
                        }
                        
                        
                        var ing = recipe.recipe[i - _i];
                        if(ing)
                            ing = recipe.ingridients[ing[ii - _ii]]
                        else
                            ing = {id:0, data:0}
                        
                        if(input[i][ii].id == ing.id && state == 0){
                            state = 1;
                            alert("State");
                            alert([i,ii]);
                        }else if(input[i][ii].id == ing.id && state == 1){
                            
                        }else if(input[i][ii].id != 0 && state == 0){
                            state = 2;
                        }
                    }
                }
            }
            
            
            //if(check)
                alert("state:"+state);
            
            return false;
            switch(state){
                case 2:
                    return false;
                break;
            }
            
            var check = true;
           
            var _i = _ii = -1;
            
            for(var i = 0; i < (5 - recipe.recipe.length); i++){//lines input
                for(var ii = 0; ii < (5 - recipe.recipe[0].length); ii++){//columns input
                    var input_line = input[i];
                            
                    var ingr = recipe.recipe[0][0];
                    if(input_line[ii].id == recipe.ingridients[ingr].id){
                        _i = i; _ii = ii;
                        break;
                    } 
                }
            }
            
            return false;
            
            for(var ii = 0; ii < input.length; ii++){
                var ingridient = recipe.ingridients.hasOwnProperty(str_recipe[ii])?recipe.ingridients[str_recipe[ii]]:{id:0, data:0};
                
                if(!ingridient.data) ingridient.data = -1;
                
                if(input[ii].id != ingridient.id || (ingridient.data != -1 && input[ii].data != ingridient.data)){
                   check = false;
                }
                
            }
            
            if(check)
                return recipe;
        }
        
        return false;
    }
}



// file: guns/components.js

IDRegistry.genItemID("pistol_base");
Item.createItem("pistol_base", "Pistol Base", {name:"pistol_base"}, {stack: 16})
GunRecipe.add("pistol_base", ["iii", "  i"], {i:{id:265}});



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

GunRecipe.add("m9", ["i", "p"], {i:{id:265}, "p":{id:ItemID["pistol_base"]}});



// file: ammos.js

ShootLib.addAmmos([{
    id:"ammohandgun",
    name:"Handgun Ammo",
    texture:{
        name:"ammohandgun",
        meta:0
    }
}]);
GunRecipe.add("ammohandgun", ["i", "i"], {i:{id:265}});



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
//guns/m9.js
Translation.addTranslation("M9",{
    ru:"М9",
    en:"M9"
});

//craft_table
Translation.addTranslation("Pistol Base",{
    ru:"Основа для пистолета",
    en:"Pistol Base"
});

//craft_table
Translation.addTranslation("GunCraftTable",{
    ru:"Оружейный верстак",
    en:"GunCraftTable"
});
