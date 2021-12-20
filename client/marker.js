import * as alt from 'alt';
import * as game from 'natives';
// let markers = [];

// alt.onServer("Client:ServerMarkers:LoadAllMarkers", (markerArray) => {
//     markerArray = JSON.parse(markerArray);

//     for (let i in markerArray) {
//         markers.push({
//             type: markerArray[i].type,
//             x: markerArray[i].posX,
//             y: markerArray[i].posY,
//             z: markerArray[i].posZ,
//             scaleX: markerArray[i].scaleX,
//             scaleY: markerArray[i].scaleY,
//             scaleZ: markerArray[i].scaleZ,
//             red: markerArray[i].red,
//             green: markerArray[i].green,
//             blue: markerArray[i].blue,
//             alpha: markerArray[i].alpha,
//             bobUpAndDown: markerArray[i].bobUpAndDown
//         });
//     }
// });

// alt.everyTick(() => {
//     if (markers.length >= 1) {
//         for (let i = 0; i < markers.length; i++) {
//             game.drawRect(0, 0, 0, 0, 0, 0, 0, 0, 0);
//             game.drawMarker(markers[i].type, markers[i].x, markers[i].y, markers[i].z, 0, 0, 0, 0, 0, 0, markers[i].scaleX, markers[i].scaleY, markers[i].scaleZ, markers[i].red, markers[i].green, markers[i].blue, markers[i].alpha, markers[i].bobUpAndDown, false, 2, false, undefined, undefined, false);
//         }
//     }
// });


const streamDistance = 250, streamedMarkers = [];
let markerEveryTick, markers = [];

alt.onServer("Client:ServerMarkers:LoadAllMarkers", (markerArray) => {
    markers = JSON.parse(markerArray);

    for (let m of markers)
        m.pos = new alt.Vector3(m.posX, m.posY, m.posZ);
});

alt.setInterval(() => {
    let pos = alt.Player.local.pos;

    for(let m of markers) {
        let index = streamedMarkers.indexOf(m);

        if(pos.distanceTo(m.pos) < streamDistance && index== -1) {
            streamedMarkers.push(m);

            if(streamedMarkers.length == 1) {
                startMarkerEveryTick();
            }
        } else if(index > -1 || pos.distanceTo(m.pos) > streamDistance) {
            streamedMarkers.splice(index, 1);

            if(!streamedMarkers.length) {
                alt.clearEveryTick(markerEveryTick);
                markerEveryTick = null;
            }
        }
    }
}, 1000);

function startMarkerEveryTick() {
    if(markerEveryTick != null) {
        return;
    }

    markerEveryTick = alt.everyTick(() => {
        for(let sm of streamedMarkers) {
            game.drawMarker(sm.type, sm.pos.x, sm.pos.y, sm.pos.z, 0, 0, 0, 0, 0, 0, sm.scaleX, sm.scaleY, sm.scaleZ, sm.red, sm.green, sm.blue, sm.alpha, sm.bobUpAndDown, false, 2, false, undefined, undefined, false);
        }
    });
}