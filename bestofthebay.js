Parse.initialize("Meyn2nCyKeahZsMt0ujlfG8gsv7iMhGIeNuWLsRR", "WHOdw7C4jGQM9skogwpPJXVyexHcSHlCUZBjKuMA");


$(function() {

    $("#restaurantList").on("click", ".restaurant", function() {
        $(".item").hide().filter("[data-source=" + this.id + "]").show();
    })

    $("#notes").on("keyup", function() {
        $("#notesCounter").text($(this).val().length);
        $("#notes").css("background-color", this.value.length > 10 ? "#ff7777" : "#fff")

        //if (this.value.length > 10) {
        //    $("#notes").css("background-color", "#ff7777");
        //} else {
        //    $("#notes").css("background-color", "#fff");
        //}
    })


    var Restaurant = Parse.Object.extend("Restaurant");
    var query = new Parse.Query(Restaurant);
    query.find({
        success: function(results) {
            var li, a, restaurants = [];

            results.forEach(function(r, i) {
                // restaurants += "<li><a id='" + r.id + "' class='restaurant' href='#'>" + r.attributes.name + "</a></li>";
                a = $("<a />", { class: 'restaurant', href: "#", id: r.id, text: r.attributes.name })
                restaurants.push($("<li />").append(a));
            })

            $("ul#restaurantList").append(restaurants);
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    var MenuItem = Parse.Object.extend("MenuItem");
    var query = new Parse.Query(MenuItem);
    query.find({
        success: function(results) {
            var li, menuItems = [];

            results.forEach(function(mi, i) {
                var cb = $("<input />", { "type": 'checkbox' });
                menuItems.push($("<li />", { "class": 'item', "data-source": mi.attributes.restaurant_id }).append(cb).append(" " + mi.attributes.title));
            })

            $("ul#itemList").append(menuItems);
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

});