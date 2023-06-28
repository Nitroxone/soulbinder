class Soulwriting {
    constructor() {
        this.tabs = ["read", "write", "bend"];
        this.currentTab = this.tabs[1];

        this.soulmarks = [null, null, null, null];
        this.icon = 1;

        this.isWriting = false;
    }

    switchTab(index) {
        this.currentTab = this.tabs[index];
    }

    getCurrentTabIndex() {
        return this.tabs.indexOf(this.currentTab);
    }
}