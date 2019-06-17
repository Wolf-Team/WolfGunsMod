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
        if(!this.data["slotOut"])
            this.data["slotOut"] = { id:0, data:0, count:0 };
        
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
        
        var slot = this.container.getSlot("slotOutput");
        
        if(changed===true){
            var a = GunRecipe.check(slots);
            if(a !== false)
                this.container.setSlot("slotOutput", ItemID[a.result], 1, 0)
            else
                this.container.clearSlot("slotOutput");
            
        }else{
            if((this.data["slotOut"].id != slot.id ||
               this.data["slotOut"].data!= slot.data ||
               this.data["slotOut"].count!= slot.count)){
                
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
            }
        }
        
        this.data["slotOut"] = {
                id:slot.id,
                data:slot.data,
                count:slot.count
            }
    }
});

var GunRecipe = {
    recipes:[],
    
    add:function(gun_id, recipe, ingridients){
        for(var i = 1; i < recipe.length; i++){
            if(recipe[0].length != recipe[i].length)
                throw "Строки разной длинны";
        }
        
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
            
            recipe.ingridients["air"] = {id:0, data:0};
            
            var state = 0;
            
            var _i = 0, _ii = 0;
            
            for(var i = 0; i < 4; i++){//lines
                for(var ii = 0; ii < 4; ii++){//columns
                    if(state == 1){
                         var ing = recipe.recipe[i - _i];
                         if(ing)
                             ing = ing[ii - _ii];
                         
                         if(!ing)
                             ing = "air";
                        
                         if(input[i][ii].id != recipe.ingridients[ing].id){
                            if(recipe.ingridients[recipe.recipe[0][0]].id == 0)
                                state = 0;
                            else
                                state = 2;
                         }
                         
                    }
                    
                    if(state == 0){
                        if(i < (5 - recipe.recipe.length) && ii < (5 - recipe.recipe[0].length)){
                            var ing = recipe.recipe[0][0];
                            if(input[i][ii].id == recipe.ingridients[ing].id){
                                _i = i;
                                _ii = ii;
                                state = 1;
                            }
                        }else{
                            if(input[i][ii].id != 0)
                                state = 2;
                        }
                    }
                }
            }
            
            if(state == 1){
                return recipe;
            }else{
                continue;
            }
        }
        
        return false;
    }
}


Callback.addCallback("PostLoaded", function(){
    Recipes.addShaped({id: BlockID["gun_craft_table"], count: 1, data: 0}, [
        "sis",
        "ibi",
        "sis"
    ], ['s', 287, 0,'i', 265, 0, 'b', 42, 0]);
});