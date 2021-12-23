import * as alt from 'alt-client';
import * as native from 'natives';


const localPlayer = alt.Player.local

localPlayer.getAmmoWeapon = (weaponhash) => native.getAmmoInPedWeapon(localPlayer.scriptID, weaponhash);
localPlayer.removeWeapon = (weaponhash) => native.removeWeaponFromPed(localPlayer.scriptID, weaponhash);
localPlayer.setWeaponAmmo = (weaponhash, ammo) => native.setPedAmmo(localPlayer.scriptID, weaponhash, ammo);
localPlayer.currentWeapons = () => native.getSelectedPedWeapon(localPlayer.scriptID);


alt.everyTick(() => {
    native.setPedSuffersCriticalHits(alt.Player.local.scriptID, false); // disable headshot
    if (native.isPedArmed(alt.Player.local.scriptID, 4 | 2)) {
        native.disableControlAction(0, 140, true);
        native.disableControlAction(0, 141, true);
        native.disableControlAction(0, 142, true);
        native.hideHudComponentThisFrame(14);
    }
    //bullpup mk2
    native.setWeaponDamageModifierThisFrame(0x84D6FAFD, 0.3);
    // Bullpup
    native.setWeaponDamageModifierThisFrame(0x7F229F94, 0.25);
    //pump action
    native.setWeaponDamageModifierThisFrame(0x1D073A89, 0.3);
    //assault
    native.setWeaponDamageModifierThisFrame(0xBFEFFF6D, 0.25);
    //carbine
    native.setWeaponDamageModifierThisFrame(0x83BF0278, 0.2);
    //advanced
    native.setWeaponDamageModifierThisFrame(0xAF113F99, 0.3);
    //gusenberg
    native.setWeaponDamageModifierThisFrame(0x61012683, 0.25);
    //micro mp
    native.setWeaponDamageModifierThisFrame(0x13532244, 0.25);
    //mini mp
    native.setWeaponDamageModifierThisFrame(0xBD248B55, 0.25);
    //mp
    native.setWeaponDamageModifierThisFrame(0x2BE6766B, 0.3);
    //mp mk2
    native.setWeaponDamageModifierThisFrame(0x78A97CD0, 0.3);
    //combat pdw
    native.setWeaponDamageModifierThisFrame(0xA3D4D34, 0.3);
    //specialcarbine
    native.setWeaponDamageModifierThisFrame(0xC0A3098D, 0.25);
    //pistol
    native.setWeaponDamageModifierThisFrame(0x1B06D571, 0.3);
    //pistol50
    native.setWeaponDamageModifierThisFrame(0x99AEEB3B, 0.35);
    //combat pistol
    native.setWeaponDamageModifierThisFrame(0x5EF9FEC4, 0.3);
    //Marksman Rifle
    native.setWeaponDamageModifierThisFrame(0xC734385A, 0.25);
    //Sniper Rifle
    native.setWeaponDamageModifierThisFrame(0x05FC3C11, 0.35);
});

// let currentBullets = 0, currentWeapon = null;

// alt.everyTick(() => {
//     alt.log("hi");
//   let weapon = native.getSelectedPedWeapon(localPlayer.scriptID);
//   let bullets = native.getAmmoInPedWeapon(localPlayer.scriptID, weapon);

//   if(weapon != currentWeapon) {
//     currentWeapon = weapon;
//     currentBullets = bullets;
//   } else {
//     if(currentBullets > bullets) {
//       alt.emit('playerWeaponShot', currentWeapon, currentBullets, bullets);
//       alt.emitServer("Server:SetAmmo", currentBullets, currentWeapon);
//       currentBullets = bullets;
//     }
//   }
// });

// alt.on("playerWeaponShot", () => {
//     alt.log("hi");
//     var weaponHash = localPlayer.currentWeapons();
//     var ammo = localPlayer.getAmmoWeapon(weaponHash);
//     if (ammo % 10 == 0) alt.emitServer("Server:SetAmmo", ammo, weaponHash);
// });

alt.everyTick(() => {
    if(native.isPedShooting(localPlayer.scriptID)) {
    var weaponHash = localPlayer.currentWeapons();
    var ammo = localPlayer.getAmmoWeapon(weaponHash);
    if (ammo % 10 == 0) alt.emitServer("Server:SetAmmo", ammo, weaponHash);
    }
});


// if(native.isPedShooting(localPlayer.scriptID)) {
//     var weaponHash = localPlayer.currentWeapons();
//     var ammo = localPlayer.getAmmoWeapon(weaponHash);
//     var oldplayerpos;
//     let reported;
//     alt.log(oldplayerpos);
//     if (oldplayerpos.postion) {
//         let dist = native.getDistanceBetweenCoords(oldplayerpos.x, oldplayerpos.y, oldplayerpos.z, player.pos.x, player.pos.y, player.pos.z, false);
//         if (dist < 250) reported = true;
//         else {reported = false; oldplayerpos = player.postion;}
//     }
//     else {oldplayerpos = player.postion; reported = false;}
//     if (ammo % 10 == 0) alt.emitServer("Server:SetAmmo", reported, ammo, weaponHash);
//     }




//         public void SetAmmo(Boolean reported, ClassicPlayer player, int ammo, int hash)
//         {
//             int charId = player.CharacterId;
//             try
//             {
//                 if (WeaponHandler.GetWeaponModelByName((string)Characters.GetCharacterWeapon(player, "PrimaryWeapon")) == (WeaponModel)hash)
//                 {
//                     Characters.SetCharacterAmmo(charId, ammo, 1);
//                 }
//                 else if (WeaponHandler.GetWeaponModelByName((string)Characters.GetCharacterWeapon(player, "SecondaryWeapon")) == (WeaponModel)hash)
//                 {
//                     Characters.SetCharacterAmmo(charId, ammo, 2);
//                 }
//                 else if (WeaponHandler.GetWeaponModelByName((string)Characters.GetCharacterWeapon(player, "SecondaryWeapon2")) == (WeaponModel)hash)
//                 {
//                     Characters.SetCharacterAmmo(charId, ammo, 3);
//                 }
//                 if (ServerFactions.GetCharacterFactionId(charId) == 1 && ServerFactions.IsCharacterInFactionDuty(charId)) return;
//                 foreach (var PDmember in Alt.GetAllPlayers().ToList().Where(x => x != null && x.Exists && x.GetCharacterMetaId() > 0 && ServerFactions.IsCharacterInAnyFaction((int)x.GetCharacterMetaId()) && ServerFactions.GetCharacterFactionId((int)x.GetCharacterMetaId()) == 1 || ServerFactions.GetCharacterFactionId((int)x.GetCharacterMetaId()) == 3))
//                     PDmember.EmitLocked("notify", "success", "Alert", "Shooting in Progress.");
//                 // HUDHandler.SendNotification(PDmember, 3, 300, "Shooting in Progress!!.");
//                 if (reported) return;
//                 ServerFactions.AddNewFactionDispatch(0, 1, "Shooting in Progress.", player.Position);
//                 ServerFactions.AddNewFactionDispatch(0, 3, "Shooting in Progress.", player.Position);
//             }
//             catch (Exception e)
//             {
//                 Console.WriteLine(e.ToString());
//             }
//         }
