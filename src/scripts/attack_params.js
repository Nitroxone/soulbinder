/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class AttackParams {
    constructor(type, amount, isAccurate, isDodged, isCritical, ignoresProtection, ignoresResistances) {
        this.type = type;
        this.amount = amount;
        this.isAccurate = isAccurate;
        this.isDodged = isDodged;
        this.isCritical = isCritical;
        this.ignoresProtection = ignoresProtection;
        this.ignoresResistances = ignoresResistances;
    }
}