class Grid {
    constructor() {
        this.html = null
        this.data = null
    }

    getKeys() {
        let i, k, j;
        this.data.keys = [];
        for (i = 0; i < this.data.initial.projects.length; i += 1) {
            k = Object.keys(this.data.initial.projects[i]);
            for (j = 0; j < k.length; j += 1) {
                if (this.data.keys.indexOf(k[j]) === -1) {
                    this.data.keys.push(k[j]);
                }
            }
        }
        return this.data.keys;
    };

    applyAttr(node, attr) {
        let i;
        for (i in attr) {
            node.setAttribute(i, attr[i]);
        }
        return node;
    };

    buildCell(type, content, attr) {
        let c = this.applyAttr(this.html[type].cloneNode(), attr || {});
        c.innerHTML = content || "";
        return c;
    };

    buildRow(data, type, attr) {
        let div = this.html.div.cloneNode(), i;
        this.applyAttr(div, { "class": "table-elements-container" })
        for (i in data) {
            div.appendChild(this.buildCell(type, data[i], attr));
        }
        return div;
    };

    buildHeader() {
        let thead = this.html.div.cloneNode();
        this.applyAttr(thead, { "class": "table-header" })
        thead.appendChild(this.buildRow(this.data.keys, "div", { "class": "table-container__header" }));
        return thead
    }

    buildBody(data) {
        let tbody = this.html.div.cloneNode();
        this.applyAttr(tbody, { "class": "table-body" });

        for (let i = 0; i < data.length; i++) {
            tbody.appendChild(this.buildRow(data[i], 'div', { "class": "table-container__data" }))
        }
        return tbody;
    };

    infiniteScroll() {
        getDivElement("content-inner").addEventListener("scroll", this.checkForNewEl);

    };
    
    checkForNewEl() {
        let el = document.querySelector(".table-elements-container:last-child");
        let scrollY = el.scrollHeight - el.scrollTop;
        let height = el.offsetHeight;
        let pageOffset = height - scrollY;

        if (pageOffset === 0 || pageOffset === 1) {
            var newEl = document.createElement("div");
            newEl.setAttribute("class", "table-elements-container");
            newEl.innerHTML = this.children[0].children[1].children[1].firstChild.innerHTML;
            document.getElementsByClassName("table-body")[0].appendChild(newEl);
        }
    };

    build() {
        let container = this.html.output;
        container.appendChild(this.buildHeader());
        container.appendChild(this.buildBody(this.data.initial.projects));
        this.applyAttr(container, { "class": "content-inner__table-container" });

        return container;
    };

    init(url) {
        this.data = Object.create(null);
        this.data.keys = [];
        this.html = Object.create(null);
        this.html.table = document.createElement("table");
        this.html.div = document.createElement("div");
        this.html.div = document.createElement("div");
        this.html.div = document.createElement("div");
        this.html.div = document.createElement('div');
        this.html.div = document.createElement('div');
        this.html.output = document.createElement('div');
        getData(url, this);
    };

    onreadystatechange(e) {
        if (e.currentTarget.readyState === 4) {
            this.data.initial = JSON.parse(e.currentTarget.response);
            this.run();
        }
    };

    handleEvent(e) {
        if (typeof this["on" + e.type] === "function") {
            return this["on" + e.type](e);
        }
        return false;
    };

    append() {
        document.getElementsByClassName("content-inner-wrapp")[0].appendChild(this.html.output);
    };

    showMenu() {
        let hamburger = getDivElement("page-header__side-nav");
        hamburger.addEventListener("click", () => {
            getHtmlElement("html").classList.add("side-menu-active");
        });
    };

    closeMenu() {
        let close = getDivElement("navigation-close-btn");
        let html = getHtmlElement("html");

        close.addEventListener("click", () => {
            if (html.classList.contains("side-menu-active")) {
                getHtmlElement("html").classList.remove("side-menu-active");
            }
        });
    };

    getToTop() {
        let button = document.getElementsByClassName("back-to-top")[0];
        button.addEventListener("click", function () {
            scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        });
    };

    run() {
        this.getKeys();
        this.build();
        this.append();
        this.closeMenu();
        this.showMenu();
        this.getToTop();
        this.scrollTop();
        this.infiniteScroll()
    };

    scrollTop() {
        window.addEventListener("scroll", function () {
            let height = window.innerHeight < window.pageYOffset;
            height ? document.body.getElementsByClassName("back-to-top")[0].classList.add("isShown") :
                document.body.getElementsByClassName("back-to-top")[0].classList.remove("isShown")
        });
    };
};

function getDivElement(el) {
    return document.body.getElementsByClassName(el)[0];
};

function getHtmlElement(el) {
    return document.getElementsByTagName(el)[0];
};

let obj = new Grid();
obj.init("https://gist.githubusercontent.com/elena-gancheva/e2af742be620fefa0b0d81e36f7cd66c/raw/1407c899e0a1baca8cd9564f6d9668fd7e8909a6/data.json");