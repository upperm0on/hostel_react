import "../../assets/css/signup/SignUpForms.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { Eye, EyeOff, User, Mail, Lock, UserCheck, Phone, Users } from "lucide-react";

// Country codes dictionary - comprehensive list of international dialing codes
const COUNTRY_CODES = {
  // Africa
  '20': 'Egypt',
  '27': 'South Africa',
  '212': 'Morocco',
  '213': 'Algeria',
  '216': 'Tunisia',
  '218': 'Libya',
  '220': 'Gambia',
  '221': 'Senegal',
  '222': 'Mauritania',
  '223': 'Mali',
  '224': 'Guinea',
  '225': 'Ivory Coast',
  '226': 'Burkina Faso',
  '227': 'Niger',
  '228': 'Togo',
  '229': 'Benin',
  '230': 'Mauritius',
  '231': 'Liberia',
  '232': 'Sierra Leone',
  '233': 'Ghana',
  '234': 'Nigeria',
  '235': 'Chad',
  '236': 'Central African Republic',
  '237': 'Cameroon',
  '238': 'Cape Verde',
  '239': 'São Tomé and Príncipe',
  '240': 'Equatorial Guinea',
  '241': 'Gabon',
  '242': 'Republic of the Congo',
  '243': 'Democratic Republic of the Congo',
  '244': 'Angola',
  '245': 'Guinea-Bissau',
  '246': 'British Indian Ocean Territory',
  '247': 'Ascension Island',
  '248': 'Seychelles',
  '249': 'Sudan',
  '250': 'Rwanda',
  '251': 'Ethiopia',
  '252': 'Somalia',
  '253': 'Djibouti',
  '254': 'Kenya',
  '255': 'Tanzania',
  '256': 'Uganda',
  '257': 'Burundi',
  '258': 'Mozambique',
  '260': 'Zambia',
  '261': 'Madagascar',
  '262': 'Réunion',
  '263': 'Zimbabwe',
  '264': 'Namibia',
  '265': 'Malawi',
  '266': 'Lesotho',
  '267': 'Botswana',
  '268': 'Eswatini',
  '269': 'Comoros',
  '290': 'Saint Helena',
  '291': 'Eritrea',
  
  // Europe
  '30': 'Greece',
  '31': 'Netherlands',
  '32': 'Belgium',
  '33': 'France',
  '34': 'Spain',
  '36': 'Hungary',
  '39': 'Italy',
  '40': 'Romania',
  '41': 'Switzerland',
  '43': 'Austria',
  '44': 'United Kingdom',
  '45': 'Denmark',
  '46': 'Sweden',
  '47': 'Norway',
  '48': 'Poland',
  '49': 'Germany',
  '350': 'Gibraltar',
  '351': 'Portugal',
  '352': 'Luxembourg',
  '353': 'Ireland',
  '354': 'Iceland',
  '355': 'Albania',
  '356': 'Malta',
  '357': 'Cyprus',
  '358': 'Finland',
  '359': 'Bulgaria',
  '370': 'Lithuania',
  '371': 'Latvia',
  '372': 'Estonia',
  '373': 'Moldova',
  '374': 'Armenia',
  '375': 'Belarus',
  '376': 'Andorra',
  '377': 'Monaco',
  '378': 'San Marino',
  '380': 'Ukraine',
  '381': 'Serbia',
  '382': 'Montenegro',
  '383': 'Kosovo',
  '385': 'Croatia',
  '386': 'Slovenia',
  '387': 'Bosnia and Herzegovina',
  '389': 'North Macedonia',
  '420': 'Czech Republic',
  '421': 'Slovakia',
  '423': 'Liechtenstein',
  
  // Asia
  '7': 'Russia/Kazakhstan',
  '81': 'Japan',
  '82': 'South Korea',
  '84': 'Vietnam',
  '86': 'China',
  '90': 'Turkey',
  '91': 'India',
  '92': 'Pakistan',
  '93': 'Afghanistan',
  '94': 'Sri Lanka',
  '95': 'Myanmar',
  '98': 'Iran',
  '850': 'North Korea',
  '852': 'Hong Kong',
  '853': 'Macau',
  '855': 'Cambodia',
  '856': 'Laos',
  '880': 'Bangladesh',
  '886': 'Taiwan',
  '960': 'Maldives',
  '961': 'Lebanon',
  '962': 'Jordan',
  '963': 'Syria',
  '964': 'Iraq',
  '965': 'Kuwait',
  '966': 'Saudi Arabia',
  '967': 'Yemen',
  '968': 'Oman',
  '970': 'Palestine',
  '971': 'United Arab Emirates',
  '972': 'Israel',
  '973': 'Bahrain',
  '974': 'Qatar',
  '975': 'Bhutan',
  '976': 'Mongolia',
  '977': 'Nepal',
  '992': 'Tajikistan',
  '993': 'Turkmenistan',
  '994': 'Azerbaijan',
  '995': 'Georgia',
  '996': 'Kyrgyzstan',
  '998': 'Uzbekistan',
  
  // Southeast Asia & Oceania
  '60': 'Malaysia',
  '61': 'Australia',
  '62': 'Indonesia',
  '63': 'Philippines',
  '64': 'New Zealand',
  '65': 'Singapore',
  '66': 'Thailand',
  '670': 'East Timor',
  '672': 'Australian External Territories',
  '673': 'Brunei',
  '674': 'Nauru',
  '675': 'Papua New Guinea',
  '676': 'Tonga',
  '677': 'Solomon Islands',
  '678': 'Vanuatu',
  '679': 'Fiji',
  '680': 'Palau',
  '681': 'Wallis and Futuna',
  '682': 'Cook Islands',
  '683': 'Niue',
  '684': 'American Samoa',
  '685': 'Samoa',
  '686': 'Kiribati',
  '687': 'New Caledonia',
  '688': 'Tuvalu',
  '689': 'French Polynesia',
  '690': 'Tokelau',
  '691': 'Micronesia',
  '692': 'Marshall Islands',
  
  // Americas
  '1': 'United States/Canada',
  '51': 'Peru',
  '52': 'Mexico',
  '53': 'Cuba',
  '54': 'Argentina',
  '55': 'Brazil',
  '56': 'Chile',
  '57': 'Colombia',
  '58': 'Venezuela',
  '500': 'Falkland Islands',
  '501': 'Belize',
  '502': 'Guatemala',
  '503': 'El Salvador',
  '504': 'Honduras',
  '505': 'Nicaragua',
  '506': 'Costa Rica',
  '507': 'Panama',
  '508': 'Saint Pierre and Miquelon',
  '509': 'Haiti',
  '590': 'Guadeloupe',
  '591': 'Bolivia',
  '592': 'Guyana',
  '593': 'Ecuador',
  '594': 'French Guiana',
  '595': 'Paraguay',
  '596': 'Martinique',
  '597': 'Suriname',
  '598': 'Uruguay',
  '599': 'Netherlands Antilles',
  '1242': 'Bahamas',
  '1246': 'Barbados',
  '1264': 'Anguilla',
  '1268': 'Antigua and Barbuda',
  '1284': 'British Virgin Islands',
  '1340': 'U.S. Virgin Islands',
  '1345': 'Cayman Islands',
  '1441': 'Bermuda',
  '1473': 'Grenada',
  '1649': 'Turks and Caicos Islands',
  '1664': 'Montserrat',
  '1670': 'Northern Mariana Islands',
  '1671': 'Guam',
  '1684': 'American Samoa',
  '1721': 'Sint Maarten',
  '1758': 'Saint Lucia',
  '1767': 'Dominica',
  '1784': 'Saint Vincent and the Grenadines',
  '1787': 'Puerto Rico',
  '1809': 'Dominican Republic',
  '1829': 'Dominican Republic',
  '1849': 'Dominican Republic',
  '1868': 'Trinidad and Tobago',
  '1869': 'Saint Kitts and Nevis',
  '1876': 'Jamaica',
  '1939': 'Puerto Rico',
  
  // Other territories
  '297': 'Aruba',
  '298': 'Faroe Islands',
  '299': 'Greenland'
};

function SignUpForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: ''
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [countryCode, setCountryCode] = useState('');
  const [isCountryCodeEditable, setIsCountryCodeEditable] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Check password match when either password field changes
    if (field === 'password' || field === 'confirmPassword') {
      const newPassword = field === 'password' ? value : formData.password;
      const newConfirmPassword = field === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordsMatch(newPassword === newConfirmPassword);
    }
  };

  const formatPhoneNumber = (value) => {
    // Add spacing after country code for better readability
    if (countryCode && value.length > countryCode.length) {
      // Use the current country code length for spacing, regardless of whether it matches
      const countryPart = value.substring(0, countryCode.length);
      const numberPart = value.substring(countryCode.length);
      return `${countryPart} ${numberPart}`;
    }
    return value;
  };

  const findCountryCode = (value) => {
    // Check for country codes of different lengths (1, 2, 3, 4 digits)
    for (let length = Math.min(value.length, 4); length >= 1; length--) {
      const code = value.substring(0, length);
      if (COUNTRY_CODES[code]) {
        return { code, length };
      }
    }
    return null;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters and spaces
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Find the best matching country code
    const countryMatch = findCountryCode(numericValue);
    
    if (countryMatch) {
      const { code, length } = countryMatch;
      
      // If the input exactly matches a country code, lock it
      if (numericValue.length === length) {
        setCountryCode(code);
        setIsCountryCodeEditable(false);
      } else {
        // Input is longer than the matched country code, use the matched country code for spacing
        setCountryCode(code);
        setIsCountryCodeEditable(true);
      }
    } else {
      // No country code found, find the longest partial match for spacing
      let longestMatch = '';
      for (let i = 1; i <= Math.min(numericValue.length, 4); i++) {
        const partialCode = numericValue.substring(0, i);
        if (COUNTRY_CODES[partialCode]) {
          longestMatch = partialCode;
        }
      }
      
      if (longestMatch) {
        setCountryCode(longestMatch);
      } else {
        setCountryCode(numericValue.substring(0, Math.min(numericValue.length, 4)));
      }
      setIsCountryCodeEditable(true);
    }
    
    handleInputChange('phone', numericValue);
  };

  const handleCountryCodeClick = () => {
    if (!isCountryCodeEditable) {
      setIsCountryCodeEditable(true);
      // Find the current country code length and keep it for editing
      const countryMatch = findCountryCode(formData.phone);
      if (countryMatch) {
        setCountryCode(formData.phone.substring(0, countryMatch.length));
      }
    }
  };

  const isFormValid = () => {
    return formData.name && 
           formData.email && 
           formData.password && 
           formData.confirmPassword && 
           formData.gender && 
           formData.phone && 
           passwordsMatch;
  };

  async function signup(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate all fields are filled
    if (!isFormValid()) {
      setError("Please fill in all required fields and ensure passwords match");
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(buildApiUrl(API_ENDPOINTS.SIGNUP), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'email': formData.email,
          'password': formData.password, 
          'name': formData.name,
          'gender': formData.gender,
          'phone': formData.phone
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("name", data.name || formData.name);
        window.location.href = '/hostels';
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      action="#"
      method="POST"
      className="sign_up"
      onSubmit={signup}
    >
      <h2 className="form-title">Let's Get to Know You</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="sign_up-item">
        <label htmlFor="name">
          <div className="label_container">
            <User size={20} />
          </div>
        </label>
        <input 
          type="text" 
          id="name" 
          placeholder="Name" 
          autoFocus 
          required 
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>

      <div className="sign_up-item">
        <label htmlFor="email">
          <div className="label_container">
            <Mail size={20} />
          </div>
        </label>
        <input 
          type="email" 
          id="email" 
          placeholder="E-mail" 
          required 
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </div>

      <div className="sign_up-item">
        <label htmlFor="phone">
          <div className="label_container">
            <Phone size={20} />
          </div>
        </label>
        <div className="phone-input-container">
          {countryCode && (
            <div 
              className={`country-code-display ${isCountryCodeEditable ? 'editable' : ''}`}
              onClick={handleCountryCodeClick}
              title={isCountryCodeEditable ? "Editing country code" : "Click to change country code"}
            >
              <span className="country-code-number">+{countryCode}</span>
              {!isCountryCodeEditable && (
                <span className="country-code-name">
                  {COUNTRY_CODES[countryCode] || 'Unknown Country'}
                </span>
              )}
              {isCountryCodeEditable && COUNTRY_CODES[countryCode] && (
                <span className="country-code-name">
                  {COUNTRY_CODES[countryCode]}
                </span>
              )}
            </div>
          )}
          <input 
            type="text" 
            id="phone" 
            name="phone"
            placeholder={countryCode ? "Enter phone number" : "Phone Number (start with country code)"} 
            required 
            value={formatPhoneNumber(formData.phone)}
            onChange={handlePhoneChange}
            inputMode="numeric"
            pattern="[0-9 ]*"
            className={countryCode && !isCountryCodeEditable ? "phone-number-only" : ""}
          />
        </div>
      </div>

      <div className="sign_up-item">
        <label htmlFor="gender">
          <div className="label_container">
            <Users size={20} />
          </div>
        </label>
        <select 
          id="gender" 
          required 
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          className="gender-select"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="sign_up-item">
        <label htmlFor="password">
          <div className="label_container">
            <Lock size={20} />
          </div>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        <div
          className="show_hide"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      <div className="sign_up-item">
        <label htmlFor="confirm_password">
          <div className="label_container">
            <UserCheck size={20} />
          </div>
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_password"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        />
        <div
          className="show_hide"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      {!passwordsMatch && formData.confirmPassword && (
        <div className="error-message">
          Passwords do not match
        </div>
      )}

      <button 
        type="submit" 
        className="form_submit" 
        disabled={isLoading || !isFormValid()}
      >
        {isLoading ? "Creating Account..." : "Submit"}
      </button>

      <p className="login_option">
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </form>
  );
}

export default SignUpForms;
