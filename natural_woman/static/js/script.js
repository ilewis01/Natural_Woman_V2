$( window ).on( "load", initialize);


//PAGE INITIALIZATIONS
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

function get_load_id(btn_index)
{
    var loader = "";
    btn_index = Number(btn_index);
    if (btn_index == 7) {loader = "2";}
    else if (btn_index == 8) {loader = "3";}
    else if (btn_index == 10) {loader = "4";}
    else if (btn_index == 9) {loader = "5";}
    else if (btn_index == 11) {loader = "6";}
    else if (btn_index == 12) {loader = "7";}
    else if (btn_index == 13) {loader = "8";}
    else if (btn_index == 14) {loader = "14";}
    return loader;
}

function initialize_admin_forms()
{
    var btn_index = String(document.getElementById("btn_index").value);

    if (btn_index !== "6")
    {
        var index = get_load_id(btn_index);
        var trigger = "#msg" + index;

        $(trigger).hide();
        $(trigger).removeClass("hidden");
        $(trigger).fadeIn(600);
        $("#frame_active").val("1");
    }
    else
    {
        $("#frame_active").val("0");
        $("#blog_active").val("0");
    }

    if (btn_index === "7") { build_blog_editor(); }
    // if (btn_index === "14")
    // {
    //     var model_meta = $("#load_meta_model").val();
    //     model_meta = String(model_meta);
    //     if (model_meta === "blog")
    //     {
    //         build_blog_editor();
    //         $("#editor_builder").hide();
    //         $("#editor_builder").removeClass("hidden");
    //         $("#editor_builder").fadeIn(500);
    //     }
    //     else if (model_meta === "product")
    //     {
    //         $("#msg11").hide();
    //         $("#msg11").removeClass("hidden");
    //         $("#msg11").fadeIn(500);
    //     }
    // }

    choose_selector_editor(btn_index);
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
    else if (Number(btn_index) > 5)
    {
        initialize_admin_forms();
    }
    else
    {
        
    }
}

function choose_selector_editor(btn_index)
{
    var b = btn_index;
    if (b==="7" || b==="8" || b==="9" || b==="10" || b==="12")
    {
        load_selected_editor("0");
    }
}

function load_selected_editor(index)
{
    var prev = $("#selected_e").val()
    prev  = String(prev);
    if (prev === "init_val")
    {
        $("#li_0").addClass("editor_selected");
        $("#at_0").addClass("editor_selected");
        $("#selected_e").val("0");
    }
    else
    {
        index   = String(index);
        var at  = "#at_" + index;
        var li  = "#li_" + index;
        var pa  = "#at_" + prev;
        var pl  = "#li_" + prev;
        $(at).addClass("editor_selected");
        $(li).addClass("editor_selected");
        $(pa).removeClass("editor_selected");
        $(pl).removeClass("editor_selected");
        $("#selected_e").val(index);
    }
}

function open_product_editor(load_data)
{
    load_data = String(load_data);

    if (load_data === "0") 
    {
        $("#product_form_header").html("New Product");
        $("#product_editor_btn").html("Save");
        $("#target_action_prod").val("new");
    }
    else if (load_data === "1")
    {
        var selected_element        = $("#selected_e").val();
        selected_element            = String(selected_element)
        var selector_id             = "#id_" + selected_element;
        var selector_name           = "#name_" + (selected_element);
        var selector_description    = "#description_" + selected_element;
        var selector_price          = "#price_" + selected_element;
        var target_id               = $(selector_id).val();
        var name                    = $(selector_name).val();
        var description             = $(selector_description).val();
        var price                   = $(selector_price).val();

        $("#target_id_prod").val(target_id);
        $("#product_name").val(name);
        $("#product_price").val(price);
        $("#product_description").val(description);
        $("#product_form_header").html("Update Product");
        $("#product_editor_btn").html("Update");
        $("#target_action_prod").val("edit");
    }

    $("#msg11").hide();
    $("#msg11").removeClass("hidden");
    $("#msg11").fadeIn(500);
}

function clear_product_fields()
{
    $("#product_name").val("");
    $("#product_description").val("");
    $("#product_price").val("0");
}

function load_error_message(labl1, labl2, labl3, obj1, obj2, obj3)
{
    var entry1 = "<span>" + labl1 + "</span>&nbsp<em>" + obj1 + "</em>";
    var entry2 = "<span>" + labl2 + "</span>&nbsp<em>" + obj2 + "</em>";
    var entry3 = "<span>" + labl3 + "</span>&nbsp<em>" + obj3 + "</em>";

    $("#label1").html(entry1);
    $("#label2").html(entry2);
    $("#label3").html(entry3);
}

function load_error_heads(head, msg1, msg2, button)
{
    $("#error_header").html(head);
    $("#error_msg_m1").html(msg1);
    $("#error_msg_m2").html(msg2);
    $("#obj_action").html(button);
}

function build_blog_editor()
{
    var html = "<div class=\"pop_editor_wrap center_v_mode\"><div class=\"frame_general\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>blog editor</h3><form action=\"/edit_success\" method=\"POST\" id=\"super_blog_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model2-1\" value=\"blog\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action2-1\" value=\"update\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id2-1\" value=\"\">";
    html += "<input type=\"text\" name=\"subject\" id=\"editor_subject\" placeholder=\"Subject\" required>";
    html += "<div class=\"blog_full_editor_content\">";
    html += "<textarea id=\"super_blog_content\" required placeholder=\"Blog Body\" name=\"content\"></textarea>";
    html += "</div></form><div class=\"blog-btn-wrapper\"><button id=\"edit_action\">Submit</button>";
    html += "<button id=\"close-this-10\">Close</button></div></div></div>";
    $("#editor_builder").html(html);
}

function build_new_blog()
{
    var html = "<div class=\"blog-post-wrapper\">"
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>New Blog Post</h3><form action=\"/auth\" method=\"POST\" id=\"new_blog_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target1\" value=\"new_blog\">";
    html += "<div class=\"blog_content_wrapper\">";
    html += "<textarea name=\"blog_content\" id=\"blog_content\" placeholder=\"Blog Body\" required></textarea>";
    html += "</div></form><div class=\"blog-btn-wrapper\">";
    html += "<button id=\"target_new_blog\">Post</button>";
    html += "<button id=\"close-this-1\">Cancel</button></div></div>";
}

function build_blog_manager()
{
    var html = "";
    html += "<div class=\"blog-manager-container center_v_mode\"><div class=\"frame_general\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Manage Blogs</h3>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"blog_editor_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model2\" value=\"blog\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action2\" value=\"\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id2\" value=\"\"></form>";
    html += "<div class=\"editor-cont\"> <div class=\"select-editor\"><ul>{% for b in blogs %}";
    html += "<a href=\"javascript: load_selected_editor('{{b.index}}');\" id=\"at_{{b.index}}\">";
    html += "<input type=\"hidden\" id=\"id_{{b.index}}\" value=\"{{b.blog.id}}\">";
    html += "<input type=\"hidden\" id=\"subject_{{b.index}}\" value=\"{{b.blog.subject}}\">";
    html += "<input type=\"hidden\" id=\"content_{{b.index}}\" value=\"{{b.blog.content}}\">";
    html += "<input type=\"hidden\" id=\"date_{{b.index}}\" value=\"{{b.date}}\">";
    html += "<input type=\"hidden\" id=\"time_{{b.index}}\" value=\"{{b.time}}\">";
    html += "<li id=\"li_{{b.index}}\"><div><span>Subject: </span>{{b.blog.subject}}</div>";
    html += "<div><span>Posted on: </span>{{b.date.date}} at <em>{{b.date.time}}</em></div>";
    html += "</li></a>{% endfor %}</ul></div></div><div class=\"frame-btn-wrapper-3\">";
    html += "<button id=\"launch_blog_editor\">Edit</button>";
    html += "<button id=\"request_blog_delete\">Delete</button>";
    html += "<button id=\"close-this-2\">Exit</button></div></div></div>";
    html += "";
}

function submit_delbg()
{
    $("#blog_editor_form").submit();
}

function submit_delpd()
{
    $("#product_delete_form").submit();
}


$(document).ready(function() {
    $("#login-btn").click(function() {
        $("#login_form").submit();
    });

    $("#close_error_window").click(function() {
        $("#err").fadeOut(500);
    });

    $("#motto").click(function() {
        $("#msg1").hide();
        $("#msg1").removeClass('hidden');
        $("#msg1").fadeIn(500);
    });

    $("#ab1").click(function() {
        var frame_active = String(document.getElementById("frame_active").value);
        if (frame_active === "1")
        {
            var btn_index   = String(document.getElementById("btn_index").value);
            var loader      = get_load_id(btn_index);
            var trigger     = "#msg" + loader;

            $(trigger).fadeOut(600);
        }

        $("#msg1").hide();
        $("#msg1").removeClass("hidden");
        $("#msg1").fadeIn(600);
        $("#blog_active").val("1");
    });


    //ADMIN BUTTON LOADERS
    $("#ab2").click(function() {
        var btn_index   = String(document.getElementById("btn_index").value);
        if (frame_active === "1")
        { $( "#msg2" ).fadeOut(500, function() { window.location.href = "/blog_editor" }); }
        else { window.location.href = "/blog_editor"; }
    });
    $("#ab3").click(function() {
        if (frame_active === "1")
        { $( "#msg3" ).fadeOut(500, function() { window.location.href = "/product_editor" }); }
        else { window.location.href = "/product_editor"; }
    });
    $("#ab4").click(function() {
        if (frame_active === "1")
        { $( "#msg4" ).fadeOut(500, function() { window.location.href = "/gallery_editor" }); }
        else { window.location.href = "/gallery_editor"; }
    });
    $("#ab5").click(function() {
        if (frame_active === "1")
        { $( "#msg5" ).fadeOut(500, function() { window.location.href = "/about_editor" }); }
        else { window.location.href = "/about_editor"; }
    });
    $("#ab6").click(function() {
        if (frame_active === "1")
        { $( "#msg6" ).fadeOut(500, function() { window.location.href = "/company_editor" }); }
        else { window.location.href = "/company_editor"; }
    });
    $("#ab7").click(function() {
        if (frame_active === "1")
        { $( "#msg7" ).fadeOut(500, function() { window.location.href = "/user_editor" }); }
        else { window.location.href = "/user_editor"; }
    });
    $("#ab8").click(function() {
        if (frame_active === "1")
        { $( "#msg8" ).fadeOut(500, function() { window.location.href = "/user_access" }); }
        else { window.location.href = "/user_access"; }
    });


    //ADMIN FRAME CLOSERS
    $("#close-this-1").click(function() {
        $("#subject").val("");
        $("#blog_content").val("");
        $("#msg1").fadeOut(500);
        $("#blog_active").val("0");
    });
    $("#close-this-2").click(function() {
        $("#msg2").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-3").click(function() {
        $("#msg3").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-4").click(function() {
        $("#msg4").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-5").click(function() {
        $("#msg5").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-6").click(function() {
        $("#msg6").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-7").click(function() {
        $("#msg7").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-8").click(function() {
        $("#msg8").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-14").click(function() {
        $("#msg14").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-10").click(function() {
        $("#editor_builder").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-11").click(function() {
        $("#msg11").fadeOut(500);
        $("#frame_active").val("0");
    });
    $("#close-this-15").click(function() {
        $("#err").fadeOut(500);
        $("#frame_active").val("0");
    });



    //ADMIN FORM SUBMISSION
    $("#target_new_blog").click(function() {
        $( "#msg1" ).fadeOut(500, function() {
            $("#new_blog_form").attr("action", "/edit_success");
            $("#new_blog_form").submit();
        });
    });
    $("#edit_action").click(function() {
        $( "#editor_builder" ).fadeOut(500, function() {
            $("#super_blog_form").submit();
        });
    });
    $("#product_editor_btn").click(function() {
        $("#product_edit_form").submit();
    });
    $("#request_blog_delete").click(function() {
        var index = $("#selected_e").val();
        index = String(index);
        var subj_id = "#subject_" + index;
        var cont_id = "#content_" + index;
        var date_id = "#date_" + index;
        var elem_id = "#id_" + index;
        var subject = $(subj_id).val();
        var content = $(cont_id).val();
        var date    = $(date_id).val();
        var e_id    = $(elem_id).val()

        load_error_message("SUBJECT:", "POSTED ON:", "CONTENT:", subject, content, date);
        load_error_heads("Delete Blog", "Are You Sure You Want To Proceed?", "This action is permanent and cannot be undone", "Delete");

        $("#target_id2").val(e_id);
        $("#obj_action").attr("onClick", "Javascript: submit_delbg();")
        $("#err" ).hide();
        $("#err" ).removeClass("hidden");
        $("#err" ).fadeIn(500);
    });
    $("#prod_btn3").click(function() {
        var index = $("#selected_e").val();
        index = String(index);
        var loader_name         = "#name_" + index;
        var loader_description  = "#description_" + index;
        var loader_price        = "#price_" + index;
        var loader_id           = "#id_" + index;
        var name                = $(loader_name).val();
        var description         = $(loader_description).val();
        var price               = $(loader_price).val();
        var e_id                = $(loader_id).val()

        load_error_heads("Delete Product", "Are You Sure You Want To Proceed?", "This action is permanent and cannot be undone", "Delete");
        load_error_message("PRODUCT:", "DESCRIPTION:", "PRICE: $", name, description, price);

        $("#target_id_proddel").val(e_id);
        $("#obj_action").attr("onClick", "Javascript: submit_delpd();")
        $("#err" ).hide();
        $("#err" ).removeClass("hidden");
        $("#err" ).fadeIn(500);
    });
    $("#launch_blog_editor").click(function() {
        var index = $("#selected_e").val();
        index = String(index);
        var subj_id = "#subject_" + index;
        var cont_id = "#content_" + index;
        var elem_id = "#id_" + index;
        var subject = $(subj_id).val();
        var content = $(cont_id).val();
        var e_id    = $(elem_id).val()

        $("#editor_subject").val(subject);
        $("#super_blog_content").val(content);
        $("#target_id2-1").val(e_id);
        $("#editor_builder" ).hide();
        $("#editor_builder" ).removeClass("hidden");
        $("#editor_builder" ).fadeIn(500);
    });
});








