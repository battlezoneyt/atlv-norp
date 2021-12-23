import * as alt from 'alt';
import * as game from 'natives';

alt.onServer("Client:Vehicles:ToggleDoorState", (veh, doorid, state) => {
    toggleDoor(veh, parseInt(doorid), state);
});

alt.on("gameEntityCreate", (entity) => {
    if (entity instanceof alt.Vehicle) {
        if (!entity.hasStreamSyncedMeta("IsVehicleCardealer")) return;
        if (entity.getStreamSyncedMeta("IsVehicleCardealer") == true) {
            game.freezeEntityPosition(entity.scriptID, true);
            game.setEntityInvincible(entity.scriptID, true);
        }
    }
});

function toggleDoor(vehicle, doorid, state) {
    if (state) {
        game.setVehicleDoorOpen(vehicle.scriptID, doorid, false, false);
    } else {
        game.setVehicleDoorShut(vehicle.scriptID, doorid, false);
    }
}

if (key == 74) { // J
    let player = alt.Player.local.scriptID
    if (player.vehicle) {
        if (!seatbelt) {
            seatbelt = true;
            seatbeltTick = alt.everyTick(function() {
                game.setPedConfigFlag(player, 32, seatbelt);
            });
        } else {
            seatbelt = false;
            alt.clearEveryTick(seatbeltTick);
        }
    }
}

let ignoredHats = [1, 27, 32, 33];
alt.on("playerEnteringVehicle", (player, vehicle, seat) => {
    if (player.valid && vehicle.valid) {
        if (ignoredHats.includes(player.getProp(0).drawable) || player.getProp(0).drawable == 255) return;
        player.setMeta("prop", { component: 0, drawable: player.getProp(0).drawable, texture: player.getProp(0).texture });
    }
});

alt.on("playerEnteredVehicle", (player, vehicle, seat) => {
    if (player.valid && vehicle.valid) {
        if (!player.hasMeta("prop") || ignoredHats.includes(player.getMeta("prop").drawable)) return;
        player.setProp(player.getMeta("prop").component, player.getMeta("prop").drawable, player.getMeta("prop").texture);
    }
});