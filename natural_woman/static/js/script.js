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

// function get_load_id(btn_index)
// {
//     var loader = "";
//     btn_index = Number(btn_index);
//     if (btn_index == 7) {loader = "2";}
//     else if (btn_index == 8) {loader = "3";}
//     else if (btn_index == 10) {loader = "4";}
//     else if (btn_index == 9) {loader = "5";}
//     else if (btn_index == 11) {loader = "6";}
//     else if (btn_index == 12) {loader = "7";}
//     else if (btn_index == 13) {loader = "8";}
//     else if (btn_index == 14) {loader = "14";}
//     return loader;
// }


// function initialize_admin_forms()
// {
//     var btn_index = String(document.getElementById("btn_index").value);

//     if (btn_index !== "6")
//     {
//         var index = get_load_id(btn_index);
//         var trigger = "#msg" + index;

//         $(trigger).hide();
//         $(trigger).removeClass("hidden");
//         $(trigger).fadeIn(600);
//         $("#frame_active").val("1");
//     }
//     else
//     {
//         $("#frame_active").val("0");
//         $("#blog_active").val("0");
//     }

//     if (btn_index === "7") { build_blog_editor(); }
//     // if (btn_index === "9") { build_about_manager(); }
//     // if (btn_index === "14")
//     // {
//     //     var model_meta = $("#load_meta_model").val();
//     //     model_meta = String(model_meta);
//     //     if (model_meta === "blog")
//     //     {
//     //         build_blog_editor();
//     //         $("#editor_builder").hide();
//     //         $("#editor_builder").removeClass("hidden");
//     //         $("#editor_builder").fadeIn(500);
//     //     }
//     //     else if (model_meta === "product")
//     //     {
//     //         $("#msg11").hide();
//     //         $("#msg11").removeClass("hidden");
//     //         $("#msg11").fadeIn(500);
//     //     }
//     // }

//     choose_selector_editor(btn_index);
// }

function initialize_admin_forms()
{
    var btn_index = String(document.getElementById("btn_index").value);

    if (btn_index !== "6")
    {
        $("#msg2").hide();
        $("#msg2").removeClass("hidden");
        $("#msg2").fadeIn(600);
        $("#frame_active").val("1");

        if (btn_index==="7" || btn_index==="8")
        {
            choose_selector_editor(btn_index);
        }
        if (btn_index==="9")
        {
            $("#selected_e").val("0")
            $("#div_0").addClass("super_select");
        }
    }
    else
    {
        $("#frame_active").val("0");
        $("#blog_active").val("0");
    }
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
    if (b==="7" || b==="8" || b==="10" || b==="12")
    {
        load_selected_editor("0");
    }
    if (b === "9")
    {
        $("#selected_e").val("0");
        $("#div_0").addClass("super_select");
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

function deactivate_blog_editor()
{
    $("#editor_subject").val("");
    $("#super_blog_content").val("");
    $("#msg3").fadeOut((500));
}



function open_product_editor(load_data)
{
    build_product_editor();
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

function build_blog_editor(json_data)
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
    html += "<button id=\"close-this-3\" onClick=\"javascript: deactivate_blog_editor();\">Close</button></div></div></div>";
    $("#msg3").html(html);
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

function build_blog_manager(data)
{
    var html = "<div class=\"blog-manager-container center_v_mode\">";
    html += "<div class=\"frame_general steel_back\"><div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Manage Blogs</h3><form action=\"/edit_success\" method=\"POST\" id=\"blog_editor_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model2\" value=\"blog\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action2\" value=\"\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id2\" value=\"\"></form>";
    html += "<div class=\"editor-cont\"><div class=\"select-editor\"><ul>";
    for (var i = 0; i < data.length; i++)
    {
        html += "<a href=\"javascript: load_selected_editor('" + data[i]['index'] + "');\" id=\"at_" + data[i]['index'] + "\">";
        html += "<input type=\"hidden\" id=\"id_" + data[i]['index'] + "\" value=\"" + data[i]['id'] + "\">";
        html += "<input type=\"hidden\" id=\"subject_" + data[i]['index'] + "\" value=\"" + data[i]['subject'] + "\">";
        html += "<input type=\"hidden\" id=\"content_" + data[i]['index'] + "\" value=\"" + data[i]['content'] + "\">";
        html += "<input type=\"hidden\" id=\"date_" + data[i]['index'] + "\" value=\"" + data[i]['date'] + "\">";
        html += "<input type=\"hidden\" id=\"time_" + data[i]['index'] + "\" value=\"" + data[i]['time'] + "\">";
        html += "<li id=\"" + data[i]['index'] + "\">";
        html += "<div><span>Subject: </span>" + data[i]['subject'] + "</div>";
        html += "<div><span>Posted on: </span>" + data[i]['date'] + " at <em>" + data[i]['time'] + "</em></div>";
        html += "</li>";
        html += "</a>";

    }
    html += "</ul></div></div><div class=\"frame-btn-wrapper-3\">";
    html += "<button id=\"launch_blog_editor\">Edit</button>";
    html += "<button id=\"request_blog_delete\">Delete</button>";
    html += "<button id=\"close-this-2\">Exit</button>";
    html += "</div></div></div>";
    return html;
}

function build_product_manager(data)
{
    var html = "<div class=\"pop_editor_wrap center_v_mode\"><div class=\"frame_general steel_back\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div><h3>Product manager</h3>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"product_delete_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_modelproddel\" value=\"product\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_proddel\" value=\"delete\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_proddel\" value=\"\"></form>";
    html += "<div class=\"editor-cont\"><div class=\"select-editor\"><ul>";
    for (var i = 0; i < data.length; i++)
    {
        html += "<a href=\"javascript: load_selected_editor('" + data[i]['index'] + "');\" id=\"at_" + data[i]['index'] + "\">";
        html += "<input type=\"hidden\" id=\"id_" + data[i]['index'] + "\" value=\"" + data[i]['id'] + "\">";
        html += "<input type=\"hidden\" id=\"name_" + data[i]['index'] + "\" value=\"" + data[i]['name'] + "\">";
        html += "<input type=\"hidden\" id=\"description_" + data[i]['index'] + "\" value=\"" + data[i]['description'] + "\">";
        html += "<input type=\"hidden\" id=\"price_" + data[i]['index'] + "\" value=\"" + data[i]['price'] + "\">";
        html += "<li id=\"li_" + data[i]['index'] + "\"><div><span>Product: </span>" + data[i]['name'] + "</div>";
        html += "<div><em><span>Description: </span>" + data[i]['description'] + "</em></div>";
        html += "<div><span>Price: </span>$" + data[i]['price'] + "</em></div></li></a>";
    }
    html += "</ul></div></div><div class=\"frame-btn-wrapper-4\">";
    html += "<button id=\"prod_btn1\" onClick=\"javascript: open_product_editor('0');\">New Product</button>";
    html += "<button id=\"prod_btn2\" onClick=\"javascript: open_product_editor('1');\">Edit Selected</button>";
    html += "<button id=\"prod_btn3\">Delete Selected</button>";
    html += "<button id=\"close-this-2\">Exit</button></div></div></div>";
    return html
}

function build_product_editor()
{
    var html = "<div class=\"product_form_wrapper center_v_mode\"><div class=\"dark_frame\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3 id=\"product_form_header\">Product Editor</h3>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"product_edit_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_prod\" value=\"product\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_prod\" value=\"\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_prod\" value=\"\">";
    html += "<input type=\"text\" name=\"name\" id=\"product_name\" placeholder=\"Product Name\" required>";
    html += "<div class=\"product_description_textarea\">";
    html += "<textarea name=\"description\" id=\"product_description\" placeholder=\"Product Description\" required></textarea>";
    html += "</div><div class=\"price_input\">";
    html += "<input type=\"number\" name=\"price\" id=\"product_price\" min=\"0\" value=\"0\"></div></form>";
    html += "<div class=\"blog-btn-wrapper\"><button id=\"product_editor_btn\"></button>";
    html += "<button id=\"close-this-3\" onClick=\"javascript: clear_product_fields();\">Cancel</button></div></div></div>";
    $("#msg3").html(html);
}

function build_about_manager(inactive, current)
{
    var html = "<form action=\"/edit_success\" method=\"POST\" id=\"about_delete_form\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_aboutManager\" value=\"about\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_aboutManager\" value=\"delete\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_aboutManager\" value=\"\">";
    html += "<input type=\"hidden\" name=\"current_id\" id=\"current_id\" value=\"" + current['id'] + "\">";
    html += "<input type=\"hidden\" name=\"current_statement\" id=\"current_statement_v2\" value=\"" + current['statement'] + "\">";
    html += "</form><div class=\"about_management_container center_v_mode\"><div class=\"frame_general steel_back\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div><h3>About Us Statement</h3>";
    html += "<div class=\"active_about_wrapper\"><h4>Active <em>\"About Us\"</em> Statement";
    html += "<a href=\"javascript: load_helper('about_active');\"><i class=\"far fa-question-circle\"></i></a></h4> ";
    html += "<em>" + current['statement'] + "</em><div class=\"s_edit_btn\">";
    html += "<button id=\"new_about\" onClick=\"javascript: build_about_editor(); display_about_editor('0', 'active');\">New</button>";
    html += "<button id=\"edit_active_about\" onClick=\"javascript: build_about_editor(); display_about_editor('1', 'active');\">Edit</button>";
    html += "</div></div><div class=\"inactive_abouts\"><h4> Inactive Statements";
    html += "<a href=\"javascript: load_helper('about_inactive');\"><i class=\"far fa-question-circle\"></i></a></h4>";
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
    html += "<button id=\"edit_inactive_about\" onClick=\"javascript: build_about_editor(); display_about_editor('1', 'inactive');\">Edit</button>";
    html += "<button id=\"delete_about\" onClick=\"javascript: delete_about();\">Delete</button></div></div>";
    html += "<div class=\"about-btn-wrapper\"><button id=\"close-this-2\">Exit</button></div></div></div>";
    return html;
}

function build_about_editor()
{
    var html = "<div class=\"about_editor_container center_v_mode\"><div class=\"frame_general\">";
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3 id=\"product_form_header\">About Us Editor</h3>";
    html += "<form action=\"/edit_success\" method=\"POST\" id=\"about_us_editor\">";
    html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_aboutEditor\" value=\"about\">";
    html += "<input type=\"hidden\" name=\"target_action\" id=\"target_action_aboutEditor\" value=\"delete\">";
    html += "<input type=\"hidden\" name=\"m_is_active\" id=\"m_is_active\" value=\"1\">";
    html += "<input type=\"hidden\" name=\"target_id\" id=\"target_id_aboutEditor\" value=\"\"><div class=\"about_editor_textarea\">";
    html += "<textarea name=\"statement\" id=\"editor_statement\" placeholder=\"Write about us statement here...\" required></textarea>";
    html += "</div><div class=\"active_setter\">";
    html += "<input type=\"checkbox\" name=\"is_active\" id=\"active_check\" value=\"0\" onClick=\"mod_checkbox('#m_is_active');\" checked>";
    html += "<label>Set As Current Statement</label></div></form>";
    html += "<div class=\"blog-btn-wrapper\"><button onClick=\"javascript: save_about_object();\">Save</button>";
    html += "<button id=\"needless\" onClick=\"javascript: close_about_editor();\">Cancel</button></div></div></div>";
    $("#msg3").html(html);
    $("#msg3").hide();
    $("#msg3").removeClass("hidden");
    $("#msg3").fadeIn(500);
}  

function build_company_manager(data)
{              
    var html = "<div class=\"company_container center_v_mode\">";
    html += "<div class=\"frame_general\">";
    html += "<input type=\"hidden\" id=\"co1\" value=\"" + data['address1'] + "\">"
    html += "<input type=\"hidden\" id=\"co2\" value=\"" + data['address2'] + "\">"
    html += "<input type=\"hidden\" id=\"co3\" value=\"" + data['address3'] + "\">"
    html += "<input type=\"hidden\" id=\"co4\" value=\"" + data['city'] + "\">"
    html += "<input type=\"hidden\" id=\"co5\" value=\"" + data['state'] + "\">"
    html += "<input type=\"hidden\" id=\"co6\" value=\"" + data['zip_code'] + "\">"
    html += "<input type=\"hidden\" id=\"co7\" value=\"" + data['phone'] + "\">"
    html += "<input type=\"hidden\" id=\"co8\" value=\"" + data['email'] + "\">"
    html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
    html += "<h3>Company Profile</h3>";
    html += "<div class=\"company_data_wrap\">";
    html += "<div class=\"company_section\">";
    html += "<h4>";
    html += "Contact Information";
    html += "<a href=\"javascript: load_helper('contact_info');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</h4>";
    html += "<div class=\"company_sub_head\">Address: </div>";
    html += "<div class=\"company-item\">" + data['address1'] + "</div>";
    html += "<div class=\"company-item\">" + data['address2'] + "</div>";
    html += "<div class=\"company-item\">" + data['address3'] + "</div>";
    html += "<div class=\"company-item\">"
    html += data['city'];
    html += ", ";
    html += data['state'];
    html += " ";
    html += data['zip_code'];
    html += "</div><div class=\"company_sub_head lower_company1\">Phone: </div>";
    html += "<div class=\"company-item\">" + data['phone'] + "</div>";
    html += "<div class=\"company_sub_head lower_company1\">Email: </div>";
    html += "<div class=\"company-item\"><em>" + data['email'] + "</em></div>";
    html += "<div class=\"company_button_wrap\">";
    html += "<button onClick=\"javascript: launch_company_editor('contact');\">Edit Contact Information</button>";
    html += "</div></div></div>";
    html += "<div class=\"company_data_wrap lower_company2\">";
    html += "<div class=\"company_section\"><h4>";
    html += "Social Media Links";
    html += "<a href=\"javascript: load_helper('social_media');\"><i class=\"far fa-question-circle\"></i></a>";
    html += "</h4>";
    html += "<p>Click the icons to view link</p>";
    html += "<div class=\"company_media_style\">";
    html += "<a href=\"" + data['facebook_url'] + "\" target=\"_blank\"><img src=\"/static/images/fb.png\"></a>";
    html += "<a href=\"javascript: launch_company_editor('facebook');\">Change Facebook Link</a>";
    html += "</div><div class=\"company_media_style\">";
    html += "<a href=\"" + data['twitter_url'] + "\" target=\"_blank\"><img src=\"/static/images/twitter.png\"></a>";
    html += "<a href=\"javascript: launch_company_editor('twitter');\">Change Twitter Link</a>";
    html += "</div> <div class=\"company_media_style\">";
    html += "<a href=\"" + data['instagram_url'] + "\" target=\"_blank\"><img src=\"/static/images/instagram.png\"></a>";
    html += "<a href=\"javascript: launch_company_editor('instagram');\">Change Instagram Link</a>";
    html += "</div></div></div><div class=\"company_data_wrap\">";
    html += "<div class=\"company_button_wrap\">";
    html += "<button id=\"close-this-2\">Exit</button>";
    html += "</div></div></div></div>";
    return html
}

function build_company_editor(mode)
{
    var html = "";
    mode = String(mode)
    if (mode !== "contact")
    {
        html += "<div class=\"media_link_container center_v_mode\">";
        html += "<div class=\"frame_general_sm\">";
        html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
        html += "<h3 id=\"social_media_header_id\"></h3>";
        html += "<div class=\"co_media_form\">";
        html += "<form action=\"/edit_success\" method=\"POST\" id=\"company_manager_form\">";
        html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_company\" value=\"company\">";
        html += "<input type=\"hidden\" name=\"target_member\" id=\"target_member_company\" value=\"\">";
        html += "<input type=\"text\" name=\"link\" id=\"sm_link\" placeholder=\"Enter the new social media link here\" required></form>";
        html += "<div class=\"co_sm_buttons\">";
        html += "<button onClick=\"javascript: submit_company_edits();\">Submit</button>";
        html += "<button onClick=\"javascript: close_company_editor('media');\">Cancel</button>";
        html += "</div></div></div></div>";
    }
    else
    {                                 
        html += "<div class=\"compant_contact_container center_v_mode\">";
        html += "<div class=\"frame_general_sm steel_back\">";
        html += "<div class=\"login-leaf nature-green flip\"><i class=\"fab fa-envira\"></i></div>";
        html += "<h3 id=\"social_media_header_id\"></h3><div class=\"co_media_form\">";
        html += "<form action=\"/edit_success\" method=\"POST\" id=\"company_manager_form\">";
        html += "<input type=\"hidden\" name=\"target_model\" id=\"target_model_company\" value=\"company\">";
        html += "<input type=\"hidden\" name=\"target_member\" id=\"target_member_company\" value=\"\">";
        html += "<h5 class=\"drop_h5\">Address</h5><div class=\"font_11\">";
        html += "<input type=\"text\" name=\"address1\" id=\"address1\" class=\"drop_input\" placeholder=\"Address Line 1\" required>";
        html += "<input type=\"text\" name=\"address2\" id=\"address2\" class=\"drop_input\" placeholder=\"Address Line 2\">";
        html += "<input type=\"text\" name=\"address3\" id=\"address3\" class=\"drop_input\" placeholder=\"Address Line 3\"></div>";
        html += "<div class=\"container\"><div class=\"row\">";
        html += "<div class=\"col-sm-7 font_11\" style=\"padding:0; margin:0; padding-right:3%;\">";
        html += "<input type=\"text\" name=\"city\" id=\"city\" placeholder=\"City\" required></div>";
        html += "<div class=\"col-sm-2 font_11\" style=\"padding:0; margin:0; padding-right:3%;\">";
        html += "<input type=\"text\" name=\"state\" id=\"state\" placeholder=\"MI\" value=\"MI\" required></div>";
        html += "<div class=\"col-sm-3 font_11\" style=\"padding:0; margin:0;\">";
        html += "<input type=\"text\" name=\"zip_code\" id=\"zip_code\" placeholder=\"Zip Code\" required></div></div></div>";
        html += "<h5 class=\"drop_h5\">Phone</h5>";
        html += "<div class=\"container\"><div class=\"row\">";
        html += "<div class=\"col-sm-2 font_11\" style=\"padding:0; margin:0; padding-right: 2%;\">";
        html += "<input type=\"text\" name=\"area_code\" id=\"area_code\" required></div>";
        html += "<div class=\"col-sm-2 font_11\" style=\"padding:0; margin:0; padding-right: 2%;\">";
        html += "<input type=\"text\" name=\"prefix\" id=\"prefix\" required></div>";
        html += "<div class=\"col-sm-3 font_11\" style=\"padding:0; margin:0; padding-right: 2%;\">";
        html += "<input type=\"text\" name=\"postfix\" id=\"postfix\" required>";
        html += "</div><div class=\"col-sm-5\" style=\"padding:0; margin:0;\"></div></div></div>";
        html += "<h5 class=\"drop_h5\">Email</h5>";
        html += "<div class=\"font_11 sep_co_btn\"><input type=\"email\" name=\"email\" id=\"email\" placeholder=\"Email\" required></div>";
        html += "</form><div class=\"co_md_buttons\">";
        html += "<button onClick=\"javascript: submit_company_edits();\">Submit</button>";
        html += "<button onClick=\"javascript: close_company_editor('contact');\">Cancel</button>";
        html += "</div></div></div></div>";
    }
    $("#msg3").html(html);
}

function build_url_frame(active, inactive, index)
{
    var html = "";
    index = String(index);
    if (index === "7")
    {
        html = build_blog_manager(inactive);
    }
    else if (index === "8")
    {
        html = build_product_manager(inactive);
    }
    else if (index ==="9")
    {
        html = build_about_manager(active, inactive);
    }
    else if (index ==="11")
    {
        html = build_company_manager(inactive);
    }

    $("#msg2").html(html);
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
        message += "Your users will be directed to a site that does not belong to you and the content cannot be controlled."
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
    }
    else if (mode === "facebook")
    {
        $("#social_media_header_id").html("Change Facebook Link");
        $("#target_member_company").val("facebook");
    }
    else if (mode === "twitter")
    {
        $("#social_media_header_id").html("Change Twittewr Link");
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
        { $( "#msg2" ).fadeOut(500, function() { window.location.href = "/product_editor" }); }
        else { window.location.href = "/product_editor"; }
    });
    $("#ab4").click(function() {
        if (frame_active === "1")
        { $( "#msg2" ).fadeOut(500, function() { window.location.href = "/gallery_editor" }); }
        else { window.location.href = "/gallery_editor"; }
    });
    $("#ab5").click(function() {
        if (frame_active === "1")
        { $( "#msg2" ).fadeOut(500, function() { 
                window.location.href = "/about_editor" }); }
        else { window.location.href = "/about_editor"; }
    });
    $("#ab6").click(function() {
        if (frame_active === "1")
        { $( "#msg2" ).fadeOut(500, function() { window.location.href = "/company_editor" }); }
        else { window.location.href = "/company_editor"; }
    });
    $("#ab7").click(function() {
        if (frame_active === "1")
        { $( "#msg2" ).fadeOut(500, function() { window.location.href = "/user_editor" }); }
        else { window.location.href = "/user_editor"; }
    });
    $("#ab8").click(function() {
        if (frame_active === "1")
        { $( "#msg2" ).fadeOut(500, function() { window.location.href = "/user_access" }); }
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
        build_blog_editor();
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
});








