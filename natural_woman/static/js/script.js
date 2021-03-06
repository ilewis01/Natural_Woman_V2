function fetchStates()
{
    s = [];
    s.push("AL");
    s.push("AK");
    s.push("AS");
    s.push("AZ");
    s.push("AR");
    s.push("CA");
    s.push("CO");
    s.push("DE");
    s.push("DC");
    s.push("FL");
    s.push("GA");
    s.push("GU");
    s.push("HI");
    s.push("ID");
    s.push("IL");
    s.push("IN");
    s.push("IA");
    s.push("KS");
    s.push("KY");
    s.push("LA");
    s.push("ME");
    s.push("MD");
    s.push("MH");
    s.push("MA");
    s.push("MI");
    s.push("MN");
    s.push("MS");
    s.push("MO");
    s.push("MT");
    s.push("NE");
    s.push("NV");
    s.push("NH");
    s.push("NJ");
    s.push("NM");
    s.push("NY");
    s.push("NC");
    s.push("ND");
    s.push("OH");
    s.push("OK");
    s.push("OR");
    s.push("PA");
    s.push("PR");
    s.push("RI");
    s.push("SC");
    s.push("SD");
    s.push("TN");
    s.push("TX");
    s.push("UT");
    s.push("VT");
    s.push("VA");
    s.push("VI");
    s.push("WA");
    s.push("WV");
    s.push("WI");
    s.push("WY");
    return s;
}

function stateInput(trigger)
{
    trigger     = String(trigger);
    var state   = $(trigger).val();
    state       = String(state);
    var len     = state.length;
    var pos     = len - 1;
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
        for (var i = 0; i < pos; i++)
        {
            result += state[i].toUpperCase();
        }
    }
    $(trigger).val(result);
}

function stateValid(val)
{
    isValid = false;
    states = fetchStates();
    for (var i = 0; i < states.length; i++)
    {
        if (val === states[i])
        {
            isValid = true;
            break;
        }
    }
    return isValid;
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

function inputInteger(max, target)
{
    var result  = "";
    max         = Number(max);
    target      = String(target);
    var value   = $(target).val();
    value       = String(value);
    var len     = value.length;
    var pos     = len - 1;
    var c       = value[pos];
    if (isInt(c) === true && len <= max)
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
    $(target).val(result);
}

function inputhour(max, target)
{
    var result  = "";
    max         = Number(max);
    target      = String(target);
    var value   = $(target).val();
    value       = String(value);
    var len     = value.length;
    var pos     = len - 1;
    var c       = value[pos];
    if (isInt(c) === true && len <= max)
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
    if (result.length === 2)
    {
        if (result[0] === "0")
        {
            result = result[1];
        }
        else if (Number(result) > 12)
        {
            result = result[1];
        }
        else if(result[0] === "1" && (c === "0" || c === "1" || c === "2"))
        {
            result = "1" + c;
        }
    }
    if (result === "0")
    {
        result = "1";
    }
    $(target).val(result);
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

function suSpecial()
{
    if ($("#k_special_hours").prop("checked") === true)
    {
        $("#special_su_input").hide();
        $("#special_su_input").removeClass("hidden");
        $("#special_su_input").fadeIn(400);
        $("#special_check").val("True");
    }
    else
    {
        $("#special_su_input").fadeOut(400);
        $("#special_check").val("False");
    }
}

function superAdminLaunch(model, data, data2)
{
    var html = null;
    model = String(model);
    if (model === "contact") { html = buildContact(data); }
    else if (model === "method") { html = buildPayments(data); }
    else if (model === "links") { html = buildLinks(data); }
    $("#administration-builder").html(html);
    $("#selected-payment").val("");
    if (model === "contact" || model === "links")
    {
        $("#adminAddBtn").prop("disabled", true);
        $("#adminAddBtn").hide();
        $("#adminDelBtn").prop("disabled", true);
        $("#adminDelBtn").hide();
    }
    else
    {
        $("#adminAddBtn").prop("disabled", false);
        $("#adminAddBtn").show();
        $("#adminDelBtn").prop("disabled", true);
        $("#adminDelBtn").show();
        $("#admin-del1").addClass("su-btn-disabled");
        $("#payment-count").val(data.length);
    }
}

function superLaunchBuilder(model, data)
{
    var html = null;
    model = String(model);
    if (model === "blog") { html = buildBlogs(data, action_url); }
    else if (model === "product") { html = buildProducts(data, action_url); }
    else if (model === "image") { html = buildImages(data, action_url); }
    $("#db-builder").html(html);
    $("#selected-db").val("");
    $("#modelDelBtn").prop("disabled", true);
    $("#model-del1").addClass("su-btn-disabled");
    $("#model-count").val(data.length);
}

function superUserLaunch(model, data, action_url)
{
    var html = null;
    model = String(model);
    if (model === "user") { html = buildPermissions(data); }
    if (model === "auth") { html = buildAuths(data); }
    if (model === "question") { html = buildSecurity(data); }
    $("#usr-builder").html(html);
    $("#selected-usr").val("");
    $("#ursDelBtn").prop("disabled", true);
    $("#user-del1").addClass("su-btn-disabled");
    $("#user-count").val(data.length);
}

function buildContact(data)
{
    var html = "";
    var address1 = data['address1'];
    var address2 = data['address2'];
    var address3 = data['address3'];
    var group_weekdays = data['group_weekdays'];
    var group_weekends = data['group_weekends'];
    var about_permission = $("#qabout").val();
    var admin_permission = $("#qcompany").val();

    if (address1 === "empty") { address1 = "" ;}
    if (address2 === "empty") { address2 = "" ;}
    if (address3 === "empty") { address3 = "" ;}
    html += "<input type='hidden' id='m_address1' value='" + address1 + "'>";
    html += "<input type='hidden' id='m_address2' value='" + address2 + "'>";
    html += "<input type='hidden' id='m_address3' value='" + address3 + "'>";
    html += "<input type='hidden' id='m_city' value='" + data['city'] + "'>";
    html += "<input type='hidden' id='m_state' value='" + data['state'] + "'>";
    html += "<input type='hidden' id='m_zipcode' value='" + data['zip_code'] + "'>";
    html += "<input type='hidden' id='m_phone' value='" + data['phone'] + "'>";
    html += "<input type='hidden' id='m_email' value='" + data['email'] + "'>";
    html += "<input type='hidden' id='m_weekdays' value='" + group_weekdays + "'>";
    html += "<input type='hidden' id='m_weekends' value='" + group_weekends + "'>";
    html += "<input type='hidden' id='m_sunday' value='" + data['sunday'] + "'>";
    html += "<input type='hidden' id='m_monday' value='" + data['monday'] + "'>";
    html += "<input type='hidden' id='m_tuesday' value='" + data['tuesday'] + "'>";
    html += "<input type='hidden' id='m_wednesday' value='" + data['wednesday'] + "'>";
    html += "<input type='hidden' id='m_thursday' value='" + data['thursday'] + "'>";
    html += "<input type='hidden' id='m_friday' value='" + data['friday'] + "'>";
    html += "<input type='hidden' id='m_saturday' value='" + data['saturday'] + "'>";
    html += "<input type='hidden' id='m_title' value='" + data['hours_title'] + "'>";
    html += "<input type='hidden' id='m_special_hours' value='" + data['special_hours'] + "'>";
    html += "<div class='su-admin-content-wrapper'>";
    if (Number(admin_permission) === 0)
    {
        html += "<div class='su-admin-header su-topper' id='mas_ult_1'>Address:</div>";
        html += "<div class='su-ad-item'>" + address1 + "</div>";
        html += "<div class='su-ad-item'>" + address2 + "</div>";
        html += "<div class='su-ad-item'>" + address3 + "</div>";
        html += "<div class='su-ad-item'>" + data['city'] + ", " + data['state'] + " " + data['zip_code'] + "</div>";
        html += "<div class='su-admin-header su-topper2' id='mas_ult_2'>Phone:</div>";
        html += "<div class='su-ad-item'>" + data['phone'] + "</div>";
        html += "<div class='su-admin-header su-topper2' id='mas_ult_3'>Email:</div>";
        html += "<div class='su-ad-item-email'>" + data['email'] + "</div>";
        html += "<div class='su-admin-header su-topper2' id='mas_ult_4'>" + data['hours_title'] + ":</div>";
        if (group_weekdays === "True")
        {
            html += "<div class='su-ad-item'><span>Weekdays: </span>" + data["monday"] + "</div>";
        }
        else
        {
            html += "<div class='su-ad-item'><span>Monday: </span>" + data["monday"] + "</div>";
            html += "<div class='su-ad-item'><span>Tuesday: </span>" + data["tuesday"] + "</div>";
            html += "<div class='su-ad-item'><span>Wednesday: </span>" + data["wednesday"] + "</div>";
            html += "<div class='su-ad-item'><span>Thursday: </span>" + data["thursday"] + "</div>";
            html += "<div class='su-ad-item'><span>Friday: </span>" + data["friday"] + "</div>";
        }
        if (group_weekends === "True")
        {
            html += "<div class='su-ad-item'><span>Weekends: </span>" + data["saturday"] + "</div>";
        }
        else
        {
            html += "<div class='su-ad-item'><span>Saturday: </span>" + data["saturday"] + "</div>";
            html += "<div class='su-ad-item'><span>Sunday: </span>" + data["sunday"] + "</div>";
        }
        html += "</div>";
    }
    else
    {
        html += "<div class='su-admin-header su-topper' id='mas_ult_1'>Address: &nbsp<a href=\"javascript: launchAdminEditors('address', '1');\">[Edit]</a></div>";
        html += "<div class='su-ad-item'>" + address1 + "</div>";
        html += "<div class='su-ad-item'>" + address2 + "</div>";
        html += "<div class='su-ad-item'>" + address3 + "</div>";
        html += "<div class='su-ad-item'>" + data['city'] + ", " + data['state'] + " " + data['zip_code'] + "</div>";
        html += "<div class='su-admin-header su-topper2' id='mas_ult_2'>Phone: &nbsp<a href=\"javascript: launchAdminEditors('phone', '1');\">[Edit]</a></div>";
        html += "<div class='su-ad-item'>" + data['phone'] + "</div>";
        html += "<div class='su-admin-header su-topper2' id='mas_ult_3'>Email: &nbsp<a href=\"javascript: launchAdminEditors('email', '1');\">[Edit]</a></div>";
        html += "<div class='su-ad-item-email'>" + data['email'] + "</div>";
        html += "<div class='su-admin-header su-topper2' id='mas_ult_4'>" + data['hours_title'] + ": &nbsp<a href=\"javascript: launchAdminEditors('hours', '1');\">[Edit]</a></div>";
        if (group_weekdays === "True")
        {
            html += "<div class='su-ad-item'><span>Weekdays: </span>" + data["monday"] + "</div>";
        }
        else
        {
            html += "<div class='su-ad-item'><span>Monday: </span>" + data["monday"] + "</div>";
            html += "<div class='su-ad-item'><span>Tuesday: </span>" + data["tuesday"] + "</div>";
            html += "<div class='su-ad-item'><span>Wednesday: </span>" + data["wednesday"] + "</div>";
            html += "<div class='su-ad-item'><span>Thursday: </span>" + data["thursday"] + "</div>";
            html += "<div class='su-ad-item'><span>Friday: </span>" + data["friday"] + "</div>";
        }
        if (group_weekends === "True")
        {
            html += "<div class='su-ad-item'><span>Weekends: </span>" + data["saturday"] + "</div>";
        }
        else
        {
            html += "<div class='su-ad-item'><span>Saturday: </span>" + data["saturday"] + "</div>";
            html += "<div class='su-ad-item'><span>Sunday: </span>" + data["sunday"] + "</div>";
        }
        html += "</div>";
    }    
    if (Number(about_permission) === 0)
    {
        html += "<div class='su-abt-style su-btn-disabled'><button disabled id='master_ultra_about_button' onClick=\"javascript: buildAboutEditor({{company.abouts}});\">Update <em>\"About Us\"</em> Statement</button></div>";
    }
    else
    {
        html += "<div class='su-abt-style'><button id='master_ultra_about_button' onClick=\"javascript: buildAboutEditor({{company.abouts}});\">Update <em>\"About Us\"</em> Statement</button></div>";

    }
    return html;
}

function setPaymentButton(mode, index)
{
    var method  = $("#k_pmt_method_" + index).val();
    var m_id    = $("#k_pmt_id_" + index).val();
    var message = null;
    var details = null;
    if (Number(mode) === 0)
    {
        $("#pmt_target_action").val("disable");
        message = "This action will disable the " + method + " payment method";
        details = "If you proceed, you will alter the information that is available to your clients on the NWS website. This action will indicate that " + method + " is <em><b>NOT</b></em> accepted as a viable payment method at Natural Woman Salon.";
    }
    else if (Number(mode) === 1)
    {
        $("#pmt_target_action").val("enable");
        message = "This action will enable the " + method + " payment method";
        details = "If you proceed, you will alter the information that is available to your clients on the NWS website. This action will indicate that " + method + " <em><b>IS</b></em> accepted as a viable payment method at Natural Woman Salon.";
    }
    $("#pop-up-builder").html("");
    launchSiteAdminWarning("payment");
    $('#su-payment-sub-message').html(message);
    $('#su-payment-sub-details').html(details);
    $('#pmt_target_id').val(m_id);
}

function preparePaymentDelete(index)
{
    var m_id = $("#k_pmt_id_" + index).val();
    $("#pmt_target_action").val("delete");
    $("#pmt_target_id").val(m_id);
    launchDeleteConfirmation('payment');
}

function updatePaymentIcno(index)
{
    var t           = "#";
    var html        = "";
    var m_id        = $("#k_pmt_id_" + index).val();
    var method      = $("#k_pmt_method_" + index).val();
    var icon        = $("#k_pmt_icon_" + index).val();
    var is_super    = $("#qmax").val();
    is_super        = Number(is_super);
    $("#pmt_target_action").val("icon");
    $("#pmt_target_id").val(m_id);
    $("#selected-payment").val(index);

    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<h3><i class='fas fa-money-bill-alt'></i> &nbspUpdate Payment Method</h3>";
    html += "<input type='text' id='f_payment_method' placeholder='Enter Payment Method Name' oninput=\"javascript: mirrorInput('#f_payment_method', '#m_payment_method');\" value='" + method + "'>";
    html += "<div class='su-payment-types'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-12 sel-pmt-msg' style='padding:0; margin: 0;'>Select an icon from the list below</div>";
    html += "<div class='col-sm-4' style='padding:0; margin: 0;'>";
    html += "<table>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-cc-visa' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-visa');\"></td>";
    html += "<td class='su-sp-icon''><i class='fab fa-cc-visa'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-apple-pay' onClick=\"javascript: load_pmt_radio_data('fab fa-apple-pay');\"></td>";
    html += "<td class='su-sp-icon''><i class='fab fa-apple-pay'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-cc-amazon-pay' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-amazon-pay');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-amazon-pay'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-bitcoin' onClick=\"javascript: load_pmt_radio_data('fab fa-bitcoin');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-bitcoin'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fasfa-money-check' onClick=\"javascript: load_pmt_radio_data('fas fa-money-check');\"></td>";
    html += "<td class='su-sp-icon'><i class='fas fa-money-check'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='radio' name='pmt_icon' id='fasfa-shopping-bag' onClick=\"javascript: load_pmt_radio_data('fas fa-shopping-bag');\"></td>";
    html += "<td><i class='fas fa-shopping-bag'></i></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin: 0;'>";
    html += "<table>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-cc-mastercard' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-mastercard');\"></td>";
    html += "<td class='su-sp-icon''><i class='fab fa-cc-mastercard'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-cc-discover' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-discover');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-discover'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-paypal' onClick=\"javascript: load_pmt_radio_data('fab fa-paypal');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-paypal'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='farfa-credit-card' onClick=\"javascript: load_pmt_radio_data('far fa-credit-card');\"></td>";
    html += "<td class='su-sp-icon'><i class='far fa-credit-card'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fasfa-dollar-sign' onClick=\"javascript: load_pmt_radio_data('fas fa-dollar-sign');\"></td>";
    html += "<td class='su-sp-icon'><i class='fas fa-dollar-sign'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='radio' name='pmt_icon' id='fasfa-shopping-cart' onClick=\"javascript: load_pmt_radio_data('fas fa-shopping-cart');\"></td>";
    html += "<td><i class='fas fa-shopping-cart'></i></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin: 0;'>";
    html += "<table>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-cc-amex' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-amex');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-amex'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-cc-diners-club' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-diners-club');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-diners-club'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fabfa-google-wallet' onClick=\"javascript: load_pmt_radio_data('fab fa-google-wallet');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-google-wallet'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' id='fasfa-money-bill-alt' onClick=\"javascript: load_pmt_radio_data('fas fa-money-bill-alt');\"></td>";
    html += "<td class='su-sp-icon'><i class='fas fa-money-bill-alt'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='radio' name='pmt_icon' id='fasfa-gift' onClick=\"javascript: load_pmt_radio_data('fas fa-gift');\"></td>";
    html += "<td><i class='fas fa-gift'></i></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button onClick=\"javascript: validatingPaymentFields();\">Submit</button>";
    if (is_super === 1)
    {
        html += "<button onClick=\"javascript: preparePaymentDelete('" + index + "');\">Delete</button>";
    }
    html += "<button onClick=\"javascript: checkPaymentFields();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    for (var i = 0; i < icon.length; i++)
    {
        var c = icon[i];
        if (c !== " ")
        {
            t += c;
        }
    }
    $("#m_payment_icon").val(icon);
    $("#m_payment_method").val(method);
    $("#pop-up-builder").html(html);
    $("#pop-up-builder").hide();
    $("#pop-up-builder").removeClass("hidden");
    $("#pop-up-builder").fadeIn(500);
    $(t).prop("checked", true);
}

function buildPayments(data)
{
    var action_url = $("#action_url").val();
    var html = "";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='pmt_target_model' value='payment'>";
    html += "<input type='hidden' name='target_action' id='pmt_target_action' value=''>";
    html += "<input type='hidden' name='target_id' id='pmt_target_id' value=''>";
    html += "<input type='hidden' name='m_payment_method' id='m_payment_method'>";
    html += "<input type='hidden' name='m_payment_icon' id='m_payment_icon'>";
    html += "</form>";
    html += "<ul>";
 
    for (var i = 0; i < data.length; i++)
    {
        var index   = String(data[i]['index']);
        var method  = String(data[i]['method']);
        var icon    = String(data[i]['icon']);
        var active  = String(data[i]['is_accepted']);
        var m_id    = String(data[i]['id']);
        var check   = "<i class='fas fa-check-square'></i>";
        var no_ch   = "<i class='far fa-square'></i>";
        var button  = null;
        html += "<input type='hidden' id='k_pmt_method_" + index + "' value='" + method + "'>";
        html += "<input type='hidden' id='k_pmt_id_" + index + "' value='" + m_id + "'>";
        html += "<input type='hidden' id='k_pmt_icon_" + index + "' value='" + icon + "'>";
        html += "<input type='hidden' id='k_pmt_accepted_" + index + "' value='" + active + "'>";
        html += "<div id='div2_" + index + "' class='" + data[i]['class'] + "'>";
        html += "<li onClick=\"javascript: updatePaymentIcno('" + index + "');\">";
        html += "<table>";
        html += "<tr>";
        if (active === "True")
        {
            html += "<td class='mst-fa-check'>" + check + "</td>";
            button = "<td class='mst-fa-button'><button onClick=\"javascript: setPaymentButton('0', " + index + ");\">Disable</button></td>";
        }
        else if (active === "False")
        {
            html += "<td class='mst-fa-check'>" + no_ch + "</td>";
            button = "<td class='mst-fa-button'><button onClick=\"javascript: setPaymentButton('1', " + index + ");\">Set Active</button></td>";
        }
        html += "<td class='su-border-left lg-ico'><i id='pmt_icon_" + index + "' class='" + icon + "'></i></td>";
        html += "<td class='su-sp-top su-sp-bottom su-sp-even'><em>" + method + "</em></td>";
        html += button;
        html += "</tr>";
        html += "</table>";
        html += "</li>";
        html += "</div>";
    }

    html += "</ul>";
    return html;
}

function buildLinks(data)
{
    var html            = "";
    var show_facebook   = data['show_facebook'];
    var show_twitter    = data['show_twitter'];
    var show_instagram  = data['show_instagram'];
    var max_permission  = $("#qmax").val();
    var max_button      = null;
    if (Number(max_permission) === 0)
    {
        max_button = "<div class='su-admin-header su-topper' id='mst_ult_admin_5'>Images</div>";
    }
    else
    {
        max_button = "<div class='su-admin-header su-topper' id='mst_ult_admin_5'>Images &nbsp<a href=\"javascript: launchAdminEditors('max_images', '1');\">[Edit]</a></div>";
    }
    html += "<input type='hidden' id='m_facebook_url' value='" + data['facebook_url'] + "'>";
    html += "<input type='hidden' id='m_twitter_url' value='" + data['twitter_url'] + "'>";
    html += "<input type='hidden' id='m_instagram_url' value='" + data['instagram_url'] + "'>";
    html += "<input type='hidden' id='m_show_facebook' value='" + show_facebook + "'>";
    html += "<input type='hidden' id='m_show_twitter' value='" + show_twitter+ "'>";
    html += "<input type='hidden' id='m_show_instagram' value='" + show_instagram + "'>";
    html += "<input type='hidden' id='m_max_images' value='" + data['max_images'] + "'>";
    html += "<input type='hidden' id='m_num_uploads' value='" + data['num_uploads'] + "'>";
    html += max_button;
    html += "<div class='su-ad-item su-red'><span>Maximum No. Images Allowed: </span'><b class='su-black'>" + data['max_images'] + "</b></div>";
    html += "<div class='su-ad-item su-black'><span>No. Images Uploaded: </span>" + data['num_uploads'] + "</div>";
    html += "<div class='su-admin-header su-topper2'>Social Media Management</div>";
    html += "<div class='su-sm-header'>Facebook</div>";
    html += "<div class='su-sm-manager'>";
    html += "<a href='" + data['facebook_url'] + "' target='_blank'><img src='/static/images/fb.png'></a>";
    html += "<button onClick=\"javascript: launchAdminEditors('facebook', '1', '0');\" id='mst_ult_admin_6'>Update Link</button>";
    if (show_facebook === "True")
    {
        html += "<input type='radio' name='show_facebook' id='fb-on' class='rad-left' checked value='True' disabled>";
        html += "<label for='fb-on' class='su-sm-label-editor'>On</label>";
        html += "<input type='radio' name='show_facebook' id='fb-off' value='False' disabled>";
        html += "<label for='fb-off'>Off</label>";
        html += "</div>";
    }
    else
    {
        html += "<input type='radio' name='show_facebook' id='fb-on' class='rad-left' value='True' disabled>";
        html += "<label for='fb-on' class='su-sm-label-editor'>On</label>";
        html += "<input type='radio' name='show_facebook' id='fb-off' checked value='False' disabled>";
        html += "<label for='fb-off'>Off</label>";
        html += "</div>";
    }
    html += "<div class='su-sm-header su-topper3'>Twitter</div>";
    html += "<div class='su-sm-manager'>";
    html += "<a href='" + data['twitter_url'] + "' target='_blank'><img src='/static/images/twitter.png'></a>";
    html += "<button onClick=\"javascript: launchAdminEditors('twitter', '1', '0');\" id='mst_ult_admin_7'>Update Link</button>";
    if (show_twitter === "True")
    {
        html += "<input type='radio' name='show_twitter' id='twitter-on' class='rad-left' checked value='True' disabled>";
        html += "<label for='twitter-on' class='su-sm-label-editor'>On</label>";
        html += "<input type='radio' name='show_twitter' id='twitter-off' value='False' disabled>";
        html += "<label for='twitter-off'>Off</label>";
        html += "</div>";
    }
    else
    {
        html += "<input type='radio' name='show_twitter' id='twitter-on' class='rad-left' value='True' disabled>";
        html += "<label for='twitter-on' class='su-sm-label-editor'>On</label>";
        html += "<input type='radio' name='show_twitter' id='twitter-off' checked value='False' disabled>";
        html += "<label for='twitter-off'>Off</label>";
        html += "</div>";
    }
    html += "<div class='su-sm-header su-topper3'>Instagram</div>";
    html += "<div class='su-sm-manager'>";
    html += "<a href='" + data['instagram_url'] + "' target='_blank'><img src='/static/images/instagram.png'></a>";
    html += "<button onClick=\"javascript: launchAdminEditors('instagram', '1', '0');\" id='mst_ult_admin_8'>Update Link</button>";
    if (show_instagram === "True")
    {
        html += "<input type='radio' name='show_instagram' id='instagram-on' class='rad-left' checked value='True' disabled>";
        html += "<label for='instagram-on' class='su-sm-label-editor'>On</label>";
        html += "<input type='radio' name='show_instagram' id='instagram-off' value='False' disabled>";
        html += "<label for='instagram-off'>Off</label>";
        html += "</div>";
    }
    else
    {
        html += "<input type='radio' name='show_instagram' id='instagram-on' class='rad-left' value='True' disabled>";
        html += "<label for='instagram-on' class='su-sm-label-editor'>On</label>";
        html += "<input type='radio' name='show_instagram' id='instagram-off' checked value='False' disabled>";
        html += "<label for='instagram-off'>Off</label>";
        html += "</div>";
    }
    return html;
}

function buildPermissions(data)
{
    var html    = "";
    var fname   = "";
    var lname   = "";
    var email   = "";
    var admin   = "";
    var locked  = "";
    var s_user  = "";
    var admin   = "";
    var gallery = "";
    var product = "";
    var about   = "";
    var blog    = "";
    var index   = "";
    var m_class = "";
    var u_id    = "";
    var granted = "<i class='far fa-check-square'></i>"
    var denied  = "<i class='far fa-square'></i>"

    for (var i = 0; i < data.length; i++)
    {
        index   = String(data[i]['index']);
        fname   = String(data[i]['fname']);
        lname   = String(data[i]['lname']);
        email   = String(data[i]['email']);
        m_clsas = String(data[i]['class']);
        u_id    = String(data[i]['id']);
        admin   = String(data[i]['is_admin']);
        product = String(data[i]['product_permission']);
        about   = String(data[i]['about_permission']);
        blog    = String(data[i]['blog_permission']);
        gallery = String(data[i]['gallery_permission']);
        s_user  = String(data[i]['isSuper']);
        locked  = String(data[i]['isLocked']);

        html += "<div id='div1_" + index + "' class='" + m_clsas + "'>";
        html += "<li>";
        html += "<a href=\"javascript: launchAdminEditors('permission', '1', '" + index + "');\">";
        html += "<input type='hidden' id='u_id_" + index + "' value='" + u_id + "'>";
        html += "<input type='hidden' id='m_fname_" + index + "' value='" + fname + "'>";
        html += "<input type='hidden' id='m_lname_" + index + "' value='" + lname + "'>";
        html += "<input type='hidden' id='m_email_" + index + "' value='" + email + "'>";
        html += "<input type='hidden' id='m_admin_" + index + "' value='" + admin + "'>";
        html += "<input type='hidden' id='m_blog_" + index + "' value='" + blog + "'>";
        html += "<input type='hidden' id='m_product_" + index + "' value='" + product + "'>";
        html += "<input type='hidden' id='m_image_" + index + "' value='" + gallery + "'>";
        html += "<input type='hidden' id='m_about_" + index + "' value='" + about + "'>";
        html += "<input type='hidden' id='m_lock_" + index + "' value='" + locked + "'>";
        html += "<input type='hidden' id='m_super_" + index + "' value='" + s_user + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectUserItem('" + index + "');\" id='usr_box_" + index + "'></td>";
        html += "<td class='su-border-left'>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='td-top su-sp-top'><span>Name: </span></td>";
        html += "<td class='su-sp-top'>" + fname + " " + lname + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td class='td-top'><span>Email: </span></td>";
        html += "<td>" + email + "</td>";
        html += "</tr>";
        html += "</table>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='td-top'><span>Permissions: </span></td>";
        html += "</tr>";
        html += "</table>";
        if (blog === "True") { blog = granted; } else { blog = denied; }
        if (gallery === "True") { gallery = granted; } else { gallery = denied; }
        if (about === "True") { about = granted; } else { about = denied; }
        if (product === "True") { product = granted; } else { product = denied; }
        if (admin === "True") { admin = granted; } else { admin = denied; }
        if (locked === "True") { locked = granted; } else { locked = denied; }
        if (s_user === "True") { s_user = granted; } else { s_user = denied; } 
        html += "<table>";
        html += "<tr>";
        html += "<td>" + product + "</td>";
        html += "<td class='su-sp-right-pad'>Products</td>";
        html += "<td>" + blog + "</td>";
        html += "<td class='su-sp-right-pad'>Blogs</td>";
        html += "<td>" + gallery + "</td>";
        html += "<td>Images</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td>" + about + "</td>";
        html += "<td class='su-sp-right-pad'>Statements</td>";
        html += "<td>" + admin + "</td>";
        html += "<td class='su-sp-right-pad'>Administration</td>";
        html += "<td>" + locked + "</td>";
        html += "<td>Locked</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td>" + s_user + "</td>";
        html += "<td>Superuser</td>";
        html += "</tr>";
        html += "</table>";
        html += "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }
    return html;
}

function buildAuths(data)
{
    var html    = "";
    var index   = "";
    var m_class = "";
    var a_id    = "";
    var name    = "";
    var email   = "";
    var admin   = "";
    var product = "";
    var about   = "";
    var blog    = "";
    var image   = "";
    var lock    = "";
    var m_super = "";

    for (var i = 0; i < data.length; i++)
    {
        index   = String(data[i]['index']);
        m_class = String(data[i]['class']);
        a_id    = String(data[i]['id']);
        name    = String(data[i]['name']);
        email   = String(data[i]['email']);
        admin   = String(data[i]['admin']);
        product = String(data[i]['product']);
        about   = String(data[i]['about']);
        blog    = String(data[i]['blog']);
        image   = String(data[i]['image']);
        lock    = String(data[i]['lock']);
        m_super = String(data[i]['super']);

        html += "<div id='div1_" + index + "' class='" + m_class + "'>";
        html += "<li>";
        html += "<a href=\"javascript: launchAdminEditors('auth', '1', '" + index + "');\">";
        html += "<input type='hidden' id='u_id_" + index + "' value='" + a_id + "'>";
        html += "<input type='hidden' id='m_name_" + index + "' value='" + name + "'>";
        html += "<input type='hidden' id='m_email_" + index + "' value='" + email + "'>";
        html += "<input type='hidden' id='m_admin_" + index + "' value='" + admin + "'>";
        html += "<input type='hidden' id='m_blog_" + index + "' value='" + blog + "'>";
        html += "<input type='hidden' id='m_product_" + index + "' value='" + product + "'>";
        html += "<input type='hidden' id='m_image_" + index + "' value='" +image + "'>";
        html += "<input type='hidden' id='m_about_" + index + "' value='" + about + "'>";
        html += "<input type='hidden' id='m_lock_" + index + "' value='" + lock + "'>";
        html += "<input type='hidden' id='m_super_" + index + "' value='" + m_super + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectUserItem('" + index + "');\" id='usr_box_" + index + "'></td>";
        html += "<td class='su-border-left'>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='td-top su-sp-top'><span>Name: </span></td>";
        html += "<td class='su-sp-top'>" + name + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td class='td-top su-sp-bottom'><span>Email: </span></td>";
        html += "<td class='su-sp-bottom'>" + email + "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }
    return html;
}

function buildSecurity(data)
{
    var html        = "";
    var index       = "";
    var e_class     = "";
    var q_id        = "";
    var question    = "";

    for (var i = 0; i < data.length; i++)
    {
        index       = String(data[i]['index']);
        e_class     = String(data[i]['class']);
        q_id        = String(data[i]['id']);
        question    = String(data[i]['question']);
        html += "<div id='div1_" + index + "' class='" + e_class + "'>";
        html += "<li>";
        html += "<a href=\"javascript: launchAdminEditors('security', '1', '" + index + "');\">";
        html += "<input type='hidden' id='u_id_" + index + "' value='" + q_id + "'>";
        html += "<input type='hidden' id='m_question_" + index + "' value='" + question + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectUserItem('" + index + "');\" id='usr_box_" + index + "'></td>";
        html += "<td class='su-border-left'>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='su-sp-top su-sp-bottom su-set-sec-width'><span>Security Question " + String(i+1) + ": </span></td>";
        html += "<td>" + question + "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</td>";
        html += "</tr>";
        html += '</table>';
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }
    return html;
}

function buildBlogs(data)
{
    var html = "";
    for (var i = 0; i < data.length; i++)
    {
        var index       = String(data[i]['index']);
        var e_class     = String(data[i]['class']);
        var b_id        = String(data[i]['id']);
        var subject     = String(data[i]['subject']);
        var date        = String(data[i]['date']);
        var time        = String(data[i]['time']);
        var content     = String(data[i]['content']);
        html += "<div id='div_" + index + "' class='" + e_class + "'>";
        html += "<li>";
        html += "<a href=\"javascript: launchAdminEditors('blog', '1', '" + index + "');\">";
        html += "<input type='hidden' id='m_id_" + index + "' value='" + b_id + "'>";
        html += "<input type='hidden' id='m_subject_" + index + "' value='" + subject + "'>";
        html += "<input type='hidden' id='m_content_" + index + "' value='" + content + "'>";
        html += "<input type='hidden' id='m_date_" + index + "' value='" + date + "'>";
        html += "<input type='hidden' id='m_time_" + index + "' value='" + time + "'>";
        html += "<input type='hidden' id='m_time_" + index + "' value='" + time + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectModelItem('" + index + "');\" id='db_box_" + index + "'></td>";
        html += "<td class='su-border-left'>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='td-top su-sp-top'><span>Subject: </span></td>";
        html += "<td class='su-sp-top'>" + subject + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td class='td-top'><span>Date: </span></td>";
        html += "<td>" + date + " <b>@ </b>" + time + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td class='td-top su-sp-bottom'><span>Post: </span></td>";
        html += "<td class='su-sp-bottom'>" + content + "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }   
    return html;
}

function buildProducts(data)
{
    var html = "";
    for (var i = 0; i < data.length; i++)
    {
        var index       = String(data[i]['index']);
        var e_class     = String(data[i]['class']);
        var p_id        = String(data[i]['id'])
        var name        = String(data[i]['name']);
        var description = String(data[i]['description']);
        var price       = String(data[i]['price']);
        var varies      = String(data[i]['varies']);
        var v_class     = "far fa-square";

        if (varies === "True")
        {
            v_class = "far fa-check-square";
        }
        html += "<div id='div_" + index + "' class='" + e_class + "'>";
        html += "<li>";
        html += "<a href=\"javascript: launchAdminEditors('product', '1', '" + index + "');\">";
        html += "<input type='hidden' id='m_id_" + index + "' value='" + p_id + "'>";
        html += "<input type='hidden' id='m_name_" + index + "' value='" + name + "'>";
        html += "<input type='hidden' id='m_description_" + index + "' value='" + description + "'>";
        html += "<input type='hidden' id='m_price_" + index + "' value='" + price + "'>";
        html += "<input type='hidden' id='m_varies_" + index + "' value='" + varies + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectModelItem('" + index + "');\" id='db_box_" + index + "'></td>";
        html += "<td class='su-border-left'>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='td-top su-sp-top'><span>Product: </span></td>";
        html += "<td class='su-sp-top'>" + name + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td class='td-top'><span>Description: </span></td>";
        html += "<td>" + description + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td class='td-top su-sp-bottom'><span>Price: </span></td>";
        html += "<td class='su-sp-bottom'>$" + price + "</td>";
        html += "</tr>";
        html += "</table>";
        html += "<table class='cum-up1'>";
        html += "<tr class='cum-up1'>";
        html += "<td class='cum-up1'><i class='";
        html += v_class;
        html += "'></i><td>";
        html += "<td class='cum-up1'>Price Varies<td>";
        html += "</tr>";
        html += "</table>";
        html += "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }   
    return html;
}

function buildImages(data)
{
    var html    = "";
    var index   = "";
    var url     = "";
    var img_id  = "";
    var e_class = "";
    var max     = data[0]['max'];
    var uploads = data[0]['uploads'];
    html += "<input type='hidden' id='gal_max' value='" + max + "'>";
    html += "<input type='hidden' id='file_index' value='" + uploads + "'>";
    for (var i  = 0; i < data.length; i++)
    {
        index   = String(data[i]['index']);
        e_class = String(data[i]['class']);
        img_id  = String(data[i]['id']);
        url     = String(data[i]['url']);
        html += "<div id='div_" + index + "' class='" + e_class + "'>";
        html += "<li>";
        html += "<a href=\"javascript: expandImage('" + index + "');\">";
        html += "<input type='hidden' id='m_id_" + index + "' value='" + img_id + "'>";
        html += "<input type='hidden' id='m_url_" + index + "' value='" + url + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectModelItem('" + index + "');\" id='db_box_" + index + "'></td>";
        html += "<td class='su-border-left'>";
        html += "<table>";
        html += "<tr>";
        html += "<td class='su-sp-top su-sp-bottom'><img src='" + url + "'></td>";
        html += "<td><p>Click to expand image</p></td>";
        html += "</tr>";
        html += "</table>";
        html += "</td>";
        html += "</tr>";
        html += '</table>';
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }
   return html;     
}

function expandImage(index)
{
    var html = "";
    index = String(index);
    var url = $("#m_url_" + index).val();
    html += "<div class='su-center su-width55'>";
    html += "<div class='su-image'>";
    html += "<h3>click image to close...</h3>";
    html += "<img src='" + url + "' onClick=\"javascript: closeEditor();\">";
    html += "</div>";
    html += "</div>";
    $("#pop-up-builder").html(html);
    $("#pop-up-builder").hide();
    $("#pop-up-builder").removeClass("hidden");
    $("#pop-up-builder").fadeIn(600);
}

function selectModelItem(index)
{
    index = String(index);
    if ($("#db_box_" + index).prop("checked") === true)
    {
        $("#div_" + index).addClass("su_ultimate_selector");
        addModelItem(index);
    }
    else
    {
        $("#div_" + index).removeClass("su_ultimate_selector");
        removeModelItem(index);
    }
}

function selectUserItem(index)
{
    index = String(index);
    if ($("#usr_box_" + index).prop("checked") === true)
    {
        $("#div1_" + index).addClass("su_ultimate_selector");
        addUserItem(index);
    }
    else
    {
        $("#div1_" + index).removeClass("su_ultimate_selector");
        removeUserItem(index);
    }
}

function selectPaymentItem(index)
{
    index = String(index);
    if ($("#pay_box_" + index).prop("checked") === true)
    {
        $("#div2_" + index).addClass("su_ultimate_selector");
        addPayItem(index);
    }
    else
    {
        $("#div2_" + index).removeClass("su_ultimate_selector");
        removePayItem(index);
    }
}

function selectAboutItem(index)
{
    index = String(index);
    if ($("#ab_box_" + index).prop("checked") === true)
    {
        $("#div_a" + index).addClass("su_ultimate_selector");
        $("#abt_selected").val("1");
        addAboutItem(index);
    }
    else
    {
        $("#div_a" + index).removeClass("su_ultimate_selector");
        $("#abt_selected").val("0");
        removeAboutItem(index);
    }
}

function addModelItem(index)
{
    var current = $("#selected-db").val();
    current     = String(current);
    index       = String(index);
    if (current.length === 0 || current.length === 1)
    {
        current = "~" + index + "~";
    }
    else if (current.length > 1)
    {
        current = current + index;
        current += "~";
    }
    $("#selected-db").val(current);
    setModelDeleteBtn();
}

function removeModelItem(index)
{
    var new_list = "";
    var current = $("#selected-db").val();
    current = String(current).split("~");
    for (var i = 0; i < current.length; i++)
    {
        if (current[i].length > 0 && current[i] !== String(index))
        {
            new_list += current[i];
            new_list += "~";
        }
    }
    if (new_list.length > 0)
    {
        new_list = "~" + new_list;
    }
    $("#selected-db").val(new_list);
    setModelDeleteBtn();
}

function addUserItem(index)
{
    var current = $("#selected-usr").val();
    current     = String(current);
    index       = String(index);
    if (current.length === 0 || current.length === 1)
    {
        current = "~" + index + "~";
    }
    else if (current.length > 1)
    {
        current = current + index;
        current += "~";
    }
    $("#selected-usr").val(current);
    setUserDeleteBtn();
}

function removeUserItem(index)
{
    var new_list = "";
    var current = $("#selected-usr").val();
    current = String(current).split("~");
    for (var i = 0; i < current.length; i++)
    {
        if (current[i].length > 0 && current[i] !== String(index))
        {
            new_list += current[i];
            new_list += "~";
        }
    }
    if (new_list.length > 0)
    {
        new_list = "~" + new_list;
    }
    $("#selected-usr").val(new_list);
    setUserDeleteBtn();
}

function addPayItem(index)
{
    var current = $("#selected-payment").val();
    current     = String(current);
    index       = String(index);
    if (current.length === 0 || current.length === 1)
    {
        current = "~" + index + "~";
    }
    else if (current.length > 1)
    {
        current = current + index;
        current += "~";
    }
    $("#selected-payment").val(current);
    setPaymentAbout();
}

function removePayItem(index)
{
    var new_list = "";
    var current = $("#selected-payment").val();
    current = String(current).split("~");
    for (var i = 0; i < current.length; i++)
    {
        if (current[i].length > 0 && current[i] !== String(index))
        {
            new_list += current[i];
            new_list += "~";
        }
    }
    if (new_list.length > 0)
    {
        new_list = "~" + new_list;
    }
    $("#selected-payment").val(new_list);
    setPaymentDeleteBtn();
}

function addAboutItem(index)
{
    var current = $("#selected-payment").val();
    current     = String(current);
    index       = String(index);
    if (current.length === 0 || current.length === 1)
    {
        current = "~" + index + "~";
    }
    else if (current.length > 1)
    {
        current = current + index;
        current += "~";
    }
    $("#selected-payment").val(current);
}

function removeAboutItem(index)
{
    var new_list = "";
    var current = $("#selected-payment").val();
    current = String(current).split("~");
    for (var i = 0; i < current.length; i++)
    {
        if (current[i].length > 0 && current[i] !== String(index))
        {
            new_list += current[i];
            new_list += "~";
        }
    }
    if (new_list.length > 0)
    {
        new_list = "~" + new_list;
    }
    $("#selected-payment").val(new_list);
}

function setModelDeleteBtn()
{
    var val = $("#selected-db").val();
    if (String(val).length > 0) 
    { 
        $("#modelDelBtn").prop("disabled", false); 
        $("#model-del1").removeClass('su-btn-disabled');
    }
    else 
    { 
        $("#modelDelBtn").prop("disabled", true); 
        $("#model-del1").addClass('su-btn-disabled');
    }
}

function setUserDeleteBtn()
{
    var val = $("#selected-usr").val();
    if (String(val).length > 0) 
    { 
        $("#ursDelBtn").prop("disabled", false);
        $("#user-del1").removeClass('su-btn-disabled'); 
    }
    else 
    { 
        $("#ursDelBtn").prop("disabled", true);
        $("#user-del1").addClass('su-btn-disabled'); 
    }
}

function setPaymentDeleteBtn()
{
    var val = $("#selected-payment").val();
    if (String(val).length > 0) 
    { 
        $("#adminDelBtn").prop("disabled", false); 
        $("#admin-del1").removeClass('su-btn-disabled');
    }
    else 
    { 
        $("#adminDelBtn").prop("disabled", true); 
        $("#admin-del1").addClass('su-btn-disabled');
    }
}

function buildAddressEditor(index)
{
    var html        = "";
    var address1    = $("#m_address1").val();
    var address2    = $("#m_address2").val();
    var address3    = $("#m_address3").val();
    var city        = $("#m_city").val();
    var state       = $("#m_state").val();
    var zipcode     = $("#m_zipcode").val();
    var action_url  = $("#action_url").val();
    address1        = String(address1);
    address2        = String(address2);
    address3        = String(address3);
    city            = String(city);
    state           = String(state);
    zipcode         = String(zipcode);
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='address'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='update'>";
    html += "<input type='hidden' name='target_id' id='target_id' value=''>";
    html += "<h3><i class='fas fa-map-marker-alt'></i> Update Contact Information</h3>";
    html += "<input type='text' name='address1' id='f_address1' placeholder='Address Line 1' value='" + address1 + "'>";
    html += "<input type='text' name='address2' id='f_address2' placeholder='Address Line 2' value='" + address2 + "'>";
    html += "<input type='text' name='address3' id='f_address3' placeholder='Address Line 3' value='" + address3 + "'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-7' style='padding:0; margin:0;'><input type='text' name='city' id='f_city' placeholder='City' value='" + city + "'></div>";
    html += "<div class='col-sm-2' style='padding:0; margin:0; padding-left: 5px; padding-right: 4px;'><input type='text' name='state' id='f_state' placeholder='MI' value='" + state + "' oninput=\"javascript: stateInput('#f_state');\"></div>";
    html += "<div class='col-sm-3' style='padding:0; margin:0;'><input type='text' name='zip_code' id='f_zip' placeholder='Zip Code' value='" + zipcode + "' oninput=\"javascript: inputInteger('5', '#f_zip');\"></div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('address');\">Update</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('address', '1', 'index');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildPhoneEditor()
{
    var html    = "";
    var phone   = $("#m_phone").val();
    var spl1    = String(phone).split(" ");
    var area    = spl1[0][1];
    var spl2    = spl1[1].split("-")
    var pref    = spl2[0][0];
    var post    = spl2[1][0];
    var action_url = $("#action_url").val();
    area += spl1[0][2];
    area += spl1[0][3];
    pref += spl2[0][1];
    pref += spl2[0][2];
    post += spl2[1][1];
    post += spl2[1][2];
    post += spl2[1][3];

    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='phone'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='update'>";
    html += "<input type='hidden' name='target_id' id='target_id' value=''>";
    html += "<h3><i class='fas fa-phone-square'></i> Update Phone</h3>";
    html += "<div class='container su-input-center'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-2' style='padding:0; margin:0;'><input type='text' name='area' id='f_area' oninput=\"javascript: inputInteger('3', '#f_area');\" value='" + area + "'></div>";
    html += "<div class='col-sm-2' style='padding:0; margin:0;'><input type='text' name='prefix' id='f_pre' oninput=\"javascript: inputInteger('3', '#f_pre');\" value='" + pref + "'></div>";
    html += "<div class='col-sm-3' style='padding:0; margin:0;'><input type='text' name='postfix' id='f_post' oninput=\"javascript: inputInteger('4', '#f_post');\" value='" + post + "'></div>";
    html += "<div class='col-sm-5'></div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='su-general-btns su-txt-left'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('phone');\">Update</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('phone', '1', 'index');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildEmailEditor()
{
    var html    = "";
    var email   = $("#m_email").val();
    var action_url = $("#action_url").val();
    email       = String(email);

    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='email'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='update'>";
    html += "<input type='hidden' name='target_id' id='target_id' value=''>";
    html += "<h3><i class='fas fa-envelope'></i> Update Email</h3>";
    html += "<input type='email' name='email' id='f_email1' placeholder='Enter New Email Address' value='" + email + "'>";
    html += "<input type='email' name='email2' id='f_email2' placeholder='Confirm New Email Address'>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('email');\">Update</button>";
    html += "<button type='button' onClick=\" javascript: checkPopulatedFields('email');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildMediaEditor(model)
{
    var html = "";
    var icon = "";
    var lin1 = "";
    var lin2 = "";
    var btn_mode = false;
    var url  = "";
    var action_url = $("#action_url").val();
    if (model === "facebook")
    {
        url  = $("#m_facebook_url").val();
        icon = "<h3><i class='fab fa-facebook-square'></i> Update Facebook Link</h3>";
        lin1 = "<input type='email' name='facebook_url' id='f_facebook_url' placeholder='Enter New Facebook Link' value='" + url + "'>";
        lin2 = "<input type='email' name='facebook_url2' id='f_facebook_url2' placeholder='Confirm New Facebook Link' value=''>";
        if ($("#fb-on").prop("checked") == true)
        {
            btn_mode = true;
        }
    }
    else if (model === "twitter")
    {
        url  = $("#m_twitter_url").val();
        icon = "<h3><i class='fab fa-twitter-square'></i> Update Twitter Link</h3>";
        lin1 = "<input type='email' name='twitter_url' id='f_twitter_url' placeholder='Enter New Twitter Link' value='" + url + "'>";
        lin2 = "<input type='email' name='twitter_url2' id='f_twitter_url2' placeholder='Confirm New Twitter Link' value=''>";
        if ($("#twitter-on").prop("checked") == true)
        {
            btn_mode = true;
        }
    }
    else if (model === "instagram")
    {
        url  = $("#m_instagram_url").val();
        icon = "<h3><i class='fab fa-instagram'></i> Update Instagram Link</h3>";
        lin1 = "<input type='email' name='instagram_url' id='f_instagram_url' placeholder='Enter New Instagram Link' value='" + url + "'>";
        lin2 = "<input type='email' name='instagram_url2' id='f_instagram_url2' placeholder='Confirm New Instagram Link' value=''>";
        if ($("#instagram-on").prop("checked") == true)
        {
            btn_mode = true;
        }
    }
    html += "<div class='su-center su-width45'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='" + model + "'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='update'>";
    html += "<input type='hidden' name='target_id' id='target_id' value=''>";
    html += icon;
    html += lin1;
    html += lin2;
    if (btn_mode === true)
    {
        mo1 = "<input type='radio' name='link_on' value='True' id='turn_on' checked>";
        mo2 = "<input type='radio' name='link_on' value='False' id='turn_off'>";
    }
    else
    {
        mo1 = "<input type='radio' name='link_on' value='True' id='turn_on'>";
        mo2 = "<input type='radio' name='link_on' value='False' id='turn_off' checked>";
    }
    html += "<div class='su-ultimate-onOff'>";
    html += "<table>";
    html += "<tr>";
    html += "<td>";
    html += mo1;
    html += "</td>";
    html += "<td class='su-utl-rd-item'>";
    html += "On";
    html += "</td>";
    html += "<td>";
    html += mo2
    html += "</td>";
    html += "<td class='su-utl-rd-item'>";
    html += "Off";
    html += "</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('" + model + "');\">Update</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('" + model + "', '1', 'index');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += '</div>';
    return html;
}

function buildSuHoursTable(group_weekdays, group_weekends, mon, tue, wed, thu, fri, sat, sun)
{
    var html    = "";
    mon         = encodeSuTime(mon);
    sat         = encodeSuTime(sat);
    if (group_weekdays === "True")
    {
        html += "<tr>";
        html += "<th></th>";
        html += "<th class='su-table-hd-center'>Open</th>";
        html += "<th></th>";
        html += "<th class='su-table-hd-center'>Close</th>";
        html += "<th></th>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='su-table-hd-left su-grouped-hours'>Weekdays</th>";
        html += "<td class='su-table-in'><input type=text name='monday_open' id='open_mon' oninput=\"javascript: inputhour('2', '#open_mon');\" value='" + mon['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_mon' id='s_open_mon'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='monday_close' id='close_mon' oninput=\"javascript: inputhour('2', '#close_mon');\" value='" + mon['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_mon' id='s_close_mon'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "</tr>";
    }
    else
    {
        tue = encodeSuTime(tue);
        wed = encodeSuTime(wed);
        thu = encodeSuTime(thu);
        fri = encodeSuTime(fri);
        html += "<tr>";
        html += "<th></th>";
        html += "<th class='su-table-hd-center'>Open</th>";
        html += "<th></th>";
        html += "<th class='su-table-hd-center'>Close</th>";
        html += "<th></th>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='su-table-hd-left'>Monday</th>";
        html += "<td class='su-table-in'><input type=text name='monday_open' id='open_mon' oninput=\"javascript: inputhour('2', '#open_mon');\" value='" + mon['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_mon' id='s_open_mon'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='monday_close' id='close_mon' oninput=\"javascript: inputhour('2', '#close_mon');\" value='" + mon['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_mon' id='s_close_mon'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='su-table-hd-left'>Tuesday</th>";
        html += "<td class='su-table-in'><input type=text name='tuesday_open' id='open_tue' oninput=\"javascript: inputhour('2', '#open_tue');\" value='" + tue['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_tue' id='s_open_tue'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='tuesday_close' id='close_tue' oninput=\"javascript: inputhour('2', '#close_tue');\" value='" + tue['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_tue' id='s_close_tue'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='su-table-hd-left'>Wednesday</th>";
        html += "<td class='su-table-in'><input type=text name='wednesday_open' id='open_wed' oninput=\"javascript: inputhour('2', '#open_wed');\" value='" + wed['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_wed' id='s_open_wed'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='wednesday_close' id='close_wed' oninput=\"javascript: inputhour('2', '#close_wed');\" value='" + wed['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_wed' id='s_close_wed'>";
        html += "<option value='am'>AM</option>";
        html += "<option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "</tr>";
        html += "<th class='su-table-hd-left'>Thursday</th>";
        html += "<td class='su-table-in'><input type=text name='thursday_open' id='open_thu' oninput=\"javascript: inputhour('2', '#open_thu');\" value='" + thu['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_thu' id='s_open_thu'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='thursday_close' id='close_thu' oninput=\"javascript: inputhour('2', '#close_thu');\" value='" + thu['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_thu' id='s_close_thu'><option value='am'>AM</option><option value='pm'>PM</option>";
        html += "</select>";
        html += "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='su-table-hd-left'>Friday</th>";
        html += "<td class='su-table-in'><input type=text name='friday_open' id='open_fri' oninput=\"javascript: inputhour('2', '#open_fri');\" value='" + fri['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_fri' id='s_open_fri'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='friday_close' id='close_fri' oninput=\"javascript: inputhour('2', '#close_fri');\" value='" + fri['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_fri' id='s_close_fri'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "</tr>";
    }
    if (group_weekends === "True")
    {
        html += "<tr>";
        html += "<th class='su-table-hd-left su-grouped-hours su-table-btm'>Weekends</th>";
        html += "<td class='su-table-in su-table-btm'><input type=text name='saturday_open' id='open_sat' oninput=\"javascript: inputhour('2', '#open_sat');\" value='" + sat['open'] + "'></td>";
        html += "<td class='su-sel-in su-table-btm'>";
        html += "<select name='s_open_sat' id='s_open_sat'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "<td class='su-table-in su-table-btm'><input type=text name='sunday_close' id='close_sat' oninput=\"javascript: inputhour('2', '#close_sat');\" value='" + sat['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end su-table-btm'>";
        html += "<select name='s_close_sat' id='s_close_sat'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "</tr>";
    }
    else
    {
        sun = encodeSuTime(sun);
        html += "<tr>";
        html += "<th class='su-table-hd-left'>Saturday</th>";
        html += "<td class='su-table-in'><input type=text name='saturday_open' id='open_sat' oninput=\"javascript: inputhour('2', '#open_sat');\" value='" + sat['open'] + "'></td>";
        html += "<td class='su-sel-in'>";
        html += "<select name='s_open_sat' id='s_open_sat'><option value='am'>AM</option><option value='pm'>PM</option> </select>";
        html += "</td>";
        html += "<td class='su-table-in'><input type=text name='saturday_close' id='close_sat' oninput=\"javascript: inputhour('2', '#close_sat');\" value='" + sat['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end'>";
        html += "<select name='s_close_sat' id='s_close_sat'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<th class='su-table-hd-left su-table-btm'>Sunday</th>";
        html += "<td class='su-table-in su-table-btm'><input type=text name='sunday_open' id='open_sun' oninput=\"javascript: inputhour('2', '#open_sun');\" value='" + sun['open'] + "'></td>";
        html += "<td class='su-sel-in su-table-btm'>";
        html += "<select name='s_open_sun' id='s_open_sun'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "<td class='su-table-in su-table-btm'><input type=text name='sunday_close' id='close_sun' oninput=\"javascript: inputhour('2', '#close_sun');\" value='" + sun['close'] + "'></td>";
        html += "<td class='su-sel-in su-sel-end su-table-btm'>";
        html += "<select name='s_close_sun' id='s_close_sun'><option value='am'>AM</option><option value='pm'>PM</option></select>";
        html += "</td>";
        html += "</tr>";
    }
    return html;
}

function buildHoursEditor()
{
    var html            = "";
    var weekday_ck      = "";
    var weekend_ck      = "";
    var special_ck      = "";
    var table           = "";
    var group_weekdays  = $("#m_weekdays").val();
    var group_weekends  = $("#m_weekends").val();
    var monday          = $("#m_monday").val();
    var tuesday         = $("#m_tuesday").val();
    var wednesday       = $("#m_wednesday").val();
    var thursday        = $("#m_thursday").val();
    var friday          = $("#m_friday").val();
    var saturday        = $("#m_saturday").val();
    var sunday          = $("#m_sunday").val();
    var special_hours   = $("#m_special_hours").val();
    var hours_title     = $("#m_title").val();
    var action_url      = $("#action_url").val();
    group_weekdays      = String(group_weekdays);
    group_weekends      = String(group_weekends);
    special_hours       = String(special_hours);
    table               = buildSuHoursTable(group_weekdays, group_weekends, monday, tuesday, wednesday, thursday, friday, saturday, sunday);
    if (group_weekdays === "True")
    {
        weekday_ck += "<td><input type=radio name='group_weekdays' id='f_group_weekdays_on' value='1' onClick=\"setHourTable();\" checked></td>";
        weekday_ck += "<td><div class='su-hour-label'>On</div></td>";
        weekday_ck += "<td><input type=radio name='group_weekdays' id='f_group_weekdays_off' value='0' onClick=\"setHourTable();\"></td>";
        weekday_ck += "<td><div class='su-hour-label'>Off</div></td>";
    }
    else 
    {
        weekday_ck += "<td><input type=radio name='group_weekdays' id='f_group_weekdays_on' value='1' onClick=\"setHourTable();\"></td>";
        weekday_ck += "<td><div class='su-hour-label'>On</div></td>";
        weekday_ck += "<td><input type=radio name='group_weekdays' id='f_group_weekdays_off' value='0' onClick=\"setHourTable();\" checked></td>";
        weekday_ck += "<td><div class='su-hour-label'>Off</div></td>";
    }
    if (group_weekends === "True")
    {
        weekend_ck += "<td><input type=radio name='group_weekends' id='f_group_weekends_on' value='1' onClick=\"setHourTable();\" checked></td>";
        weekend_ck += "<td><div class='su-hour-label'>On</div></td>";
        weekend_ck += "<td><input type=radio name='group_weekends' id='f_group_weekends_off' value='0' onClick=\"setHourTable();\"></td>";
        weekend_ck += "<td><div class='su-hour-label'>Off</div></td>";
    }
    else
    {
        weekend_ck += "<td><input type=radio name='group_weekends' id='f_group_weekends_on' value='1' onClick=\"setHourTable();\"></td>";
        weekend_ck += "<td><div class='su-hour-label'>On</div></td>";
        weekend_ck += "<td><input type=radio name='group_weekends' id='f_group_weekends_off' value='0' onClick=\"setHourTable();\" checked></td>";
        weekend_ck += "<td><div class='su-hour-label'>Off</div></td>";
    }
    if (special_hours === "True")
    {
        special_ck += "<input type='checkbox' name='k_special_hours' id='k_special_hours' onClick=\"javascript: suSpecial();\" checked>";
        special_ck += "Special Hours";
        special_ck += "</div>";
        special_ck += "<div class='su-mk-input100'><span id='special_su_input' class=''><input type='text' name='k_special_hours_input' id='k_special_hours_input' placeholder='Enter Special Hours Title' value='" + hours_title + "'></span></div>";
    }
    else
    {
        special_ck += "<input type='checkbox' name='k_special_hours' id='k_special_hours' onClick=\"javascript: suSpecial();\">";
        special_ck += "Special Hours";
        special_ck += "</div>";
        special_ck += "<div class='su-mk-input100'><span id='special_su_input' class='hidden'><input type='text' name='special_hours' id='k_special_hours_input' placeholder='Enter Special Hours Title'></span></div>";
    }
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='hours'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='update'>";
    html += "<input type='hidden' name='target_id' id='target_id' value=''>";
    html += "<input type='hidden' name='special_check' id='special_check' value='" + special_hours + "'>";
    html += "<input type='hidden' name='group_weekdays' id='f_group_weekdays' value='" + group_weekdays + "'>";
    html += "<input type='hidden' name='group_weekends' id='f_group_weekends' value='" + group_weekends + "'>";
    html += "<input type='hidden' name='monday' id='f_monday' value='" + monday + "'>";
    html += "<input type='hidden' name='tuesday' id='f_tuesday' value='" + tuesday + "'>";
    html += "<input type='hidden' name='wednesday' id='f_wednesday' value='" + wednesday + "'>";
    html += "<input type='hidden' name='thursday' id='f_thursday' value='" + thursday + "'>";
    html += "<input type='hidden' name='friday' id='f_friday' value='" + friday + "'>";
    html += "<input type='hidden' name='saturday' id='f_saturday' value='" + saturday + "'>";
    html += "<input type='hidden' name='sunday' id='f_sunday' value='" + sunday + "'>";
    html += "<input type='hidden' name='special_hours' id='f_special_hours' value='" + special_hours + "'>";
    html += "<input type='hidden' name='hours_title' id='f_hours_title' value='" + hours_title + "'>";
    html += "<h3><i class='fas fa-clock'></i> &nbspBusiness Hours</h3>";
    html += "<div class='su-hours-container'>";
    html += "<div class='su-table-height'>";
    html += "<table id='su-hours-builder'>";
    html += table;
    html += "</table>";
    html += "</div>";
    html += "<table class='sp-su-hour-top'>";
    html += "<tr>";
    html += "<td class='su-m-h-lab'>Group Weekdays: </td>";
    html += weekday_ck;
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-m-h-lab'>Group Weekends: </td>";
    html += weekend_ck;
    html += "</tr>";
    html += "</table>";
    html += "<div class='super-sp-check'>";
    html += special_ck;
    html += "</div>";
    html += "<div class='su-confirm-buttons2'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('hours');\">Update</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('hours', '1');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function setHourTable()
{
    var group_weekdays  = null;
    var group_weekends  = null;
    var mon             = $("#f_monday").val();
    var tue             = $("#f_tuesday").val();
    var wed             = $("#f_wednesday").val();
    var thu             = $("#f_thursday").val();
    var fri             = $("#f_friday").val();
    var sat             = $("#f_saturday").val();
    var sun             = $("#f_sunday").val();
    if ($("#f_group_weekdays_on").prop("checked") === true) { $("#f_group_weekdays").val("True"); }
    else { $("#f_group_weekdays").val("False"); }
    if ($("#f_group_weekends_on").prop("checked") === true) { $("#f_group_weekends").val("True"); }
    else { $("#f_group_weekends").val("False"); }
    group_weekdays  = $("#f_group_weekdays").val();
    group_weekends  = $("#f_group_weekends").val();
    var table       = buildSuHoursTable(group_weekdays, group_weekends, mon, tue, wed, thu, fri, sat, sun);
    $("#su-hours-builder").html(table);
    setHourSelects();
}

function encodeSuTime(value)
{
    var hours           = {};
    var clean           = "";
    hours['open']       = "";
    hours['open_s']     = "";
    hours['close']      = "";
    hours['close_s']    = "";
    value               = String(value);
    if (value !== "empty")
    {
        for (var i= 0; i < value.length; i++)
        {
            var c = value[i];
            if (c === "a" || c === "p" || c ==="-") { clean += " " + c; }
            else { clean += c; }
        }
        var elements    = clean.split(" ");
        var close       = elements[2];
        var f           = "";
        for (var j = 0; j < close.length; j++)
        {
            var k = close[j];
            if (isInt(k) === true)
            {
                f += k;
            }
        }
        hours['open'] = elements[0];
        hours['open_s'] = elements[1];
        hours['close'] = f;
        hours['close_s'] = elements[3];
    }     
    return hours;
}

function setHoursIndices(hours, day)
{
    var open            = 0;
    var close           = 0;
    var trigger_opn     = "#s_open_" + day;
    var trigger_cls     = "#s_close_" + day; 
    if (hours['open_s'] === "pm") { open = 1; }
    if (hours['close_s'] === "pm") { close = 1; }
    $(trigger_opn).prop("selectedIndex", open);
    $(trigger_cls).prop("selectedIndex", close);
}

function decodeSuTime(trigger)
{
    var a = "#open_" + trigger;
    var b = "#close_" + trigger;
    var c = "#s_open_" + trigger;
    var d = "#s_close_" + trigger;
    var hours = $(a).val() + $(c).val() + " - " + $(b).val() + $(d).val();
    return hours;
}

function setHourSelects()
{
    var group_weekdays  = $("#f_group_weekdays").val();
    var group_weekends  = $("#f_group_weekends").val();
    var monday          = $("#f_monday").val();
    var saturday        = $("#f_saturday").val();
    var indices         = null;
    group_weekdays      = String(group_weekdays);
    group_weekends      = String(group_weekends);
    monday              = encodeSuTime(monday);
    saturday            = encodeSuTime(saturday);
    setHoursIndices(monday, 'mon');
    setHoursIndices(saturday, 'sat');
    if (group_weekdays === "False")
    {
        var tuesday     = $("#f_tuesday").val();
        var wednesday   = $("#f_wednesday").val();
        var thursday    = $("#f_thursday").val();
        var friday      = $("#f_friday").val();
    }
    if (group_weekends === "False")
    {
        var sunday  = $("#f_sunday").val();
        sunday      = encodeSuTime(sunday);
        setHoursIndices(sunday, 'sun');
    }
}

function buildPermissionEditor(mode, index)
{
    var html    = "";
    var button  = null;
    var header  = null;
    var action  = null;
    var m_id    = "";
    var fname   = "";
    var lname   = "";
    var admin   = "False";
    var product = "False";
    var image   = "False";
    var about   = "False";
    var lock    = "False";
    var blog    = "False";
    var email   = "";
    var s_user  = "False";
    var action_url = $("#action_url").val();
    mode        = Number(mode);
    index       = String(index);

    if (mode === 0)
    {
        action = "0";
        header = "New User";
        button = "Save";
    }
    else if (mode === 1)
    {
        action  = "1";
        header  = "Update User Permissions;"
        button  = "Update";
        m_id    = $("#u_id_" + index).val();
        fname   = $("#m_fname_" + index).val();
        lname   = $("#m_lname_" + index).val();
        email   = $("#m_email_" + index).val();
        admin   = $("#m_admin_" + index).val();
        blog    = $("#m_blog_" + index).val();
        product = $("#m_product_" + index).val();
        image   = $("#m_image_" + index).val();
        about   = $("#m_about_" + index).val();
        lock    = $("#m_lock_" + index).val();
        s_user  = $("#m_super_" + index).val();
        m_id    = String(m_id);
        fname   = String(fname);
        lname   = String(lname);
        email   = String(email);
        admin   = String(admin);
        blog    = String(blog);
        product = String(product);
        image   = String(image);
        about   = String(about);
        lock    = String(lock);
        s_user  = String(s_user);
    }
    html += "<div class='su-center su-width35'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='permission'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='target_id' value='" + m_id + "'>";
    html += "<input type='hidden' name='is_admin' id='d_is_admin' value='" + admin + "'>";
    html += "<input type='hidden' name='product_permission' id='d_product_permission' value='" + product + "'>";
    html += "<input type='hidden' name='about_permission' id='d_about_permission' value='" + about + "'>";
    html += "<input type='hidden' name='blog_permission' id='d_blog_permission' value='" + blog + "'>";
    html += "<input type='hidden' name='gallery_permission' id='d_gallery_permission' value='" + image + "'>";
    html += "<input type='hidden' name='is_locked' id='d_is_locked' value='" + lock + "'>";
    html += "<input type='hidden' name='is_super' id='d_is_super' value='" + s_user + "'>";
    html += "<input type='hidden' name='is_new_user' id='is_new_user' value='" + mode + "'>";
    html += "<h3><i class='fas fa-user-cog'></i> " + header + "</h3>";
    if(mode === 0)
    {
        html += "<div class='su-user-details'>";
        html += "<input type='text' name='f_fname' id='f_fname' placeholder='Enter user first name'>";
        html += "<input type='text' name='f_lname' id='f_lname' placeholder='Enter user last name'>";
        html += "</div>";
        html += "<input type='text' name='email1' id='email1' placeholder='Enter user email'>";
        html += "<input type='text' name='email2' id='email2' placeholder='Confirm user email'>";
    }
    else
    {
        html += "<div class='su-user-details'>";
        html += "<h4>" + fname + " " + lname + "</h4>";
        html += "<span>" + email + "</span>";
        html += "</div>";
    }
    html += "<div class='su-checkbox-editor'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (product === "True")
    {
        html += "<td><input type='checkbox' id='f_products' onClick=\"javascript: suCheckbox('#f_products', '#d_product_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_products' onClick=\"javascript: suCheckbox('#f_products', '#d_product_permission');\"></td>";
    }
    html += "<td>Products</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (blog === "True")
    {
        html += "<td><input type='checkbox' id='f_blogs' onClick=\"javascript: suCheckbox('#f_blogs', '#d_blog_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_blogs' onClick=\"javascript: suCheckbox('#f_blogs', '#d_blog_permission');\"></td>";
    }
    
    html += "<td>Blogs</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (image === "True")
    {
        html += "<td><input type='checkbox' id='f_images' onClick=\"javascript: suCheckbox('#f_images', '#d_gallery_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_images' onClick=\"javascript: suCheckbox('#f_images', '#d_gallery_permission');\"></td>";
    }
    
    html += "<td>Images</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (about === "True")
    {
        html += "<td><input type='checkbox' id='f_statements' onClick=\"javascript: suCheckbox('#f_statements', '#d_about_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_statements' onClick=\"javascript: suCheckbox('#f_statements', '#d_about_permission');\"></td>";
    }
    
    html += "<td>About Statements</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (admin === "True")
    {
        html += "<td><input type='checkbox' id='f_admin' onClick=\"javascript: suCheckbox('#f_admin', '#d_is_admin');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_admin' onClick=\"javascript: suCheckbox('#f_admin', '#d_is_admin');\"></td>";
    }
    
    html += "<td>Administration</td>";
    html += " </tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (lock === "True")
    {
        html += "<td><input type='checkbox' id='f_lock' onClick=\"javascript: suCheckbox('#f_lock', '#d_is_locked');\" checked disabled></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_lock' onClick=\"javascript: suCheckbox('#f_lock', '#d_is_locked');\"></td>";
    }
    
    html += "<td>Locked</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (s_user === "True")
    {
        html += "<td><input type='checkbox' id='f_super' onClick=\"javascript: suCheckbox('#f_super', '#d_is_super');\" checked disabled></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_super' onClick=\"javascript: suCheckbox('#f_super', '#d_is_super');\"></td>";
    }
    
    html += "<td>Super User</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('permission');\">Save</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('permission', '" + mode + "', '" + index + "');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildAuthEditor(mode, index)
{
    var html    = "";
    var button  = null;
    var header  = null;
    var action  = null;
    var m_id    = "";
    var name    = "";
    var email   = "";
    var admin   = "False";
    var product = "False";
    var image   = "False";
    var about   = "False";
    var lock    = "False";
    var blog    = "False";
    var s_user  = "False";
    var action_url = $("#action_url").val();
    mode        = Number(mode);
    index       = String(index);

    if (mode === 0)
    {
        action = "0";
        header = "User Authorization";
        button = "Save";
    }
    else if (mode === 1)
    {
        action  = "1";
        header  = "Authorization Editor"
        button  = "Update";
        m_id    = $("#u_id_" + index).val();
        name    = $("#m_name_" + index).val();
        email   = $("#m_email_" + index).val();
        admin   = $("#m_admin_" + index).val();
        blog    = $("#m_blog_" + index).val();
        product = $("#m_product_" + index).val();
        image   = $("#m_image_" + index).val();
        about   = $("#m_about_" + index).val();
        lock    = $("#m_lock_" + index).val();
        s_user  = $("#m_super_" + index).val();
        m_id    = String(m_id);
        name    = String(name);
        email   = String(email);
        admin   = String(admin);
        blog    = String(blog);
        product = String(product);
        image   = String(image);
        about   = String(about);
        lock    = String(lock);
        s_user  = String(s_user);
    }
    html += "<div class='su-center su-width35'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='auth'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='target_id' value='" + m_id + "'>";
    html += "<input type='hidden' name='is_admin' id='d_is_admin' value='" + admin + "'>";
    html += "<input type='hidden' name='product_permission' id='d_product_permission' value='" + product + "'>";
    html += "<input type='hidden' name='about_permission' id='d_about_permission' value='" + about + "'>";
    html += "<input type='hidden' name='blog_permission' id='d_blog_permission' value='" + blog + "'>";
    html += "<input type='hidden' name='gallery_permission' id='d_gallery_permission' value='" + image + "'>";
    html += "<input type='hidden' name='is_locked' id='d_is_locked' value='" + lock + "'>";
    html += "<input type='hidden' name='is_super' id='d_is_super' value='" + s_user + "'>";
    html += "<input type='hidden' name='is_new_user' id='is_new_user' value='" + mode + "'>";
    html += "<h3><i class='fas fa-user-plus''></i> " + header + "</h3>";
    if(mode === 0)
    {
        html += "<div class='container'><div class='row'>";
        html += "<div class='col-sm-6' style='padding: 0; margin:0;'>";
        html += "<input type='text' name='f_fname' id='f_fname' placeholder='User First Name'>";
        html += "</div>";
        html += "<div class='col-sm-6' style='padding: 0; margin:0;'>";
        html += "<input type='text' name='f_lname' id='f_lname' placeholder='User Last Name'>";
        html += "</div>";
        html += "</div></div>";
        html += "<input type='text' name='email1' id='email1' placeholder='Enter user email'>";
        html += "<input type='text' name='email2' id='email2' placeholder='Confirm user email'>";
    }
    else
    {
        html += "<div class='su-user-details'>";
        html += "<h4>" + name + "</h4>";
        html += "<span>" + email + "</span>";
        html += "<div class='su-topper' onClick=\"javascript: suSendNewAuth('" + m_id + "');\"><button>Send New Authorization Code</button></div>";
        html += "</div>";
    }
    html += "<div class='su-checkbox-editor'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (product === "True")
    {
        html += "<td><input type='checkbox' id='f_products' onClick=\"javascript: suCheckbox('#f_products', '#d_product_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_products' onClick=\"javascript: suCheckbox('#f_products', '#d_product_permission');\"></td>";
    }
    html += "<td>Products</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (blog === "True")
    {
        html += "<td><input type='checkbox' id='f_blogs' onClick=\"javascript: suCheckbox('#f_blogs', '#d_blog_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_blogs' onClick=\"javascript: suCheckbox('#f_blogs', '#d_blog_permission');\"></td>";
    }
    
    html += "<td>Blogs</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (image === "True")
    {
        html += "<td><input type='checkbox' id='f_images' onClick=\"javascript: suCheckbox('#f_images', '#d_gallery_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_images' onClick=\"javascript: suCheckbox('#f_images', '#d_gallery_permission');\"></td>";
    }
    
    html += "<td>Images</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (about === "True")
    {
        html += "<td><input type='checkbox' id='f_statements' onClick=\"javascript: suCheckbox('#f_statements', '#d_about_permission');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_statements' onClick=\"javascript: suCheckbox('#f_statements', '#d_about_permission');\"></td>";
    }
    
    html += "<td>About Statements</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (admin === "True")
    {
        html += "<td><input type='checkbox' id='f_admin' onClick=\"javascript: suCheckbox('#f_admin', '#d_is_admin');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_admin' onClick=\"javascript: suCheckbox('#f_admin', '#d_is_admin');\"></td>";
    }
    
    html += "<td>Administration</td>";
    html += " </tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (lock === "True")
    {
        html += "<td><input type='checkbox' id='f_lock' onClick=\"javascript: suCheckbox('#f_lock', '#d_is_locked');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_lock' onClick=\"javascript: suCheckbox('#f_lock', '#d_is_locked');\"></td>";
    }
    
    html += "<td>Locked</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-md-4' style='padding:0; margin:0;'>";
    html += "<table>";
    html += "<tr>";
    if (s_user === "True")
    {
        html += "<td><input type='checkbox' id='f_super' onClick=\"javascript: suCheckbox('#f_super', '#d_is_super');\" checked></td>";
    }
    else
    {
        html += "<td><input type='checkbox' id='f_super' onClick=\"javascript: suCheckbox('#f_super', '#d_is_super');\"></td>";
    }
    
    html += "<td>Super User</td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('auth');\">Save</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('auth', '" + mode + "', '" + index + "');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildSecurityEditor(mode, index)
{
    var html        = "";
    var button      = null;
    var header      = null;
    var action      = null;
    var question    = "";
    var m_id        = "";
    var action_url = $("#action_url").val();
    mode        = Number(mode);
    index       = String(index);
    if (mode === 0)
    {
        action = "0";
        header = "New Security Question";
        button = "Save";
    }
    else if (mode === 1)
    {
        action          = "1";
        header          = "User Security";
        button          = "Update";
        question        = $("#m_question_" + index).val();
        m_id            = $("#u_id_" + index).val();
    }

    html += "<div class='su-center su-width50'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='security'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='target_id' value='" + m_id + "'>";
    html += "<h3><i class='fas fa-user-lock'></i> " + header+ "</h3>";
    html += "<input type='text' name='question' id='question' placeholder='Type security question here...' value='" + question + "'>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('security');\">" + button + "</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('security', '" + mode + "', '" + index + "');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildImageEditor()
{
    var html = "";
    var action_url = $("#action_url").val();
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' enctype='multipart/form-data' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='image'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='0'>";
    html += "<h3><i class='fas fa-camera'></i> Upload New Image</h3>";
    html += "<input type='file' name='img_filename' id='img_filename' accept='.png, .jpg, .jpeg, .gif'>";
    html += "<div class='su-sub-top'></div>";
    html += "<div class='su-error-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('image');\">Upload</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('image', 'model', 'index');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildBlogEditor(mode, index)
{
    var html    = "";
    var button  = null;
    var header  = null;
    var action  = null;
    var subject = "";
    var content = "";
    var m_id    = "";
    var action_url = $("#action_url").val();
    mode        = Number(mode);
    index       = String(index);
    if (mode === 0)
    {
        action = "0";
        header = "New Blog Post";
        button = "Save";
    }
    else if (mode === 1)
    {
        action          = "1";
        header          = "Blog Editor";
        button          = "Update";
        subject         = $("#m_subject_" + index).val();
        content         = $("#m_content_" + index).val();
        m_id            = $("#m_id_" + index).val();
    }

    html += "<div class='su-center su-width45'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='blog'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='target_id' value='" + m_id + "'>";
    html += "<h3><i class='fab fa-blogger'></i> <span id='su-pop-header'>" + header + "</span></h3>";
    html += "<input type='text' name='subject' id='subject' placeholder='Subject' value='" + subject + "'>";
    html += "<div class='su-textarea-lg'>";
    html += "<textarea name='content' id='content' placeholder='Blog Body'>" + content + "</textarea>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('blog');\">" + button + "</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('blog', '" + String(mode) + "', '" + index + "');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildProductEditor(mode, index)
{
    var html        = "";
    var button      = null;
    var header      = null;
    var action      = null;
    var varies      = "False";
    var name        = "";
    var description = "";
    var price       = "0";
    var m_id        = "";
    var v_check     = "<input type='checkbox' id='vary_box' onClick=\"javascript: suCheckbox('#vary_box', '#f_varies');\">";
    var action_url = $("#action_url").val();
    mode            = Number(mode);
    index           = String(index);
    if (mode === 0)
    {
        action = "0";
        header = "New Product";
        button = "Save";
    }
    else if (mode === 1)
    {
        action      = "1";
        header      = "Product Editor";
        button      = "Update";
        name        = $("#m_name_" + index).val();
        description = $("#m_description_" + index).val();
        price       = $("#m_price_" + index).val();
        m_id        = $("#m_id_" + index).val();
        m_varies    = $("#m_varies_" + index).val();

        if (m_varies === "True")
        {
            varies = "True";
            v_check = "<input type='checkbox' id='vary_box' onClick=\"javascript: suCheckbox('#vary_box', '#f_varies');\" checked>";
        }
    }
    html += "<div class='su-center su-width35'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='product'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='target_id' value='" + m_id + "'>";
    html += "<input type='hidden' name='f_varies' id='f_varies' value='" + varies + "'>";
    html += "<h3><i class='fas fa-spray-can'></i> <span id='su-pop-header'>" + header + "</span></h3>";
    html += "<input type='text' name='name' id='name' placeholder='Product' value='" + name + "'>";
    html += "<div class='su-textarea-sm'>";
    html += "<textarea name='description' id='description' placeholder='Product Description'>" + description + "</textarea>";
    html += "</div>";
    html += "<div class='su-number-input'>";
    html += "Price:  <input type='number' name='price' id='price' value='" + price + "' max='9999' min='0' oninput=\"javascript: inputInteger('4', '#price');\">";
    html += "</div>";
    html += "<div class='vary_style'>";
    html += v_check;
    html += "<div class='vary_p'>Price Varies</div>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('product');\">" + button + "</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('product', '" + mode + "', '" + index + "');\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";

    return html;
}

function buildMaxEditor()
{
    var html = "";
    var max_images = $("#m_max_images").val();
    var no_uploads = $("#m_num_uploads").val();
    var action_url = $("#action_url").val();

    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='max_images'>";
    html += "<input type='hidden' name='target_action' id='target_action' value='update'>";
    html += "<input type='hidden' name='target_id' id='target_id' value=''>";
    html += "<h3><i class='fas fa-file-image'></i> Uploads</h3>";
    html += "<div class='su-ul-item'>Current no. of uploads: <span>" + no_uploads + "</span></div>";
    html += "<div class='su-ul-item'>Maximum no. of uploads: <input type='number' name='max_images' id='f_max_images' min='0' max='99' value='" + max_images + "' oninput=\"inputInteger(2, '#f_max_images');\"></div>";
    html += "<div class='su-general-btns su-txt-left'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('max_images');\">Update</button>";
    html += "<button type='button' onClick=\"javascript: checkPopulatedFields('max_images');\">Cancel</button>";
    html += "<div class='su-sp-top'></div>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";

    return html;
}

function buildAboutEditor(data)
{
    var html        = "";
    var active      = null;
    var a_index     = 0;
    var i           = 0;
    var a_id        = null;
    var inactive    = [];
    var list_size   = 0;
    var index       = null;
    var statement   = null;
    for(i = 0; i < data.length; i++)
    {
        if (String(data[i]['is_active']) === "False")
        {
            inactive.push(data[i]);
        }
        else
        {
            active = data[i]
        }
    }

    list_size = inactive.length;
    html += "<div class='su-center su-width38'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<input type='hidden' name='no_inactive' id='no_inactive' value='" + list_size + "'>";
    html += "<input type='hidden' name='current_id' id='current_id' value='" + active['id'] + "'>";
    html += "<input type='hidden' name='current_statement' id='current_statement' value='" + active['statement'] + "'>";
    html += "<input type='hidden' id='abt_selected' value='0'>";
    html += "<h3><i class='fas fa-id-card'></i> &nbspAbout Us</h3>";
    html += "<div class='su-about-head'>Current Statement &nbsp<i class='fas fa-check-circle'></i><button type='button' onClick=\"javascript: showAboutEditors('1');\">Edit</button> <button type='button' onClick=\"javascript: showAboutEditors('0');\">New</button></div>";
    html += "<div class='su-about1'>The statement below is currently being displayed on the live Natural Woman Salon site.</div>";
    html += "<div class='su-about2'>" + active['statement'] + "</div>";
    html += "<div class='su-about-head'>Archived Statements &nbsp<i class='fas fa-archive'></i></div>";
    html += "<div class='su-about1'>The statements below can be activated as the current statement at any time.</div>";
    html += "<div class='su-about-list-top'>";
    html += "<button type='button' onClick=\"javascript: selectAllAbouts();\">Select All</button>";
    html += "<button type='button' onClick=\"javascript: clearAllAbouts();\">Clear All</button>";
    html += "</div>";
    html += "<div class='su-about3'>";
    html += "<ul>";
    for (i = 0; i < list_size; i++)
    {
        index       = String(i);
        statement   = String(inactive[i]['statement']);
        a_id        = String(inactive[i]['id']);
        html += "<div id='div_a" + index + "' class='" + inactive[i]['class'] + "'>";
        html += "<li>";
        html += "<a href=\"javascript: showAboutEditor2('" + index + "');\">";
        html += "<input type='hidden' id='a_id" + index + "' value='" + a_id + "'>";
        html += "<input type='hidden' id='a_statement_" + index + "' value='" + statement + "'>";
        html += "<table>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"javascript: selectAboutItem('" + index + "');\" id='ab_box_" + index + "'></td>";
        html += "<td class='su-about-list'>" + statement + "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</a>";
        html += "</li>";
        html += "</div>";
    }
    html += "</ul>";
    html += "</div>";
    html += "<div class='su-about-list-buttons'>";
    html += "<button type='button' onClick=\"javascript: showAboutEditors('2');\">Update</button>";
    html += "<span id='su-abtDel-cont'><button onClick=\"javascript: launchDeleteConfirmation('about')\" id='su-delAboutBtn'>Delete Selected</button></span>";
    html += "</div>";
    html += "<div class='su-about-exit'><button type='button' onClick=\"javascript: closeEditor();\">Exit</button></div>";
    html += "</div>";
    html += "</div>";
    $("#pop-up-builder").html(html);
    $("#pop-up-builder").hide();
    $("#pop-up-builder").removeClass('hidden');
    $("#pop-up-builder").fadeIn(600);
}

function showAboutEditors(mode)
{
    var html        = "";
    var action      = null;
    var header      = null;
    var button      = null;
    var checkb      = null;
    var active      = null;
    var m_id        = "";
    var statement   = "";
    var open        = true;
    var url         = $("#action_url").val();
    mode            = Number(mode);
    if (mode === 0)
    {
        action = "new";
        header = "New About Us Statement";
        button = "Save";
        checkb = "<input type='checkbox' id='f_active_cb' onClick=\"javascript: suCheckbox('#f_active_cb', '#f_is_active')\">";
        active = "<input type='hidden' name='is_active' id='f_is_active' value='False'>";
    }
    else if (mode === 1)
    {
        m_id        = $("#current_id").val();
        statement   = $("#current_statement").val();
        action      = "update";
        header      = "Update Current About Us Statement";
        button      = "Update";
        checkb      = "<input type='checkbox' id='f_active_cb' onClick=\"javascript: suCheckbox('#f_active_cb', '#f_is_active')\" checked disabled>";
        active      = "<input type='hidden' name='is_active' id='f_is_active' value='True'>";
        $("#selected-payment").val("~");
    }
    else if (mode === 2)
    {
        var indices         = $("#selected-payment").val();
        indices             = String(indices);
        var abt_selected    = $("#abt_selected").val();
        abt_selected        = Number(abt_selected);
        if (abt_selected === 0)
        {
            open = false;
            var m = [];
            m.push("Nothing Selected");
            m.push("You must make a selection from the inactive list to proceed");
            generateErrorWindow(m);
        }
        else if (indices.length > 1)
        {
            var no_inactive = $("#no_inactive").val();
            var located_sel = 0;
            var choose_i    = null;
            no_inactive = Number(no_inactive);
            for (var j = 0; j < no_inactive; j++)
            {
                if ($("#ab_box_" + j).prop("checked") === true)
                {
                    located_sel += 1;
                    if (located_sel === 2)
                    {
                        break;
                    }
                    else
                    {
                        choose_i = j;
                    }
                }
            }
            if (located_sel > 1)
            {
                open = false;
                var m = [];
                m.push("Action Prohibited");
                m.push("You can only select one statement to update");
                generateErrorWindow(m);
            }
            else
            {
                m_id        = $("#a_id" + choose_i).val();
                statement   = $("#a_statement_" + choose_i).val();
                action      = "update";
                header      = "Update Inactive About Us Statements";
                button      = "Update";
                checkb      = "<input type='checkbox' id='f_active_cb' onClick=\"javascript: suCheckbox('#f_active_cb', '#f_is_active')\">";
                active      = "<input type='hidden' name='is_active' id='f_is_active' value='False'>";
            }   
        }
        else
        {
            var decoded     = decodeDeleteIndices(indices);
            m_id            = $("#a_id" + decoded).val();
            statement       = $("#a_statement_" + decoded).val();
            action          = "update";
            header          = "Update Inactive About Us Statements";
            button          = "Update";
            checkb          = "<input type='checkbox' id='f_active_cb' onClick=\"javascript: suCheckbox('#f_active_cb', '#f_is_active')\">";
            active          = "<input type='hidden' name='is_active' id='f_is_active' value='False'>";
        }
            
    }

    html += "<div class='su-center su-width45'>";
    html += "<div class='su-general'>";
    html += "<form action='" + url + "' method='POST' id='about_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='about'>";
    html += "<input type='hidden' name='target_action' id='about_target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='about_target_id' value='" + m_id + "'>";
    html += active;
    html += "<div class='su-confirm-exit2 raise-closer'><i class='fas fa-window-close' onClick=\"javascript: closeAboutError();\"></i></div>";
    html += " <h3><i class='fas fa-id-card'></i> &nbsp<span id='master-abt-header'>" + header + "</span></h3>";
    html += "<div class='su-textarea-md'><textarea name='statement' id='f_about_area' placeholder='Enter About Us Statement Here...'>" + statement + "</textarea></div>";
    html += "<div class='set-active-ck'>";
    html += checkb;
    html += "Set As Active";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<span id='abtDelBtn'><button type='button' id='su-abt-btn-option' onClick=\"javascript: validatingAboutFields()\">" + button + "</button></span>";
    html += "<button type='button' onClick=\"javascript: checkAboutFields();\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";

    if (open === true)
    {
        $("#about-editor-builder").html(html);
        $("#about-editor-builder").hide();
        $("#about-editor-builder").removeClass('hidden');
        $("#about-editor-builder").fadeIn(600);
    }
}

function submitAbout()
{
    $("#about_form").submit();
}

function showAboutEditor2(index)
{
    index           = String(index);
    var m_id        = $("#a_id" + index).val(); 
    var statement   = $("#a_statement_" + index).val();
    var html        = "";
    var action      = "update";
    var header      = "Update Inactive About Us Statements";
    var button      = "Update";
    var checkb      = "<input type='checkbox' id='f_active_cb' onClick=\"javascript: suCheckbox('#f_active_cb', '#f_is_active')\">";
    var active      = "<input type='hidden' name='is_active' id='f_is_active' value='False'>";
    var url         = $("#action_url").val();
    $("#selected-payment").val("~" + index + "~");

    html += "<div class='su-center su-width45'>";
    html += "<div class='su-general'>";
    html += "<form action='" + url + "' method='POST' id='about_form'>";
    html += "<input type='hidden' name='target_model' id='target_model' value='about'>";
    html += "<input type='hidden' name='target_action' id='about_target_action' value='" + action + "'>";
    html += "<input type='hidden' name='target_id' id='about_target_id' value='" + m_id + "'>";
    html += active;
    html += "<div class='su-confirm-exit2 raise-closer'><i class='fas fa-window-close' onClick=\"javascript: closeAboutError();\"></i></div>";
    html += " <h3><i class='fas fa-id-card'></i> &nbsp<span id='master-abt-header'>" + header + "</span></h3>";
    html += "<div class='su-textarea-md'><textarea name='statement' id='f_about_area' placeholder='Enter About Us Statement Here...'>" + statement + "</textarea></div>";
    html += "<div class='set-active-ck'>";
    html += checkb;
    html += "Set As Active";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<span id='abtDelBtn'><button type='button' id='su-abt-btn-option' onClick=\"javascript: validatingAboutFields()\">" + button + "</button></span>";
    html += "<button type='button' onClick=\"javascript: checkAboutFields();\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";


    $("#about-editor-builder").html(html);
    $("#about-editor-builder").hide();
    $("#about-editor-builder").removeClass('hidden');
    $("#about-editor-builder").fadeIn(600);
}

function selectAllAbouts()
{
    var len = $("#no_inactive").val();
    len     = Number(len);
    for (var i = 0; i < len; i++)
    {
        index = String(i);
        $("#ab_box_" + index).prop("checked", true);
        selectAboutItem(index);
    }
}

function clearAllAbouts()
{
    var len = $("#no_inactive").val();
    len     = Number(len);
    for (var i = 0; i < len; i++)
    {
        index = String(i);
        $("#ab_box_" + index).prop("checked", false);
        selectAboutItem(index);
    }
}

function load_pmt_radio_data(m_class)
{
    m_class = String(m_class);
    $("#m_payment_icon").val(m_class);
}

function buildPaymentEditor()
{
    $("#pmt_target_action").val("new");
    var html = "";
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeEditor();\"></i></div>";
    html += "<h3><i class='fas fa-money-bill-alt'></i> &nbspNew Payment Method</h3>";
    html += "<input type='text' id='f_payment_method' placeholder='Enter Payment Method Name' oninput=\"javascript: mirrorInput('#f_payment_method', '#m_payment_method');\">";
    html += "<div class='su-payment-types'>";
    html += "<div class='container'>";
    html += "<div class='row'>";
    html += "<div class='col-sm-12 sel-pmt-msg' style='padding:0; margin: 0;'>Select an icon from the list below</div>";
    html += "<div class='col-sm-4' style='padding:0; margin: 0;'>";
    html += "<table>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-apple-pay' onClick=\"javascript: load_pmt_radio_data('fab fa-apple-pay');\"></td>";
    html += "<td class='su-sp-icon''><i class='fab fa-apple-pay'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-cc-amazon-pay' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-amazon-pay');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-amazon-pay'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-bitcoin' onClick=\"javascript: load_pmt_radio_data('fab fa-bitcoin');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-bitcoin'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fas fa-money-check' onClick=\"javascript: load_pmt_radio_data('fas fa-money-check');\"></td>";
    html += "<td class='su-sp-icon'><i class='fas fa-money-check'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='radio' name='pmt_icon' value='fas fa-shopping-bag' onClick=\"javascript: load_pmt_radio_data('fas fa-shopping-bag');\"></td>";
    html += "<td><i class='fas fa-shopping-bag'></i></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin: 0;'>";
    html += "<table>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-cc-discover' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-discover');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-discover'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-paypal' onClick=\"javascript: load_pmt_radio_data('fab fa-paypal');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-paypal'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='far fa-credit-card' onClick=\"javascript: load_pmt_radio_data('far fa-credit-card');\"></td>";
    html += "<td class='su-sp-icon'><i class='far fa-credit-card'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fas fa-dollar-sign' onClick=\"javascript: load_pmt_radio_data('fas fa-dollar-sign');\"></td>";
    html += "<td class='su-sp-icon'><i class='fas fa-dollar-sign'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='radio' name='pmt_icon' value='fas fa-shopping-cart' onClick=\"javascript: load_pmt_radio_data('fas fa-shopping-cart');\"></td>";
    html += "<td><i class='fas fa-shopping-cart'></i></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "<div class='col-sm-4' style='padding:0; margin: 0;'>";
    html += "<table>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-cc-diners-club' onClick=\"javascript: load_pmt_radio_data('fab fa-cc-diners-club');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-cc-diners-club'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fab fa-google-wallet' onClick=\"javascript: load_pmt_radio_data('fab fa-google-wallet');\"></td>";
    html += "<td class='su-sp-icon'><i class='fab fa-google-wallet'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td class='su-sp-icon'><input type='radio' name='pmt_icon' value='fas fa-money-bill' onClick=\"javascript: load_pmt_radio_data('fas fa-money-bill');\"></td>";
    html += "<td class='su-sp-icon'><i class='fas fa-money-bill'></i></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><input type='radio' name='pmt_icon' value='fas fa-gift' onClick=\"javascript: load_pmt_radio_data('fas fa-gift');\"></td>";
    html += "<td><i class='fas fa-gift'></i></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='su-general-btns'>";
    html += "<button onClick=\"javascript: validatingPaymentFields();\">Submit</button>";
    html += "<button onClick=\"javascript: checkPaymentFields();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    return html;
}

function submitEditor()
{
    $("#pop_form").submit();
}

function submitDelete()
{
    $("#pop_delete_form").submit();
}

function validateSUModel(model)
{
    model = String(model);
    if (model === 'blog') { validateSuBlog(); }
    else if (model === 'product') { validateSubProduct(); }
    else if (model === 'image') { validateSubImage(); }
    else if (model === 'security') { validateSubSecurity(); }
    else if (model === 'permission') { validateSubPermissions(); }
    else if (model === 'auth') { validateSubAuth(); }
    else if (model === 'address') { validatingSubAddress(); }
    else if (model === 'phone') { validatingSubPhone(); }
    else if (model === 'email') { validatingSubEmail(); }
    else if (model === 'max_images') { validatingSubMax(); }
    else if (model === 'facebook' || model === 'twitter' || model === 'instagram') { validatingSubMedia(model); }
    else if (model === 'hours') { validateHoursFields(); }
    else if (model === 'about') { validatingAboutFields(); }
    else if (model === 'payments') { validatingPaymentFields(); }
    else if (model === 'change_name') { validatingChangeName(); }
    else if (model === 'change_email') { validatingChangeEmail(); }
    else if (model === 'change_password') { validatingChangePassword(); }
}

function validateHoursFields()
{
    var proceed     = false;
    var messages    = [];
    var weekdays    = $("#f_group_weekdays").val();
    var weekends    = $("#f_group_weekends").val();
    var isSpecial   = $("#special_check").val();
    var mon_open    = $("#open_mon").val();
    var mon_clos    = $("#close_mon").val();
    var sat_open    = $("#open_sat").val();
    var sat_clos    = $("#close_sat").val();
    weekdays        = String(weekdays);
    weekends        = String(weekends);
    isSpecial       = String(isSpecial);
    mon_open        = String(mon_open);
    mon_clos        = String(mon_clos);
    sat_open        = String(sat_open);
    sat_clos        = String(sat_clos);
    if (weekdays === "True" && weekends === "True" && isSpecial === "False")
    {
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekdays");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekdays");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekends");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekends");
        }
        else { proceed = true; }
    }
    else if (weekdays === "True" && weekends === "False" && isSpecial === "False")
    {
        var sun_open = $("#open_sun").val();
        var sun_clos = $("#close_sun").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekdays");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekdays");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Saturday");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Saturday");
        }
        else if(String(sun_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Sunday");
        }
        else if(String(sun_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Sunday");
        }
        else { proceed = true; }
    }
    else if (weekdays === "False" && weekends === "True" && isSpecial === "False")
    {
        var tue_open = $("#open_tue").val();
        var tue_clos = $("#close_tue").val();
        var wed_open = $("#open_wed").val();
        var wed_clos = $("#close_wed").val();
        var thu_open = $("#open_thu").val();
        var thu_clos = $("#close_thu").val();
        var fri_open = $("#open_fri").val();
        var fri_clos = $("#close_fri").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Monday");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Monday");
        }
        else if(tue_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Tuesday");
        }
        else if(tue_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Tuesday");
        }
        else if(String(wed_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Wednesday");
        }
        else if(String(wed_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Wednesday");
        }
        else if(String(thu_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Thursday");
        }
        else if(String(thu_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Thursday");
        }
        else if(String(fri_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Friday");
        }
        else if(String(fri_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Friday");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekends");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekends");
        }
        else { proceed = true; }
    }
    else if (weekdays === "False" && weekends === "False" && isSpecial === "False")
    {
        var tue_open = $("#open_tue").val();
        var tue_clos = $("#close_tue").val();
        var wed_open = $("#open_wed").val();
        var wed_clos = $("#close_wed").val();
        var thu_open = $("#open_thu").val();
        var thu_clos = $("#close_thu").val();
        var fri_open = $("#open_fri").val();
        var fri_clos = $("#close_fri").val();
        var sun_open = $("#open_sun").val();
        var sun_clos = $("#close_sun").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Monday");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Monday");
        }
        else if(tue_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Tuesday");
        }
        else if(tue_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Tuesday");
        }
        else if(String(wed_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Wednesday");
        }
        else if(String(wed_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Wednesday");
        }
        else if(String(thu_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Thursday");
        }
        else if(String(thu_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Thursday");
        }
        else if(String(fri_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Friday");
        }
        else if(String(fri_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Friday");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Saturday");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Saturday");
        }
        else if(String(sun_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Sunday");
        }
        else if(String(sun_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Sunday");
        }
        else { proceed = true; }
    }
    if (weekdays === "True" && weekends === "True" && isSpecial === "True")
    {
        var title = $("#k_special_hours_input").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekdays");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekdays");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekends");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekends");
        }
        else if (String(title).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a special hours title to proceed");
        }
        else { proceed = true; }
    }
    else if (weekdays === "True" && weekends === "False" && isSpecial === "True")
    {
        var sun_open = $("#open_sun").val();
        var sun_clos = $("#close_sun").val();
        var title = $("#k_special_hours_input").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekdays");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekdays");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Saturday");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Saturday");
        }
        else if(String(sun_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Sunday");
        }
        else if(String(sun_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Sunday");
        }
        else if (String(title).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a special hours title to proceed");
        }
        else { proceed = true; }
    }
    else if (weekdays === "False" && weekends === "True" && isSpecial === "True")
    {
        var tue_open = $("#open_tue").val();
        var tue_clos = $("#close_tue").val();
        var wed_open = $("#open_wed").val();
        var wed_clos = $("#close_wed").val();
        var thu_open = $("#open_thu").val();
        var thu_clos = $("#close_thu").val();
        var fri_open = $("#open_fri").val();
        var fri_clos = $("#close_fri").val();
        var title    = $("#k_special_hours_input").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Monday");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Monday");
        }
        else if(tue_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Tuesday");
        }
        else if(tue_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Tuesday");
        }
        else if(String(wed_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Wednesday");
        }
        else if(String(wed_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Wednesday");
        }
        else if(String(thu_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Thursday");
        }
        else if(String(thu_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Thursday");
        }
        else if(String(fri_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Friday");
        }
        else if(String(fri_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Friday");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Weekends");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Weekends");
        }
        else if (String(title).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a special hours title to proceed");
        }
        else { proceed = true; }
    }
    else if (weekdays === "False" && weekends === "False" && isSpecial === "True")
    {
        var tue_open = $("#open_tue").val();
        var tue_clos = $("#close_tue").val();
        var wed_open = $("#open_wed").val();
        var wed_clos = $("#close_wed").val();
        var thu_open = $("#open_thu").val();
        var thu_clos = $("#close_thu").val();
        var fri_open = $("#open_fri").val();
        var fri_clos = $("#close_fri").val();
        var sun_open = $("#open_sun").val();
        var sun_clos = $("#close_sun").val();
        var title    = $("#k_special_hours_input").val();
        if(mon_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Monday");
        }
        else if(mon_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Monday");
        }
        else if(tue_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Tuesday");
        }
        else if(tue_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Tuesday");
        }
        else if(String(wed_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Wednesday");
        }
        else if(String(wed_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Wednesday");
        }
        else if(String(thu_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Thursday");
        }
        else if(String(thu_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Thursday");
        }
        else if(String(fri_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Friday");
        }
        else if(String(fri_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Friday");
        }
        else if(sat_open.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Saturday");
        }
        else if(sat_clos.length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Saturday");
        }
        else if(String(sun_open).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a opening time for Sunday");
        }
        else if(String(sun_clos).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a closing time for Sunday");
        }
        else if (String(title).length === 0)
        {
            messages.push("Empty Field Detected");
            messages.push("You must enter a special hours title to proceed");
        }
        else { proceed = true; }
    } 
    if (proceed === true) { launchSiteAdminWarning("hours"); }
    else { generateErrorWindow(messages)}; 
}

function validatingAboutFields()
{
    var statement = $("#f_about_area").val();
    if (String(statement).length === 0)
    {
        m = [];
        m.push("Empty Field Detected");
        m.push("You must enter a new about statement to proceed");
        generateErrorWindow(m);
    }
    else
    {
        launchSiteAdminWarning('about');
    }
}

function validatingPaymentFields()
{
    var send_msg    = false;
    var m           = [];
    var method      = $("#m_payment_method").val();
    var icon        = $("#m_payment_icon").val();
    if (method.length === 0)
    {
        send_msg = true;
        m.push("Empty Field Detected");
        m.push("You must enter a valid payment method name to proceed.");
    }
    else if (icon.length === 0)
    {
        send_msg = true;
        m.push("No Icon Selected");
        m.push("You must select a payment icon to proceed.");
    }
    if (send_msg === true)
    {
        generateErrorWindow(m);
    }
    else
    {
        submitEditor();
    }
}

function validatingChangeName()
{
    var send_msg    = false;
    var m           = [];
    var password    = $("#password").val();
    var fname       = $("#change_fname").val();
    var lname       = $("#change_lname").val();
    if (password.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter your current password to proceed");
    }
    else if (fname.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter a new first name to proceed");
    }
    else if (lname.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter a new last name to proceed");
    }
    if (send_msg === false) { launchSiteAdminWarning('change_name'); }
    else { generateErrorWindow(m); }
}

function validatingChangeEmail()
{
    var send_msg    = false;
    var m           = [];
    var password    = $("#password").val();
    var email1      = $("#email1").val();
    var email2      = $("#email2").val();
    if (password.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter your current password to proceed");
    }
    else if (email1.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter a new email address to proceed");
    }
    else if (validate_email(email1) === false)
    {
        send_msg = true;
        m.push("Invalid Email Detected");
        m.push("You must enter a valid new email address to proceed");
    }
    else if (email2.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must confirm your new email address to proceed");
    }
    else if (validate_email(email2) === false)
    {
        send_msg = true;
        m.push("Invalid Email Detected");
        m.push("You must enter a valid confirmation email address to proceed");
    }
    else if (email1 !== email2)
    {
        send_msg = true;
        m.push("The Emails Do Not Match!");
        m.push("");
    }
    if (send_msg === false) { launchSiteAdminWarning('change_email'); }
    else { generateErrorWindow(m); }
}

function validatingChangePassword()
{
    var send_msg        = false;
    var m               = [];
    var curr_password   = $("#curr_password").val();
    var password1       = $("#password1").val();
    var password2       = $("#password2").val();
    if (curr_password.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter your current password to proceed");
    }
    else if (password1.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter a new password to proceed");
    }
    else if (password2.length === 0)
    {
        send_msg = true;
        m.push("Invalid Field Detected");
        m.push("You must enter confirm your new password to proceed");
    }
    else if (password1 !== password2)
    {
        send_msg = true;
        m.push("The Passwords Do Not Match!");
        m.push("");
    }
    if (send_msg === false) { launchSiteAdminWarning('change_password'); }
    else { generateErrorWindow(m); }
}

function validatingSubAddress()
{
    var proceed     = false;
    var messages    = [];
    var address1    = $("#f_address1").val();
    var address2    = $("#f_address2").val();
    var address3    = $("#f_address3").val();
    var city        = $("#f_city").val();
    var state       = $("#f_state").val();
    var zipcode     = $("#f_zip").val();
    address1        = String(address1);
    address2        = String(address2);
    address3        = String(address3);
    city            = String(city);
    state           = String(state);
    zipcode         = String(zipcode);
    if (address1.length === 0 && address2.length === 0 && address3.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must enter a valid street name and street no. to proceed");
    }
    else if (city.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must enter a valid city to proceed");
    }
    else if (state.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must enter a valid state to proceed");
    }
    else if (stateValid(state) === false || state.length !== 2)
    {
        messages.push("Invalid State");
        messages.push("You must enter a valid U.S. state to proceed");
    }
    else if (zipcode.length < 5)
    {
        messages.push("Invalid Zip Code");
        messages.push("You must enter a valid zip code to proceed");
    }
    else { proceed = true; }
    if (proceed === true) { launchSiteAdminWarning("address"); }
    else { generateErrorWindow(messages); }
}

function validatingSubPhone()
{
    var proceed     = false;
    var messages    = [];
    var area        = $("#f_area").val();
    var prefix      = $("#f_pre").val();
    var postfix     = $("#f_post").val();
    area            = String(area);
    prefix          = String(prefix);
    postfix         = String(postfix);
    if (area.length < 3)
    {
        messages.push("Invalid Area Code Detected");
        messages.push("You must enter a valid area code to proceed");
    }
    else if (prefix.length < 3 || postfix.length < 4)
    {
        messages.push("Invalid Phone Number Detected");
        messages.push("You must enter a valid phone number to proceed");
    }
    else { proceed = true; }
    if (proceed === true) { launchSiteAdminWarning("phone"); }
    else { generateErrorWindow(messages); }
}

function validatingSubEmail()
{
    var proceed     = false;
    var messages    = [];
    var email1      = $("#f_email1").val();
    var email2      = $("#f_email2").val();
    email1          = String(email1);
    email2          = String(email2);
    if (email1.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must enter a valid email address to proceed");
    }
    else if (validate_email(email1) === false)
    {
        messages.push("Invalid Email Detected");
        messages.push("You must enter a valid email address in field 1 to proceed");
    }
    else if (email2.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must confirm the new email address to proceed");
    }
    else if (validate_email(email2) === false)
    {
        messages.push("Invalid Email Detected");
        messages.push("You must enter a valid confirmation email address to proceed");
    }
    else if (email1 !== email2)
    {
        messages.push("The Emails Do Not Match!");
        messages.push(" ");
    }
    else { proceed = true; }
    if (proceed === true) { launchSiteAdminWarning("email"); }
    else { generateErrorWindow(messages); }
}

function validatingSubMax()
{
    var max_images  = $("#f_max_images").val();
    if (String(max_images).length === 0)
    {
        var messages    = [];
        messages.push("Empty Field Detected");
        messages.push("You must enter a valid number between 0 and 99 to proceed.");
        generateErrorWindow(messages);
    }
    else { launchSiteAdminWarning("max_images"); }
}

function isValidLink(value)
{
    var isValid = false;
    value       = String(value);
    for (var i = 0; i < value.length; i++)
    {
        if (value[i] === ".") 
        {
            isValid = true;
            break;
        }
    }
    return isValid;
}

function validatingSubMedia(media)
{
    var proceed     = false;
    var messages    = [];
    var url         = "";
    var url2        = "";
    if (media === "twitter")
    {
        url = $("#f_twitter_url").val();
        url2 = $("#f_twitter_url2").val();
    }
    else if (media === "instagram")
    {
        url = $("#f_instagram_url").val();
        url2 = $("#f_instagram_url2").val();
    }
    else if (media === "facebook")
    {
        url = $("#f_facebook_url").val();
        url2 = $("#f_facebook_url2").val();
    }
    url = String(url);
    url2 = String(url2);
    if (url.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must enter a valid " + media + " link to proceed");
    }
    else if (isValidLink(url) === false)
    {
        messages.push("Invalid " + media + " link detected");
        messages.push("You must enter a valid " + media + " link to proceed");
    }
    else if (url2.length === 0)
    {
        messages.push("Empty Field Detected");
        messages.push("You must confirm the new " + media + " link to proceed");
    }
    else if (isValidLink(url2) === false)
    {
        messages.push("Invalid " + media + " link detected");
        messages.push("You must enter a valid " + media + " link to proceed");
    }
    else if (url !== url2)
    {
        messages.push("The Links Do Not Match!");
        messages.push(" ");
    }
    else { proceed = true; }
    if (proceed === true) { launchSiteAdminWarning(media); }
    else { generateErrorWindow(messages); }
}

function validateSuBlog()
{
    var proceed     = false;
    var messages    = [];
    var subject     = $("#subject").val();
    var content     = $("#content").val();
    if (String(subject).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must enter a valid subject to proceed.");
    }
    else if (String(content).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must enter the blog body to proceed.");
    }
    else
    {
        proceed = true;
    }
    if (proceed === true) { submitEditor(); }
    else { generateErrorWindow(messages); }
}

function validateSubProduct()
{
    var proceed     = false;
    var messages    = [];
    var name        = $("#name").val();
    var description = $("#description").val();
    var price       = $("#price").val();
    if (String(name).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must enter a valid product name to proceed.");
    }
    else if (String(description).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must enter a valid product description to proceed.");
    }
    else if (String(price).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must enter a valid price to proceed.");
    }
    else
    {
        proceed = true;
    }
    if (proceed === true) { submitEditor(); }
    else { generateErrorWindow(messages); }
}

function validateSubImage()
{
    var proceed     = false;
    var messages    = [];
    var url         = $("#img_filename").val();
    var parts       = String(url).split(".");
    var last        = String(parts[parts.length - 1]).toLowerCase();
    var no_imgs     = $("#file_index").val();
    var max_imgs    = $("#gal_max").val();
    no_imgs         = Number(no_imgs);
    max_imgs        = Number(max_imgs);
    if (String(url).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must select a valid image to proceed.");
    }
    else if (last!=="png" && last!=="jpg" && last!=="jpeg" && last!=="gif")
    {
        messages.push("Invalid File Type");
        messages.push("Images must be of types: .png, .jpg, .jpeg, or .gif");
    }
    else if (no_imgs >= max_imgs)
    {
        messages.push("Maximum Number of Uploads Reached!");
        messages.push("You must delete at least one image before you can upload a new image.");
    }
    else
    {
        proceed = true;
    }
    if (proceed === true) { submitEditor(); }
    else { generateErrorWindow(messages); }
}

function validateSubSecurity()
{
    var proceed     = false;
    var messages    = [];
    var question    = $("#question").val();
    if (String(question).length === 0)
    {
        messages.push("Empty Field");
        messages.push("You must enter a valid security question to proceed.");
    }
    else
    {
        proceed = true;
    }
    if (proceed === true) { submitEditor(); }
    else { generateErrorWindow(messages); }
}

function validateSubPermissions()
{
    var proceed     = false;
    var messages    = [];
    var amdin       = $("#d_is_admin").val();
    var product     = $("#d_product_permission").val();
    var about       = $("#d_about_permission").val();
    var blog        = $("#d_blog_permission").val();
    var image       = $("#d_gallery_permission").val();
    var lock        = $("#d_is_locked").val();
    var is_super    = $("#d_is_super").val();
    var isOld       = $("#is_new_user").val();
    amdin           = String(amdin);
    product         = String(product);
    about           = String(about);
    blog            = String(blog);
    image           = String(image);
    lock            = String(lock);
    is_super        = String(is_super);
    isOld           = Number(isOld);
    if (amdin==="False"&&product==="False"&&about==="False"&&blog==="False"&&image==="False"&&lock==="False"&&is_super==="False")
    {
        messages.push("No Permissions Indicated");
        messages.push("You must select at least one permission to proceed.");
    }
    else if (isOld === 0)
    {
        var f_fname = $("#f_fname").val();
        var f_lname = $("#f_lname").val();
        var email1  = $("#email1").val();
        var email2  = $("#email2").val();
        f_fname     = String(f_fname);
        f_lname     = String(f_lname);
        email1      = String(email1);
        email2      = String(email2);
        if (f_fname.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid first name to proceed.");
        }
        else if (f_lname.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid last name to proceed.");
        }
        else if (f_lname.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid last name to proceed.");
        }
        else if (email1.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid email to proceed.");
        }
        else if (validate_email(email1) === false)
        {
            messages.push("Invalid Email");
            messages.push("The email address that you've entered is invalid.");
        }
        else if (email2.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must confirm the user email address to proceed.");
        }
        else if (validate_email(email2) === false)
        {
            messages.push("Invalid Email");
            messages.push("The confirmation email address that you've entered is invalid.");
        }
        else if (email1 !== email2)
        {
            messages.push("The Emails Do Not Match");
            messages.push(" ");
        }
        else
        {
            proceed = true;
        }
    }
    else
    {
        proceed = true;
    }
    if (proceed === true) { submitEditor(); }
    else { generateErrorWindow(messages); }
}

function validateSubAuth()
{
    var proceed     = false;
    var messages    = [];
    var amdin       = $("#d_is_admin").val();
    var product     = $("#d_product_permission").val();
    var about       = $("#d_about_permission").val();
    var blog        = $("#d_blog_permission").val();
    var image       = $("#d_gallery_permission").val();
    var lock        = $("#d_is_locked").val();
    var is_super    = $("#d_is_super").val();
    var isOld       = $("#is_new_user").val();
    amdin           = String(amdin);
    product         = String(product);
    about           = String(about);
    blog            = String(blog);
    image           = String(image);
    lock            = String(lock);
    is_super        = String(is_super);
    isOld           = Number(isOld);
    if (amdin==="False"&&product==="False"&&about==="False"&&blog==="False"&&image==="False"&&lock==="False"&&is_super==="False")
    {
        messages.push("No Permissions Indicated");
        messages.push("You must select at least one permission to proceed.");
    }
    else if (isOld === 0)
    {
        var fname   = $("#f_fname").val();
        var lname   = $("#f_lname").val();
        var email1  = $("#email1").val();
        var email2  = $("#email2").val();
        fname       = String(fname);
        lname       = String(lname);
        email1      = String(email1);
        email2      = String(email2);
        if (fname.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid first name to proceed.");
        }
        else if (lname.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid last name to proceed.");
        }
        else if (email1.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must enter a valid email to proceed.");
        }
        else if (validate_email(email1) === false)
        {
            messages.push("Invalid Email");
            messages.push("The email address that you've entered is invalid.");
        }
        else if (email2.length === 0)
        {
            messages.push("Empty Field");
            messages.push("You must confirm the user email address to proceed.");
        }
        else if (validate_email(email2) === false)
        {
            messages.push("Invalid Email");
            messages.push("The confirmation email address that you've entered is invalid.");
        }
        else if (email1 !== email2)
        {
            messages.push("The Emails Do Not Match");
            messages.push(" ");
        }
        else
        {
            proceed = true;
        }
    }
    else
    {
        proceed = true;
    }
    if (proceed === true) { submitEditor(); }
    else { generateErrorWindow(messages); }
}

function checkPopulatedFields(model, mode, index)
{
    model   = String(model);
    mode    = Number(mode);
    if (model === 'blog') { checkBlogFields(mode, index); }
    else if (model === 'product') { checkProductFields(mode, index); }
    else if (model === 'image') { checkImageFields(); }
    else if (model === 'security') { checkSecurityFields(mode, index); }
    else if (model === 'permission') {checkPermissionsFields(mode, index); }
    else if (model === 'auth') {checkAuthFields(mode, index); }
    else if (model === 'address') { checkAddressFields(); }
    else if (model === 'phone') { checkPhoneFields(); }
    else if (model === 'email') { checkEmailFields(); }
    else if (model === 'max_images') { checkMaxField(); }
    else if (model === 'facebook' || model === 'twitter' || model === 'instagram') { checkMediaFields(model); }
    else if (model === "hours") { checkHoursFields(); }
    else if (model === "payments") { checkPaymentFields(); }
}

function checkAboutFields()
{
    var show    = false;
    var action  = $("#about_target_action").val();
    var st      = $("#f_about_area").val();
    var act     = $("#f_is_active").val();
    if (action === "update")
    {
        var o_st    = null;
        var o_at    = "True";
        var i       = $("#selected-payment").val();
        if (i === "~")
        {
            //get current id
            o_st    = $("#current_statement").val();
        }
        else
        {
            //decode selected inactive index3
            i       = decodeDeleteIndices(i);
            o_st    = $("#a_statement_" + i).val();
            o_at    = "False";
        }
        if (o_st!==st || o_at!==act) { show = true; }
    }
    else if (action === "new")
    {
        if (st.length > 0 || act !== "False") { show = true; } 
    }
    if (show === true) 
    { 
        var m = [];
        m.push("Warning");
        m.push("Changes Detected");
        m.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError2(m); 
    }
    else { closeAboutError(); }
}

function checkPaymentFields()
{
    var action  = $("#pmt_target_action").val();
    var method  = $("#m_payment_method").val();
    var icon    = $("#m_payment_icon").val();
    method      = method.toLowerCase();
    if (action === "new")
    {
        if (method.length!==0 || icon.length!==0) 
        {
            var m = [];
            m.push("Warning");
            m.push("Changes Detected");
            m.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(m);
        }
        else { closeEditor(); }
    }
    else if (action === "update")
    {
        var index           = $("#selected-payment").val();
        var k_pmt_id        = $("#k_pmt_id_" + index).val();
        var k_pmt_method    = $("#k_pmt_method_" + index).val();
        var k_pmt_icon      = $("#k_pmt_icon_" + index).val();
        k_pmt_method        = k_pmt_method.toLowerCase();
        $("#pmt_target_id").val(k_pmt_id);
        if (k_pmt_method!==method || k_pmt_icon!==icon)
        {
            var m = [];
            m.push("Warning");
            m.push("Changes Detected");
            m.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(m);
        }
        else { closeEditor(); }
    }
    else { closeEditor(); }
}

function checkHoursFields()
{
    var proceed         = false;
    var m               = [];
    //Original Values
    var m_mon           = $("#m_monday").val();
    var m_tue           = $("#m_tuesday").val();
    var m_wed           = $("#m_wednesday").val();
    var m_thu           = $("#m_thursday").val();
    var m_fri           = $("#m_friday").val();
    var m_sat           = $("#m_saturday").val();
    var m_sun           = $("#m_sunday").val();
    var m_title         = $("#m_title").val();
    var m_weekdays      = $("#m_weekdays").val();
    var m_weekends      = $("#m_weekends").val();
    var m_special       = $("#m_special_hours").val();
    //New Values
    var group_weekdays  = $("#f_group_weekdays").val();
    var group_weekends  = $("#f_group_weekends").val();
    var special         = $("#special_check").val();
    var mon             = decodeSuTime("mon");
    var sat             = decodeSuTime("sat");
    var tue             = "empty";
    var wed             = "empty";
    var thu             = "empty";
    var fri             = "empty";
    var sun             = "empty";
    var title           = "Hours of Operation";
    if (group_weekdays === "False")
    {
        tue = decodeSuTime("tue");
        wed = decodeSuTime("wed");
        thu = decodeSuTime("thu");
        fri = decodeSuTime("fri");
    }
    if (group_weekends === "False")
    {
        sun = decodeSuTime("sun")
    }
    if (special === "True")
    {
        title = $("#k_special_hours_input").val();
    }
    if (m_mon!==mon||m_tue!==tue||m_wed!==wed||m_thu!==thu||m_fri!==fri||m_sat!==sat||m_sun!=sun||m_title!==title||m_weekdays!==group_weekdays||m_weekends!==group_weekends)
    {
        m.push("Warning");
        m.push("Changes Detected");
        m.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError(m);
    }
    else { closeEditor(); }
}

function checkBlogFields(mode, index)
{
    var messages    = [];
    var subject     = $("#subject").val();
    var content     = $("#content").val();
    subject         = String(subject);
    content         = String(content);
    if (mode === 0)
    {
        if (subject.length > 0 || content.length > 0)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
    else if (mode === 1)
    {
        var m_subject = $("#m_subject_" + index).val();
        var m_content = $("#m_content_" + index).val();
        m_subject = String(m_subject);
        m_content = String(m_content);
        if (m_subject !== subject || m_content !== content)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
}

function checkProductFields(mode, index)
{
    var messages    = [];
    var name        = $("#name").val();
    var description = $("#description").val();
    var price       = $("#price").val();
    name            = String(name);
    description     = String(description);
    price           = String(price);
    if (mode === 0)
    {
        if (name.length > 0 || description.length > 0 || price !== "0")
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
    else if (mode === 1)
    {
        var m_name          = $("#m_name_" + index).val();
        var m_description   = $("#m_description_" + index).val();
        var m_price         = $("#m_price_" + index).val();
        m_name              = String(m_name);
        m_description       = String(m_description);
        m_price             = String(m_price);
        if (m_name !== name || m_description !== description || m_price !== price)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
}

function checkImageFields(mode, index)
{
    var messages    = [];
    var file        = $("#img_filename").val();
    file            = String(file);
    if(file.length > 0)
    {
        messages.push("Warning");
        messages.push("Pending Upload Detected");
        messages.push("Are you sure you want to close this window? The system has detected a file that has been queued for upload. Would you like to upload this image?");
        buildWarningError(messages);
    }
    else
    {
        closeEditor();
    }
}

function checkSecurityFields(mode, index)
{
    var messages    = [];
    var question    = $("#question").val();
    question        = String(question);
    if (mode === 0)
    {
        if (question.length > 0)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
    else if (mode === 1)
    {
        var m_question  = $("#m_question_" + index).val();
        m_question      = String(m_question);
        if (m_question !== question)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
}

function checkPermissionsFields(mode, index)
{
    var messages    = [];
    var amdin       = $("#d_is_admin").val();
    var product     = $("#d_product_permission").val();
    var about       = $("#d_about_permission").val();
    var blog        = $("#d_blog_permission").val();
    var image       = $("#d_gallery_permission").val();
    var lock        = $("#d_is_locked").val();
    var is_super    = $("#d_is_super").val();
    amdin           = String(amdin);
    product         = String(product);
    about           = String(about);
    blog            = String(blog);
    image           = String(image);
    lock            = String(lock);
    is_super        = String(is_super);
    if (mode === 0)
    {
        var fname   = $("#f_fname").val();
        var lname   = $("#f_lname").val();
        var eml_1   = $("#email1").val();
        var eml_2   = $("#email2").val();
        fname = String(fname);
        lname = String(lname);
        eml_1 = String(eml_1);
        eml_2 = String(eml_2);
        if (amdin==="True"||product==="True"||about==="True"||blog==="True"||image==="True"||lock==="True"||is_super==="True")
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else if (fname.length>0||lname.length>0||eml_1.length>0||eml_2.length>0)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
    else if (mode === 1)
    {
        var m_admin     = $("#m_admin_" + index).val();
        var m_product   = $("#m_product_" + index).val();
        var m_about     = $("#m_about_" + index).val();
        var m_blog      = $("#m_blog_" + index).val();
        var m_image     = $("#m_image_" + index).val();
        var m_lock      = $("#m_lock_" + index).val();
        var m_super     = $("#m_super_" + index).val();
        if (m_admin!==amdin||m_product!==product||m_about!==about||m_blog!==blog||m_image!==image||m_lock!==lock||m_super!==is_super)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
}

function checkAuthFields(mode, index)
{
    var messages    = [];
    var amdin       = $("#d_is_admin").val();
    var product     = $("#d_product_permission").val();
    var about       = $("#d_about_permission").val();
    var blog        = $("#d_blog_permission").val();
    var image       = $("#d_gallery_permission").val();
    var lock        = $("#d_is_locked").val();
    var is_super    = $("#d_is_super").val();
    amdin           = String(amdin);
    product         = String(product);
    about           = String(about);
    blog            = String(blog);
    image           = String(image);
    lock            = String(lock);
    is_super        = String(is_super);
    if (mode === 0)
    {
        var name    = $("#f_name").val();
        var eml_1   = $("#email1").val();
        var eml_2   = $("#email2").val();
        name    = String(name);
        eml_1   = String(eml_1);
        eml_2   = String(eml_2);
        if (amdin==="True"||product==="True"||about==="True"||blog==="True"||image==="True"||lock==="True"||is_super==="True")
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else if (name.length>0||eml_1.length>0||eml_2.length>0)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
    else if (mode === 1)
    {
        var m_admin     = $("#m_admin_" + index).val();
        var m_product   = $("#m_product_" + index).val();
        var m_about     = $("#m_about_" + index).val();
        var m_blog      = $("#m_blog_" + index).val();
        var m_image     = $("#m_image_" + index).val();
        var m_lock      = $("#m_lock_" + index).val();
        var m_super     = $("#m_super_" + index).val();
        if (m_admin!==amdin||m_product!==product||m_about!==about||m_blog!==blog||m_image!==image||m_lock!==lock||m_super!==is_super)
        {
            messages.push("Warning");
            messages.push("Changes Detected");
            messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
            buildWarningError(messages);
        }
        else { closeEditor(); }
    }
}

function checkAddressFields()
{
    var messages    = [];
    var address1    = $("#f_address1").val();
    var address2    = $("#f_address2").val();
    var address3    = $("#f_address3").val();
    var city        = $("#f_city").val();
    var state       = $("#f_state").val();
    var zipcode     = $("#f_zip").val();
    var m_address1  = $("#m_address1").val();
    var m_address2  = $("#m_address2").val();
    var m_address3  = $("#m_address3").val();
    var m_city      = $("#m_city").val();
    var m_state     = $("#m_state").val();
    var m_zipcode   = $("#m_zipcode").val();
    address1        = String(address1);
    address2        = String(address2);
    address3        = String(address3);
    city            = String(city);
    state           = String(state);
    zipcode         = String(zipcode);
    m_address1      = String(m_address1);
    m_address2      = String(m_address2);
    m_address3      = String(m_address3);
    m_city          = String(m_city);
    m_state         = String(m_state);
    m_zipcode       = String(m_zipcode);
    if (address1!==m_address1 || address2!==m_address2 || address3!==m_address3 || city!==m_city || state!==m_state || zipcode!==m_zipcode)
    {
        messages.push("Warning");
        messages.push("Changes Detected");
        messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError(messages);
    }
    else { closeEditor(); }
}

function checkPhoneFields()
{
    var messages    = [];
    var area        = $("#f_area").val();
    var prefix      = $("#f_pre").val();
    var postfix     = $("#f_post").val();
    var m_phone     = $("#m_phone").val();
    area            = String(area);
    prefix          = String(prefix);
    postfix         = String(postfix);
    m_phone         = String(m_phone);
    old_phone = "(" + area + ")" + " " + prefix + "-" + postfix;
    if (m_phone!==old_phone)
    {
        messages.push("Warning");
        messages.push("Changes Detected");
        messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError(messages);
    }
    else { closeEditor(); }
}

function checkEmailFields()
{
    var messages    = [];
    var m_email     = $("#m_email").val();
    var f_email1    = $("#f_email1").val();
    var f_email2    = $("#f_email2").val();
    m_email         = String(m_email);
    f_email1        = String(f_email1);
    f_email2        = String(f_email2);
    if (m_email!==f_email1 || f_email2.length > 0)
    {
        messages.push("Warning");
        messages.push("Changes Detected");
        messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError(messages);
    }
    else { closeEditor(); }
}

function checkMaxField()
{
    var f_max_images = $("#f_max_images").val();
    var m_max_images = $("#m_max_images").val();
    if (String(f_max_images) !== String(m_max_images))
    {
        messages = [];
        messages.push("Warning");
        messages.push("Changes Detected");
        messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError(messages);
    }
    else { closeEditor(); }
}

function checkMediaFields(model)
{
    var url     = $("#f_facebook_url").val();
    var url2    = $("#f_facebook_url2").val();
    var m_url   = $("#m_facebook_url").val();
    var on      = "False";
    var link_on = "False";
    if ($("#turn_on").prop("checked") === true) { link_on = "True"; }
    if (model === "facebook")
    {
        if ($("#fb-on").prop("checked") === true) { on = "True"; }
    }
    if (model === "twitter")
    {
        url     = $("#f_twitter_url").val()
        url2    = $("#f_twitter_url2").val()
        m_url   = $("#m_twitter_url").val();
        if ($("#twitter-on").prop("checked") === true) { on = "True"; }
    }
    else if (model === "instagram")
    {
        url     = $("#f_instagram_url").val()
        url2    = $("#f_instagram_url2").val()
        m_url   = $("#m_instagram_url").val();
        if ($("#instagram-on").prop("checked") === true) { on = "True"; }
    }
    if (String(url)!==String(m_url) || String(url2).length > 0 || link_on !== on)
    {
        messages = [];
        messages.push("Warning");
        messages.push("Changes Detected");
        messages.push("Are you sure you want to close this window? All changes will be discarded if you proceed.");
        buildWarningError(messages);
    }
    else { closeEditor(); }
}

function buildWarningError(messages)
{
    html = "";
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    // html += "<div class='su-closer'><a href=\"javascript: closeError();\"><i class='fas fa-window-close su-err'></i></a></div>";
    html += "<div class='su-error-header'><i class='fas fa-exclamation-triangle'></i> <span id='su-error-header'>" + messages[0] + "</span></div>";
    html += "<div class='err0' id='err0'>" + messages[1] + "</div>";
    html += "<div class='err1' id='err1'>" + messages[2] + "</div>";
    html += "<div class='su-error-btns'>";
    html += "<button onClick=\"javascript: suHardClose();\">Leave Page</button>";
    html += "<button onClick=\"javascript: suSoftClose();\">Stay On Page</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#su-editor-builder").html(html);
    $("#su-editor-builder").hide();
    $("#su-editor-builder").removeClass('hidden');
    $("#su-editor-builder").fadeIn(600);
}

function buildWarningError2(messages)
{
    html = "";
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    // html += "<div class='su-closer'><a href=\"javascript: closeError();\"><i class='fas fa-window-close su-err'></i></a></div>";
    html += "<div class='su-error-header'><i class='fas fa-exclamation-triangle'></i> <span id='su-error-header'>" + messages[0] + "</span></div>";
    html += "<div class='err0' id='err0'>" + messages[1] + "</div>";
    html += "<div class='err1' id='err1'>" + messages[2] + "</div>";
    html += "<div class='su-error-btns'>";
    html += "<button onClick=\"javascript: suHardClose2();\">Leave Page</button>";
    html += "<button onClick=\"javascript: suSoftClose();\">Stay On Page</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#su-editor-builder").html(html);
    $("#su-editor-builder").hide();
    $("#su-editor-builder").removeClass('hidden');
    $("#su-editor-builder").fadeIn(600);
}

function generateErrorWindow(messages)
{
    html = "";
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-closer'><a href=\"javascript: closeError();\"><i class='fas fa-window-close su-err'></i></a></div>";
    html += "<div class='su-error-header su-neg25'><i class='fas fa-exclamation-triangle'></i> <span id='su-error-header'>Error</span></div>";
    html += "<div class='err0' id='err0'>" + messages[0] + "</div>";
    html += "<div class='err1' id='err1'>" + messages[1] + "</div>";
    html += "</div>";
    html += "</div>";
    $("#su-editor-builder").html(html);
    $("#su-editor-builder").hide();
    $("#su-editor-builder").removeClass('hidden');
    $("#su-editor-builder").fadeIn(600);
}

function launchAdminEditors(model, mode, index)
{
    var html    = "";
    var header  = null;
    model       = String(model);
    mode        = String(mode);
    if (model === "address") { html = buildAddressEditor(); }
    else if (model === "phone") { html = buildPhoneEditor(); }
    else if (model === "email") { html = buildEmailEditor(); }
    else if (model === "hours") { html = buildHoursEditor(); }
    else if (model === "permission") { html = buildPermissionEditor(mode, index); }
    else if (model === "auth") { html = buildAuthEditor(mode, index); }
    else if (model === "security") { html = buildSecurityEditor(mode, index); }
    else if (model === "blog") { html = buildBlogEditor(mode, index); }
    else if (model === "product") { html = buildProductEditor(mode, index); }
    else if (model === "image") { html = buildImageEditor(); }
    else if (model === "max_images") { html = buildMaxEditor(); }
    else if (model === "payment") { html = buildPaymentEditor(); }
    else if (model === "facebook") { html = buildMediaEditor(model); }
    else if (model === "twitter") { html = buildMediaEditor(model); }
    else if (model === "instagram") { html = buildMediaEditor(model); }
    else if (model === "about") { html = buildAboutEditor(); }
    else if (model === "change_email") { html = buildNewEmailEditor(); }
    else if (model === "change_name") { html = buildNewNameEditor(); }
    else if (model === "change_password") { html = buildNewPasswordEditor(); }
    openEditor(html);
    if (model === "hours") { setHourSelects(); }
}

function buildNewEmailEditor()
{
    var html = "";
    var action_url = $("#action_url").val();
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeDropEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='user_target_model' value='change_email'>";
    html += "<input type='hidden' name='target_action' id='user_target_action' value='change_email'>";
    html += "<h3><i class='fas fa-user-cog'></i> &nbspChange Login Email</h3>";
    html += "<input type='password' name='password' id='password' placeholder='Enter Password'>";
    html += "<div class='su-sp-top'></div>";
    html += "<div class='su-sp-top'></div>";
    html += "<input type='email' name='email1' id='email1' placeholder='Enter New Email'>";
    html += "<input type='email' name='email2' id='email2' placeholder='Confirm New Email'>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('change_email');\">Submit</button>";
    html += "<button type='button' onClick=\"javascript: closeDropEditor();\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildNewNameEditor()
{
    var html = "";
    var action_url = $("#action_url").val();
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeDropEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='user_target_model' value='change_name'>";
    html += "<input type='hidden' name='target_action' id='user_target_action' value='change_name'>";
    html += "<h3><i class='fas fa-user-cog'></i> &nbspChange User Name</h3>";
    html += "<input type='password' name='password' id='password' placeholder='Enter Password'>";
    html += "<div class='su-sp-top'></div>";
    html += "<div class='su-sp-top'></div>";
    html += "<input type='text' name='fname' id='change_fname' placeholder='First Name'>";
    html += "<input type='text' name='lname' id='change_lname' placeholder='Last Name'>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('change_name');\">Submit</button>";
    html += "<button type='button' onClick=\"javascript: closeDropEditor();\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function buildNewPasswordEditor()
{
    var html = "";
    var action_url = $("#action_url").val();
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeDropEditor();\"></i></div>";
    html += "<form action='" + action_url + "' method='POST' id='pop_form'>";
    html += "<input type='hidden' name='target_model' id='user_target_model' value='change_password'>";
    html += "<input type='hidden' name='target_action' id='user_target_action' value='change_password'>";
    html += "<h3><i class='fas fa-user-cog'></i> &nbspChange Password</h3>";
    html += "<input type='password' name='curr_password' id='curr_password' placeholder='Enter Old Password'>";
    html += "<input type='password' name='password1' id='password1' placeholder='Enter New Password'>";
    html += "<input type='password' name='password2' id='password2' placeholder='Confirm New Password'>";
    html += "<div class='su-general-btns'>";
    html += "<button type='button' onClick=\"javascript: validateSUModel('change_password');\">Submit</button>";
    html += "<button type='button' onClick=\"javascript: closeDropEditor();\">Cancel</button>";
    html += "</div>";
    html += "</form>";
    html += "</div>";
    html += "</div>";
    return html;
}

function closeDropEditor()
{
    $("#pop-up-builder").fadeOut(600);
    $("#su-drop-window ").delay(300).fadeOut(500);
}

function getSelectedModel()
{
    var model = null;
    if ($("#s_blog").prop("checked") === true)
    {
        model = "blog";
    }
    else if ($("#s_product").prop("checked") === true)
    {
        model = "product";
    }
    else if ($("#s_image").prop("checked") === true)
    {
        model = "image";
    }
    return model;
}

function getSelectedUser()
{
    var model = null;
    if ($("#s_user").prop("checked") === true)
    {
        model = "permission";
    }
    else if ($("#s_auth").prop("checked") === true)
    {
        model = "auth";
    }
    else if ($("#s_security").prop("checked") === true)
    {
        model = "security";
    }
    return model;
}

function fetchModelType(mode)
{
    var model = getSelectedModel();
    if (Number(mode) === 0) { launchAdminEditors(model, 0); }
    else { launchDeleteConfirmation(model); }
}

function fetchUserType(mode)
{
    var model = getSelectedUser();
    if (Number(mode) === 0) { launchAdminEditors(model, 0); }
    else { launchDeleteConfirmation(model); }
}

function decodeDeleteIndices(encoded)
{
    var result  = [];
    var dlist   = String(encoded).split("~");
    for (var i = 0; i < dlist.length; i++)
    {
        if (dlist[i].length !== 0)
        {
            result.push(dlist[i]);
        }
    }
    return result;
}

function getDeleteIndices(model)
{
    var delete_list = null;
    model = String(model);
    if (model==="blog" || model==="product" || model==="image") { delete_list = $("#selected-db").val(); }
    else if (model==="permission" || model==="auth" || model==="security") { delete_list = $("#selected-usr").val(); }
    else if (model === "payment" || model==="about") { delete_list = $("#selected-payment").val(); }
    return String(delete_list);
}

function launchAlterMessage(message)
{
    var html = "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-confirm-exit2'><i class='fas fa-window-close' onClick=\"javascript: closeError();\"></i></div>";
    html += "<h3><i class='fas fa-exclamation-circle'></i> &nbspMessage</h3>";
    html += "<div class='alter-message'>" + message + "</div>";
    html += "</div>";
    html += "</div>";
    $("#su-editor-builder").html(html);
    $("#su-editor-builder").hide();
    $("#su-editor-builder").removeClass("hidden");
    $("#su-editor-builder").fadeIn(600);
}

function launchDeleteConfirmation(model)
{
    var open            = true;
    var html            = "";
    var delete_indices  = getDeleteIndices(model);
    var delete_list     = decodeDeleteIndices(delete_indices);
    var header          = null;
    var mdl_head        = null;
    var details         = "";
    var id_list         = "~";
    var m               = [];
    var action_url      = $("#action_url").val();
    model               = String(model).toLowerCase();
    if (model === "blog")
    {
        mdl_head        = "blog";
        if (delete_list.length > 1) { mdl_head = "blogs"; }
        header          = "<h3><i class='fab fa-blogger'></i> &nbsp Delete " + mdl_head + "</h3>";
        for (var i = 0; i < delete_list.length; i++)
        {
            var subject     = $("#m_subject_" + String(delete_list[i])).val();
            var m_date      = $("#m_date_" + String(delete_list[i])).val();
            var m_id        = $("#m_id_" + String(delete_list[i])).val();
            id_list += String(m_id);
            id_list += "~";
            details += "<tr>";
            details += "<td><i class='fas fa-minus-circle'></i></td>";
            details += "<td><b>[" + m_date + "]</b> </td>";
            details += "<td class='su-confirm-pull-right'>" + subject + "</td>";
            details += "</tr>";
        }
    }
    else if (model === "product")
    {
        mdl_head        = "product";
        if (delete_list.length > 1) { mdl_head = "products"; }
        header          = "<h3><i class='fas fa-spray-can'></i> &nbsp Delete " + mdl_head + "</h3>";
        for (var i = 0; i < delete_list.length; i++)
        {
            var p_name      = $("#m_name_" + String(delete_list[i])).val();
            var p_price     = $("#m_price_" + String(delete_list[i])).val();
            var m_id        = $("#m_id_" + String(delete_list[i])).val();
            id_list += String(m_id);
            id_list += "~";
            details += "<tr>";
            details += "<td><i class='fas fa-minus-circle'></i></td>";
            details += "<td><b><em>" + p_name + " </em></b></td>";
            details += "<td class='su-confirm-pull-right'>$" + p_price + "</td>";
            details += "</tr>";
        }
    }
    else if (model === "image")
    {
        mdl_head        = "image";
        if (delete_list.length > 1) { mdl_head = "images"; }
        header          = "<h3><i class='fas fa-camera'></i> &nbsp Delete " + mdl_head + "</h3>";
        details += "<div class='container'><div class='row'>";
        for (var i = 0; i < delete_list.length; i++)
        {
            var url     = $("#m_url_" + String(delete_list[i])).val();
            var m_id    = $("#m_id_" + String(delete_list[i])).val();
            id_list += String(m_id);
            id_list += "~";
            details += "<div class='col-sm-3 su_del_image_table' style='padding:1px; margin:0;'><img src='" + url + "'></div>";
        }
        details += "</div></div>";
    }
    else if (model === "permission")
    {
        mdl_head        = "user";
        details         = "";
        if (delete_list.length > 1) { mdl_head = "users"; }
        header          = "<h3><i class='fas fa-user-times'></i> &nbsp Delete " + mdl_head + "</h3>";
        for (var i = 0; i < delete_list.length; i++)
        {
            var U_fname = $("#m_fname_" + String(delete_list[i])).val();
            var U_lname = $("#m_lname_" + String(delete_list[i])).val();
            var U_email = $("#m_email_" + String(delete_list[i])).val();
            var m_id    = $("#u_id_" + String(delete_list[i])).val();
            id_list += String(m_id);
            id_list += "~";
            details += "<tr>";
            details += "<td><i class='fas fa-minus-circle'></i></td>";
            details += "<td><b>" + U_fname + " " + U_lname + " </b></td>";
            details += "<td class='su-confirm-pull-right'>[" + U_email + "]</td>";
            details += "</tr>";
        }
    }
    else if (model === "auth")
    {
        mdl_head        = "authorization";
        if (delete_list.length > 1) { mdl_head = "authorizations"; }
        header          = "<h3><i class='fas fa-user-cog'></i> &nbsp Delete " + mdl_head + "</h3>";
        for (var i = 0; i < delete_list.length; i++)
        {
            var a_name = $("#m_name_" + String(delete_list[i])).val();
            var a_email = $("#m_email_" + String(delete_list[i])).val();
            var m_id    = $("#u_id_" + String(delete_list[i])).val();
            id_list += String(m_id);
            id_list += "~";
            details += "<tr>";
            details += "<td><i class='fas fa-minus-circle'></i></td>";
            details += "<td><b>" + a_name + " </b></td>";
            details += "<td class='su-confirm-pull-right'>[" + a_email + "]</td>";
            details += "</tr>";
        }
    }
    else if (model === "security")
    {
        mdl_head        = "security question";
        if (delete_list.length > 1) { mdl_head = "security questions"; }
        header          = "<h3><i class='fas fa-user-lock'></i> &nbsp Delete " + mdl_head + "</h3>";
        for (var i = 0; i < delete_list.length; i++)
        {
            var q_ques  = $("#m_question_" + String(delete_list[i])).val();
            var m_id    = $("#u_id_" + String(delete_list[i])).val();
            id_list += String(m_id);
            id_list += "~";
            details += "<tr>";
            details += "<td><i class='fas fa-minus-circle'></i></td>";
            details += "<td><b>" + q_ques + " </b></td>";
            details += "</tr>";
        }
    }
    else if (model === "payment")
    {
        mdl_head    = "payment method";
        header      = "<h3><i class='fas fa-shopping-cart'></i> &nbsp Delete " + mdl_head + "</h3>";
        method      = $("#m_payment_method").val() 
        icon        = $("#m_payment_icon").val();
        details += "<tr>"; 
        details += "<td><i class='fas fa-minus-circle'></i></td>"; 
        details += "<td><b>" + method + " </b></td>";
        details += "</tr>"; 
    }
    else if (model === "about")
    {
        mdl_head        = "about us statement";
        var no_items    = $("#no_inactive").val();
        no_items        = Number(no_items);
        header          = "<h3><i class='fas fa-edit'></i> &nbsp Delete " + mdl_head + "</h3>";
        if (no_items !== 1) { mdl_head = "about us statements"}
        if (no_items > 0)
        {
            for (var i = 0; i < no_items; i++)
            {
                var t_name  = "#ab_box_" + String(i);
                var trigger = null;
                if ($(t_name).prop("checked") === true)
                {
                    var this_id = $("#a_id" + String(i)).val();
                    var s_nth   = null;
                    id_list += String(this_id);
                    id_list += "~";
                    trigger = '#a_statement_' + String(i);
                    s_nth   = $(trigger).val();
                    details += "<tr>";
                    details += "<td><i class='fas fa-minus-circle'></i></td>";
                    details += "<td><b>" + s_nth + " </b></td>";
                    details += "</tr>";
                }
            }
        }
        else
        {
            open = false;
            m.push("Nothing Has Been Selected");
            m.push("");
            generateErrorWindow(m);

        }  
    }
    
    if (open === true)
    {
        html += "<div class='su-center su-width40'>";
        html += "<div class='su-confirm'>";
        html += "<form action='" + action_url + "' method='POST' id='pop_delete_form'>";
        html += "<input type='hidden' name='target_model' id='target_model' value='" + model + "'>";
        html += "<input type='hidden' name='target_action' id='target_action' value='2'>";
        html += "<input type='hidden' name='target_id' id='target_id' value='" + id_list + "'>";
        html += "<div class='su-confirm-exit'><i class='fas fa-window-close' onClick=\"javascript: closeError();\"></i></div>";
        html += header;
        html += "<div class='su-confirm1'>Are you sure you want to proceed?</div>";
        html += "<div class='su-confirm2'>The following " + mdl_head + " will be permanently deleted:</div>";
        html += "<div class='su-confirm-wrapper'>";
        html += "<table>";
        html += details;
        html += "</table>";
        html += "</div>";
        html += "<div class='su-confirm-buttons'>";
        if (model === "payment")
        {
            html += "<button type='button' onClick=\"javascript: submitEditor();\">Delete</button>";
        }
        else
        {
            html += "<button type='button' onClick=\"javascript: submitDelete();\">Delete</button>";
        }
        html += "<button type='button' onClick=\"javascript: closeError();\">Cancel</button>";
        html += "</div>";
        html += "</form>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        $("#su-editor-builder").html(html);
        $("#su-editor-builder").hide();
        $("#su-editor-builder").removeClass("hidden");
        $("#su-editor-builder").fadeIn(500);
    }
}

function launchSiteAdminWarning(model)
{
    //set parent form to update
    var html    = "";
    var header  = "";
    var sub_msg = "";
    var w_type  = "";
    var details = "";
    model = String(model);
    if (model === "address")
    {
        header = "<h3><i class='fas fa-map-marker-alt'></i> &nbsp Update Address</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the address on the contact page</div>";
        w_type = "New Address";
        var a1 = $("#f_address1").val();
        var a2 = $("#f_address2").val();
        var a3 = $("#f_address3").val();
        var ct = $("#f_city").val();
        var st = $("#f_state").val();
        var zc = $("#f_zip").val();

        details += "<div class='su-admin-warning-i'>" + a1 + "</div>";
        details += "<div class='su-admin-warning-i'>" + a2 + "</div>";
        details += "<div class='su-admin-warning-i'>" + a3 + "</div>";
        details += "<div class='su-admin-warning-i'>" + ct + ", " + st + " " + zc + "</div>";
    }
    else if (model === "phone")
    {
        var p1 = $("#f_area").val();
        var p2 = $("#f_pre").val();
        var p3 = $("#f_post").val();
        var ph = "(" + p1 + ") " + p2 + "-" + p3;
        header = "<h3><i class='fas fa-phone-square'></i> &nbsp Update Phone</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the phone number on the contact page</div>";
        w_type = "New Phone";
        details += "<div class='su-admin-warning-c'>" + ph + "</div>";
    }
    else if (model === "email")
    {
        var em = $("#f_email1").val();
        header = "<h3><i class='fas fa-envelope'></i> &nbsp Update Email</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the email address on the contact page</div>";
        w_type = "New Email";
        details += "<div class='su-admin-warning-c'>" + em + "</div>";
    }
    else if (model === "about")
    {
        var sa  = $("#f_is_active").val();
        var st  = $("#f_about_area").val();
        var ww  = "This will alter the current About Us Statement";
        if (sa === "False") { ww = "This will change/add the following about us statement."; }
        header  = "<h3><i class=\"fas fa-pen-square\"></i> &nbsp <em>\"About Us\"</em></h3>";
        sub_msg = "<div class='su-confirm2'>" + ww + "</div>";
        w_type  = "New <b><em>\"About Us\"</em></b> Statement";
        details += "<div class='su-admin-warning-c'>" + st + "</div>";
    }
    else if (model === "max_images")
    {
        var mu = $("#f_max_images").val();
        header = "<h3><i class='fas fa-images'></i> &nbsp Update Image Gallery</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the image gallery</div>";
        w_type = "Maximum Number Of Uploads:";
        details += "<div class='su-admin-warning-b'>" + mu + "</div>";
    }
    else if (model === "facebook")
    {
        var fl = $("#f_facebook_url").val();
        header = "<h3><i class=\"fab fa-facebook-square\"></i> &nbsp Update Facebook</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the facebook link</div>";
        w_type = "New Facebook Link";
        details += "<div class='su-admin-warning-c'>" + fl + "</div>";
    }
    else if (model === "twitter")
    {
        var tw = $("#f_twitter_url").val();
        header = "<h3><i class=\"fab fa-twitter-square\"></i> &nbsp Update Twitter</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the twitter link</div>";
        w_type = "New Twitter Link";
        details += "<div class='su-admin-warning-c'>" + tw + "</div>";
    }
    else if (model === "instagram")
    {
        var il = $("#f_instagram_url").val();
        header = "<h3><i class=\"fab fa-instagram\"></i> &nbsp Update Instagram</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the instagram link</div>";
        w_type = "New Instagram Link";
        details += "<div class='su-admin-warning-c'>" + il + "</div>";
    }
    else if (model === "change_name")
    {
        var cf = $("#change_fname").val();
        var cl = $("#change_lname").val();
        header = "<h3><i class='fas fa-user-cog'></i> &nbsp Update User Name</h3>";
        sub_msg = "<div class='su-confirm2'>This will permanently alter your user name</div>";
        w_type  = "New User Name";
        details += "<div class='su-admin-warning-c'>" + cf + " " + cl + "</div>";
    }
    else if (model === "change_email")
    {
        var ce = $("#email1").val();
        header = "<h3><i class='fas fa-user-cog'></i> &nbsp Update User Email</h3>";
        sub_msg = "<div class='su-confirm2'>This will permanently alter your user email</div>";
        w_type  = "New Login Email";
        details += "<div class='su-admin-warning-c'>" + ce + "</div>";
    }
    else if (model === "change_password")
    {
        header = "<h3><i class='fas fa-user-cog'></i> &nbsp Reset Password</h3>";
        sub_msg = "<div class='su-confirm2'>This will permanently alter your password</div>";
        w_type  = "Important Information";
        details += "<div class='su-admin-warning-i'>" + "If you proceed, you will no longer be allowed to login with your current credentials. You must use your new password to login." + "</div>";
    }
    else if (model === "payment")
    {
        header = "<h3><i class='fas fa-money-bill-alt'></i> &nbsp Update Payment Method</h3>";
        sub_msg = "<div class='su-confirm2' id='su-payment-sub-message'></div>";
        w_type  = "Important Information";
        details += "<div class='su-admin-warning-i' id='su-payment-sub-details'></div>";
    }
    else if (model === "hours")
    {
        var isSpecial   = $("#special_check").val();
        var weekdays    = $("#f_group_weekdays").val();
        var weekends    = $("#f_group_weekends").val();
        var mon         = decodeSuTime("mon");
        var sat         = decodeSuTime("sat");
        var tue         = "";
        var wed         = "";
        var thu         = "";
        var fri         = "";
        var sun         = "";
        var title       = "Hours of Operation";
        var hours1      = "";
        var hours2      = "";

        if (String(isSpecial) === "True") { title = $("#k_special_hours_input").val(); }
        if (String(weekdays) === "False")
        {
            tue = decodeSuTime("tue");
            wed = decodeSuTime("wed");
            thu = decodeSuTime("thu");
            fri = decodeSuTime("fri");
            hours1 += "<div class='su-admin-warning-i'><b>Monday: </b>" + mon + "</div>";
            hours1 += "<div class='su-admin-warning-i'><b>Tuesday: </b>" + tue + "</div>";
            hours1 += "<div class='su-admin-warning-i'><b>Wednesday: </b>" + wed + "</div>";
            hours1 += "<div class='su-admin-warning-i'><b>Thursday: </b>" + thu + "</div>";
            hours1 += "<div class='su-admin-warning-i'><b>Friday: </b>" + fri + "</div>";
        }
        else
        {
            hours1 += "<div class='su-admin-warning-i'><b>Weekdays: </b>" + mon + "</div>";
        }
        if (String(weekends) === "False")
        {
            sun = decodeSuTime('sun');
            hours2 += "<div class='su-admin-warning-i'><b>Saturday: </b>" + sat + "</div>";
            hours2 += "<div class='su-admin-warning-i'><b>Sunday: </b>" + sun + "</div>";
        }
        else
        {
            hours2 += "<div class='su-admin-warning-i'><b>Weekends: </b>" + sat + "</div>";
        }

        header = "<h3><i class='fas fa-clock'></i> &nbsp Update Business Hours</h3>";
        sub_msg = "<div class='su-confirm2'>This will alter the hours of operation</div>";
        w_type = "New Hours Of Operation";
        details += "<div class='su-admin-warning-p'>" + title + ":</div>";
        details += "<div class='su-admin-warning-i'>" + hours1 + "</div>";
        details += "<div class='su-admin-warning-i'>" + hours2 + "</div>";
    }

    html += "<div class='su-center su-width30'>";
    html += "<div class='su-confirm'>";
    html += "<div class='su-confirm-exit'><i class='fas fa-window-close' onClick=\"javascript: closeError();\"></i></div>";
    html += header;
    html += "<div class='su-confirm1'>Are you sure you want to proceed?</div>";
    html += sub_msg;
    html += "<div class='su-confirm-wrapper'>";
    html += "<div class='su-admin-warning-h'>" + w_type + "</div>";
    html += details;
    html += "</div>";
    html += "<div class='su-confirm-buttons'>";
    if (model === "about")
    {
        html += "<button type='button' onClick=\"javascript: submitAbout();\">Update</button>";
    }
    else
    {
        html += "<button type='button' onClick=\"javascript: submitEditor();\">Update</button>";
    }
    
    html += "<button type='button' onClick=\"javascript: closeError();\">Cancel</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#su-editor-builder").html(html);
    $("#su-editor-builder").hide();
    $("#su-editor-builder").removeClass("hidden");
    $("#su-editor-builder").fadeIn(500);
}

function selectAllModels()
{
    var model   = getSelectedModel();
    var count   = $("#model-count").val();
    var sList   = "~";
    count       = Number(count);
    for (var i = 0; i < count; i++)
    {
        $("#div_" + String(i)).addClass('su_ultimate_selector');
        $("#db_box_" + String(i)).prop("checked", true);
        sList += String(i);
        sList += "~";
    }
    $("#selected-db").val(sList);
    $("#model-del1").removeClass("su-btn-disabled");
    $("#modelDelBtn").prop("disabled", false);
}

function clearAllModels()
{
    var model   = getSelectedModel();
    var count   = $("#model-count").val();
    count       = Number(count);
    for (var i = 0; i < count; i++)
    {
        $("#div_" + String(i)).removeClass('su_ultimate_selector');
        $("#db_box_" + String(i)).prop("checked", false);
    }
    $("#selected-db").val("");
    $("#model-del1").addClass("su-btn-disabled");
    $("#modelDelBtn").prop("disabled", true);
}

function selectAllUsers()
{
    var model   = getSelectedUser();
    var count   = $("#user-count").val();
    var sList   = "~";
    count       = Number(count);
    for (var i = 0; i < count; i++)
    {
        $("#div1_" + String(i)).addClass('su_ultimate_selector');
        $("#usr_box_" + String(i)).prop("checked", true);
        sList += String(i);
        sList += "~";
    }
    $("#selected-usr").val(sList);
    $("#user-del1").removeClass("su-btn-disabled");
    $("#ursDelBtn").prop("disabled", false);
}

function clearAllUsers()
{
    var model   = getSelectedUser();
    var count   = $("#user-count").val();
    count       = Number(count);
    for (var i = 0; i < count; i++)
    {
        $("#div1_" + String(i)).removeClass('su_ultimate_selector');
        $("#usr_box_" + String(i)).prop("checked", false);
    }
    $("#selected-usr").val("");
    $("#user-del1").addClass("su-btn-disabled");
    $("#ursDelBtn").prop("disabled", true);
}

function closeEditor()
{
    $("#pop-up-builder").fadeOut(600);
}

function closeError()
{
    $("#su-editor-builder").fadeOut(600);
}

function openEditor(html)
{   $("#pop-up-builder").html(html);
    $("#pop-up-builder").hide();
    $("#pop-up-builder").removeClass('hidden');
    $("#pop-up-builder").fadeIn(600);
}

function suSoftClose()
{
    $("#su-editor-builder").fadeOut(600);
}

function suHardClose()
{
    $("#pop-up-builder").fadeOut(600);
    $("#su-editor-builder").fadeOut(600);
}

function suHardClose2()
{
    $("#about-editor-builder").fadeOut(500);
    $("#su-editor-builder").fadeOut(500);
}

function suCheckbox(trigger, target)
{
    trigger = String(trigger);
    target  = String(target);
    if ($(trigger).prop("checked") === true) { $(target).val("True"); }
    else { $(target).val("False"); }
}

function suSendNewAuth()
{
    $("#target_action").val("3");
    submitEditor();
}


function closeAboutError()
{
    $("#about-editor-builder").fadeOut(500);
}

function openSuDropMenu()
{
    var current = $("#su-carat").html();
    current = String(current);
    if (current === "<i class=\"fas fa-caret-down\"></i>")
    {
        $("#su-carat").html("<i class=\"fas fa-caret-up\"></i>");
        $("#su-drop-window").fadeOut(500);
    }
    else
    {
        $("#su-carat").html("<i class=\"fas fa-caret-down\"></i>");
        $("#su-drop-window").hide();
        $("#su-drop-window").removeClass('hidden');
        $("#su-drop-window").fadeIn(500);
    }
}

function renderEmailPage()
{
   window.location.href = "/email";
}

function returnToAdministrator()
{
    window.location.href = "/adminAlt";
}

function logout()
{
    window.location.href = "/logout";
}

function returnToLogin()
{
    window.location.href = "/admin";
}

function returnToIndex()
{
    window.location.href = "/";
}

function loadDBdata(blogs, products, images)
{
    var query_blogs     = $("#qblog").val();
    var query_products  = $("#qproduct").val();
    var query_images    = $("#qimage").val();
    query_blogs         = Number(query_blogs);
    query_products      = Number(query_products);
    query_images        = Number(query_images);
    if (query_blogs===0) { $("#s_blog").prop("disabled", true); $("#s_db_label_blog").addClass("low_opacity"); }
    if (query_products===0) { $("#s_product").prop("disabled", true); $("#s_db_label_product").addClass("low_opacity"); }
    if (query_images===0) { $("#s_image").prop("disabled", true); $("#s_db_label_image").addClass("low_opacity"); }
    if (query_blogs===1) { superLaunchBuilder("blog", blogs); $("#s_blog").click(); }
    else
    {
        if (query_products===1) { superLaunchBuilder("product", products); $("#s_product").click(); }
        else
        {
            if (query_images===1) { superLaunchBuilder("image", images); $("#s_image").click(); }
        }
    }
    if (query_blogs===0 && query_products===0 && query_images===0)
    {
        $("#modelPlusBtn").prop("disabled", true);
        $("#model-del2").addClass("su-btn-disabled");
        $("#mst_sel_btn_1").html("");
    }
}

function loadUserData(users, auths, questions)
{
    var query_perm  = $("#quserInclusive").val();
    var query_auth  = $("#qauth").val();
    var query_secu  = $("#qsecurity").val();
    query_perm      = Number(query_perm);
    query_auth      = Number(query_auth);
    query_secu      = Number(query_secu);
    if (query_perm===0) { $("#s_user").prop("disabled", true); $("#s_usr_label_users").addClass("low_opacity"); }
    if (query_auth===0) { $("#s_auth").prop("disabled", true); $("#s_usr_label_auths").addClass("low_opacity"); }
    if (query_secu===0) { $("#s_security").prop("disabled", true); $("#s_usr_label_quest").addClass("low_opacity"); }
    if (query_perm===1) { superUserLaunch("user", users); $("#s_user").click(); }
    else
    {
        if (query_auth===1) { superUserLaunch("auth", auths); $("#s_auth").click(); }
        else
        {
            if (query_secu===1) { superUserLaunch("question", questions); $("#s_security").click(); }
        }
    }
    if (query_perm===0 && query_auth===0 && query_secu===0)
    {
        $("#userPlusBtn").prop("disabled", true);
        $("#user-del2").addClass("su-btn-disabled");
        $("#mst_sel_btn_2").html("");
    }
}

function loadAdminData(company, payments)
{
    var query_comp  = $("#qcompany").val();
    var query_paym  = $("#qpayment").val();
    var query_abou  = $("#qabout").val();
    var query_maxi  = $("#qmax").val();
    var query_socm  = $("#qsocial").val();
    query_comp      = Number(query_comp);
    query_paym      = Number(query_paym);
    query_abou      = Number(query_abou);
    query_maxi      = Number(query_maxi);
    query_socm      = Number(query_socm);
    if (query_abou===0 && query_comp===0) { $("#s_admin_multi_1").prop("disabled", true); $("#s_admin_label_contact").addClass("low_opacity"); }
    if (query_paym===0) { $("#s_payment").prop("disabled", true); $("#s_admin_label_payment").addClass("low_opacity"); }
    if (query_maxi===0 && query_socm===0) { $("#s_admin_multi_2").prop("disabled", true); $("#s_admin_label_links").addClass("low_opacity"); }
    if (query_comp===1) { superAdminLaunch("contact", company); $("#s_admin_multi_1").click(); }
    if (query_abou===1 || query_comp===1)
    {
        superAdminLaunch('contact', company);
        if (query_abou===0) { $("#master_ultra_about_button").prop("disabled", true); }
        else if (query_comp===0)
        {
            $("#mas_ult_1").html("Address:");
            $("#mas_ult_2").html("Phone:");
            $("#mas_ult_3").html("Email:");
            $("#mas_ult_4").html("Hours:");
        }
    }
    else
    {
        if (query_paym===1) { superAdminLaunch("method", payments); $("#s_payment").click(); }
        else
        {
            if(query_maxi===1 || query_socm===1) { superAdminLaunch("links", company); $("#s_admin_label_links").click(); }
            if (query_maxi===0) { $("#mst_ult_admin_5").html("Images:"); }
            else if (query_socm===0)
            {
                $("#mst_ult_admin_6").prop("disabled", true);
                $("#mst_ult_admin_7").prop("disabled", true);
                $("#mst_ult_admin_8").prop("disabled", true);
            }
        }
    }
    if (query_comp===0&&query_paym===0&&query_abou===0&&query_maxi===0&&query_socm===0)
    {
        $("#master_admin_lockout").html("");
    }
}

function mirrorInput(trigger, target)
{
    var value = $(trigger).val();
    $(target).val(value);
}

function initializeAdmin(blogs, users, company, images, products, payments, auths, questions)
{
    var altered = $("#altered").val();
    altered = Number(altered);
    if (altered === 0)
    {
        loadDBdata(blogs, products, images);
        loadUserData(users, auths, questions);
        loadAdminData(company, payments); 
    }
    else if (altered === 1)
    {
        var mdl = $("#mm_mdl").val();
        var msg = $("#mm_msg").val();
        launchAlterMessage(msg);
        if (mdl === "blog") 
        { 
            $("#s_blog").click(); 
            superLaunchBuilder('blog', blogs);
            loadUserData(users, auths, questions);
            loadAdminData(company, payments); 
        }
        else if (mdl === "product") 
        { 
            $("#s_product").click(); 
            superLaunchBuilder('product', products);
            loadUserData(users, auths, questions);
            loadAdminData(company, payments); 
        }
        else if (mdl === "image") 
        { 
            $("#s_image").click(); 
            superLaunchBuilder('image', images);
            loadUserData(users, auths, questions);
            loadAdminData(company, payments); 
        }
        else if (mdl === "permission")
        {
            $("#s_user").click();
            superUserLaunch('user', users);
            loadDBdata(blogs, products, images);
            loadAdminData(company, payments); 
        }
        else if (mdl === "auth")
        {
            $("#s_auth").click();
            superUserLaunch('auth', auths);
            loadDBdata(blogs, products, images);
            loadAdminData(company, payments); 
        }
        else if (mdl === "security")
        {
            $("#s_security").click();
            superUserLaunch('question', questions);
            loadDBdata(blogs, products, images);
            loadAdminData(company, payments); 
        }
        else if (mdl === "payment")
        {
            $("#s_payment").click();
            superAdminLaunch('method', payments);
            loadDBdata(blogs, products, images);
            loadUserData(users, auths, questions);
        }
        else if (mdl==="facebook" || mdl==="twitter" || mdl==="instagram" || mdl==="max_images")
        {
            $("#s_admin_multi_2").click();
            superAdminLaunch('links', company);
            loadDBdata(blogs, products, images);
            loadUserData(users, auths, questions);
        }
        else if (mdl==="about" || mdl==='hours' || mdl==='address' || mdl==='phone' || mdl==="email")
        {
            $("#s_admin_multi_1").click();
            superAdminLaunch('contact', company);
            loadDBdata(blogs, products, images);
            loadUserData(users, auths, questions);
        }
        else
        {
            loadDBdata(blogs, products, images);
            loadUserData(users, auths, questions);
            loadAdminData(company, payments); 
        }
    }   
}

function validateReg1()
{
    var errors  = false;
    var m       = [];
    var code    = $("#security_code").val();
    var email   = $("#email").val();
    var fname   = $("#fname").val();
    var lname   = $("#lname").val();
    var sq1     = $("#question1").val();
    var sq2     = $("#question2").val();
    var an1     = $("#answer1").val();
    var an2     = $("#answer2").val();
    var pw1     = $("#password1").val();
    var pw2     = $("#password2").val();
    if (code.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must enter the authorization code that was emailed to you to proceed")
        errors = true;
    }
    else if (email.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must confirm your email to proceed")
        errors = true;
    }
    else if (validate_email(email) === false)
    {
        m.push("Invalid Email");
        m.push("You must enter a valid email address to proceed");
        errors = true;
    }
    else if (fname.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must enter your first name to proceed")
        errors = true;
    }
    else if (lname.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must enter your last name to proceed")
        errors = true;
    }
    else if (an1.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must provide an answer to security question 1 to proceed")
        errors = true;
    }
    else if (an2.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must provide an answer to security question 2 to proceed")
        errors = true;
    }
    else if (sq1 === sq2)
    {
        m.push("Duplicate Security Questions");
        m.push("You cannot select the same security questions. Please change question 1 or question 2");
        errors = true;
    }
    else if (pw1.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must provide a valid password to proceed")
        errors = true;
    }
    else if (pw2.length === 0)
    {
        m.push("Empty Field Detected");
        m.push("You must confirm your new password to proceed")
        errors = true;
    }
    else if (pw1 !== pw2)
    {
        errors = true;
        m.push("Passwords Do Not Match!");
        m.push("The passwwords must match to proceed");
    }
    if (errors === true) { generateErrorWindow(m); }
    else { $("#registration_form").submit(); }
}

function loadRecoveryWindow()
{
    var html = "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-closer'><a href=\"javascript: closeRecover();\"><i class='fas fa-window-close su-closerm'></i></a></div>";
    html += "<h3><i class='fas fa-unlock-alt'> &nbsp<span class='recover-st'>Password Recovery</span></i></h3>";
    html += "<div class='recover-email-label'>Enter the email associated with your account:</div>";
    html += "<form action='/launchSecure' method='POST' id='recovery_form'>";
    html += "<input type='email' name='sec_email' id='sec_email' placeholder='Email'>";
    html += "</form>";
    html += "<div class='rec-email-btn'>";
    html += "<button type='button' onClick=\"javascript: validateRecoveryEmail();\">Continue</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#recover-space").html(html);
    $("#recover-space").hide();
    $("#recover-space").removeClass("hidden");
    $("#recover-space").fadeIn(500);
}

function validateRecoveryEmail()
{
    var has_error   = false;
    var email       = $("#sec_email").val();
    var m           = [];
    if (email.length === 0)
    {
        has_error = true;
        m.push("Empty Field Detected");
        m.push("You must enter the password associated with your account to proceed");
    }
    else if (validate_email(email) === false)
    {
        has_error = true;
        m.push("Invalid Email");
        m.push("You must enter a valid email address to proceed");
    }
    if (has_error === false)
    {
        $("#recovery_form").submit();
    }
    else
    {
        generateErrorWindow(m);
    }
}

function closeRecover()
{
    $("#recover-space").fadeOut(500);
}

function validateRegistration()
{
    var sq1         = $("#sq1").val();
    var sq2         = $("#sq2").val();
    var an1         = $("#answer1").val();
    var an2         = $("#answer2").val();
    var has_error   = false;
    var m           = [];
    if (sq1 === sq2)
    {
        has_error = true;
        m.push("Duplicate Detected");
        m.push("You cannot select the same question");
    }
    else if (an1.length === 0)
    {
        has_error = true;
        m.push("Empty Field Detected");
        m.push("You must provide an answer to security question 1 to proceed");
    }
    else if (an2.length === 0)
    {
        has_error = true;
        m.push("Empty Field Detected");
        m.push("You must provide an answer to security question 2 to proceed");
    }
    if (has_error === true) { generateErrorWindow(m); }
    else 
    { 
        var sq1 = $("#sq1").val();
        var sq2 = $("#sq2").val();
        $("#question1").val(sq1);
        $("#question2").val(sq2);
        $("#security_form").submit(); 
    }
}

function checkRegistrationFields()
{
    html = "";
    html += "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-closer-reg'><a href=\"javascript: closeError();\"><i class='fas fa-window-close su-err'></i></a></div>";
    html += "<div class='su-error-header'><i class='fas fa-exclamation-triangle'></i> <span id='su-error-header'>Message</span></div>";
    html += "<div class='err0' id='err0'>Are You Sure You Want To Logout?</div>";
    html += "<div class='err1' id='err1'>You have not completed registration and will be redirected to this page each time you login to the administration site</div>";
    html += "<div class='su-error-btns'>";
    html += "<button onClick=\"javascript: logout();\">Continue Logout</button>";
    html += "<button onClick=\"javascript: closeError();\">Complete Registration</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#su-editor-builder").html(html);
    $("#su-editor-builder").hide();
    $("#su-editor-builder").removeClass('hidden');
    $("#su-editor-builder").fadeIn(600);
}

function initValidateIdenity()
{
    m = [];
    m.push("Identity Verification Failed");
    m.push("You provided incorrect answers to the security questions")
    generateErrorWindow(m);
}

function validateRecovery2()
{
    var answer1 = $("#answer1").val();
    var answer2 = $("#answer2").val();
    var errors  = false;
    var m       = [];
    if (answer1.length === 0)
    {
        errors = true;
        m.push("Empty Field Detected");
        m.push("You must answer security question 1 to proceed");
    }
    else if (answer2.length === 0)
    {
        errors = true;
        m.push("Empty Field Detected");
        m.push("You must answer security question 2 to proceed");
    }
    if (errors === false) { $("#recovery_form").submit(); }
    else { generateErrorWindow(m); }
}

function confirmAndValidateNewPassword()
{
    var errors  = false;
    var m       = [];
    var email   = $("#email").val();
    var pw1     = $("#password1").val();
    var pw2     = $("#password2").val();
    var code    = $("#code").val();
    if (email.length === 0)
    {
        errors = true;
        m.push("Empty Field Detected");
        m.push("You must enter the email associated with your account");
    }
    else if (validate_email(email) === false)
    {
        errors = true;
        m.push("Invalid Email");
        m.push("You must enter a valid email to proceed");
    }
    else if (pw1.length === 0)
    {
        errors = true;
        m.push("Empty Field Detected");
        m.push("You must enter a new password to proceed");
    }
    else if (pw2.length === 0)
    {
        errors = true;
        m.push("Empty Field Detected");
        m.push("You must confirm your new password to proceed");
    }
    else if (pw1 !== pw2)
    {
        errors = true;
        m.push("The Passwords Do Not Match!");
        m.push(" ");
    }
    else if (code.length === 0)
    {
        errors = true;
        m.push("Empty Field Detected");
        m.push("You must enter the security code that was sent to the email that is associated with your Natural Woman Salon account");
    }
    if (errors === true) { generateErrorWindow(m); }
    else { $("#su_login_form").submit(); }
}

function initLaunchSecure()
{
    var m = [];
    var html = "<div class='su-center su-width30'>";
    html += "<div class='su-general'>";
    html += "<div class='su-closer'><a href=\"javascript: closeRecover();\"><i class='fas fa-window-close su-closerm'></i></a></div>";
    html += "<h3><i class='fas fa-unlock-alt'> &nbsp<span class='recover-st'>Password Recovery</span></i></h3>";
    html += "<div class='recover-email-label'>Enter the email assicuated with your account:</div>";
    html += "<form action='/launchSecure' method='POST' id='recovery_form'>";
    html += "<input type='email' name='sec_email' id='sec_email' placeholder='Email'>";
    html += "</form>";
    html += "<div class='rec-email-btn'>";
    html += "<button type='button' onClick=\"javascript: validateRecoveryEmail();\">Continue</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $("#recover-space").html(html);
    m.push("No Account Found");
    m.push("Our records indicate that no account exist for the email address that you've entered");
    generateErrorWindow(m);
}

function loadRecoveryErrors5()
{
    var error_msg = $("#errors").val();
    var m = [];
    m.push(error_msg);
    m.push("Please correct the error to proceed");
    generateErrorWindow(m);
}

function lauchRecoverySuccessWindow()
{
    $("#recover-space").hide();
    $("#recover-space").removeClass("hidden");
    $("#recover-space").fadeIn(500);
}

function loadRegistrationErrors(message)
{
    var m = [];
    m.push("Authorization Unsuccessful");
    m.push(message);
    generateErrorWindow(m);
}

function showRegistrationSuccessMessage()
{
    var m = [];
    m.push("Registration Success");
    m.push("You have successfully completed registration. You can now login using your newly created credentials");
    generateErrorWindow(m);
}

$( window ).on( "load", initialize);

$(document).ready(function() {
    $("#a0").click(function() {
        $("#btn0").addClass("selected-nav-item");
        $("#master-content").fadeOut(500, function() {
            window.location.href = "/home"; 
        });
    });
    $("#a1").click(function() {
        $("#btn1").addClass("selected-nav-item");
        $("#master-content").fadeOut(500, function() {
            window.location.href = "/about"; 
        });
    });
    $("#a2").click(function() {
        $("#btn2").addClass("selected-nav-item");
        $("#master-content").fadeOut(500, function() {
            window.location.href = "/gallery"; 
        });
    });
    $("#a3").click(function() {
        $("#btn3").addClass("selected-nav-item");
        $("#master-content").fadeOut(500, function() {
            window.location.href = "/pricing";
        });
    });
    $("#a4").click(function() {
        $("#btn4").addClass("selected-nav-item");
        $("#master-content").fadeOut(500, function() {
            window.location.href = "/blog";
        });
    });
    $("#a5").click(function() {
        $("#btn5").addClass("selected-nav-item");
        $("#master-content").fadeOut(500, function() {
            window.location.href = "/contact";
        });
    });
});

















var Conclave=(function(){
    var buArr =[],arlen;
    return {
        init:function(){
            this.addCN();this.clickReg();
        },
        addCN:function(){
            var i = 0;
            var len = $("#d_size").val();
            var buarr=["holder_bu_awayL2","holder_bu_awayL1","holder_bu_center","holder_bu_awayR1","holder_bu_awayR2"]
            var hide_len = len - 5;
            if (hide_len > 0)
            {
                for (i = 0; i < hide_len; i++)
                {
                    buarr.push("holder_bu_hide");
                }
            }
            for(i=1;i<=buarr.length;++i){
                $("#bu"+i).removeClass().addClass(buarr[i-1]+" holder_bu");
                if (i > 5)
                {
                    $("bu"+i).removeClass().addClass(buarr[i-1]);
                }
            }
        },
        clickReg:function(){
            $(".holder_bu").each(function(){
                buArr.push($(this).attr('class'))
            });
            arlen=buArr.length;
            for(var i=0;i<arlen;++i){
                buArr[i]=buArr[i].replace(" holder_bu","")
            };
            $(".holder_bu").click(function(buid){
                var me=this,id=this.id||buid,joId=$("#"+id),joCN=joId.attr("class").replace(" holder_bu","");
                var cpos=buArr.indexOf(joCN),mpos=buArr.indexOf("holder_bu_center");
                if(cpos!=mpos){
                    tomove=cpos>mpos?arlen-cpos+mpos:mpos-cpos;
                    while(tomove){
                        var t=buArr.shift();
                        buArr.push(t);
                        for(var i=1;i<=arlen;++i){
                            $("#bu"+i).removeClass().addClass(buArr[i-1]+" holder_bu");
                        }
                        --tomove;
                    }
                }
            })
        },
        auto:function(){
            for(i=1;i<=1;++i){
                $(".holder_bu").delay(4000).trigger('click',"bu"+i).delay(4000);
                console.log("called");
            }
        }
    };
})();

$(document).ready(function(){
    window['conclave']=Conclave;
    Conclave.init();
})