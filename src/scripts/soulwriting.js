class Soulwriting {
    constructor() {
        this.tabs = ["read", "write", "bend"];
        this.currentTab = this.tabs[1];


    }

    switchTab(index) {
        this.currentTab = this.tabs[index];
    }

    getCurrentTabIndex() {
        return this.tabs.indexOf(this.currentTab);
    }
}