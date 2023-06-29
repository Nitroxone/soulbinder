class Soulwriting {
    constructor() {
        this.tabs = ["read", "write", "bend"];
        this.currentTab = this.tabs[1];

        this.soulmarks = [null, null, null, null];
        this.selectedSlot = 0;
        this.icon = 1;

        this.isWriting = false;
    }

    switchTab(index) {
        this.currentTab = this.tabs[index];
    }

    getCurrentTabIndex() {
        return this.tabs.indexOf(this.currentTab);
    }

    selectSlot(num) {
        if(this.selectedSlot === num) {
            this.unselectSlot();
            return;
        }
        this.selectedSlot = num;
    }
    unselectSlot() {
        this.selectedSlot = 0; 
    }

    addSoulmarkToSelected(slmrk) {
        this.soulmarks[this.selectedSlot - 1] = slmrk;
    }

    getSoulmarkFromSelected() {
        return this.soulmarks[this.selectedSlot - 1];
    }

    removeSoulmarkFromSelected() {
        this.soulmarks[this.selectedSlot - 1] = null;
    }

    getSoulmarkAt(id) {
        return this.soulmarks[id - 1];
    }
    unselectSoulmarkAt(id) {
        this.soulmarks[id - 1] = null;
    }

    getSoulmarkIndex(slmrk) {
        return this.soulmarks.indexOf(slmrk);
    }
}