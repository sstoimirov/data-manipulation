'use strict';
// import getData from "../../data/data";
// function getData(url, callback) {
//     const request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.addEventListener("readystatechange", callback);
//     request.send();
// }

var grid = {
    html: null,
    data: null,
    getKeys: function () {
        var i, k, j;
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
    },

    applyAttr: function (node, attr) {
        var i;
        for (i in attr) {
            node.setAttribute(i, attr[i]);
        }
        return node;
    },

    buildCell: function (type, content, attr) {
        var c = this.applyAttr(this.html[type].cloneNode(), attr || {});
        c.innerHTML = content || "";
        return c;
    },

    buildRow: function (data, type, attr) {
        var tr = this.html.tr.cloneNode(), i;
        for (i in data) {
            tr.appendChild(
                this.buildCell(
                    type, data[i], attr
                )
            );
        }
        return tr;
    },

    buildHeader: function () {
        var thead = this.html.thead.cloneNode();
        thead.appendChild(this.buildRow(this.data.keys, 'th', { 'data-action': 'sortBy' }));
        return thead;
    },

    buildBody: function (data) {
        var tbody = this.html.tbody.cloneNode();
        this.applyAttr(tbody, { "id": "table-body" })
        for (var i = 0; i < data.length; i++) {
            tbody.appendChild(this.buildRow(data[i], 'td', {}))
        }
        return tbody;
    },

    buildSelectBox: function () {
        var selectBox = this.html.selectBox.cloneNode();
        for (var i = 0; i < this.data.keys.length; i += 1) {
            selectBox.appendChild(this.buildCell('option', this.data.keys[i]));
        }
        return selectBox;
    },

    build: function () {
        var table = this.html.table.cloneNode();
        this.applyAttr(table, { "class": "table" });
        this.applyAttr(this.html.output, { "class": "table-container" })
        // this.html.output.appendChild(this.buildSelectBox());
        // this.html.output.appendChild(this.buildInput());
        table.appendChild(this.buildHeader());
        table.appendChild(this.buildBody(this.data.initial.projects));
        this.html.output.appendChild(table);
        return this.html.output;
    },

    init: function (url) {
        this.data = Object.create(null);
        this.data.keys = [];
        this.html = Object.create(null);
        // this.data.sorted = null;

        // this.html.selectBox = document.createElement('select');
        // this.html.option = document.createElement('option');

        this.html.table = document.createElement("table");
        this.html.tr = document.createElement("tr");
        this.html.th = document.createElement("th");
        this.html.td = document.createElement("td");
        this.html.thead = document.createElement('thead');
        this.html.tbody = document.createElement('tbody');
        this.html.output = document.createElement('div');
        getData(url, this);
    },

    onclick: function (e) {
        var t = e.target;
        if (t.tagName === "TH") {
            if (typeof this[t.dataset.action] === "function") {
                this[t.dataset.action](t);
            }
        }
    },

    onreadystatechange: function (e) {
        if (e.currentTarget.readyState === 4) {
            this.data.initial = JSON.parse(e.currentTarget.response);
            // this.data.sorted = this.data.initial.projects.slice();
            this.run();

        }
    },

    handleEvent: function (e) {
        if (typeof this["on" + e.type] === "function") {
            return this["on" + e.type](e);
        }
        return false;
    },

    append: function () {
        document.getElementById("content-main").appendChild(this.html.output);
    },
    showMenu: function () {
        var hamburger = getDivElement("side-nav");
        hamburger.addEventListener("click", () => {
            getHtmlElement("html").classList.add("side-menu-active");
        });
    },

    closeMenu: function () {
        var close = getDivElement("navigation-close-btn");
        var html = getHtmlElement("html");

        close.addEventListener("click", () => {
            if (html.classList.contains("side-menu-active")) {
                getHtmlElement("html").classList.remove("side-menu-active");
            }
        });
    },
    run: function () {
        this.getKeys();
        this.build();
        // this.attachEvent();
        this.append();
        this.closeMenu();
        this.showMenu();
    },
}
window.addEventListener('load',function(){
    var loader = document.body.getElementsByClassName("loader-wrapper")[0];
    document.body.removeChild(loader); 
  });
function getDivElement(el) {
    return document.body.getElementsByClassName(el)[0];
}

function getHtmlElement(el) {
    return document.getElementsByTagName(el)[0];
}
var obj = Object.create(grid);
obj.init("https://gist.githubusercontent.com/elena-gancheva/e2af742be620fefa0b0d81e36f7cd66c/raw/1407c899e0a1baca8cd9564f6d9668fd7e8909a6/data.json")




