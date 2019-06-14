/*
     _        _                                   _ _____                    _         
    / \    __| |__   __ __ _ _ __   ___  ___   __| | ____|__   __ ___  _ __ | |_  ___ 
   / _ \  / _` |\ \ / // _` | '_ \ / __|/ _ \ / _` |  _|  \ \ / // _ \| '_ \| __|/ __|
  / ___ \| (_| | \ V /| (_| | | | | (__|  __/| (_| | |___  \ V /|  __/| | | | |_ \__ \
 /_/   \_\\__,_|  \_/  \__,_|_| |_|\___|\___| \__,_|_____|  \_/  \___||_| |_|\__||___/
                                                                
    Advanced Events

    Внимание! Запрещено:
    1.Распространение библиотеки на сторонних источниках без указание ссылки на официальное сообщество
    2.Изменение кода
    3.Явное копирование кода

    Используя библиотеку вы автоматически соглашаетесь с этими правилами.

    ©WolfTeam ( https://vk.com/wolf___team )
*/
/*  ChangeLog:
	v1.1
		- Add event ChangeItemInInventory( (int)slotID, (object)newItem, (object)oldItеm )
		- Add event ChangeWeather((object) newWeather, (object) oldWeather)
	v1.0
		- Add event ChangeCarriedItem( (object)newItem, (object)oldItem )
*/
LIBRARY({
    name: "AdvancedEvents",
    version: 1.1,
	shared:true,
    api: "CoreEngine"
});

/** ChangeCarriedItem( (object)newItem, (object)oldItem ) **/
var oldItem = {id:0}, oldSlot = 0, currentScreen='null';
Callback.addCallback("NativeGuiChanged", function(a){
	switch (a) {
        case "play_screen - worlds":
            currentScreen = "not_in_game";
            break;
        case "hud_screen":
        case "in_game_play_screen":
            if (currentScreen != "not_in_game" && currentScreen != "hud_screen") {
                oldItem = {id:0};
            }
            currentScreen = "hud_screen";
            break;
        default:
            currentScreen = a;
			break;
    }
});
Callback.addCallback("tick", function(){
	thread(function(){
		if (currentScreen == "hud_screen" || currentScreen == "null") {
			if (Player.getCarriedItem().id != oldItem.id) {
				Callback.invokeCallback("ChangeCarriedItem", Player.getCarriedItem(), oldItem);
			} else {
				if (Player.getSelectedSlotId() != oldSlot) {
					Callback.invokeCallback("ChangeCarriedItem", Player.getCarriedItem(), oldItem);
				}
			}
			oldItem = Player.getCarriedItem();
			oldSlot = Player.getSelectedSlotId()
		}
	}, "tick");
});

/** ChangeItemInInventory((int)slotID, (object)newItem, (object)oldItеm ) **/
var inventory = [];
Callback.addCallback("LevelLoaded", function(){
	for(var i = 0; i < 36; i++){
		var slot = i + 9;
		inventory[i] = Player.getInventorySlot(slot);
	}
});

Callback.addCallback("LevelLeft", function(){
	inventory = [];
});

Callback.addCallback("tick", function(){
	thread(function(){
		for(var i = 0; i < 36; i++){
			var slot = i + 9;
			var inv = Player.getInventorySlot(slot);
			var _inv = inventory[i];
			if(inv.id != _inv.id || inv.count != _inv.count || inv.data != _inv.data)
				Callback.invokeCallback("ChangeItemInInventory", slot, inv, _inv);
			
			inventory[i] = inv;
		}
	}, "ChangeItemInInventory");
});

/** ChangeWeather((object) newWeather, (object) oldWeather) **/
var oldWeather, methodWeather = false, _setWather = World.setWeather;
Callback.addCallback("LevelLoaded", function(){
	oldWeather = World.getWeather();
});

Callback.addCallback("tick", function(){
	thread(function(){
		var newWeather = World.getWeather();
		if((oldWeather.rain != newWeather.rain || oldWeather.thunder  != newWeather.thunder) && method == false){
			Callback.addCallback("ChangeWeather", newWeather, oldWeather);
		}
	}, "ChangeWeather");
});

World.setWeather = function(weather){
	methodWeather = true;
	Callback.addCallback("ChangeWeather", weather,  World.getWeather());
	_setWather(weather);
	methodWeather = false;
};
/**OTHER**/
function thread(call, name){
	if(!name)name='';
	else name = "_"+name;
	
	name='InnerCore_AdvancedEvents'+name;
	new java.lang.Thread(new java.lang.Runnable({
		run:function(){
			call();
		}
	}), name).start();
};