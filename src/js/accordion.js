class Accordion {
    constructor() {

    };
    accordionItems() {
        let items = document.body.getElementsByTagName("H2")
        for (let i = 0; i < items.length; i += 1) {
            items[i].addEventListener("click", this.toggleClass)
        }
    };

    toggleClass() {
        this.classList.toggle("active")
    };

    init() {
        this.accordionItems();
    };
}

let accordion = new Accordion();
accordion.init();