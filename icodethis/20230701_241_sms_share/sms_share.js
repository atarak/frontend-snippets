// one time activity on page load
window.onload = function () {
    createDropdown();
}

function createDropdown() {
    createCountryElements();
    setDropdownDefault();
    createDropdownChevron();
}

////////////////////////////
// interactive functions
////////////////////////////
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') & !event.target.matches("#myInput")) {

        if (event.target.matches(".country-item")) {
            setCountry(event.target);
        }

        closeDropdownMenuItems();

        if (event.target.matches("#copy-text")) {
            copyContent();
        }

        if (event.target.matches("#send")) {
            clickSend();
        }
    }
}

function clickSend() {
    if (!formIsValid()) {
        displayValidationReminders();
        return;
    }
    postSuccessfulSend();
}

function formIsValid() {
    return document.getElementById("phoneNumber").checkValidity();
}

function displayValidationReminders() {
    var numberFormat = document.getElementById("phone-format");
    numberFormat.classList.add("failure");
    setTimeout(function () { numberFormat.classList.toggle("failure"); }, 1000);
}

function postSuccessfulSend() {
    var cardComplete = document.getElementById("card-complete");
    var cardContent = document.getElementById("card-content");
    cardComplete.classList.toggle("hide");
    cardContent.classList.toggle("hide");
    setTimeout(function () { cardComplete.classList.toggle("hide"); cardContent.classList.toggle("hide") }, 2000);
}

async function copyContent() {
    // https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/
    try {
        var copyText = document.getElementById('text-to-copy').innerHTML;
        await navigator.clipboard.writeText(copyText);
        // console.log('Content copied to clipboard');

        var copyBtn = document.getElementById("copy-text");
        copyBtn.textContent = "Copied!";
        copyBtn.classList.toggle("success");
        setTimeout(function () { copyBtn.innerHTML = "Copy"; copyBtn.classList.toggle("success"); }, 5000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

function filterFunction() {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
    var input, filter, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByClassName("country-item");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText || a.innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

////////////////////////////
// setter functions
////////////////////////////
function setCountry(ele) {
    setCountryPhoneNum(ele);
    setCountryFlag(ele);
}

function setCountryPhoneNum(ele) {
    var phoneNum = document.getElementById("countryCode");
    phoneNum.value = "+" + ele.dataset.ccode;
}

function setCountryFlag(ele) {
    var optionSpan = ele.querySelector(".country-flag");
    var selSpan = document.querySelector("#country-sel-flag");
    selSpan.classList = optionSpan.classList;
}

////////////////////////////
// utility functions
////////////////////////////
function toggleShowHide() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function closeDropdownMenuItems() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

////////////////////////////
// dataset functions
////////////////////////////

function setDropdownDefault() {
    var countryList = document.getElementsByClassName("country-item");
    var firstCountry = countryList[228] || countryList[3];
    var countrySelBtn = document.getElementById("country-sel-btn");

    var element = document.createElement("span");
    element.id = "country-sel-flag";
    element.classList.add("dropbtn");
    countrySelBtn.appendChild(element);

    setCountryFlag(firstCountry);
    setCountryPhoneNum(firstCountry);
}

function createCountryElements() {
    var dataset = getCountryData();
    dataset.forEach(createCountryElement);
}

function createDropdownChevron() {
    var countrySelBtn = document.getElementById("country-sel-btn");
    var chevronIcon = document.createElement("span");
    chevronIcon.classList.add("fa");
    chevronIcon.classList.add("fa-chevron-down");
    chevronIcon.classList.add("dropbtn");
    countrySelBtn.appendChild(chevronIcon);
}

function createCountryElement(datapoint) {
    var element = document.createElement("button");
    element.classList.add("country-item");
    element.dataset.ccode = datapoint.ccode;
    element.textContent = datapoint.name;
    element.ariaLabel = "Select country code for " + datapoint.name + " (" + datapoint.ccode + ")";
    element.prepend(createCountryFlagSpan(datapoint));

    document.getElementById('myDropdown').appendChild(element);
}

function createCountryFlagSpan(datapoint) {
    var flagSpan = document.createElement("span");
    flagSpan.classList = "country-flag fi";
    flagSpan.classList.add("fi-" + datapoint.abbrev.toLowerCase());
    flagSpan.ariaLabel = datapoint.abbrev + " flag";
    return flagSpan;
}

function getCountryData() {
    // https://countrycode.org/
    return [
        { 'name': 'Afghanistan', 'ccode': '93', 'abbrev': 'AF' },
        { 'name': 'Albania', 'ccode': '355', 'abbrev': 'AL' },
        { 'name': 'Algeria', 'ccode': '213', 'abbrev': 'DZ' },
        { 'name': 'American Samoa', 'ccode': '1-684', 'abbrev': 'AS' },
        { 'name': 'Andorra', 'ccode': '376', 'abbrev': 'AD' },
        { 'name': 'Angola', 'ccode': '244', 'abbrev': 'AO' },
        { 'name': 'Anguilla', 'ccode': '1-264', 'abbrev': 'AI' },
        { 'name': 'Antarctica', 'ccode': '672', 'abbrev': 'AQ' },
        { 'name': 'Antigua and Barbuda', 'ccode': '1-268', 'abbrev': 'AG' },
        { 'name': 'Argentina', 'ccode': '54', 'abbrev': 'AR' },
        { 'name': 'Armenia', 'ccode': '374', 'abbrev': 'AM' },
        { 'name': 'Aruba', 'ccode': '297', 'abbrev': 'AW' },
        { 'name': 'Australia', 'ccode': '61', 'abbrev': 'AU' },
        { 'name': 'Austria', 'ccode': '43', 'abbrev': 'AT' },
        { 'name': 'Azerbaijan', 'ccode': '994', 'abbrev': 'AZ' },
        { 'name': 'Bahamas', 'ccode': '1-242', 'abbrev': 'BS' },
        { 'name': 'Bahrain', 'ccode': '973', 'abbrev': 'BH' },
        { 'name': 'Bangladesh', 'ccode': '880', 'abbrev': 'BD' },
        { 'name': 'Barbados', 'ccode': '1-246', 'abbrev': 'BB' },
        { 'name': 'Belarus', 'ccode': '375', 'abbrev': 'BY' },
        { 'name': 'Belgium', 'ccode': '32', 'abbrev': 'BE' },
        { 'name': 'Belize', 'ccode': '501', 'abbrev': 'BZ' },
        { 'name': 'Benin', 'ccode': '229', 'abbrev': 'BJ' },
        { 'name': 'Bermuda', 'ccode': '1-441', 'abbrev': 'BM' },
        { 'name': 'Bhutan', 'ccode': '975', 'abbrev': 'BT' },
        { 'name': 'Bolivia', 'ccode': '591', 'abbrev': 'BO' },
        { 'name': 'Bosnia and Herzegovina', 'ccode': '387', 'abbrev': 'BA' },
        { 'name': 'Botswana', 'ccode': '267', 'abbrev': 'BW' },
        { 'name': 'Brazil', 'ccode': '55', 'abbrev': 'BR' },
        { 'name': 'British Indian Ocean Territory', 'ccode': '246', 'abbrev': 'IO' },
        { 'name': 'British Virgin Islands', 'ccode': '1-284', 'abbrev': 'VG' },
        { 'name': 'Brunei', 'ccode': '673', 'abbrev': 'BN' },
        { 'name': 'Bulgaria', 'ccode': '359', 'abbrev': 'BG' },
        { 'name': 'Burkina Faso', 'ccode': '226', 'abbrev': 'BF' },
        { 'name': 'Myanmar', 'ccode': '95', 'abbrev': 'MM' },
        { 'name': 'Burundi', 'ccode': '257', 'abbrev': 'BI' },
        { 'name': 'Cambodia', 'ccode': '855', 'abbrev': 'KH' },
        { 'name': 'Cameroon', 'ccode': '237', 'abbrev': 'CM' },
        { 'name': 'Canada', 'ccode': '1', 'abbrev': 'CA' },
        { 'name': 'Cape Verde', 'ccode': '238', 'abbrev': 'CV' },
        { 'name': 'Cayman Islands', 'ccode': '1-345', 'abbrev': 'KY' },
        { 'name': 'Central African Republic', 'ccode': '236', 'abbrev': 'CF' },
        { 'name': 'Chad', 'ccode': '235', 'abbrev': 'TD' },
        { 'name': 'Chile', 'ccode': '56', 'abbrev': 'CL' },
        { 'name': 'China', 'ccode': '86', 'abbrev': 'CN' },
        { 'name': 'Christmas Island', 'ccode': '61', 'abbrev': 'CX' },
        { 'name': 'Cocos Islands', 'ccode': '61', 'abbrev': 'CC' },
        { 'name': 'Colombia', 'ccode': '57', 'abbrev': 'CO' },
        { 'name': 'Comoros', 'ccode': '269', 'abbrev': 'KM' },
        { 'name': 'Republic of the Congo', 'ccode': '242', 'abbrev': 'CG' },
        { 'name': 'Democratic Republic of the Congo', 'ccode': '243', 'abbrev': 'CD' },
        { 'name': 'Cook Islands', 'ccode': '682', 'abbrev': 'CK' },
        { 'name': 'Costa Rica', 'ccode': '506', 'abbrev': 'CR' },
        { 'name': 'Croatia', 'ccode': '385', 'abbrev': 'HR' },
        { 'name': 'Cuba', 'ccode': '53', 'abbrev': 'CU' },
        { 'name': 'Curacao', 'ccode': '599', 'abbrev': 'CW' },
        { 'name': 'Cyprus', 'ccode': '357', 'abbrev': 'CY' },
        { 'name': 'Czech Republic', 'ccode': '420', 'abbrev': 'CZ' },
        { 'name': 'Denmark', 'ccode': '45', 'abbrev': 'DK' },
        { 'name': 'Djibouti', 'ccode': '253', 'abbrev': 'DJ' },
        { 'name': 'Dominica', 'ccode': '1-767', 'abbrev': 'DM' },
        { 'name': 'Dominican Republic', 'ccode': '1-809, 1-829, 1-849', 'abbrev': 'DO' },
        { 'name': 'East Timor', 'ccode': '670', 'abbrev': 'TL' },
        { 'name': 'Ecuador', 'ccode': '593', 'abbrev': 'EC' },
        { 'name': 'Egypt', 'ccode': '20', 'abbrev': 'EG' },
        { 'name': 'El Salvador', 'ccode': '503', 'abbrev': 'SV' },
        { 'name': 'Equatorial Guinea', 'ccode': '240', 'abbrev': 'GQ' },
        { 'name': 'Eritrea', 'ccode': '291', 'abbrev': 'ER' },
        { 'name': 'Estonia', 'ccode': '372', 'abbrev': 'EE' },
        { 'name': 'Ethiopia', 'ccode': '251', 'abbrev': 'ET' },
        { 'name': 'Falkland Islands', 'ccode': '500', 'abbrev': 'FK' },
        { 'name': 'Faroe Islands', 'ccode': '298', 'abbrev': 'FO' },
        { 'name': 'Fiji', 'ccode': '679', 'abbrev': 'FJ' },
        { 'name': 'Finland', 'ccode': '358', 'abbrev': 'FI' },
        { 'name': 'France', 'ccode': '33', 'abbrev': 'FR' },
        { 'name': 'French Polynesia', 'ccode': '689', 'abbrev': 'PF' },
        { 'name': 'Gabon', 'ccode': '241', 'abbrev': 'GA' },
        { 'name': 'Gambia', 'ccode': '220', 'abbrev': 'GM' },
        { 'name': 'Georgia', 'ccode': '995', 'abbrev': 'GE' },
        { 'name': 'Germany', 'ccode': '49', 'abbrev': 'DE' },
        { 'name': 'Ghana', 'ccode': '233', 'abbrev': 'GH' },
        { 'name': 'Gibraltar', 'ccode': '350', 'abbrev': 'GI' },
        { 'name': 'Greece', 'ccode': '30', 'abbrev': 'GR' },
        { 'name': 'Greenland', 'ccode': '299', 'abbrev': 'GL' },
        { 'name': 'Grenada', 'ccode': '1-473', 'abbrev': 'GD' },
        { 'name': 'Guam', 'ccode': '1-671', 'abbrev': 'GU' },
        { 'name': 'Guatemala', 'ccode': '502', 'abbrev': 'GT' },
        { 'name': 'Guernsey', 'ccode': '44-1481', 'abbrev': 'GG' },
        { 'name': 'Guinea', 'ccode': '224', 'abbrev': 'GN' },
        { 'name': 'Guinea-Bissau', 'ccode': '245', 'abbrev': 'GW' },
        { 'name': 'Guyana', 'ccode': '592', 'abbrev': 'GY' },
        { 'name': 'Haiti', 'ccode': '509', 'abbrev': 'HT' },
        { 'name': 'Honduras', 'ccode': '504', 'abbrev': 'HN' },
        { 'name': 'Hong Kong', 'ccode': '852', 'abbrev': 'HK' },
        { 'name': 'Hungary', 'ccode': '36', 'abbrev': 'HU' },
        { 'name': 'Iceland', 'ccode': '354', 'abbrev': 'IS' },
        { 'name': 'India', 'ccode': '91', 'abbrev': 'IN' },
        { 'name': 'Indonesia', 'ccode': '62', 'abbrev': 'ID' },
        { 'name': 'Iran', 'ccode': '98', 'abbrev': 'IR' },
        { 'name': 'Iraq', 'ccode': '964', 'abbrev': 'IQ' },
        { 'name': 'Ireland', 'ccode': '353', 'abbrev': 'IE' },
        { 'name': 'Isle of Man', 'ccode': '44-1624', 'abbrev': 'IM' },
        { 'name': 'Israel', 'ccode': '972', 'abbrev': 'IL' },
        { 'name': 'Italy', 'ccode': '39', 'abbrev': 'IT' },
        { 'name': 'Ivory Coast', 'ccode': '225', 'abbrev': 'CI' },
        { 'name': 'Jamaica', 'ccode': '1-876', 'abbrev': 'JM' },
        { 'name': 'Japan', 'ccode': '81', 'abbrev': 'JP' },
        { 'name': 'Jersey', 'ccode': '44-1534', 'abbrev': 'JE' },
        { 'name': 'Jordan', 'ccode': '962', 'abbrev': 'JO' },
        { 'name': 'Kazakhstan', 'ccode': '7', 'abbrev': 'KZ' },
        { 'name': 'Kenya', 'ccode': '254', 'abbrev': 'KE' },
        { 'name': 'Kiribati', 'ccode': '686', 'abbrev': 'KI' },
        { 'name': 'Kosovo', 'ccode': '383', 'abbrev': 'XK' },
        { 'name': 'Kuwait', 'ccode': '965', 'abbrev': 'KW' },
        { 'name': 'Kyrgyzstan', 'ccode': '996', 'abbrev': 'KG' },
        { 'name': 'Laos', 'ccode': '856', 'abbrev': 'LA' },
        { 'name': 'Latvia', 'ccode': '371', 'abbrev': 'LV' },
        { 'name': 'Lebanon', 'ccode': '961', 'abbrev': 'LB' },
        { 'name': 'Lesotho', 'ccode': '266', 'abbrev': 'LS' },
        { 'name': 'Liberia', 'ccode': '231', 'abbrev': 'LR' },
        { 'name': 'Libya', 'ccode': '218', 'abbrev': 'LY' },
        { 'name': 'Liechtenstein', 'ccode': '423', 'abbrev': 'LI' },
        { 'name': 'Lithuania', 'ccode': '370', 'abbrev': 'LT' },
        { 'name': 'Luxembourg', 'ccode': '352', 'abbrev': 'LU' },
        { 'name': 'Macau', 'ccode': '853', 'abbrev': 'MO' },
        { 'name': 'Macedonia', 'ccode': '389', 'abbrev': 'MK' },
        { 'name': 'Madagascar', 'ccode': '261', 'abbrev': 'MG' },
        { 'name': 'Malawi', 'ccode': '265', 'abbrev': 'MW' },
        { 'name': 'Malaysia', 'ccode': '60', 'abbrev': 'MY' },
        { 'name': 'Maldives', 'ccode': '960', 'abbrev': 'MV' },
        { 'name': 'Mali', 'ccode': '223', 'abbrev': 'ML' },
        { 'name': 'Malta', 'ccode': '356', 'abbrev': 'MT' },
        { 'name': 'Marshall Islands', 'ccode': '692', 'abbrev': 'MH' },
        { 'name': 'Mauritania', 'ccode': '222', 'abbrev': 'MR' },
        { 'name': 'Mauritius', 'ccode': '230', 'abbrev': 'MU' },
        { 'name': 'Mayotte', 'ccode': '262', 'abbrev': 'YT' },
        { 'name': 'Mexico', 'ccode': '52', 'abbrev': 'MX' },
        { 'name': 'Micronesia', 'ccode': '691', 'abbrev': 'FM' },
        { 'name': 'Moldova', 'ccode': '373', 'abbrev': 'MD' },
        { 'name': 'Monaco', 'ccode': '377', 'abbrev': 'MC' },
        { 'name': 'Mongolia', 'ccode': '976', 'abbrev': 'MN' },
        { 'name': 'Montenegro', 'ccode': '382', 'abbrev': 'ME' },
        { 'name': 'Montserrat', 'ccode': '1-664', 'abbrev': 'MS' },
        { 'name': 'Morocco', 'ccode': '212', 'abbrev': 'MA' },
        { 'name': 'Mozambique', 'ccode': '258', 'abbrev': 'MZ' },
        { 'name': 'Namibia', 'ccode': '264', 'abbrev': 'NA' },
        { 'name': 'Nauru', 'ccode': '674', 'abbrev': 'NR' },
        { 'name': 'Nepal', 'ccode': '977', 'abbrev': 'NP' },
        { 'name': 'Netherlands', 'ccode': '31', 'abbrev': 'NL' },
        { 'name': 'Netherlands Antilles', 'ccode': '599', 'abbrev': 'AN' },
        { 'name': 'New Caledonia', 'ccode': '687', 'abbrev': 'NC' },
        { 'name': 'New Zealand', 'ccode': '64', 'abbrev': 'NZ' },
        { 'name': 'Nicaragua', 'ccode': '505', 'abbrev': 'NI' },
        { 'name': 'Niger', 'ccode': '227', 'abbrev': 'NE' },
        { 'name': 'Nigeria', 'ccode': '234', 'abbrev': 'NG' },
        { 'name': 'Niue', 'ccode': '683', 'abbrev': 'NU' },
        { 'name': 'Northern Mariana Islands', 'ccode': '1-670', 'abbrev': 'MP' },
        { 'name': 'North Korea', 'ccode': '850', 'abbrev': 'KP' },
        { 'name': 'Norway', 'ccode': '47', 'abbrev': 'NO' },
        { 'name': 'Oman', 'ccode': '968', 'abbrev': 'OM' },
        { 'name': 'Pakistan', 'ccode': '92', 'abbrev': 'PK' },
        { 'name': 'Palau', 'ccode': '680', 'abbrev': 'PW' },
        { 'name': 'Palestine', 'ccode': '970', 'abbrev': 'PS' },
        { 'name': 'Panama', 'ccode': '507', 'abbrev': 'PA' },
        { 'name': 'Papua New Guinea', 'ccode': '675', 'abbrev': 'PG' },
        { 'name': 'Paraguay', 'ccode': '595', 'abbrev': 'PY' },
        { 'name': 'Peru', 'ccode': '51', 'abbrev': 'PE' },
        { 'name': 'Philippines', 'ccode': '63', 'abbrev': 'PH' },
        { 'name': 'Pitcairn', 'ccode': '64', 'abbrev': 'PN' },
        { 'name': 'Poland', 'ccode': '48', 'abbrev': 'PL' },
        { 'name': 'Portugal', 'ccode': '351', 'abbrev': 'PT' },
        { 'name': 'Puerto Rico', 'ccode': '1-787, 1-939', 'abbrev': 'PR' },
        { 'name': 'Qatar', 'ccode': '974', 'abbrev': 'QA' },
        { 'name': 'Reunion', 'ccode': '262', 'abbrev': 'RE' },
        { 'name': 'Romania', 'ccode': '40', 'abbrev': 'RO' },
        { 'name': 'Russia', 'ccode': '7', 'abbrev': 'RU' },
        { 'name': 'Rwanda', 'ccode': '250', 'abbrev': 'RW' },
        { 'name': 'Saint Barthelemy', 'ccode': '590', 'abbrev': 'BL' },
        { 'name': 'Samoa', 'ccode': '685', 'abbrev': 'WS' },
        { 'name': 'San Marino', 'ccode': '378', 'abbrev': 'SM' },
        { 'name': 'Sao Tome and Principe', 'ccode': '239', 'abbrev': 'ST' },
        { 'name': 'Saudi Arabia', 'ccode': '966', 'abbrev': 'SA' },
        { 'name': 'Senegal', 'ccode': '221', 'abbrev': 'SN' },
        { 'name': 'Serbia', 'ccode': '381', 'abbrev': 'RS' },
        { 'name': 'Seychelles', 'ccode': '248', 'abbrev': 'SC' },
        { 'name': 'Sierra Leone', 'ccode': '232', 'abbrev': 'SL' },
        { 'name': 'Singapore', 'ccode': '65', 'abbrev': 'SG' },
        { 'name': 'Sint Maarten', 'ccode': '1-721', 'abbrev': 'SX' },
        { 'name': 'Slovakia', 'ccode': '421', 'abbrev': 'SK' },
        { 'name': 'Slovenia', 'ccode': '386', 'abbrev': 'SI' },
        { 'name': 'Solomon Islands', 'ccode': '677', 'abbrev': 'SB' },
        { 'name': 'Somalia', 'ccode': '252', 'abbrev': 'SO' },
        { 'name': 'South Africa', 'ccode': '27', 'abbrev': 'ZA' },
        { 'name': 'South Korea', 'ccode': '82', 'abbrev': 'KR' },
        { 'name': 'South Sudan', 'ccode': '211', 'abbrev': 'SS' },
        { 'name': 'Spain', 'ccode': '34', 'abbrev': 'ES' },
        { 'name': 'Sri Lanka', 'ccode': '94', 'abbrev': 'LK' },
        { 'name': 'Saint Helena', 'ccode': '290', 'abbrev': 'SH' },
        { 'name': 'Saint Kitts and Nevis', 'ccode': '1-869', 'abbrev': 'KN' },
        { 'name': 'Saint Lucia', 'ccode': '1-758', 'abbrev': 'LC' },
        { 'name': 'Saint Martin', 'ccode': '590', 'abbrev': 'MF' },
        { 'name': 'Saint Pierre and Miquelon', 'ccode': '508', 'abbrev': 'PM' },
        { 'name': 'Saint Vincent and the Grenadines', 'ccode': '1-784', 'abbrev': 'VC' },
        { 'name': 'Sudan', 'ccode': '249', 'abbrev': 'SD' },
        { 'name': 'Suriname', 'ccode': '597', 'abbrev': 'SR' },
        { 'name': 'Svalbard and Jan Mayen', 'ccode': '47', 'abbrev': 'SJ' },
        { 'name': 'Swaziland', 'ccode': '268', 'abbrev': 'SZ' },
        { 'name': 'Sweden', 'ccode': '46', 'abbrev': 'SE' },
        { 'name': 'Switzerland', 'ccode': '41', 'abbrev': 'CH' },
        { 'name': 'Syria', 'ccode': '963', 'abbrev': 'SY' },
        { 'name': 'Taiwan', 'ccode': '886', 'abbrev': 'TW' },
        { 'name': 'Tajikistan', 'ccode': '992', 'abbrev': 'TJ' },
        { 'name': 'Tanzania', 'ccode': '255', 'abbrev': 'TZ' },
        { 'name': 'Thailand', 'ccode': '66', 'abbrev': 'TH' },
        { 'name': 'Togo', 'ccode': '228', 'abbrev': 'TG' },
        { 'name': 'Tokelau', 'ccode': '690', 'abbrev': 'TK' },
        { 'name': 'Tonga', 'ccode': '676', 'abbrev': 'TO' },
        { 'name': 'Trinidad and Tobago', 'ccode': '1-868', 'abbrev': 'TT' },
        { 'name': 'Tunisia', 'ccode': '216', 'abbrev': 'TN' },
        { 'name': 'Turkey', 'ccode': '90', 'abbrev': 'TR' },
        { 'name': 'Turkmenistan', 'ccode': '993', 'abbrev': 'TM' },
        { 'name': 'Turks and Caicos Islands', 'ccode': '1-649', 'abbrev': 'TC' },
        { 'name': 'Tuvalu', 'ccode': '688', 'abbrev': 'TV' },
        { 'name': 'United Arab Emirates', 'ccode': '971', 'abbrev': 'AE' },
        { 'name': 'Uganda', 'ccode': '256', 'abbrev': 'UG' },
        { 'name': 'United Kingdom', 'ccode': '44', 'abbrev': 'GB' },
        { 'name': 'Ukraine', 'ccode': '380', 'abbrev': 'UA' },
        { 'name': 'Uruguay', 'ccode': '598', 'abbrev': 'UY' },
        { 'name': 'United States', 'ccode': '1', 'abbrev': 'US' },
        { 'name': 'Uzbekistan', 'ccode': '998', 'abbrev': 'UZ' },
        { 'name': 'Vanuatu', 'ccode': '678', 'abbrev': 'VU' },
        { 'name': 'Vatican', 'ccode': '379', 'abbrev': 'VA' },
        { 'name': 'Venezuela', 'ccode': '58', 'abbrev': 'VE' },
        { 'name': 'Vietnam', 'ccode': '84', 'abbrev': 'VN' },
        { 'name': 'U.S. Virgin Islands', 'ccode': '1-340', 'abbrev': 'VI' },
        { 'name': 'Wallis and Futuna', 'ccode': '681', 'abbrev': 'WF' },
        { 'name': 'Western Sahara', 'ccode': '212', 'abbrev': 'EH' },
        { 'name': 'Yemen', 'ccode': '967', 'abbrev': 'YE' },
        { 'name': 'Zambia', 'ccode': '260', 'abbrev': 'ZM' },
        { 'name': 'Zimbabwe', 'ccode': '263', 'abbrev': 'ZW' }
    ];
}


