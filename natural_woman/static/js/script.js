$( window ).on( "load", initialize);

function initialize(jQuery) {
    var btn_index = String(document.getElementById("btn_index").value);
    
    if (Number(btn_index) > 5)
    {
        initialize_admin_forms();
    }
    else
    {
        $("#base1_fade_id").removeClass('hidden');
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
    }
}

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

function initialize_admin_forms()
{
    var btn_index = String(document.getElementById("btn_index").value);

    if (btn_index !== "6")
    {
        $("#msg2").hide();
        $("#msg2").removeClass("hidden");
        $("#msg2").fadeIn(600);
        $("#frame_active").val("1");

        if (btn_index==="7" || btn_index==="8" || btn_index==="9" || btn_index==="12")
        {
            $("#selected_e").val("0")
            $("#div_0").addClass("super_select");
        }

        else if (btn_index === "10") //TEMPORARY GALLERY FRAME
        {
            $("#msg2").hide();
            $("#msg6").hide();
            $("#msg6").removeClass("hidden");
            $("#msg6").fadeIn(600);
        }
    }
    else
    {
        $("#master-body-fader").hide();
        $("#master-body-fader").removeClass("hidden");
        $("#master-body-fader").fadeIn(600);
        $("#frame_active").val("0");
        $("#blog_active").val("0");
    }

    if (Number(btn_index) < 20)
    {
        $("#btn0").addClass("selected-item");
    }
    else
    {
        if (Number(btn_index) === 21)
        {
            $("#ddb1").addClass("drpSelected");
        }
        else if (Number(btn_index) > 22)
        {
            $("#ddb2").addClass("drpSelected");
        }
        else if (Number(btn_index) > 23)
        {
            $("#ddb3").addClass("drpSelected");
        }
        $("#add00").css({"text-shadow":"1px 1px #000000", "color":"#cadc23"});
    }
    if (Number(btn_index) === 40)
    {
        $("#base1_fade_id").hide();
        $("#msg7").removeClass('hidden');
        $("#base1_fade_id").removeClass('hidden');
        $("#base1_fade_id").fadeIn(500);
    }
}

function deactivate_blog_editor()
{
    $("#editor_subject").val("");
    $("#super_blog_content").val("");
    $("#msg3").fadeOut((500));
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
        $("#product_form_header").html("Edit Product Details");
        $("#product_editor_btn").html("Update");
        $("#target_action_prod").val("edit");
    }

    $("#msg3").hide();
    $("#msg3").removeClass("hidden");
    $("#msg3").fadeIn(500);
}

function clear_product_fields()
{
    $("#product_name").val("");
    $("#product_description").val("");
    $("#product_price").val("0");
    $("#msg3").fadeOut(500);
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

function build_blog_manager(data)
{
    var html = "<form action=\"/edit_success\" method=\"POST\" id=\"blog_editor_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model2\" value=\"blog\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action2\" value=\"\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id2\" value=\"\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"7\">";
    html += "</form>";
    html += "<div class=\"blog-manager-container center_v_mode\">";
    html += "<div class=\"frame_general_sm steel_back\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Blog Management</h3>";
    html += "<div class=\"generalSteel\">";
    html += "<h2 class=\"blogger_editor\"><i class=\"fas fa-edit\"></i></h2>";
    html += "<h5>Select a blog from the list below</h5>";
    html += "<div class=\"generalSteelListWrap\">";
    html += "<ul>";

    for(var i = 0; i < data.length; i++)
    {
        html += "<div id=\"div_" + data[i]['index'] + "\">";
        html += "<a href=\"javascript: about_selector('" + data[i]['index'] + "');\" id=\"at_" + data[i]['index'] + "\">";
        html += "<input type=\"hidden\" id=\"id_" + data[i]['index'] + "\" value=\"" + data[i]['id'] + "\">";
        html += "<input type=\"hidden\" id=\"subject_" + data[i]['index'] + "\" value=\"" + data[i]['subject'] + "\">";
        html += "<input type=\"hidden\" id=\"content_" + data[i]['index'] + "\" value=\"" + data[i]['content'] + "\">";
        html += "<input type=\"hidden\" id=\"date_" + data[i]['index'] + "\" value=\"" + data[i]['date'] + "\">";
        html += "<input type=\"hidden\" id=\"time_" + data[i]['index'] + "\" value=\"" + data[i]['time'] + "\">";
        html += "<li id=\"" + data[i]['index'] + "\">";
        html += "<div><span>Subject: </span>" + data[i]['subject'] + "</div>";
        html += "<div><span>Posted on: </span>" + data[i]['date'] + " at <em>" + data[i]['time'] + "</em></div>";
        html += "</li>";
        html += "</a></div>";
    }

    html += "</ul>";
    html += "</div>";

    html += "<div class=\"ul_buttons2\">";
    html += "<button id=\"launch_blog_editor\">Edit Blog</button>";
    html += "<button id=\"request_blog_delete\">Delete Selected</button>";
    html += "</div>";
    html += "</div>";
    html += "<div class=\"generalSteel main_exit_btn\">";
    html += "<div class=\"general_steel_btn1\">";
    html += "<button id=\"close-this-2\">Exit</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    build_blog_editor();
    return html;
}

function build_blog_editor()
{
    var html = "<div class=\"about_editor_container center_v_mode\">";
    html += "<div class=\"frame_general_sm\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Edit Blog Post</h3>";
    html += "<div class=\"generalSteel-in\">";
    html += "<h2 class=\"blogger_editor\"><i class=\"fas fa-edit\"></i></h2>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"blog_editor_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model2\" value=\"blog\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action2\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id2\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"7\">";
    html += "<div class=\"editme_label\">Subject:</div>";
    html += "<input type=\"text\" name=\"subject\" id=\"editor_subject\" placeholder=\"Type subject here\" style=\"font-size:11px;\" required>";
    html += "<div class=\"blog_full_editor_content\">";
    html += "<textarea id=\"super_blog_content\" name=\"content\" required></textarea>";
    html += "</div>";
    html += "</form>";
    html += "<div class=\"general_editor_btns\">";
    html += "<button id=\"edit_action\">Save Changes</button>";
    html += "<button onClick=\"javascript: deactivate_blog_editor();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#msg3").html(html);
}

function build_product_manager(data)
{
    var html = "<form action=\"/edit_success\" method=\"POST\" id=\"product_delete_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_modelproddel\" value=\"product\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_proddel\" value=\"\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_proddel\" value=\"\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"8\">";
    html += "</form>";
    html += "<div class=\"pop_editor_wrap center_v_mode\">";
    html += "<div class=\"frame_general_sm steel_back\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Product Management</h3>";
    html += "<div class=\"generalSteel\">";
    html += "<h2 class=\"blogger_editor\"><i class=\"fas fa-spray-can\"></i></h2>";
    html += "<h5>Select a product from the list below</h5>";
    html += "<div class=\"generalSteelListWrap\">";
    html += "<ul>";

    for(var i = 0; i < data.length; i++)
    {
        html += "<div id=\"div_" + data[i]['index'] + "\">";
        html += "<a href=\"javascript: about_selector('" + data[i]['index'] + "');\" id=\"at_" + data[i]['index'] + "\">";
        html += "<input type=\"hidden\" id=\"id_" + data[i]['index'] + "\" value=\"" + data[i]['id'] + "\">";
        html += "<input type=\"hidden\" id=\"name_" + data[i]['index'] + "\" value=\"" + data[i]['name'] + "\">";
        html += "<input type=\"hidden\" id=\"description_" + data[i]['index'] + "\" value=\"" + data[i]['description'] + "\">";
        html += "<input type=\"hidden\" id=\"price_" + data[i]['index'] + "\" value=\"" + data[i]['price'] + "\">";
        html += "<li id=\"li_" + data[i]['index'] + "\"><div><span>Product: </span>" + data[i]['name'] + "</div>";
        html += "<div><em><span>Description: </span>" + data[i]['description'] + "</em></div>";
        html += "<div><span>Price: </span>$" + data[i]['price'] + "</em></div></li></a></div>";
    }

    html += "</ul>";
    html += "</div>";

    html += "<div class=\"ul_buttons3\">";
    html += "<button id=\"prod_btn1\" onClick=\"javascript: open_product_editor('0');\">New Product</button>";
    html += "<button id=\"prod_btn2\" onClick=\"javascript: open_product_editor('1');\">Edit Selected</button>";
    html += "<button id=\"prod_btn3\">Delete Selected</button>";
    html += "</div>";
    html += "</div>";
    html += "<div class=\"generalSteel main_exit_btn\">";
    html += "<div class=\"general_steel_btn1\">";
    html += "<button id=\"close-this-2\">Exit</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    build_product_editor();
    return html;
}

function build_product_editor()
{
    var html = "<div class=\"about_editor_container center_v_mode\">";
    html += "<div class=\"frame_general_sm\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3 id=\"product_form_header\">Edit Product Details</h3>";
    html += "<div class=\"generalSteel-in\">";
    html += "<h2 class=\"blogger_editor\"><i class=\"fas fa-spray-can\"></i></h2>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"product_edit_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_prod\" value=\"product\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_prod\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_prod\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"8\">";
    html += "<div class=\"editme_label\">Product Name:</div>";
    html += "<input type=\"text\" name=\"name\" id=\"product_name\" placeholder=\"Type product name here\" required>";
    html += "<div class=\"product_description_textarea\">";
    html += "<div class=\"editme_label\">Product Description:</div>";
    html += "<textarea name=\"description\" id=\"product_description\" required></textarea>";
    html += "</div>";
    html += "<div class=\"restore_frame\">";
    html += "Price: ";
    html += "<input type=\"number\" min=\"0\" max=\"9999\" name=\"price\" id=\"product_price\" value=\"0\">";
    html += "</div>";
    html += "</form>";
    html += "<div class=\"general_editor_btns\">";
    html += "<button id=\"product_editor_btn\">Save Changes</button>";
    html += "<button onClick=\"javascript: clear_product_fields();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#msg3").html(html);
}

function build_about_manager(inactive, current)
{
    var html = "<form action=\"/edit_success\" method=\"POST\" id=\"about_delete_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_aboutManager\" value=\"about\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_aboutManager\" value=\"delete\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_aboutManager\" value=\"\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"9\">";
    html += "<input type=\"hidden\" name=\"current_id\" id=\"current_id\" value=\"" + current['id'] + "\">";
    html += "<input type=\"hidden\" name=\"current_statement\" id=\"current_statement_v2\" value=\"" + current['statement'] + "\">";
    html += "</form><div class=\"about_management_container center_v_mode\"><div class=\"frame_general_sm steel_back\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div><h3>About Us Statement</h3>";
    html += "<div class=\"active_about_wrapper\"><div class=\"alone_icon\">A</div><h4>Active <em>\"About Us\"</em> Statement";
    html += "<a href=\"javascript: load_helper('about_active');\"> <i class=\"far fa-question-circle\"></i></a></h4> ";
    html += "<em>" + current['statement'] + "</em><div class=\"s_edit_btn\">";
    html += "<button id=\"new_about\" onClick=\"javascript: activate_about_editor(); display_about_editor('0', 'active');\">New</button>";
    html += "<button id=\"edit_active_about\" onClick=\"javascript: activate_about_editor(); display_about_editor('1', 'active');\">Edit</button>";
    html += "</div></div><div class=\"inactive_abouts\"><h4> Inactive Statements";
    html += "<a href=\"javascript: load_helper('about_inactive');\"> <i class=\"far fa-question-circle\"></i></a></h4>";
    html += "<div class=\"inactive_list_wrapper\"><div class=\"inactive_list\"><ul>";
    for (var i = 0; i < inactive.length; i++)
    {
        html += "<div class=\"\" id=\"div_" + inactive[i]['index'] + "\"><a href=\"javascript: about_selector('" + inactive[i]['index'] + "');\"><li>";
        html += "<input type=\"hidden\" id=\"id_" + inactive[i]['index'] + "\" value=\"" + inactive[i]['id'] + "\">";
        html += "<input type=\"hidden\" id=\"statement_" + inactive[i]['index'] + "\" value=\"" + inactive[i]['statement'] + "\">";
        html += "<span>Statement: </span><em>" + inactive[i]['statement'] + "</em></li></a></div>";
    }
    html += "</ul></div></div>";
    html += "<div class=\"s_edit_btn\">";
    html += "<button id=\"set_about_active\" onClick=\"javascript: set_about_active();\">Set Active</button>";
    html += "<button id=\"edit_inactive_about\" onClick=\"javascript: activate_about_editor(); display_about_editor('1', 'inactive');\">Edit</button>";
    html += "<button id=\"delete_about\" onClick=\"javascript: delete_about();\">Delete</button></div></div>";

    html += "<div class=\"generalSteel main_exit_btn\" style=\"width: 100%; margin-top:1%;\">";
    html += "<div class=\"general_steel_btn1\" style=\"width: 100%;\">";
    html += "<button id=\"close-this-2\">Exit</button>";
    html += "</div>";
    html += "</div>";
    build_about_editor();
    return html;
}

function build_about_editor()
{
    var html = "<div class=\"about_editor_container center_v_mode\">";
    html += "<div class=\"frame_general_sm\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>\"About Us\" Editor</h3>";
    html += "<div class=\"generalSteel-in\">";
    html += "<div class=\"alone_icon\">A</div>";
    html += "<h5>Type or edit the \"About Us\" statement in the space provided below</h5>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"about_us_editor\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_aboutEditor\" value=\"about\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_aboutEditor\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_aboutEditor\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"9\">";
    html += "<input type=\"hidden\" name=\"m_is_active\" id=\"m_is_active\" value=\"1\">";

    html += "<div class=\"about_editor_textarea\">";
    html += "<textarea name=\"statement\" id=\"editor_statement\" placeholder=\"Write about us statement here...\" required></textarea>";
    html += "</div>";
    html += "<div class=\"active_setter\">";
    html += "<input type=\"checkbox\" name=\"is_active\" id=\"active_check\" value=\"0\" onClick=\"mod_checkbox('#m_is_active');\" checked>";
    html += "<label>&nbspSet As Current Statement</label>";
    html += "</div>";


    html += "</form>";
    html += "<div class=\"general_editor_btns\">";
    html += "<button onClick=\"javascript: save_about_object();\">Save Changes</button>";
    html += "<button onClick=\"javascript: close_about_editor();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    $("#msg3").html(html);
}

function build_company_manager(pay, data)
{
    var cash        = "";
    var check       = "";
    var visa        = "";
    var mc          = "";
    var amex        = "";
    var has_cash    = "";
    var has_check   = "";
    var has_visa    = "";
    var has_mc      = "";
    var has_amex    = "";
    var twitter     = String(data['show_twitter']);
    var facebook    = String(data['show_facebook']);
    var instagram   = String(data['show_instagram']);

    for (var i = 0; i < pay.length; i++)
    {
        var method      = String(pay[i]['method']);
        var accepted    = String(pay[i]['is_accepted']);
        if (method === "cash")
        {
            has_cash = accepted;
            if (accepted === "False") { cash = "<td><input type='checkbox' id='m_cash' onClick=\"javascript: commit_checkbox_value('master_cash')\"></td>"; }
            else { cash = "<td><input type='checkbox' id='m_cash' checked onClick=\"javascript: commit_checkbox_value('master_cash')\"></td>"; }
        }
        else if (method === "visa")
        {
            has_visa = accepted;
            if (accepted === "False") { visa = "<td><input type='checkbox' id='m_visa' onClick=\"javascript: commit_checkbox_value('master_visa')\"></td>"; }
            else { visa = "<td><input type='checkbox' id='m_visa' checked onClick=\"javascript: commit_checkbox_value('master_visa')\"></td>"; }
        }
        else if (method === "mastercard")
        {
            has_mc = accepted;
            if (accepted === "False") { mc = "<td><input type='checkbox' id='m_mastercard' onClick=\"javascript: commit_checkbox_value('master_mc')\"></td>"; }
            else { mc = "<td><input type='checkbox' id='m_mastercard' checked onClick=\"javascript: commit_checkbox_value('master_mc')\"></td>"; }
        }
        else if (method === "amex")
        {
            has_amex = accepted;
            if (accepted === "False") { amex = "<td><input type='checkbox' id='m_amex' onClick=\"javascript: commit_checkbox_value('master_amex')\"></td>"; }
            else { amex = "<td><input type='checkbox' id='m_amex' checked onClick=\"javascript: commit_checkbox_value('master_amex')\"></td>"; }
        }
        else if (method === "check")
        {
            has_check = accepted;
            if (accepted === "False") { check = "<td><input type='checkbox' id='m_check' onClick=\"javascript: commit_checkbox_value('master_check')\"></td>"; }
            else { check = "<td><input type='checkbox' id='m_check' checked onClick=\"javascript: commit_checkbox_value('master_check')\"></td>"; }
        }
    }

    var html = "<div class='pfile2_wrap center_v_mode'>";
    html += "<form action='/edit_success' method='POST' id='master_company_management_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='company'>";
    html += "<input type='hidden' name='target_action' id='target_action' value=''>";
    html += "<input type='hidden' name='master_address1' id='master_address1' value='";
    html += data["address1"];
    html += "'>";
    html += "<input type='hidden' name='master_address2' id='master_address2' value='";
    html += data["address2"];
    html += "'>";
    html += "<input type='hidden' name='master_address3' id='master_address3' value='";
    html += data["address3"];
    html += "'>";
    html += "<input type='hidden' name='master_city' id='master_city' value='";
    html += data["city"];
    html += "'>";
    html += "<input type='hidden' name='master_state' id='master_state' value='";
    html += data["state"];
    html += "'>";
    html += "<input type='hidden' name='master_zip_code' id='master_zip_code' value='";
    html += data["zip_code"];
    html += "'>";
    html += "<input type='hidden' name='master_phone' id='master_phone' value='";
    html += data["phone"];
    html += "'>";
    html += "<input type='hidden' name='master_email' id='master_email' value='";
    html += data["email"];
    html += "'>";
    html += "<input type='hidden' name='master_facebook_url' id='master_facebook_url' value='";
    html += data["facebook_url"];
    html += "'>";
    html += "<input type='hidden' name='master_twitter_url' id='master_twitter_url' value='";
    html += data["twitter_url"];
    html += "'>";
    html += "<input type='hidden' name='master_instagram_url' id='master_instagram_url' value='";
    html += data["instagram_url"];
    html += "'>";
    html += "<input type='hidden' name='master_hours_title' id='master_hours_title' value='";
    html += data["hours_title"];
    html += "'>";
    html += "<input type='hidden' name='master_show_facebook' id='master_show_facebook' value='";
    html += data["show_facebook"];
    html += "'>";
    html += "<input type='hidden' name='master_show_instagram' id='master_show_instagram' value='";
    html += data["show_instagram"];
    html += "'>";
    html += "<input type='hidden' name='master_show_twitter' id='master_show_twitter' value='";
    html += data["show_twitter"];
    html += "'>";
    html += "<input type='hidden' name='master_special_hours' id='master_special_hours' value='";
    html += data["special_hours"];
    html += "'>";
    html += "<input type='hidden' name='master_monday' id='master_monday' value='";
    html += data["monday"];
    html += "'>";
    html += "<input type='hidden' name='master_tuesday' id='master_tuesday' value='";
    html += data["tuesday"];
    html += "'>";
    html += "<input type='hidden' name='master_wednesday' id='master_wednesday' value='";
    html += data["wednesday"];
    html += "'>";
    html += "<input type='hidden' name='master_thursday' id='master_thursday' value='";
    html += data["thursday"];
    html += "'>";
    html += "<input type='hidden' name='master_friday' id='master_friday' value='";
    html += data["friday"];
    html += "'>";
    html += "<input type='hidden' name='master_saturday' id='master_saturday' value='";
    html += data["saturday"];
    html += "'>";
    html += "<input type='hidden' name='master_sunday' id='master_sunday' value='";
    html += data["sunday"];
    html += "'>";
    html += "<input type='hidden' name='master_group_weekdays' id='master_group_weekdays' value='";
    html += data["group_weekdays"];
    html += "'>";
    html += "<input type='hidden' name='master_group_weekends' id='master_group_weekends' value='";
    html += data["group_weekends"];
    html += "'>";
    html += "<input type='hidden' name='master_cash' id='master_cash' value='";
    html += has_cash;
    html += "'>";
    html += "<input type='hidden' name='master_check' id='master_check' value='";
    html += has_check;
    html += "'>";
    html += "<input type='hidden' name='master_visa' id='master_visa' value='";
    html += has_visa;
    html += "'>";
    html += "<input type='hidden' name='master_mc' id='master_mc' value='";
    html += has_mc;
    html += "'>";
    html += "<input type='hidden' name='master_amex' id='master_amex' value='";
    html += has_amex;
    html += "'>";

    html += "</form>";
    html += "<div class='frame_general_sm'>";
    html += "<div class='login-leaf nature-green flip'><i class='fab fa-envira'></i></div>";
    html += "<h3>Contact Info | company Profile</h3>";
    html += "<div class='generalSteel-in'>";
    html += "<h2 class=''><i class='fas fa-mobile-alt'></i></h2>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-md-3' style='padding:0; margin:0;'>";
    html += "<div class='company_psection'>";
    html += "<h4>Contact Information <a href=\"javascript: load_helper('contact_info');\"><i class='far fa-question-circle'></i></a></h4>";
    html += "<div class='display_hours1'>";
    html += "<h1>Address &nbsp<a href=\"javascript: multi_company_editor('address');\">[Edit]</a></h1>";
    html += "<div class='ultraAddy'>" + data['address1'] + "</div>";
    if (String(data['address2']) !== "empty") { html += "<div class='ultraAddy'>" + data['address2'] + "</div>" }
    if (String(data['address3']) !== "empty") { html += "<div class='ultraAddy'>" + data['address3'] + "</div>" }
    html += "<div class='ultraAddy'>" + data['city'] + ", " + data['state'] + " " + data['zip_code'] + "</div>";
    html += "<div class='superSocial_l'></div>";
    html += "<h1>Phone &nbsp<a href=\"javascript: multi_company_editor('phone');\">[Edit]</a></h1>";
    html += "<div class='ultraAddy'>" + data['phone'] + "</div>";
    html += "<div class='superSocial_l'></div>";
    html += "<h1>Email &nbsp<a href=\"javascript: multi_company_editor('email');\">[Edit]</a></h1>";
    html += "<div class='ultraAddy'>" + data['email'] + "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-md-3' style='padding:0; margin:0;'>";
    html += "<div class='company_psection'>";
    html += "<h4>Business Hours <a href=\"javascript: load_helper('hours');\"><i class='far fa-question-circle'></i></a></h4>";
    html += "<div class='display_hours1'>";
    html += "<h1>" + data['hours_title'] + ": &nbsp<a href=\"javascript: multi_company_editor('hours');\">[Edit]</a></h1>";
    html += "<table>";
    html += "<tr>";
    if (String(data['group_weekdays']) === "True")
    {
        html += "<td><h2><span>Weekdays: </span></h2></td>";
        html += "<td><h2>" + data['monday'] + "</h2></td>";
    }
    else
    {
        html += "<td><h2><span>Monday: </span></h2></td>";
        html += "<td><h2>" + data['monday'] + "</h2></td>";

        html += "<td><h2><span>Tuesday: </span></h2></td>";
        html += "<td><h2>" + data['tuesday'] + "</h2></td>";

        html += "<td><h2><span>Wednesday: </span></h2></td>";
        html += "<td><h2>" + data['wednesday'] + "</h2></td>";

        html += "<td><h2><span>Thursday: </span></h2></td>";
        html += "<td><h2>" + data['thursday'] + "</h2></td>";

        html += "<td><h2><span>Frid: </span></h2></td>";
        html += "<td><h2>" + data['friday'] + "</h2></td>";
    }
    html += "</tr>";
    html += "<tr>";
    if (String(data['group_weekends']) === "True")
    {
        html += "<td><h2><span>Weekends: </span></h2></td>";
        html += "<td><h2>" + data['monday'] + "</h2></td>";
    }
    else
    {
        html += "<td><h2><span>Saturdays: </span></h2></td>";
        html += "<td><h2>" + data['saturday'] + "</h2></td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td><h2><span>Sundays: </span></h2></td>";
        html += "<td><h2>" + data['sunday'] + "</h2></td>";
    }   
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-md-3' style='padding:0; margin:0;'>";
    html += "<div class='company_psection'>";
    html += "<h4>Payment Methods <a href=\"javascript: load_helper('payments');\"><i class='far fa-question-circle'></i></a></h4>";
    html += "<p style='padding-right: 40px;'><i class='fas fa-info-circle'></i> Select from the options below to set the payment methods that are accepted at Natural Woman Salon.</p>";
    html += "<div>";
    html += "<table>";
    html += "<tr>";
    
    html += cash;
    html += "<td class='cep_label'>Cash</td>";
    html += "</tr>";
    html += "<tr>";
    html += check;
    html += "<td class='cep_label'>Check</td>";
    html += "</tr>";
    html += "<tr>";
    html += visa;
    html += "<td class='cep_label'>Visa</td>";
    html += "</tr>";
    html += "<tr>";
    html += mc;
    html += "<td class='cep_label'>MasterCard</td>";
    html += "</tr>";
    html += "<tr>";
    html += amex;
    html += "<td class='cep_label'>American Express</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-md-3' style='padding:0; margin:0;'>";
    html += "<div class='company_psection'>";
    html += "<h4>Social Media Links <a href=\"javascript: load_helper('social_media');\"><i class='far fa-question-circle'></i></a></h4>";
    html += "<p><i class='fas fa-info-circle'></i> Click social media icons to view link</p>";
    html += "<h6>Facebook</h6>";
    html += "<div class=\"sm_decorator\">";
    html += "<div class='container'>";
    html += "<div class='row superSocialStyle'>";
    html += "<div class='col-sm-2 superSocial_h' style='padding:0; margin:0;'>";
    html += "<a id='facebook_site_loader' href='" + data['facebook_url'] + "' target='_blank'><img src='/static/images/fb.png'></a>";
    html += "</div>";
    html += "<div class='col-sm-6 superSocial_h' style='padding:0; margin:0;'>";
    html += "<div class='canter_b_mode'><button onClick=\"javascript: multi_company_editor('Facebook');\">Update Link</button></div>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin:0; padding-left: 10px;'>";
    html += "<table>";
    html += "<tr>";
    if (facebook === "True") {
        html += "<td><input type='radio' name='show_facebook' id='fb_on' value='1' checked onClick=\"javascript: commit_radio_value('master_show_facebook', '1');\"></td>";
        html += "<td><label for='fb_on'>On</label></td>";
        html += "<td><input type='radio' name='show_facebook' id='fb_off' value='0' onClick=\"javascript: commit_radio_value('master_show_facebook', '0');\"></td>";
    }
    else
    {
        html += "<td><input type='radio' name='show_facebook' id='fb_on' value='1' onClick=\"javascript: commit_radio_value('master_show_facebook', '1');\"></td>";
        html += "<td><label for='fb_on'>On</label></td>";
        html += "<td><input type='radio' name='show_facebook' id='fb_off' value='0' checked> onClick=\"javascript: commit_radio_value('master_show_facebook', '0');\"</td>";
    }      
    html += "<td><label for='fb_off'>Off</label></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='superSocial_s'></div>";
    html += "<h6>Twitter</h6>";
    html += "<div class=\"sm_decorator\">";
    html += "<div class='container'>";
    html += "<div class='row superSocialStyle'>";
    html += "<div class='col-sm-2 superSocial_h' style='padding:0; margin:0;'>";
    html += "<a id='twitter_site_loader' href='" + data['twitter_url'] + "' target='_blank'><img src='/static/images/twitter.png'></a>";
    html += "</div>";
    html += "<div class='col-sm-6 superSocial_h' style='padding:0; margin:0;'>";
    html += "<div class='canter_b_mode'><button onClick=\"javascript: multi_company_editor('Twitter');\">Update Link</button></div>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin:0; padding-left: 10px;'>";
    html += "<table>";
    html += "<tr>";
    if (twitter === "True")
    {
        html += "<td><input type='radio' name='show_twitter' id='twitter_on' value='1' checked onClick=\"javascript: commit_radio_value('master_show_twitter', '1');\"></td>";
        html += "<td><label for='twitter_on'>On</label></td>";
        html += "<td><input type='radio' name='show_twitter' id='twitter_off' value='0' onClick=\"javascript: commit_radio_value('master_show_twitter', '0');\"></td>";
    }
    else
    {
        html += "<td><input type='radio' name='show_twitter' id='twitter_on' value='1' onClick=\"javascript: commit_radio_value('master_show_twitter', '1');\"></td>";
        html += "<td><label for='twitter_on'>On</label></td>";
        html += "<td><input type='radio' name='show_twitter' id='twitter_off' value='0' checked onClick=\"javascript: commit_radio_value('master_show_twitter', '0');\"></td>";
    }
    html += "<td><label for='twitter_off'>Off</label></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='superSocial_s'></div>";
    html += "<h6>Instagram</h6>";
    html += "<div class=\"sm_decorator\">";
    html += "<div class='container'>";
    html += "<div class='row superSocialStyle'>";
    html += "<div class='col-sm-2 superSocial_h' style='padding:0; margin:0;'>";
    html += "<a id='instagram_site_loader' href='" + data['instagram_url'] + "' target='_blank'><img src='/static/images/instagram.png'></a>";
    html += "</div>";
    html += "<div class='col-sm-6 superSocial_h' style='padding:0; margin:0;'>";
    html += "<div class='canter_b_mode'><button onClick=\"javascript: multi_company_editor('Instagram');\">Update Link</button></div>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin:0; padding-left: 10px;'>";
    html += "<table>";
    html += "<tr>";
    if (instagram === "True")
    {
        html += "<td><input type='radio' name='show_instagram' id='instagram_on' value='1' checked onClick=\"javascript: commit_radio_value('master_show_instagram', '1');\"></td>";
        html += "<td><label for='instagram_on'>On</label></td>";
        html += "<td><input type='radio' name='show_instagram' id='instagram_off' value='0' onClick=\"javascript: commit_radio_value('master_show_instagram', '0');\"></td>";
    }
    else
    {
        html += "<td><input type='radio' name='show_instagram' id='instagram_on' value='1' onClick=\"javascript: commit_radio_value('master_show_instagram', '1');\"></td>";
        html += "<td><label for='instagram_on'>On</label></td>";
        html += "<td><input type='radio' name='show_instagram' id='instagram_off' value='0' checked onClick=\"javascript: commit_radio_value('master_show_instagram', '0');\"></td>";
    }
    html += "<td><label for='instagram_off'>Off</label></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='generalSteelBtn-co'>";
    html += "<div class='company_btn_container'>";
    html += "<button class='flash_reg' id='updateCompanyBtn' onClick=\"javascript: detectChanges('company', 'update');\">Update</button>";
    html += "<button class='flash_reg' id='' onClick=\"javascript: detectChanges('company', 'exit');\">Exit</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
}

function flashBtn()
{
    $("#updateCompanyBtn").addClass('flash-button');
}

function commit_radio_value(target, mode)
{
    target  = "#" + String(target);
    mode    = Number(mode);
    if (mode === 1) { $(target).val("True"); }
    else if (mode === 0) { $(target).val("False"); }
    $("#changes_detected").val("1");
    flashBtn();
}

function commit_checkbox_value(target)
{
    target = "#" + String(target);
    current = $(target).val();
    current = String(current);
    if (current === "True") { current = "False"; }
    else if (current === "False") { current = "True"; }
    $(target).val(current);
    $("#changes_detected").val("1");
    flashBtn();
}

function build_address_setter()
{
    var address1    = $("#master_address1").val();
    var address2    = $("#master_address2").val();
    var address3    = $("#master_address3").val();
    var city        = $("#master_city").val();
    var state       = $("#master_state").val();
    var zip_code    = $("#master_zip_code").val();
    var tag         = "'>";
    var html        = "<div class='company_contact_set_frame center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='super_closer_inverse' onClick=\"javascript: closeIconBtn('3');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<h3 class='drop_pad_co'>Edit Company Address</h3>";
    html += "<input type='text' placeholder='Address lIne 1' id='pop_address1' value='";
    html += String(address1)
    html += "'>"
    if (String(address2) === "empty") { html += "<input type='text' placeholder='Address lIne 2' id='pop_address2'>"; }
    else {
        html += "<input type='text' placeholder='Address lIne 2' id='pop_address2' value='";
        html += String(address2);
        html += tag;
    }
    if (String(address2) === "empty") { html += "<input type='text' placeholder='Address lIne 3' id='pop_address3'>"; }
    else {
        html += "<input type='text' placeholder='Address lIne 3' id='pop_address3' value='";
        html += String(address3);
        html += tag;
    }
    html += "<div class='space_10'></div>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-7' style='padding:0; margin:0;'>";
    html += "<input type='text' placeholder='City' id='pop_city' value='";
    html += String(city);
    html += tag;
    html += "</div>";
    html += "<div class='col-sm-2' style='padding:0; margin:0;'>";
    html += "<div class='minify_input'><input type='text' placeholder='MI' id='pop_state' value='";
    html += String(state);
    html += "' oninput=\"javascript: format_state();\"></div>";
    html += "</div>";
    html += "<div class='col-sm-3' style='padding:0; margin:0;'>";
    html += "<input type='text' placeholder='Zip Code' id='pop_zip' oninput=\"javascript: format_zip();\" value='";
    html += String(zip_code);
    html += tag;
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<p>*Note: These changes will not be permanently stored until you update the company profile.</p>";
    html += "<div class='company_address_btns'>";
    html += "<button onClick=\"javascript: soft_save('address');\">Apply Changes</button>";
    html += "<button onClick=\"javascript: closeIconBtn('3');\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    return html;
}

function encode_phone(phone)
{
    phone       = String(phone);
    encoded     = {};
    var area    = phone[1];
    var perf    = phone[6];
    var post    = phone[10];
    area += phone[2];
    area += phone[3];
    perf += phone[7];
    perf += phone[8];
    post += phone[11];
    post += phone[12];
    post += phone[13];
    encoded['area_code']    = area;
    encoded['prefix']       = perf;
    encoded['postfix']      = post;
    return encoded;
}

function build_phone_setter ()
{
    var phone   = $("#master_phone").val();
    phone       = encode_phone(phone)
    var html    = "<div class='company_contact_set_frame center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='super_closer_inverse' onClick=\"javascript: closeIconBtn('3');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<h3 class=\"drop_pad_co\">Edit Company Phone</h3>";
    html += "<div class='single_line_entry'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-12 general_label' >Enter new phone number below: (Numbers Only)</div>";
    html += "<div class='col-sm-2' style='padding:0; margin:0; margin-left:12px;'><input type='text' id='area_code' value='";
    html += phone["area_code"];
    html += "' oninput=\"javascript: setPhoneInput('";
    html += "area_code";
    html += "', '3');\"></div>";
    html += "<div class='col-sm-2' style='padding:0; margin: 0;'><input type='text' id='prefix' value='";
    html += phone["prefix"];
    html += "' oninput=\"javascript: setPhoneInput('";
    html += "prefix";
    html += "', '3');\"></div>";
    html += "<div class='col-sm-3' style='padding:0; margin: 0;'><input type='text' id='postfix' value='";
    html += phone["postfix"];
    html += "' oninput=\"javascript: setPhoneInput('";
    html += "postfix";
    html += "', '4');\"></div>";
    html += "<div class='col-sm-5'></div>";
    html += "</div>";
    html += "</div>";
    html += "<p>*Note: These changes will not be permanently stored until you update the company profile.</p>";
    html += "</div>";
    html += "<div class='company_address_btns'>";
    html += "<button onClick=\"javascript: soft_save('phone');\">Apply Changes</button>";
    html += "<button onClick=\"javascript: closeIconBtn('3');\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    return html;
}

function build_email_setter_co()
{
    var html = "<div class='company_contact_set_frame center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='super_closer_inverse' onClick=\"javascript: closeIconBtn('3');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<h3 class='drop_pad_co'>Edit Company Email</h3>";
    html += "<div class='single_line_entry'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-12'>";
    html += "<input type='email' id='pop_email1' placeholder='Enter the new email here'>";
    html += "</div>";
    html += "<div class='col-sm-12'>";
    html += "<input type='email' id='pop_email2' placeholder='Confirm the new email address'>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<p>*Note: These changes will not be permanently stored until you update the company profile.</p>";
    html += "</div>";
    html += "<div class='company_address_btns'>";
    html += "<button onClick=\"javascript: soft_save('email');\">Apply Changes</button>";
    html += "<button onClick=\"javascript: closeIconBtn('3');\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    return html;
}

function decode_python_bool(value)
{
    var result = null;
    value = String(value);
    if (value === "True") { result = "1"; }
    if (value === "False") { result = "0"; }
    return result;
}

function init_hour_table()
{
    var weekday_status  = $("#master_group_weekdays").val();
    var weekend_status  = $("#master_group_weekends").val();
    var monday          = decode_hours($("#master_monday").val());
    var saturday        = decode_hours($("#master_saturday").val());
    var special_hours   = decode_python_bool($("#special_hours").val());
    weekday_status      = decode_python_bool(weekday_status);
    weekend_status      = decode_python_bool(weekend_status);

    $("#weekday_on").val(weekday_status);
    $("#weekend_on").val(weekend_status);
    if(special_hours === "1") 
    { 
        var special_title = $("#hours_title").val()
        $("#sp_on").prop('checked', true); 
        $("#pop_special_hours_title").removeClass('hidden');
        $("#pop_special_hours_title").val(special_title);
    }
    if(weekday_status === "1") 
    {
        $("#pop_group_weekday").prop( "checked", true );
        $("#mon_open").val(monday['open']);
        $("#mon_close").val(monday['close']);
        if (monday['open_am'] === false) { $("#mon_open_s").prop('selectedIndex', 1); }
        if (monday['close_am'] === false) { $("#mon_close_s").prop('selectedIndex', 1); }
    }
    else {
        var tuesday = decode_hours($("#master_tuesday").val());
        var wednesday = decode_hours($("#master_wednesday").val());
        var thursday = decode_hours($("#master_thursday").val());
        var friday = decode_hours($("#master_friday").val());

        $("#mon_open").val(monday['open']);
        $("#mon_close").val(monday['close']);
        if (monday['open_am'] === false) { $("#mon_open_s").prop('selectedIndex', 1); }
        if (monday['close_am'] === false) { $("#mon_close_s").prop('selectedIndex', 1); }

        $("#tue_open").val(tuesday['open']);
        $("#tue_close").val(tuesday['close']);
        if (tuesday['open_am'] === false) { $("#tue_open_s").prop('selectedIndex', 1); }
        if (tuesday['close_am'] === false) { $("#tue_close_s").prop('selectedIndex', 1); }

        $("#wed_open").val(wednesday['open']);
        $("#wed_close").val(wednesday['close']);
        if (wednesday['open_am'] === false) { $("#wed_open_s").prop('selectedIndex', 1); }
        if (wednesday['close_am'] === false) { $("#wed_close_s").prop('selectedIndex', 1); }

        $("#thu_open").val(thursday['open']);
        $("#thu_close").val(thursday['close']);
        if (thursday['open_am'] === false) { $("#thu_open_s").prop('selectedIndex', 1); }
        if (thursday['close_am'] === false) { $("#thu_close_s").prop('selectedIndex', 1); }

        $("#fri_open").val(friday['open']);
        $("#fri_close").val(friday['close']);
        if (friday['open_am'] === false) { $("#fri_open_s").prop('selectedIndex', 1); }
        if (friday['close_am'] === false) { $("#fri_close_s").prop('selectedIndex', 1); }
    }
    if(weekend_status === "1") 
    {
        $("#pop_group_weekends").prop( "checked", true );
        $("#sat_open").val(saturday['open']);
        $("#sat_close").val(saturday['close']);
        if (saturday['open_am'] === false) { $("#sat_open_s").prop('selectedIndex', 1); }
        if (saturday['close_am'] === false) { $("#sat_close_s").prop('selectedIndex', 1); }
    }
    else
    {
        var sunday = decode_hours($("#master_sunday").val());
        $("#sat_open").val(saturday['open']);
        $("#sat_close").val(saturday['close']);
        if (saturday['open_am'] === false) { $("#sat_open_s").prop('selectedIndex', 1); }
        if (saturday['close_am'] === false) { $("#sat_close_s").prop('selectedIndex', 1); }
        $("#sun_open").val(sunday['open']);
        $("#sun_close").val(sunday['close']);
        if (sunday['open_am'] === false) { $("#sun_open_s").prop('selectedIndex', 1); }
        if (sunday['close_am'] === false) { $("#sun_close_s").prop('selectedIndex', 1); }
    }

    $("#msg3").hide();
    $("#msg3").removeClass('hidden');
    $("#msg3").fadeIn(500);
}

function load_hour_values()
{
    var monday      = decode_hours($("#master_monday").val());
    var tuesday     = decode_hours($("#master_tuesday").val());
    var saturday    = decode_hours($("#master_saturday").val());
    var sunday      = decode_hours($("#master_sunday").val());

    $("#mon_open").val(monday['open']);
    $("#mon_close").val(monday['close']);
    if (monday['open_am'] === false) { $("#mon_open_s").prop('selectedIndex', 1); }
    if (monday['close_am'] === false) { $("#mon_close_s").prop('selectedIndex', 1); }
    $("#sat_open").val(saturday['open']);
    $("#sat_close").val(saturday['close']);
    if (saturday['open_am'] === false) { $("#sat_open_s").prop('selectedIndex', 1); }
    if (saturday['close_am'] === false) { $("#sat_close_s").prop('selectedIndex', 1); }

    if (tuesday['open'] !== "em")
    {
        $("#tue_open").val(tuesday['open']);
        $("#tue_close").val(tuesday['close']);
        if (tuesday['open_am'] === false) { $("#tue_open_s").prop('selectedIndex', 1); }
        if (tuesday['close_am'] === false) { $("#tue_close_s").prop('selectedIndex', 1); }

        $("#wed_open").val(wednesday['open']);
        $("#wed_close").val(wednesday['close']);
        if (wednesday['open_am'] === false) { $("#wed_open_s").prop('selectedIndex', 1); }
        if (wednesday['close_am'] === false) { $("#wed_close_s").prop('selectedIndex', 1); }

        $("#thu_open").val(thursday['open']);
        $("#thu_close").val(thursday['close']);
        if (thursday['open_am'] === false) { $("#thu_open_s").prop('selectedIndex', 1); }
        if (thursday['close_am'] === false) { $("#thu_close_s").prop('selectedIndex', 1); }

        $("#fri_open").val(friday['open']);
        $("#fri_close").val(friday['close']);
        if (friday['open_am'] === false) { $("#fri_open_s").prop('selectedIndex', 1); }
        if (friday['close_am'] === false) { $("#fri_close_s").prop('selectedIndex', 1); }
    }
    if (sunday['open'] !== "em")
    {
        $("#sun_open").val(sunday['open']);
        $("#sun_close").val(sunday['close']);
        if (sunday['open_am'] === false) { $("#sun_open_s").prop('selectedIndex', 1); }
        if (sunday['close_am'] === false) { $("#sun_close_s").prop('selectedIndex', 1); }
    }
}

function build_hours_setter()
{
    var weekday_status  = $("#master_group_weekdays").val();
    var weekend_status  = $("#master_group_weekends").val();
    weekday_status      = decode_python_bool(weekday_status);
    weekend_status      = decode_python_bool(weekend_status);
    var table           = getHoursTable(weekday_status, weekend_status);

    var html = "<div class='company_contact_set_frame2 center_v_mode'>";
    html += "<input type='hidden' id='weekday_on' value='";
    html += weekday_status;
    html += "'>";
    html += "<input type='hidden' id='weekend_on' value='";
    html += weekend_status;
    html += "'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='super_closer_inverse' onClick=\"javascript: closeIconBtn('3');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<h3 class='drop_pad_co'>Edit Business Hours</h3>";
    html += "<div class='hours_table_container'>";

    html += "<section id='dynamic_week'>";
    html += table;
    html += "</section>";

    html += "<div class='hours_message5'><i class='fas fa-asterisk'></i> Leave fields blank for days that the salon is closed.</div>";
    html += "<div class='space_10'></div>";
    html += "<table>";
    html += "<tr>";
    html += "<td><input type='checkbox' id='pop_group_weekday' onClick=\"javascript: setHoursTable('weekdays');\"></td>";
    html += "<td>Group Weekdays</td>";
    html += "<td><a href=\"javascript: load_helper('group_weekdays');\"><i class='far fa-question-circle'></i></a></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='checkbox' id='pop_group_weekends' onClick=\"javascript: setHoursTable('weekends');\"></td>";
    html += "<td>Group Weekends</td>";
    html += "<td><a href=\"javascript: load_helper('group_weekends');\"><i class='far fa-question-circle'></i></a></td>";
    html += "</tr>";
    html += "</table>";
    html += "<div class='special_hr_label'>Special Hours: <a href=\"javascript: load_helper('special_hours');\"><i class='far fa-question-circle'></i></a></div>";
    html += "<div class='sp_hr_input_wrap'>"
    html += "<div class='sp_hr_radio_input'>"
    html += "<table>"
    html += "<tr>"
    html += "<td><input type='radio' name='pop_special_hours' id='sp_on' onClick=\"javascript: special_input('show');\"></td>"
    html += "<td><label for='sp_on'>On</label></td>"
    html += "<td><input type='radio' name='pop_special_hours' id='sp_off' onClick=\"javascript: special_input('hide');\" checked></td>"
    html += "<td><label for='sp_off'>Off</label></td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>"
    html += "<div class='sp_hr_title_input'>"
    html += "<table><tr><td><input type='text' id='pop_special_hours_title' placeholder='Enter title [ex: \"Holiday Hours\"]' class='hidden'></td></tr></table>";
    html += "</div>"
    html += "</div>"
    html += "</div>";
    html += "<p>*Note: These changes will not be permanently stored until you update the company profile.</p>";
    html += "<div class='company_address_btns'>";
    html += "<button onClick=\"javascript: soft_save('hours');\">Apply Changes</button>";
    html += "<button onClick=\"javascript: closeIconBtn('3');\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    return html;
}

function build_link_setter(target)
{
    target = String(target);
    var html = "<div class='company_contact_set_frame2 center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='super_closer_inverse' onClick=\"javascript: closeIconBtn('3');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<h3 class='drop_pad_co'>Edit ";
    html += target;
    html += " Link</h3>";
    html += "<div class='single_line_entry'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-12 general_label' >Enter the new ";
    html += target;
    html += " link below:</div>"
    html += "<div class='col-sm-12'>";
    html += "<input type='email' id='pop_";
    html += target;
    html += "_link' placeholder='Enter or paste the new link here...'>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<p>*Note: These changes will not be permanently stored until you update the company profile.</p>";
    html += "</div>";
    html += "<div class='company_address_btns'>";
    html += "<button onClick=\"javascript: soft_save('";
    html += target;
    html += "');\">Apply Changes</button>";
    html += "<button onClick=\"javascript: closeIconBtn('3');\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    return html;
}

function special_input(visibility)
{
    visibility = String(visibility);
    if (visibility === "show")
    {
        $("#pop_special_hours_title").hide();
        $("#pop_special_hours_title").removeClass("hidden");
        $("#pop_special_hours_title").fadeIn(300);
    }
    if (visibility === "hide")
    {
        $("#pop_special_hours_title").fadeOut(300);
        $("#pop_special_hours_title").val("");
    }
}

function getHoursTable(weekday_status, weekend_status)
{
    var html = getWeekdayHTML(weekday_status);
    html += getWeekendHTML(weekend_status);
    return html
}

function decode_hours(val)
{
    val = String(val);
    var set1 = false;
    var record = false;
    var open = "";
    var close = "";
    var open_am = true;
    var close_am = true;
    var data = {};
    for (var i = 0; i < val.length; i++)
    {
        var c = val[i];
        if (c !== "empty")
            if (set1 === false)
            {
                if (c !== " " && open.length < 2)
                {
                    open += c;
                }
                else
                {
                    set1 = true;
                }
                if (c === "p") { open_am = false; }
            }
            else 
            {
                if (c === " ")
                {
                    record = true;
                    continue;
                }
                if (record === true && close.length < 2 && c !== "-" && c !== "a" && c !== "p" && c !== "m")
                {
                    close += c;
                }
                if (c === "p") { close_am = false; }
            }
        else { open = "no_value_set"; }
    }

    data['open'] = open;
    data['open_am'] = open_am;
    data['close'] = close;
    data['close_am'] = close_am;
    return data;
}

function getWeekdayHTML(status)
{
    var html    = "";
    var monday  = decode_hours($("#master_monday").val());
    if (status === "0")
    {
        html += "<table>";
        html += "<tr><th></th><th>Open</th><th></th><th>Close</th><th></th> </tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top'>Monday</th>";
        html += "<td class='top_left2px'><input type='text' id='mon_open' oninput=\"javascript: validate_time('mon_open', '2');\"></td>";
        html += "<td class='border_top'><select id='mon_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='mon_close' oninput=\"javascript: validate_time('mon_close', '2');\"></td>";
        html += "<td class='top_right'><select id='mon_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top'>Tuesday</th>";
        html += "<td class='top_left2px'><input type='text' id='tue_open' oninput=\"javascript: validate_time('tue_open', '2');\"></td>";
        html += "<td class='border_top'><select id='tue_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='tue_close' oninput=\"javascript: validate_time('tue_close', '2');\"></td>";
        html += "<td class='top_right'><select id='tue_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top'>Wednesday</th>";
        html += "<td class='top_left2px'><input type='text' id='wed_open' oninput=\"javascript: validate_time('wed_open', '2');\"></td>";
        html += "<td class='border_top'><select id='wed_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='wed_close' oninput=\"javascript: validate_time('wed_close', '2');\"></td>";
        html += "<td class='top_right'><select id='wed_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top'>Thursday</th>";
        html += "<td class='top_left2px'><input type='text' id='thu_open' oninput=\"javascript: validate_time('thu_open', '2');\"></td>";
        html += "<td class='border_top'><select id='thu_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='thu_close' oninput=\"javascript: validate_time('thu_close', '2');\"></td>";
        html += "<td class='top_right'><select id='thu_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top'>Friday</th>";
        html += "<td class='top_left2px'><input type='text' id='fri_open' oninput=\"javascript: validate_time('fri_open', '2');\"></td>";
        html += "<td class='border_top'><select id='fri_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='fri_close' oninput=\"javascript: validate_time('fri_close', '2');\"></td>";
        html += "<td class='top_right'><select id='fri_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
    }
    else if (status === "1")
    {
        html += "<table>";
        html += "<tr><th></th><th>Open</th><th></th><th>Close</th><th></th> </tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top red_ask'>Weekdays</th>";
        html += "<td class='top_left2px'><input type='text' id='mon_open' oninput=\"javascript: validate_time('mon_open', '2');\"></td>";
        html += "<td class='border_top'><select id='mon_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='mon_close' oninput=\"javascript: validate_time('mon_close', '2');\"></td>";
        html += "<td class='top_right'><select id='mon_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
    }
    return html;
}

function getWeekendHTML(status)
{
    var html = "";
    if (status === "0")
    {
        html += "<tr>";
        html += "<th class='hours_label border_left_top'>Saturday</th>";
        html += "<td class='top_left2px'><input type='text' id='sat_open' oninput=\"javascript: validate_time('sat_open', '2');\"></td>";
        html += "<td class='border_top'><select id='sat_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px'><input type='text' id='sat_close' oninput=\"javascript: validate_time('sat_close', '2');\"></td>";
        html += "<td class='top_right'><select id='sat_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='hours_label border_left_top border_bottom'>Sunday</th>";
        html += "<td class='top_left2px border_bottom'><input type='text' id='sun_open' oninput=\"javascript: validate_time('sun_open', '2');\"></td>";
        html += "<td class='border_top border_bottom'><select id='sun_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px border_bottom'><input type='text' id='sun_close' oninput=\"javascript: validate_time('sun_close', '2');\"></td>";
        html += "<td class='top_right border_bottom'><select id='sun_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "</table>";
    }
    else if (status === "1")
    {
        html += "<tr>";
        html += "<th class='hours_label border_left_top border_bottom red_ask'>Weekends</th>";
        html += "<td class='top_left2px border_bottom'><input type='text' id='sat_open' oninput=\"javascript: validate_time('sat_open', '2');\"></td>";
        html += "<td class='border_top border_bottom'><select id='sat_open_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "<td class='top_left2px border_bottom'><input type='text' id='sat_close' oninput=\"javascript: validate_time('sat_close', '2');\"></td>";
        html += "<td class='top_right border_bottom'><select id='sat_close_s'><option value='am'>AM</option><option value='pm'>PM</option></select></td>";
        html += "</tr>";
        html += "</table>";
    }
    return html;
}

function setHoursTable(mode)
{
    var html            = null;
    var weekday_html    = null;
    var weekend_html    = null;
    var weekday_status  = $("#weekday_on").val();
    var weekend_status  = $("#weekend_on").val();
    mode                = String(mode)
    weekday_status      = String(weekday_status);
    weekend_status      = String(weekend_status);
    if (mode === "weekdays")
    {
        if (weekday_status === "0") { weekday_status = "1"; }
        else if (weekday_status === "1") { weekday_status = "0"; }
        $("#weekday_on").val(weekday_status);
    }
    else if (mode === "weekends")
    {
        if (weekend_status === "0") { weekend_status = "1"; }
        else if (weekend_status === "1") { weekend_status = "0"; }
        $("#weekend_on").val(weekend_status);
    }
    weekday_html = getWeekdayHTML(weekday_status);
    weekend_html = getWeekendHTML(weekend_status);
    html = weekday_html + weekend_html;

    $("#dynamic_week").fadeOut(400, "linear",function() {
        $("#dynamic_week").html(html)
        load_hour_values();
    });

    $("#dynamic_week").fadeIn(600, "linear");
}

function numbers(value, max)
{
    var len     = value.length;
    var result  = null;
    var c       = null;
    if (len <= max)
    {
        c = value[len - 1];
        if (c==="1"||c==="2"||c==="3"||c==="4"||c==="5"||c==="6"||c==="7"||c==="8"||c==="9"||c==="0")
        {
            result = value;
        }
    }
    else
    {
        result = value[0];
        result += value[1];
    }

    if (len === 2)
    {
        if (Number(value[0]) > 1) { result = value[0]; }
        if (Number(value[0]) === 1 && Number(value[1]) > 2) { result = value[0]; }
        if (value[0] === "0") { result = value[1]; }
    }
    return result
}

function validate_time(element, max) 
{
    var target  = "#" + String(element);
    var value   = $(target).val()
    max         = Number(max);
    var result  = numbers(value, max);
    $(target).val(result);
}

function soft_save(target)
{
    var proceed     = false;
    var messages    = [];
    var data        = {};
    target          = String(target);
    if (target === "Facebook" || target === "Twitter" || target === "Instagram")
    {
        var target_id   = "#pop_" + target + "_link";
        var lower       = target.toLowerCase();
        var current_id  = "#master_" + lower + "_url";
        var new_link    = $(target_id).val();
        var old_link    = $(current_id).val();
        new_link        = String(new_link);
        old_link        = String(old_link);
        var m2          = "";
        var loader      = "";
        if (new_link.length === 0) 
        { 
            m2 = "If you choose not to display a ";
            m2 += target;
            m2 += " link, you can simply deactivate it on the main Company Profile Editor in the ";
            m2 += target;
            m2 += " section of the page.";
            messages.push("This value is required"); 
            messages.push(m2);
        }
        else if (new_link === old_link) 
        { 
            m2 = "The link that you entered is identical to the current ";
            m2 += target;
            m2 += " link. No changes will be applied."
            messages.push("Identical links detected");
            messages.push(m2);
        }
        else 
        {
            proceed = true;
            loader = "#" + lower + "_site_loader";
            $(loader).attr("href", new_link);
            $(current_id).val(new_link);
        }
    }
    else if (target === "hours")
    {
        if($('#sp_on').is(':checked')) 
        {
            var special_title = $("#pop_special_hours_title").val();
            special_title = String(special_title);
            if (special_title.length === 0) {
                messages.push("You must enter a title for special hours.")
                m2 = "If you wish to post these hours as regular business hours, simply click \"Off\" for \"Special Hours\". Otherwise, you can choose a title like \"Holiday Hours\", etc."
                messages.push(m2);
            }
            else { 
                proceed = true; 
                $("#master_hours_title").val(special_title);
                $("#master_special_hours").val("True");
            }
        }
        else
        {
            proceed = true;
            $("#master_hours_title").val("Hours of Operation");
            $("#master_special_hours").val("False");
            var weekday_status  = $("#weekday_on").val();
            var weekend_status  = $("#weekend_on").val();
            weekday_status      = String(weekday_status);
            weekend_status      = String(weekend_status);
            $("#master_monday").val(encode_hours("mon"));
            $("#master_saturday").val(encode_hours("sat"));
            if (weekday_status === '0')
            {
                $("#master_tuesday").val(encode_hours("tue"));
                $("#master_wednesday").val(encode_hours("wed"));
                $("#master_thursday").val(encode_hours("thu"));
                $("#master_friday").val(encode_hours("fri"));
            }
            else 
            {
                $("#master_tuesday").val("empty");
                $("#master_wednesday").val("empty");
                $("#master_thursday").val("empty");
                $("#master_friday").val("empty");
            }
            if (weekend_status === "0")
            {
                $("#master_sunday").val(encode_hours("sun"));
            }
            else { $("#master_sunday").val("empty"); }
        }
    }
    else if (target === "address")
    {
        var address1    = $("#pop_address1").val();
        var address2    = $("#pop_address2").val();
        var address3    = $("#pop_address3").val();
        var city        = $("#pop_city").val();
        var state       = $("#pop_state").val();
        var zipcode     = $("#pop_zip").val();
        address1        = String(address1);
        address2        = String(address2);
        address3        = String(address3);
        city            = String(city);
        state           = String(state);
        zipcode         = String(zipcode);
        if (address1.length === 0 || address2=== 0 || address3 === 0)
        {
            messages.push("Empty Fields");
            messages.push("You must enter a valid street no. and street name to proceed.");
        }
        else if (city.length === 0)
        {
            messages.push("Empty Fields");
            messages.push("You must enter a valid city to proceed.");
        }
        else if (state.length === 0 || state.length !== 2)
        {
            messages.push("Invalid State Entry");
            messages.push("You must enter a valid state to proceed.");
        }
        else if (zipcode.length === 0 || zipcode.length < 5)
        {
            messages.push("Invalid zip code");
            messages.push("You must enter a valid zip code to proceed.");
        }
        else
        {
            proceed = true;
            if (address1.length === 0) { $("#master_address1").val("empty"); }
            else { $("#master_address1").val(address1); }
            if (address2.length === 0) { $("#master_address2").val("empty"); }
            else { $("#master_address2").val(address2); }
            if (address3.length === 0) { $("#master_address3").val("empty"); }
            else { $("#master_address3").val(address3); }
            $("#master_city").val(city);
            $("#master_state").val(state);
            $("#master_zip_code").val(zipcode);
        }
    }
    else if (target === "email")
    {
        var email1  = $("#pop_email1").val();
        var email2  = $("#pop_email2").val();
        email1      = String(email1);
        email2      = String(email2);
        if (email1.length === 0 || email2.length === 0)
        {
            messages.push("Empty fields");
            messages.push("You must enter a valid email addres in each field to proceed.");
        }
        else if (email1 !== email2)
        {
            messages.push("The emails do not match");
            messages.push("You must confirm the new email address before you can proceed. The email addresses must match.");
        }
        else if (validate_email(email1) === false)
        {
            messages.push("Email 1 is Invalid");
            messages.push("Please enter a valid email address in the email 1 field.")
        }
        else if (validate_email(email2) === false)
        {
            messages.push("Email 2 is Invalid");
            messages.push("Please enter a valid email address in the email 2 field.")
        }
        else
        {
            proceed = true;
            $("#master_email").val(email1);
        }
    }
    else if (target === "phone")
    {
        var area    = $("#area_code").val();
        var pref    = $("#prefix").val();
        var post    = $("#postfix").val();
        area        = String(area);
        pref        = String(pref);
        post        = String(post);
        if (area.length === 0 || area.length < 3)
        {
            messages.push("Invalid area code");
            messages.push("You have entered an invalid area code.");
        }
        else if (pref.length === 0 || post.length === 0 || pref.length < 3 || post.length < 4)
        {
            messages.push("Invalid phone number");
            messages.push("Please enter a valid phone number to proceed.");
        }
        else
        {
            proceed = true;
            var phone = "(" + area + ") " + pref + " - " + post;
            $("#master_phone").val(phone);
        }
    }
 
    if (proceed === true )
    {
        flashBtn();
        $("#changes_detected").val("1");
        $("#msg3").fadeOut(300);
    }
    else { ultimateErrorMessage(messages); }
    data['proceed'] = proceed;
    data['messages'] = messages;
    return data;
}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function isInt(c) {
    c = String(c);
    is_integer = false;
    if (c==="1"||c==="2"||c==="3"||c==="4"||c==="5"||c==="6"||c==="7"||c==="8"||c==="9"||c==="0")
    {
        is_integer = true;
    }
    return is_integer;
}

function format_state()
{
    var state   = $("#pop_state").val();
    state       = String(state);
    var len     = state.length;
    var pos     = len -1;
    var c       = state[pos];
    var result  = "";
    if (len < 3)
    {
        if (isLetter(c) === true)
        {
            result = state.toUpperCase();
        }
    }
    else
    {
        var t = "";
        for (var i = 0; i < pos; i++)
        {
            t += state[i];
        }
        result = t.toUpperCase();
    }
    $("#pop_state").val(result);
}

function format_zip()
{
    var zip     = $("#pop_zip").val();
    zip         = String(zip);
    var len     = zip.length;
    var pos     = len - 1;
    var c       = zip[pos];
    var result  = null;
    if (len <= 5)
    {
        if (isInt(c) === true)
        {
            result = zip;
        }
        else
        {
            var t = "";
            for (var i = 0; i < pos; i++)
            {
                t += zip[i];
            }
            result = t;
        }
    }
    else
    {
        var temp = "";
        for (var i = 0; i < pos; i++)
        {
            temp += zip[i];
        }
        result = temp;
    }
    $("#pop_zip").val(result);
}

function limitIntegerEntry(value, max)
{
    var result  = "";
    value       = String(value);
    max         = Number(max);
    var len     = value.length;
    var pos     = len - 1;
    var c       = value[pos];
    if (len <= max)
    {
        if (isInt(c) === true)
        {
            result = value;
        }
        else
        {
            for (var i = 0; i < pos; i++)
            {
                result += value[i];
            }
        }
    }
    else 
    { 
        for (var i = 0; i < pos; i ++)
        {  
            result += value[i];
        }
    }
    return result;
}

function setPhoneInput(element_name, max)
{
    var element_id  = "#" + String(element_name);
    var value       = $(element_id).val();
    var input       = limitIntegerEntry(value, max)
    $(element_id).val(input);
}

function validate_email(email)
{
    test1 = false;
    test2 = false;
    is_valid = false;
    email = String(email);
    for (var i = 0; i < email.length; i++)
    {
        if (email[i] === "@") { test1 = true; }
        if (email[i] === ".") { test2 = true; }
    }
    if (test1 === true && test2 === true) { is_valid = true; }
    return is_valid;
}

function encode_hours(target)
{
    var hours   = null;
    var base    = "#" + String(target) + "_"
    var n_o     = base + "open";
    var n_c     = base + "close";
    var n_o_s   = n_o + "_s";
    var n_c_s   = n_c + "_s";
    var open    = $(n_o).val();
    var close   = $(n_c).val();
    var open_s  = $(n_o_s).val();
    var close_s = $(n_c_s).val();
    open        = String(open);
    open_s      = String(open_s);
    close       = String(close);
    close_s     = String(close_s);

    if (open.length === 0) { hours = "Closed"; }
    else { hours = open + open_s + " - " + close + close_s; }
    return hours; 
}

function build_user_manager(data)
{
    var granted = "<i class=\"far fa-check-square\"></i> ";
    var denied = "<i class=\"far fa-square\"></i> ";
    var html = "<form action=\"/edit_success\" method=\"POST\" id=\"user_management_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"targetModelManager\" value=\"user\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"targetActionManager\" value=\"\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"targetIdManager\" value=\"\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"12\">";
    html += "</form>";
    html += "<div class=\"blog-manager-container center_v_mode\">";
    html += "<div class=\"frame_general_sm steel_back\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>User Management</h3>";
    html += "<div class=\"generalSteel\">";
    html += "<h2 class=\"\"><i class=\"fas fa-user-cog\"></i></h2>";
    html += "<h5>Select a user from the list below</h5>";
    html += "<div class=\"generalSteelListWrap\">";
    html += "<ul>";

    for(var i = 0; i < data.length; i++)
    {
        html += "<div id=\"div_" + data[i]['index'] + "\">";
        html += "<a href=\"javascript: about_selector('" + data[i]['index'] + "');\">";
        html += "<input type=\"hidden\" id=\"id_" + data[i]['index'] + "\" value=\"" + data[i]['id'] + "\">";
        html += "<input type=\"hidden\" id=\"fname_" + data[i]['index'] + "\" value=\"" + data[i]['fname'] + "\">";
        html += "<input type=\"hidden\" id=\"lname_" + data[i]['index'] + "\" value=\"" + data[i]['lname'] + "\">";
        html += "<input type=\"hidden\" id=\"email_" + data[i]['index'] + "\" value=\"" + data[i]['email'] + "\">";
        html += "<input type=\"hidden\" id=\"admin_" + data[i]['index'] + "\" value=\"" + data[i]['is_admin'] + "\">";
        html += "<input type=\"hidden\" id=\"product_" + data[i]['index'] + "\" value=\"" + data[i]['product_permission'] + "\">";
        html += "<input type=\"hidden\" id=\"about_" + data[i]['index'] + "\" value=\"" + data[i]['about_permission'] + "\">";
        html += "<input type=\"hidden\" id=\"blog_" + data[i]['index'] + "\" value=\"" + data[i]['blog_permission'] + "\">";
        html += "<input type=\"hidden\" id=\"gallery_" + data[i]['index'] + "\" value=\"" + data[i]['gallery_permission'] + "\">";
        html += "<li>";
        html += "<div class=\"container\">";
        html += "<div class=\"row\">";
        html += "<div class=\"col-sm-12 clear_pm cap_it\">" + data[i]['fname'] + " " + data['lname'] + "</div>";
        html += "<div class=\"col-sm-12 clear_pm\"><em>" + data[i]['email'] + "</em></div>";
        html += "<div class=\"col-sm-12 clear_pm access_drop\">Access Granted To User:</div>";

        html += "<div class=\"col-sm-6 clear_pm access_box\">";
        if (String(data[i]['is_admin']) === "True") { html += granted; }
        else { html += denied; }
        html += "<p>Administrator</p>";
        html += "</div>";

        html += "<div class=\"col-sm-6 clear_pm access_box\">";
        if (String(data[i]['blog_permission']) === "True") { html += granted; }
        else { html += denied; }
        html += "<p>Blog Access</p>";
        html += "</div>";

        html += "<div class=\"col-sm-6 clear_pm access_box\">";
        if (String(data[i]['product_permission']) === "True") { html += granted; }
        else { html += denied; }
        html += "<p>Product Access</p>";
        html += "</div>";

        html += "<div class=\"col-sm-6 clear_pm access_box\">";
        if (String(data[i]['gallery_permission']) === "True") { html += granted; }
        else { html += denied; }
        html += "<p>Gallery Access</p>";
        html += "</div>";

        html += "<div class=\"col-sm-12 clear_pm access_box\">";
        if (String(data[i]['about_permission']) === "True") { html += granted; }
        else { html += denied; }
        html += "<p>About Us Statement</p>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</li>";
        html += "</a>";
        html += "</div>";   
    }

    html += "</ul>";
    html += "</div>";

    html += "<div class=\"ul_buttons3\">";
    html += "<button id=\"edit_user_access\">Change Access</button>";
    html += "<button id=\"block_all_access\">Block All</button>";
    html += "<button id=\"delete_user_access\">Delete User</button>";
    html += "</div>";
    html += "</div>";
    html += "<div class=\"generalSteel main_exit_btn\">";
    html += "<div class=\"general_steel_btn1\">";
    html += "<button id=\"close-this-2\">Exit</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    build_user_editor();
    return html;
}

function build_user_editor()
{
    var html = "<div class=\"userEdirContainer center_v_mode\">";
    html += "<form action=\"edit_success\" method=\"POST\" id=\"user_editor_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"targetModelEditor\" value=\"user\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"targetActionEditor\" value=\"update\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"targetIdEditor\" value=\"\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"12\">";
    html += "<input type=\"hidden\" name=\"m_admin\" id=\"m_admin\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"m_product\" id=\"m_product\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"m_about\" id=\"m_about\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"m_blog\" id=\"m_blog\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"m_gallery\" id=\"m_gallery\" value=\"0\">";
    html += "</form>";
    html += "<div class=\"frame_general_sm\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Change User Access</h3>";
    html += "<div class=\"generalSteel-in\">";
    html += "<h2><i class=\"fas fa-user-cog\"></i></h2>";
    html += "<div class=\"um_name\" id=\"um_name\"></div>";
    html += "<div class=\"um_email\" id=\"um_email\"></div>";
    html += "<div class=\"access_overview\">";
    html += "Select from the list below to change the type of content that this user is allowed to change or edit on the <em>\"Natural Woman Salon\"</em> website. Click on the <span><i class=\"far fa-question-circle\"></i></span> icon next to each item to learn more about the permission that is granted when selected.";
    html += "</div>";
    html += "<div class=\"access_checkbox_wrap\">";
    html += "<table>";
    html += "<tr>";
    html += "<td><input type=\"checkbox\" id=\"cb_admin\" onClick=\"javascript: loadCheckboxData('#m_admin');\"></td>";
    html += "<td><span>Administrative Privileges</span></td>";
    html += "<td><a href=\"javascript: load_helper('admin_access');\"><i class=\"far fa-question-circle\"></i></a></td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td><input type=\"checkbox\" id=\"cb_blog\" onClick=\"javascript: loadCheckboxData('#m_blog');\"></td>";
    html += "<td><span>Blog Access</span></td>";
    html += "<td><a href=\"javascript: load_helper('blog_access');\"><i class=\"far fa-question-circle\"></i></a></td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td><input type=\"checkbox\" id=\"cb_product\" onClick=\"javascript: loadCheckboxData('#m_product');\"></td>";
    html += "<td><span>Product Modification</span></td>";
    html += "<td><a href=\"javascript: load_helper('product_access');\"><i class=\"far fa-question-circle\"></i></a></td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td><input type=\"checkbox\" id=\"cb_gallery\" onClick=\"javascript: loadCheckboxData('#m_gallery');\"></td>";
    html += "<td><span>Gallery Editing</span></td>";
    html += "<td><a href=\"javascript: load_helper('gallery_access');\"><i class=\"far fa-question-circle\"></i></a></td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td><input type=\"checkbox\" id=\"cb_about\" onClick=\"javascript: loadCheckboxData('#m_about');\"></td>";
    html += "<td><span>About Us Statements</span></td>";
    html += "<td><a href=\"javascript: load_helper('about_access');\"><i class=\"far fa-question-circle\"></i></a></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class=\"s_edit_btn shrink_s_btn\">";
    html += "<button onClick=\"javascript: submit_access_edits();\">Submit</button>";
    html += "<button onClick=\"javascript: simple_editor_close();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#msg3").html(html);
}

function build_auth_user()
{
    var html = "<div class=\"ua_wrapper center_v_mode\">";
    html += "<div class=\"frame_general_sm\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Authorize New User</h3>";
    html += "<div class=\"generalSteel-in\">";
    html += "<h2 class=\"blogger_editor\"><i class=\"fas fa-user-plus\"></i></h2>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"user_authorize_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_action_prod\" value=\"user\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action2\" value=\"authorize\">";
    html += "<input type=\"hidden\" name=\"prev_index\" value=\"13\">";
    html += "<input type=\"hidden\" name=\"is_admin\" id=\"is_admin\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"product_permission\" id=\"ua_product_permission\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"about_permission\" id=\"ua_about_permission\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"blog_permission\" id=\"ua_blog_permission\" value=\"0\">";
    html += "<input type=\"hidden\" name=\"gallery_permission\" id=\"ua_gallery_permission\" value=\"0\">";
    html += "<div class=\"ua_header\">New User Information</div>";
    html += "<div class=\"container\">";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-6\" style=\"margin:0; padding:0; padding-right:3%;\">";
    html += "<input type=\"text\" name=\"fname\" id=\"ua_fname\" placeholder=\"First Name\" required>";
    html += "</div>";
    html += "<div class=\"col-sm-6\" style=\"margin:0; padding:0;\">";
    html += "<input type=\"text\" name=\"lname\" id=\"ua_lname\" placeholder=\"Last Name\" required>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class=\"ua_drop\"><input type=\"email\" name=\"email\" id=\"ua_email\" placeholder=\"Email\" required></div>";
    html += "<div class=\"ua_header ua_drop4\">Permissions</div>";
    html += "<div class=\"permission_slip\">";
    html += "<p>";
    html += "Select the permissions that you would like to grant this user below. Complete descriptions of the type of access that the new user will be granted can be viewed by clicking on the <span><i class=\"far fa-question-circle\"></i></span> icon.";
    html += "</p>";
    html += "<div class=\"ua_splitter\">";
    html += "<div class=\"ua_half\">";
    html += "<table>";
    html += "<tr>";
    html += "<td class=\"ua_input\"><input type=\"checkbox\" id=\"ua_admin\" onClick=\"javascript: loadCheckboxData('#is_admin');\"></td>";
    html += "<td class=\"simple_label\">Administrator</td>";
    html += "<td>";
    html += "<a href=\"javascript: load_helper('admin_access');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td class=\"ua_input\"><input type=\"checkbox\" id=\"ua_product\" onClick=\"javascript: loadCheckboxData('#ua_product_permission');\"></td>";
    html += "<td class=\"simple_label\">Product Access</td>";
    html += "<td>";
    html += "<a href=\"javascript: load_helper('product_access');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td class=\"ua_input\"><input type=\"checkbox\" id=\"ua_about\" onClick=\"javascript: loadCheckboxData('#ua_about_permission');\"></td>";
    html += "<td class=\"simple_label\">About Statement</td>";
    html += "<td>";
    html += "<a href=\"javascript: load_helper('about_access');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>"
    html += "<div class=\"ua_half\">";
    html += "<table>";
    html += "<tr> ";
    html += "<td class=\"ua_input\"><input type=\"checkbox\" id=\"ua_blog\" onClick=\"javascript: loadCheckboxData('#ua_blog_permission');\"></td>";
    html += "<td class=\"simple_label\">Blog Access</td>";
    html += "<td>";
    html += "<a href=\"javascript: load_helper('blog_access');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</td>";
    html += "</tr>";
    html += "</table>";
    html += "<table>";
    html += "<tr>";
    html += "<td class=\"ua_input\"><input type=\"checkbox\" id=\"ua_gallery\" onClick=\"javascript: loadCheckboxData('#ua_gallery_permission');\"></td>";
    html += "<td class=\"simple_label\">Gallery Permissions</td>";
    html += "<td>";
    html += "<a href=\"javascript: load_helper('gallery_access');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</form>";
    html += "<div class=\"general_editor_btns\">";
    html += "<button id=\"auth_new_user\">Authorize</button>";
    html += "<button id=\"close-this-2\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
}

function build_password_setter()
{
    var index = $("#btn_index").val();
    var html ="<div class=\"account_change_wrap center_v_mode\">";
    html += "<div class=\"account_set_frame\">";
    html += "<div class=\"super_closer\" onClick=\"javascript: closeIconBtn('2');\"><i class=\"far fa-window-close\"></i></div>";
    html += "<h3><i class=\"fas fa-cog\"></i> Reset Password</h3>";
    html += "<form action=\"/account_changed\" method=\"POST\" id=\"account_form\">";
    html += "<input type=\"hidden\" name=\"target_action\" value=\"" + String(index) + "\">";
    html += "<div class=\"account-input-space\">";
    html += "<input type=\"password\" name=\"old\" id=\"old\" placeholder=\"Enter your current password\" required>";
    html += "</div>";
    html += "<input type=\"password\" name=\"password1\" id=\"password1\" placeholder=\"Enter your new password\" required>";
    html += "<input type=\"password\" name=\"password2\" id=\"password2\" placeholder=\"Re-enter your new password\" required>";
    html += "<div class=\"account-buttons\">";
    html += "<button type=\"submit\">Save</button>";
    html += "<button type=\"button\" id=\"close-this-2\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function build_email_setter()
{
    var index = $("#btn_index").val();
    var html ="<div class=\"account_change_wrap center_v_mode\">";
    html += "<div class=\"account_set_frame\">";
    html += "<div class=\"super_closer\" onClick=\"javascript: closeIconBtn('2');\"><i class=\"far fa-window-close\"></i></div>";
    html += "<h3><i class=\"fas fa-cog\"></i> Change Email Address</h3>";
    html += "<form action=\"/account_changed\" method=\"POST\" id=\"account_form\">";
    html += "<input type=\"hidden\" name=\"target_action\" value=\"" + String(index) + "\">";
    html += "<div class=\"account-input-space\">";
    html += "<input type=\"password\" name=\"old\" id=\"old\" placeholder=\"Enter your password\" required>";
    html += "</div>";
    html += "<input type=\"email\" name=\"email1\" id=\"email1\" placeholder=\"Enter your new email address\" required>";
    html += "<input type=\"email\" name=\"email2\" id=\"email2\" placeholder=\"Re-enter your new email address\" required>";
    html += "<div class=\"account-buttons\">";
    html += "<button type=\"submit\">Save</button>";
    html += "<button type=\"button\" id=\"close-this-2\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function build_name_setter()
{
    var index = $("#btn_index").val();
    var html ="<div class=\"account_change_wrap center_v_mode\">";
    html += "<div class=\"account_set_frame\">";
    html += "<div class=\"super_closer\" onClick=\"javascript: closeIconBtn('2');\"><i class=\"far fa-window-close\"></i></div>";
    html += "<h3><i class=\"fas fa-cog\"></i> Change Name</h3>";
    html += "<form action=\"/account_changed\" method=\"POST\" id=\"account_form\">";
    html += "<input type=\"hidden\" name=\"target_action\" value=\"" + String(index) + "\">";
    html += "<div class=\"account-input-space\">";
    html += "<input type=\"password\" name=\"old\" id=\"old\" placeholder=\"Enter your password\" required>";
    html += "</div>";
    html += "<input type=\"text\" name=\"fname\" id=\"fname\" placeholder=\"First Name\" required>";
    html += "<input type=\"text\" name=\"lname\" id=\"lname\" placeholder=\"Last Name\" required>";
    html += "<div class=\"account-buttons\">";
    html += "<button type=\"submit\">Save</button>";
    html += "<button type=\"button\" id=\"close-this-2\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function build_restrictor()
{
    var html = "<div class=\"account_change_wrap center_v_mode\">";
    html += "<div class=\"account_set_frame\">";
    html += "<div class=\"super_closer\" onClick=\"javascript: closeIconBtn('2');\"><i class=\"far fa-window-close\"></i></div>";
    html += "<h3><i class=\"fas fa-ban paintRed iShadow\"></i> <span class=\"paintRed\">This is a restricted page</span></h3>";
    html += "<p>You do not have access to the information on this page. If you feel that this is an error, please contact the administrator of this site.</p>"; 
    html += "<div class=\"account-buttons\">";
    html += "<button type=\"button\" onClick=\"javascript: closeIconBtn('2');\">Close</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
}

function edit_success_builder(icon, header, message)
{
    header      = String(header);
    message     = String(message);
    icon        = String(icon);
    var html    = "<div class='company_contact_set_frame2 center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='edit_success_closer' onClick=\"javascript: closeIconBtn('4');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<div class='edit_succes_style_container'>";
    html += " <div id='edit_success_header' class='edit_success_header'>";
    html += icon;
    html += " ";
    html += header;
    html += "</div>";
    html += "<div id='edit_success_message' class='edit_success_message'>";
    html += message;
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
}

function multi_company_editor(mode)
{
    var html = ""
    mode = String(mode);
    if (mode === 'address') { html = build_address_setter(); }
    else if (mode === 'phone') { html = build_phone_setter(); }
    else if (mode === 'email') { html = build_email_setter_co(); }
    else if (mode === 'hours') { html = build_hours_setter(); }
    else { html = build_link_setter(mode); }
    $("#msg3").html(html);

    if (mode !== 'hours')
    {
        $("#msg3").hide();
        $("#msg3").removeClass('hidden');
        $("#msg3").fadeIn(500);
    }
    else {
        init_hour_table();
    }
}

function build_url_frame(active, inactive, index)
{
    var is_restricted   = $("#is_restricted").val();
    var html            = "";
    index               = String(index);
    is_restricted       = Number(is_restricted);
    if (index === "7" && is_restricted === 0)
    {
        html = build_blog_manager(inactive);
    }
    else if (index === "8" && is_restricted === 0)
    {
        html = build_product_manager(inactive);
    }
    else if (index ==="9" && is_restricted === 0)
    {
        html = build_about_manager(active, inactive);
    }
    else if (index ==="10" && is_restricted === 0)
    {
        //This is where the gallery builder will go once complete
    }
    else if (index ==="11" && is_restricted === 0)
    {
        html = build_company_manager(active, inactive);
    }
    else if (index ==="12" && is_restricted === 0)
    {
        html = build_user_manager(inactive);
    }
    else if (index ==="13")
    {
        html = build_auth_user();
    }
    else if (index ==="21")
    {
        html = build_password_setter();
    }
    else if (index ==="22")
    {
        html = build_name_setter();
    }
    else if (index ==="23")
    {
        html = build_email_setter();
    }
    else
    {
        if (index !== "6")
        {
            html = build_restrictor();
            $("#msg2").html(html);
            $("#msg2").hide();
            $("#msg2").removeClass("hidden");
            $("#msg2").fadeIn(500);
            return;
        }
    }

    $("#msg2").html(html);
}

function closeIconBtn(index)
{
    var trigger = "#msg" + String(index);
    $(trigger).fadeOut(500);
}

function ultimateErrorMessage(messages)
{
    var html = "<div class='company_contact_set_frame2 center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='ultimate-error-closer' onClick=\"javascript: closeIconBtn('4');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<div class='ultimate-error-container'>";
    html += "<h3><i class='fas fa-exclamation-circle'></i> Error Detected</h3>";
    html += "<div class='ultimate-error-content'>";
    html += "<h1>";
    html += String(messages[0]);
    html += "<h1>";
    html += "<h2>";
    html += String(messages[1]);
    html += "<h2>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    loadHiddenFrame("msg4", html);
}

function ultimateErrorMessageOption(messages)
{
    var html = "<div class='company_contact_set_frame2 center_v_mode'>";
    html += "<div class='company_contact_edit1'>";
    html += "<div class='ultimate-error-closer' onClick=\"javascript: closeIconBtn('4');\">";
    html += "<i class='far fa-window-close'></i>";
    html += "</div>";
    html += "<div class='ultimate-error-container'>";
    html += "<h3><i class='fas fa-exclamation-circle'></i> Error Detected</h3>";
    html += "<div class='ultimate-error-content'>";
    html += "<h1>";
    html += String(messages[0]);
    html += "<h1>";
    html += "<h2>";
    html += String(messages[1]);
    html += "<h2>";
    html += "<div class='ultimate-btn-holder'>";
    html += "<button onClick=\"javascript: ultimateSoftClose();\">Stay On Page</button>";
    html += "<button onClick=\"javascript: ultimateHardClose();\">Leave Page</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    loadHiddenFrame("msg4", html);
}

function loadHiddenFrame(name, html)
{
    var target = "#" + String(name);
    $(target).html(html);
    $(target).hide();
    $(target).removeClass("hidden");
    $(target).fadeIn(600);
}

function load_helper(subject)
{
    var message = null;
    var title = null;
    subject = String(subject);
    if (subject === "about_active")
    {
        title = "Active \"About Us\" Statement";
        message = "This is the \"About Us\" statement that is currently displayed on the site. Active about ";
        message += "statements cannot not be deleted. However, they can be edited. If you would like to delete this statement, ";
        message += "You must select a statement from the inactive statements below and set it as active. Then select the desired statement ";
        message += "from the inactive list and click the delete button."
    }
    else if (subject === "about_inactive")
    {
        title = "Inactive Statement";
        message = "This statements can be saved and used any time as the \"About Us\" statement that is displayed on the site."
    }
    else if (subject == "contact_info")
    {
        title = "Contact Information";
        message = "This is the content on the site that will provide users imformation to contact you.";
        message += " When changing this information, make sure that it is accurate. There are three (3) address lines available. ";
        message += "However, it is not necessary to use them all. Blank address lines will not be displayed on the live site."
    }
    else if (subject == "social_media")
    {
        title = "Social Media Links";
        message = "This information controls the links in which users will be redirected to view your social media sites. ";
        message += "Before changing this information, be certain that the link you provide is accurate. Otherwise, ";
        message += "Your users will be directed to a site that does not belong to you and the content cannot be controlled.";
        message += " In addition, you can either display the link or hide it on the live Natural Woman Salon site by ";
        message += "turning setting the corresponding buttons to \"<b><em>Yes</em><b>\" or \"<b><em>No</em><b>\\ respectively.";
    }

    else if (subject === "admin_access")
    {
        title = "Administration Privileges";
        message = "Users who have administration acces are allowed to change user acces, block their access to the site , or "
        message += "remove their account from the database entirely. Users with these privileges can also change the pertinent infomation ";
        message += "about your comapny such as: address, phone number, email address and social media links. You should be extremely careful when selecting ";
        message += "individuals to grant administrative privileges.";
    }
    else if (subject === "product_access")
    {
        title = "Product Privileges";
        message = "Users with product privileges are allowed to create new products (services that you offer), edit or write the descriptions of the products and set the prices.";
        message += "These users also have the ability to delete existing products. Select these users with caution....it's your money.";
    }   
    else if (subject === "gallery_access")
    {
        title = "Gallery Access";
        message = "Users with gallery access are allowed to add and delete photos from the picture gallery. There is only 5GB of space available. "
        message += "The system will produce an error when you have used all of the space. If this occurs, you can simply delete old and unwanted images."
    }
    else if (subject === "blog_access")
    {
        title = "Blog Access";
        message = "Users that have been granted blog access are allowed to edit and delete existing (previous) blog entries. These users "
        message += "are also allowed to post new blogs."
    }
    else if (subject === "about_access")
    {
        title = "About Statement Editingt";
        message = "Users that have been granted this type of access are allowed to edit and change the \"About Us\" statement that is displayed on the About Us Page on the Natural Woman Salon website."
    }
    else if (subject === "payments")
    {
        title = "Accepted Payment Methods";
        message = "Select from the options to display what payment methods are accepted at Natural Woman Salon. This information will be displayed on the contact page."
    }
    else if (subject === "hours")
    {
        title = "Business Hours";
        message = "Enter the hours of operation at Natural Woman Salon. If you select the <em>\"Group Weekdays\"</em> option, ";
        message += "The weekday hours will be displayed as: <b><em>\"Weekdays:\"</em></b>. Choose this option only if all weekday business hours are the same. This is also the case with weekends"
        message += " You can also set special hours. For example, for Christmas hours, you can set the title as <b><em>\"Holiday Hours.\"</em></b>"
        message += " It is your responsibility to keep Natural Woman Salon's hours of operation up-to-date. This system does not provide date-checker service."
    }
    else if (subject === "group_weekdays")
    {
        title = "Group Weekdays";
        message = "Select this option if the hours are the same Monday thru Friday."
    }
    else if (subject === "group_weekends")
    {
        title = "Group Weekends";
        message = "Select this option if the hours are the same for both Saturday and Sunday."
    }
    else if (subject === "special_hours")
    {
        title = "Special Hours";
        message = "Select \"<em><b>On</b></em>\" if these are special hours such as \"<em><b>Holiday Hours</b></em>\". You must also enter the name of the special hours."
    }
    $("#helper_title").html(title);
    $("#content_message").html(message);
    $("#helper_element").hide();
    $("#helper_element").removeClass("hidden");
    $("#helper_element").fadeIn(500);
}

function close_helper_frame()
{
    $("#helper_element").fadeOut(500);
}

function activate_about_editor()
{
    $("#msg3").hide();
    $("#msg3").removeClass("hidden");
    $("#msg3").fadeIn(500);
}

function launch_company_editor(mode)
{
    mode = String(mode);
    build_company_editor(mode);

    if (mode === "contact")
    {
        var address1    = $("#co1").val();
        var address2    = $("#co2").val();
        var address3    = $("#co3").val();
        var city        = $("#co4").val();
        var state       = $("#co5").val();
        var zip_code    = $("#co6").val();
        var phone       = $("#co7").val();
        var email       = $("#co8").val();
        var weekdays    = $("#co9").val();
        var saturday    = $("#co10").val();
        var sunday      = $("#co11").val();

        if (String(address2) === "empty") { address2 = ""; }
        if (String(address3) === "empty") { address3 = ""; }
        phone = String(phone);
        var area_code = phone[1];
        area_code += phone[2];
        area_code += phone[3];
        var prefix = phone[6];
        prefix += phone[7];
        prefix += phone[8];
        var postfix = phone[10];
        postfix += phone[11];
        postfix += phone[12];
        postfix += phone[13];

        $("#social_media_header_id").html("Edit Contact Information");
        $("#target_member_company").val("contact");
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#address3").val(address3);
        $("#city").val(city);
        $("#state").val(state);
        $("#zip_code").val(zip_code);
        $("#email").val(email);
        $("#area_code").val(area_code);
        $("#prefix").val(prefix);
        $("#postfix").val(postfix);
        $("#hours_m_f").val(weekdays);
        $("#hours_sat").val(saturday);
        $("#hours_sun").val(sunday);
    }
    else if (mode === "facebook")
    {
        $("#social_media_header_id").html("Change Facebook Link");
        $("#target_member_company").val("facebook");
    }
    else if (mode === "twitter")
    {
        $("#social_media_header_id").html("Change Twitter Link");
        $("#target_member_company").val("twitter");
    }
    else if (mode === "instagram")
    {
        $("#social_media_header_id").html("Change Instagram Link");
        $("#target_member_company").val("instagram");
    }
    $("#msg3").hide();
    $("#msg3").removeClass("hidden");
    $("#msg3").fadeIn(500);
}

function close_company_editor(mode)
{
    mode = String(mode);
    if (mode === "media")
    {
        $("#sm_link").val("");
    }
    $("#msg3").fadeOut(500);
}

function submit_company_edits()
{
    $("#company_manager_form").submit();
}

function save_about_object()
{
    $( "#msg5" ).fadeOut(500, function() {
        $("#about_us_editor").submit();
    });
}

function submit_delbg()
{
    $("#blog_editor_form").submit();
}

function submit_delpd()
{
    $("#product_delete_form").submit();
}

function submit_delabt()
{
    $("#about_delete_form").submit();
}

function submit_errUser()
{
    $("#user_management_form").submit();
}

function about_selector(index)
{
    index           = String(index);
    var prev_index  = $("#selected_e").val();
    prev_index      = String(prev_index);
    var pre_id          = "#div_" + prev_index;
    var new_id          = "#div_" + index;
    $(pre_id).removeClass("super_select");
    $(new_id).addClass("super_select");
    $("#selected_e").val(index);
}

function set_about_active()
{
    var index               = $("#selected_e").val();
    index                   = String(index);
    var selector_statement  = "#statement_" + index;
    var selector_id         = "#id_" + index;
    var statement           = $(selector_statement).val();
    var a_id                = $(selector_id).val();

    load_error_heads("Change About Statement", "Are You Sure You Want To Proceed?", "This action  will set the statement below as active", "Proceed");
    load_error_message("\"About Us\" Statement: ", "", "", statement, "", "");
    
    $("#obj_action").attr("onClick", "Javascript: submit_delabt();")
    $("#target_action_aboutManager").val('swap');
    $("#target_id_aboutManager").val(a_id);
    $("#err").hide();
    $("#err").removeClass("hidden");
    $("#err").fadeIn(500);
}

function delete_about()
{
    var selected_element    = $("#selected_e").val();
    selected_element        = String(selected_element);
    var selector_id         = "#id_" + selected_element;
    var selector_statement  = "#statement_" + selected_element;
    var a_id                = $(selector_id).val();
    var statement           = $(selector_statement).val();

    load_error_heads("Delete About Statement", "Are You Sure You Want To Proceed?", "This action cannot be undone!", "Delete");
    load_error_message("\"About Us\" Statement: ", "", "", statement, "", "");
    $("#obj_action").attr("onClick", "Javascript: submit_delabt();")
    $("#target_id_aboutManager").val(a_id);
    $("#err").hide();
    $("#err").removeClass("hidden");
    $("#err").fadeIn(500);
}

function display_about_editor(load_data, query)
{
    var statement = null;
    var a_id = null;
    load_data = String(load_data);
    query = String(query);
    if (load_data === "0")
    {
        $("#target_action_aboutEditor").val("new");
    }
    else if (load_data === "1")
    {
        $("#target_action_aboutEditor").val("update");
        if (query === "active")
        {
            a_id        = $("#current_id").val();
            statement   = $("#current_statement_v2").val();
            a_id        = String(a_id);
            statement   = String(statement);
            $("#active_check").prop('checked', true);
            $("#active_check").prop("disabled", true);
        }
        else if (query === "inactive")
        {
            var selected_element    = $("#selected_e").val();
            selected_element        = String(selected_element);
            var selector_id         = "#id_" + selected_element;
            var selector_statement  = "#statement_" + selected_element;
            var a_id                = $(selector_id).val();
            var statement           = $(selector_statement).val();
            a_id                    = String(a_id);
            statement               = String(statement);
        }
    }
    $("#target_id_aboutEditor").val(a_id);
    $("#editor_statement").val(statement);
    $("#editor_builder").hide();
    $("#editor_builder").removeClass("hidden");
    $("#editor_builder").fadeIn(500);
}

function close_about_editor()
{
    $("#editor_builder").fadeOut(500);
    $("#editor_statement").val("");
    $("#active_check").prop('checked', false);
    $("#active_check").prop("disabled", false);
    $("#msg3").fadeOut(500);
}

function mod_checkbox(check_id)
{
    check_id = String(check_id);
    var value = $(check_id).val();
    value = String(value);
    if (value === "0") { $(check_id).val("1"); }
    else if (value === "1") { $(check_id).val("0"); }
}

function loadCheckboxData(target)
{
    var value = $(target).val();
    value = String(value);
    if (value === "0") { $(target).val("1"); }
    if (value === "1") { $(target).val("0"); }
}

function simple_editor_close()
{
    $("#msg3").fadeOut(500);
}

function submit_access_edits()
{
    $("#user_editor_form").submit();
}

function submit_auth_user()
{
    $("#user_authorize_form").submit();
}

function load_admin_master(index)
{
    index = Number(index);
        
    if (index < 20)
    {
        $("#btn0").addClass("selected-item");
        $("#btn1").removeClass("selected-item");
        $("#btn2").removeClass("selected-item");
    }
    else if (index === 20)
    {
        $("#btn0").removeClass("selected-item");
        $("#btn1").addClass("selected-item");
        $("#btn2").removeClass("selected-item");
    }
    else if (index > 20)
    {
        $("#btn0").removeClass("selected-item");
        $("#btn1").removeClass("selected-item");
        $("#btn2").addClass("selected-item");
    }
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
        var launchBlogger   = $("#launchBlogger").val();
        if (String(launchBlogger) === "True")
        {
            var frame_active    = String(document.getElementById("frame_active").value);
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
        }
        else
        {
            html = build_restrictor();
            $("#msg2").html(html);
            $("#msg2").hide();
            $("#msg2").removeClass("hidden");
            $("#msg2").fadeIn(500);
        }       
    });


    //ADMIN BUTTON LOADERS
    $("#ab2").click(function() {
        window.location.href = "/blog_editor";
    });
    $("#ab3").click(function() {
        window.location.href = "/product_editor"; 
    });
    $("#ab4").click(function() {
        window.location.href = "/gallery_editor";
    });
    $("#ab5").click(function() {
        window.location.href = "/about_editor";
    });
    $("#ab6").click(function() {
        window.location.href = "/company_editor";
    });
    $("#ab7").click(function() {
        window.location.href = "/user_editor";
    });
    $("#ab8").click(function() {
        window.location.href = "/user_access";
    });




    $("#btn1").click(function() {
        $("#master_admin_fader").fadeOut(500, function() {
            window.location.href = "/email"; 
        });
    });
    $("#ddb4").click(function() {
        $("#master-body-fader").fadeOut(500, function() {
            window.location.href = "/logout"; 
        });
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
    $("#close-this-15").click(function() {
        $("#helper_element").fadeOut(500);
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
        $("#msg3" ).hide();
        $("#msg3" ).removeClass("hidden");
        $("#msg3" ).fadeIn(500);
    });
    $("#block_all_access").click(function() {
        var index   = $("#selected_e").val();
        index       = String(index);
        var sel_id  = "#id_" + index;
        var sel_fn  = "#fname_" + index;
        var sel_ln  = "#lname_" + index;
        var sel_em  = "#email_" + index;
        var uid     = $(sel_id).val();
        var fname   = $(sel_fn).val();
        var lname   = $(sel_ln).val();
        var email   = $(sel_em).val();
        var name    = String(fname) + " " + String(lname);

        load_error_heads("Block All Access", "Are You Sure You Want To Proceed?", "This will block the user from making any changes to the website.<br>This can be undone at any time", "Block");
        load_error_message("USER:", "EMAIL:", "", name, email, "");

        $("#targetActionManager").val("block");
        $("#targetIdManager").val(uid);
        $("#obj_action").attr("onClick", "Javascript: submit_errUser();")
        $("#err" ).hide();
        $("#err" ).removeClass("hidden");
        $("#err" ).fadeIn(500);
    });
    $("#delete_user_access").click(function() {
        var index   = $("#selected_e").val();
        index       = String(index);
        var sel_id  = "#id_" + index;
        var sel_fn  = "#fname_" + index;
        var sel_ln  = "#lname_" + index;
        var sel_em  = "#email_" + index;
        var uid     = $(sel_id).val();
        var fname   = $(sel_fn).val();
        var lname   = $(sel_ln).val();
        var email   = $(sel_em).val();
        var name    = String(fname) + " " + String(lname);

        load_error_heads("Delete User", "Are You Sure You Want To Proceed?", "This action will permanently delete this users account.<br>This cannot be undone.", "Delete");
        load_error_message("USER:", "EMAIL:", "", name, email, "");

        $("#targetActionManager").val("delete");
        $("#targetIdManager").val(uid);
        $("#obj_action").attr("onClick", "Javascript: submit_errUser();")
        $("#err" ).hide();
        $("#err" ).removeClass("hidden");
        $("#err" ).fadeIn(500);
    });
    $("#edit_user_access").click(function() {
        var index   = $("#selected_e").val();
        index       = String(index);
        var sel_id  = "#id_" + index;
        var sel_fn  = "#fname_" + index;
        var sel_ln  = "#lname_" + index;
        var sel_em  = "#email_" + index;
        var sel_ad  = "#admin_" + index;
        var sel_pd  = "#product_" + index;
        var sel_ab  = "#about_" + index;
        var sel_bg  = "#blog_" + index;
        var sel_gy  = "#gallery_" + index;
        var uid     = $(sel_id).val();
        var fname   = $(sel_fn).val();
        var lname   = $(sel_ln).val();
        var email   = $(sel_em).val();
        var admin   = $(sel_ad).val();
        var product = $(sel_pd).val();
        var about   = $(sel_ab).val();
        var blog    = $(sel_bg).val();
        var gallery = $(sel_gy).val();
        var name = String(fname) + " " + String(lname);

        if (String(admin) === "True")
        {
            $("#m_admin").val("1");
            $("#cb_admin").prop('checked', true);
        }
        else
        {
            $("#m_admin").val("0");
            $("#cb_admin").prop('checked', false);
        }
        if (String(blog) === "True")
        {
            $("#m_blog").val("1");
            $("#cb_blog").prop('checked', true);
        }
        else
        {
            $("#m_blog").val("0");
            $("#cb_blog").prop('checked', false);
        }
        if (String(product) === "True")
        {
            $("#m_product").val("1");
            $("#cb_product").prop('checked', true);
        }
        else
        {
            $("#m_product").val("0");
            $("#cb_product").prop('checked', false);
        }
        if (String(gallery) === "True")
        {
            $("#m_gallery").val("1");
            $("#cb_gallery").prop('checked', true);
        }
        else
        {
            $("#m_gallery").val("0");
            $("#cb_gallery").prop('checked', false);
        }
        if (String(about) === "True")
        {
            $("#m_about").val("1");
            $("#cb_about").prop('checked', true);
        }
        else
        {
            $("#m_about").val("0");
            $("#cb_about").prop('checked', false);
        }

        $("#targetIdEditor").val(uid);
        $("#um_name").html(name);
        $("#um_email").html(email);
        $("#msg3" ).hide();
        $("#msg3" ).removeClass("hidden");
        $("#msg3" ).fadeIn(500);
    });
    $("#auth_new_user").click(function() {
        var permm = "";
        var flagr = ", ";
        var fname = $("#ua_fname").val();
        var lname = $("#ua_lname").val();
        var email = $("#ua_email").val();
        var admin = $("#is_admin").val();
        var blogg = $("#ua_blog_permission").val();
        var about = $("#ua_about_permission").val();
        var galle = $("#ua_gallery_permission").val();
        var produ = $("#ua_product_permission").val();
        var namef = String(fname) + " " + String(lname);

        if (String(admin) === "1") { permm += "User Information, Company Contact Information, Social Media Links"; }
        if (String(blogg) === "1") { if (permm.length > 0) { permm += flagr; } permm += "Blog Entries"; }
        if (String(produ) === "1") { if (permm.length > 0) { permm += flagr; } permm += "Products and Pricing"; }
        if (String(galle) === "1") { if (permm.length > 0) { permm += flagr; } permm += "Gallery Images"; }
        if (String(about) === "1") { if (permm.length > 0) { permm += flagr; } permm += "\"About Us\" Statements"; }

        load_error_heads("Authorize User", "Are You Sure You Want To Proceed?", "This action will allow this individual to create an account on the Natural Woman Salon Website. Once they have registered, they will have acces to the information shown below.", "Proceed");
        load_error_message("USER NAME: ", "USER EMAIL: ", "GRANTED ACCESS TO: ", namef, email, permm);

        $("#obj_action").attr("onClick", "Javascript: submit_auth_user();")
        $("#err" ).hide();
        $("#err" ).removeClass("hidden");
        $("#err" ).fadeIn(500);
    });
});








