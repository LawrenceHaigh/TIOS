//
// Responsive tables
// --------------------------------------------------
export function debounce(fn, time) {
    let timeout;
    return function() {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
}

//wrap div
export function setUpTables() {
    var tables = $("table");
    if (tables.length > 0) {
        tables.each(function(index) {
            const thisTable = $(this);
            if (!thisTable.parent("div.table-scroll").length) {
                thisTable.wrap(
                    `<div class="table-responsive"><div class="table-scroll"></div></div>`
                );
            }
        });
    }
}
setUpTables();

//add shadow to indicate table is scrollable
export function responsiveTables() {
    const tables = $("table");
    if (tables.length > 0) {
        tables.each(function(index) {
            const thisTable = $(this);
            if (thisTable.is(":visible")) {
                const tableWidth = thisTable.width();
                const thisDiv = thisTable.closest(".table-responsive");
                const divWidth = thisDiv.width();

                if (tableWidth > divWidth) {
                    thisDiv.addClass("has-scroll");
                } else {
                    thisDiv.removeClass("has-scroll");
                }
            }
        });
    }
}
setTimeout(responsiveTables, 500);

window.addEventListener(
    "resize",
    debounce(e => {
        responsiveTables();
    }, 250)
);
