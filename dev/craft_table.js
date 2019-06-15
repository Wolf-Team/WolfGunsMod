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
        var slots = [];
        var changed = false;
        
        for(var i = 0; i < 16; i++){
            var slot = this.container.getSlot("slotInput" + i);
            
            slots.push(slot);
            if(!this.data["slot" + i])
                this.data["slot" + i] = {
                    id:0, data:0, count:0
                };
                
            if(this.data["slot" + i].id != slot.id || this.data["slot" + i].data!= slot.data || this.data["slot" + i].count!= slot.count){
                changed = true;
            }
            this.data["slot" + i] = {
                id:slot.id,
                data:slot.data,
                count:slot.count
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
            var check = true;
            var str_recipe = recipe.recipe.join("").split("");
            
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