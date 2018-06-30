$( window ).on( "load", initialize);

function initialize_index(jQuery) {
    $("#btn0").removeClass("nav-item");
    $("#btn0").addClass("active-item");

    $("#i1").hide();
    $("#i2").hide();
    $("#i3").hide();
    $("#i4").hide();
    $("#i5").hide();
    $("#i6").hide();
    $("#i7").hide();

    $("#home_sliders").removeClass("hidden");
    
    $("#i1").delay(200).fadeIn(700);
    $("#i2").delay(1000).fadeIn(700);
    $("#i3").delay(1500).fadeIn(700);
    $("#i4").delay(2000).fadeIn(700);
    $("#i5").delay(2500).fadeIn(700);
    $("#i6").delay(3000).fadeIn(700);
    $("#i7").delay(3500).fadeIn(700);
}

function initialize(jQuery) {
    var btn_index = String(document.getElementById("btn_index").value);
    
    if (btn_index === "-1")
    {
        initialize_index();
    }
    else if (btn_index === "0")
    {

    }
    else if (btn_index === "2")
    {
        
    }
    else if (btn_index === "3")
    {
         
    }
    else
    {
        
    }
}

$(document).ready(function() {
    $("#motto").click(function() {
        $("#msg1").hide();
        $("#msg1").removeClass('hidden');
        $("#msg1").fadeIn(500);
    });

    $("#close-this-1").click(function() {
        $("#msg1").fadeOut(500);
    });

    $("#login-btn").click(function() {
        $("#login_form").submit();
    });
});








