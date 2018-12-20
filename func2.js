// Leave tract whose record is not found to be gray
undefinedColor = "#ddd";
strokeColor = "#444";

green = "rgb(20, 108, 54)";
yellow = "rgb(244, 209, 102)";
yellowBright = "rgb(244, 222, 148)";
yellowGreen = "rgb(144, 184, 88)";

// Set an array of colors from yellow to green
colorRange = d3.scaleLinear()
    .domain([0, 40, 100])
    .range([yellowBright, yellowGreen, green]);

// generated by http://vrl.cs.brown.edu/color
top10Colors = ["rgb(221,221,221)", "rgb(236,127,106)", "rgb(46,229,45)", "rgb(143,138,197)", "rgb(47,209,146)", "rgb(171,138,119)", "rgb(35,158,179)", "rgb(197,223,114)", "rgb(242,75,199)", "rgb(243,192,17)", "rgb(123,155,71)"];
top10Colors.forEach((color, i, colors) => {
    color = d3.hsl(color);
    color.s *= 0.8;
    colors[i] = color.brighter(0.4);
});

function formalizeIntro() {
    // Formalize each line in species intro
    titles = ["Binomial Name", "Name in Chinese", null, "Date", "Tree ID", "Address", "Trunk Diameter"]
    for (i = 0; i < 10; i++) {
        d = document.getElementById("species" + i);
        ps = d.getElementsByTagName("p");
        if (ps.length < titles.length) {
            continue;
        }
        newItem = document.createElement("span");
        newItem.innerHTML = `<a href="#map" class="back-to">Back to the Map</a>`;
        d.insertBefore(newItem, ps[0]);
        ps[4].innerHTML = `<a href="https://tree-map.nycgovparks.org/#treeinfo-${ps[4].innerHTML}" title="view this tree in NYC Street Tree Map" target="_blank">${ps[4].innerHTML}</a>`
        titles.forEach((title, j) => {
            if (title) {
                ps[j].innerHTML = "<strong>" + title + ":</strong> " + ps[j].innerHTML;
            }
        });
        ps[6].innerHTML = `${ps[6].innerHTML} inches`;
    }
    hideIntro();
}

function hideIntro() {
    intros = document.getElementsByClassName("intro");
    for (i = 0; i < intros.length; i++) {
        intros[i].style.display = "none"
    }
}

function showIntro(index) {
    hideIntro();
    d = document.getElementById("species" + index);
    d.style.display = "block";
    jumpToAnchor("species" + index);
}

function showIntro2(index) {
    hideIntro();
    d = document.getElementById("intro" + index);
    d.style.display = "block";
    jumpToAnchor("intro" + index);
}

function jumpToAnchor(anchor) {
    location = location.toString().replace(/#[A-Za-z0-9_]*$/,'') + "#" + anchor;
}

function mapColor(value, max) {
    return colorRange((value / max) * 100);
}

function total(record) {
    return parseInt(record.Fair) + parseInt(record.Good) + parseInt(record.Poor);
}

function getSpeciesIndex(species, top10Species) {
    if (species === undefined || top10Species.indexOf(species) == -1) {
        return -1;
    }
    return top10Species.indexOf(species);
}

function getSpeciesColor(index) {
    return top10Colors[index + 1];
}
