import { useState, useEffect, useRef, useContext } from "react";
import React from 'react';
import '../components/stylecss/Login.css';
import '../components/stylecss/Registration.css';
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';
// import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const handleButtonClick = () => {
    window.open(
      'https://drive.google.com/file/d/11onIM1dPmYiAIMYrF-fObNiVR6EgxBM8/view?usp=sharing',
      '_blank'
    );
  };
  const options = [
    
    { value: "Sri Sri Jagannath Higher Secondary School, Badakera", label: "Sri Sri Jagannath Higher Secondary School, Badakera" },
    { value: "Shri Chandrasekhar Higher Secondary School, Bantala", label: "Shri Chandrasekhar Higher Secondary School, Bantala" },
    { value: "Sri Sri Jagannath Higher Secondary School, Badakera", label: "Sri Sri Jagannath Higher Secondary School, Badakera" },
    { value: "Angul Mahila Higher Secondary School, Angul", label: "Angul Mahila Higher Secondary School, Angul" },
    { value: "Evening Higher Secondary School, Angul", label: "Evening Higher Secondary School, Angul" },
    { value: "Government Higher Secondary School, Angul", label: "Government Higher Secondary School, Angul" },
    { value: "Kashi Bishwanath Higher Secondary School, Paikasahi", label: "Kashi Bishwanath Higher Secondary School, Paikasahi" },
    { value: "Satyabadi Meher Higher Secondary School, Madhapur", label: "Satyabadi Meher Higher Secondary School, Madhapur" },
    { value: "Solapada Higher Secondary School, Thakurgarh", label: "Solapada Higher Secondary School, Thakurgarh" },
    { value: "Athamallik Higher Secondary School, Athmallik", label: "Athamallik Higher Secondary School, Athmallik" },
    { value: "Anchalik Higher Secondary School, Talmul", label: "Anchalik Higher Secondary School, Talmul" },
    { value: "Kumanda Jarasingha Anchalik Panchayat Higher Secondary School, Kumanda", label: "Kumanda Jarasingha Anchalik Panchayat Higher Secondary School, Kumanda" },
    { value: "Nalco Nagar Regional Higher Secondary School, Kulad", label: "Nalco Nagar Regional Higher Secondary School, Kulad" },
    { value: "Panchagarh Somanath Singh Jagadev Higher Secondary School, Banarpal", label: "Panchagarh Somanath Singh Jagadev Higher Secondary School, Banarpal" },
    { value: "Bapuji Higher Secondary School, Chhendipada", label: "Bapuji Higher Secondary School, Chhendipada" },
    { value: "Kosala Higher Secondary School, Kosala", label: "Kosala Higher Secondary School, Kosala" },
    { value: "Maharishi Higher Secondary School of Natural Law, Santarabandha", label: "Maharishi Higher Secondary School of Natural Law, Santarabandha" },
    { value: "Patitapaban Higher Secondary School, Jarapada", label: "Patitapaban Higher Secondary School, Jarapada" },
    { value: "Jagamohan Higher Secondary School, Kuluma", label: "Jagamohan Higher Secondary School, Kuluma" },
    { value: "Kaniha Higher Secondary School, Kaniha", label: "Kaniha Higher Secondary School, Kaniha" },
    { value: "Pabitranagar Higher Secondary School, Parbil", label: "Pabitranagar Higher Secondary School, Parbil" },
    { value: "Anchalika Higher Secondary School, Angapada", label: "Anchalika Higher Secondary School, Angapada" },
    { value: "Janata Higher Secondary School, Boinda", label: "Janata Higher Secondary School, Boinda" },
    { value: "Kishore Nagar Higher Secondary School, Kishore Nagar", label: "Kishore Nagar Higher Secondary School, Kishore Nagar" },
    { value: "GURUSULEI GOVT HIGHER SECONDARY SCHOOL, SAHARAGURUJANG", label: "GURUSULEI GOVT HIGHER SECONDARY SCHOOL, SAHARAGURUJANG" },
    { value: "Malyagiri Higher Secondary School, Pallahara", label: "Malyagiri Higher Secondary School, Pallahara" },
    { value: "Utkalmani Gopabandhu Higher Secondary School, Khamar", label: "Utkalmani Gopabandhu Higher Secondary School, Khamar" },
    { value: "Gadtal Regional Higher Secondary School, Gadtal", label: "Gadtal Regional Higher Secondary School, Gadtal" },
    { value: "Hingula Higher Secondary School, Solada", label: "Hingula Higher Secondary School, Solada" },
    { value: "Nilakantheswar Higher Secondary School, South Balanda", label: "Nilakantheswar Higher Secondary School, South Balanda" },
    { value: "Silpanchal Mahila Higher Secondary School, Talcher", label: "Silpanchal Mahila Higher Secondary School, Talcher" },
    { value: "Talcher Higher Secondary School, Talcher", label: "Talcher Higher Secondary School, Talcher" },
    { value: "Bahanaga Higher Secondary School, Bahanaga", label: "Bahanaga Higher Secondary School, Bahanaga" },
    { value: "Belabhumi Higher Secondary School, Avana", label: "Belabhumi Higher Secondary School, Avana" },
    { value: "Bhagaban Chandra Sanskrit Higher Secondary School, Bahanaga", label: "Bhagaban Chandra Sanskrit Higher Secondary School, Bahanaga" },
    { value: "Gopalpur Higher Secondary School, Gopalpur, Balasore", label: "Gopalpur Higher Secondary School, Gopalpur, Balasore" },
    { value: "Khantapara Mahila Higher Secondary School, Khantapara", label: "Khantapara Mahila Higher Secondary School, Khantapara" },
    { value: "Satyanidhi Women's Higher Secondary School, Bishnupur", label: "Satyanidhi Women's Higher Secondary School, Bishnupur" },
    { value: "Balasore Higher Secondary School, Sovarampur", label: "Balasore Higher Secondary School, Sovarampur" },
    { value: "Balasore Mahila Higher Secondary School, Gopalgaon", label: "Balasore Mahila Higher Secondary School, Gopalgaon" },
    { value: "Fakir Mohan Higher Secondary School, Balasore", label: "Fakir Mohan Higher Secondary School, Balasore" },
    { value: "Kuntala Kumari Sabat Women's Higher Secondary School, Balasore", label: "Kuntala Kumari Sabat Women's Higher Secondary School, Balasore" },
    { value: "Balangi Higher Secondary School, Sunahat", label: "Balangi Higher Secondary School, Sunahat" },
    { value: "Dr. Jadunath Higher Secondary School, Rasalpur", label: "Dr. Jadunath Higher Secondary School, Rasalpur" },
    { value: "Golakmani Mahila Higher Secondary School, Uitikiri", label: "Golakmani Mahila Higher Secondary School, Uitikiri" },
    { value: "Nilakantheswar Higher Secondary School, Bangara", label: "Nilakantheswar Higher Secondary School, Bangara" },
    { value: "Nilamani Higher Secondary School, Rupsa", label: "Nilamani Higher Secondary School, Rupsa" },
    { value: "Santilata Higher Secondary School, Uitikiri", label: "Santilata Higher Secondary School, Uitikiri" },
    { value: "Judhisthir Higher Secondary School, Kundali", label: "Judhisthir Higher Secondary School, Kundali" },
    { value: "Krushna Chandra Pipili Higher Secondary School, Jagai", label: "Krushna Chandra Pipili Higher Secondary School, Jagai" },
    { value: "Laxmipriya Mahila Higher Secondary School, Baliapal", label: "Laxmipriya Mahila Higher Secondary School, Baliapal" },
    { value: "Subarna Rekha Higher Secondary School, Baliapal", label: "Subarna Rekha Higher Secondary School, Baliapal" },
    { value: "Chintamani Jena Mahila Higher Secondary School, Chhachina", label: "Chintamani Jena Mahila Higher Secondary School, Chhachina" },
    { value: "Laxminarayan Higher Secondary School, Jamsuli", label: "Laxminarayan Higher Secondary School, Jamsuli" },
    { value: "Nabara Women's Higher Secondary School, Nabara", label: "Nabara Women's Higher Secondary School, Nabara" },
    { value: "RADHA NATH GOVT HIGHER SECONDARY SCHOOL, PAUNSKULI", label: "RADHA NATH GOVT HIGHER SECONDARY SCHOOL, PAUNSKULI" },
    { value: "Sidheswar Higher Secondary School, Amarda Road", label: "Sidheswar Higher Secondary School, Amarda Road" },
    { value: "Anandamayee Women's Higher Secondary School, Dahamunda", label: "Anandamayee Women's Higher Secondary School, Dahamunda" },
    { value: "Baikunthanath Institute of Higher Technical Studies Higher Secondary School, Kachuadi", label: "Baikunthanath Institute of Higher Technical Studies Higher Secondary School, Kachuadi" },
    { value: "Chandaneswar Higher Secondary School, Barbatia", label: "Chandaneswar Higher Secondary School, Barbatia" },
    { value: "Chandaneswar Higher Secondary School, Sahabazpur", label: "Chandaneswar Higher Secondary School, Sahabazpur" },
    { value: "Narendranath Sanskrit Higher Secondary School", label: "Narendranath Sanskrit Higher Secondary School" },
    { value: "Rural Institute of Higher Studies Higher Secondary School, Bhogarai", label: "Rural Institute of Higher Studies Higher Secondary School, Bhogarai" },
    { value: "Surendranath Institute of Higher Technical Studies Higher Secondary School, Kamarda", label: "Surendranath Institute of Higher Technical Studies Higher Secondary School, Kamarda" },
    { value: "Women's Higher Secondary School, Bhogarai", label: "Women's Higher Secondary School, Bhogarai" },
    { value: "Bagiswari Sanskrit Higher Secondary School", label: "Bagiswari Sanskrit Higher Secondary School" },
    { value: "Dinakrushna Higher Secondary School, Jaleswar", label: "Dinakrushna Higher Secondary School, Jaleswar" },
    { value: "Olamara Simanta Higher Secondary School, Olamara", label: "Olamara Simanta Higher Secondary School, Olamara" },
    { value: "Sadhu Charan Higher Secondary School, Raibania", label: "Sadhu Charan Higher Secondary School, Raibania" },
    { value: "Sitala Thakurani Higher Secondary School, Khuluda", label: "Sitala Thakurani Higher Secondary School, Khuluda" },
    { value: "Ustab Charan Gajiani Chandi Higher Secondary School, Bartana", label: "Ustab Charan Gajiani Chandi Higher Secondary School, Bartana" },
    { value: "Jaleswar Womens Higher Secondary School, Jaleswar", label: "Jaleswar Womens Higher Secondary School, Jaleswar" },
    { value: "Sri Jagannath Women's Higher Secondary School, Jaleswar", label: "Sri Jagannath Women's Higher Secondary School, Jaleswar" },
    { value: "Agani Narendra Higher Secondary School, Antara", label: "Agani Narendra Higher Secondary School, Antara" },
    { value: "Dr. Hare Krishna Mahatab Higher Secondary School, Kupari", label: "Dr. Hare Krishna Mahatab Higher Secondary School, Kupari" },
    { value: "Jambeswar Higher Secondary School, Garsang", label: "Jambeswar Higher Secondary School, Garsang" },
    { value: "Kamala Arjuna Higher Secondary School, Gandibed", label: "Kamala Arjuna Higher Secondary School, Gandibed" },
    { value: "Khaira Higher Secondary School, Khaira", label: "Khaira Higher Secondary School, Khaira" },
    { value: "Panchayat Samiti Mahila Higher Secondary School, Nahanga", label: "Panchayat Samiti Mahila Higher Secondary School, Nahanga" },
    { value: "Ajodhya Anchalika Higher Secondary School, Ajodhya", label: "Ajodhya Anchalika Higher Secondary School, Ajodhya" },
    { value: "Berhampur Higher Secondary School, Raj-Berhampur", label: "Berhampur Higher Secondary School, Raj-Berhampur" },
    { value: "Swarnachuda Higher Secondary School, Mitrapur", label: "Swarnachuda Higher Secondary School, Mitrapur" },
    { value: "Nilagiri Higher Secondary School, Nilagiri", label: "Nilagiri Higher Secondary School, Nilagiri" },
    { value: "Nilagiri Women's Higher Secondary School, Nilagiri", label: "Nilagiri Women's Higher Secondary School, Nilagiri" },
    { value: "Baba Panchalingeswar Higher Secondary School, Santaragadia", label: "Baba Panchalingeswar Higher Secondary School, Santaragadia" },
    { value: "Chintamani Sanskrit Higher Secondary School", label: "Chintamani Sanskrit Higher Secondary School" },
    { value: "Laxmikanta Memorial Women's Higher Secondary School, Dakhini-Narasinghpur", label: "Laxmikanta Memorial Women's Higher Secondary School, Dakhini-Narasinghpur" },
    { value: "Oupada Higher Secondary School, Oupada", label: "Oupada Higher Secondary School, Oupada" },
    { value: "Pancha Lingeswar Higher Secondary School, Iswarpur", label: "Pancha Lingeswar Higher Secondary School, Iswarpur" },
    { value: "Bhimeswar Higher Secondary School, Bhimeswar", label: "Bhimeswar Higher Secondary School, Bhimeswar" },
    { value: "Remuna Higher Secondary School, Remuna", label: "Remuna Higher Secondary School, Remuna" },
    { value: "Shri Jagannath Educational Foundation Higher Secondary School, Barunsingh", label: "Shri Jagannath Educational Foundation Higher Secondary School, Barunsingh" },
    { value: "Balikhanda Higher Secondary School, Balikhanda", label: "Balikhanda Higher Secondary School, Balikhanda" },
    { value: "Gopaprana Higher Secondary School, Khirakona", label: "Gopaprana Higher Secondary School, Khirakona" },
    { value: "Kuntala Kumari Mahila Higher Secondary School, Bari", label: "Kuntala Kumari Mahila Higher Secondary School, Bari" },
    { value: "Simulia Higher Secondary School, Markona", label: "Simulia Higher Secondary School, Markona" },
    { value: "Kudei Women's Higher Secondary School, Kudei", label: "Kudei Women's Higher Secondary School, Kudei" },
    { value: "Saraswata Higher Secondary School, Anantapur", label: "Saraswata Higher Secondary School, Anantapur" },
    { value: "Srinibas Higher Secondary School, Mangalpur", label: "Srinibas Higher Secondary School, Mangalpur" },
    { value: "Talanagar Higher Secondary School, Talanagar", label: "Talanagar Higher Secondary School, Talanagar" },
    { value: "Soro Women's Higher Secondary School, Soro", label: "Soro Women's Higher Secondary School, Soro" },
    { value: "Upendra Nath Higher Secondary School, Soro", label: "Upendra Nath Higher Secondary School, Soro" },
    { value: "Mahatma Gandhi Higher Secondary School, Bhukta", label: "Mahatma Gandhi Higher Secondary School, Bhukta" },
    { value: "Swami Vivekananda Higher Secondary School, Dungri", label: "Swami Vivekananda Higher Secondary School, Dungri" },
    { value: "Anchalika Higher Secondary School, Paharsrigida", label: "Anchalika Higher Secondary School, Paharsrigida" },
    { value: "Attabira Higher Secondary School, Attabira", label: "Attabira Higher Secondary School, Attabira" },
    { value: "Kadobahal Higher Secondary School, Kadobahal", label: "Kadobahal Higher Secondary School, Kadobahal" },
    { value: "Larambha Higher Secondary School, Larambha", label: "Larambha Higher Secondary School, Larambha" },
    { value: "Baba Balunkeswar Higher Secondary School, Khuntapali", label: "Baba Balunkeswar Higher Secondary School, Khuntapali" },
    { value: "Gandhi Memorial Higher Secondary School, Kalapani", label: "Gandhi Memorial Higher Secondary School, Kalapani" },
    { value: "Katapali Higher Secondary School, Katapali", label: "Katapali Higher Secondary School, Katapali" },
    { value: "Milita Gram Panchayat Higher Secondary School, Sarsara", label: "Milita Gram Panchayat Higher Secondary School, Sarsara" },
    { value: "Nabajoyti Higher Secondary School, Chakarkend", label: "Nabajoyti Higher Secondary School, Chakarkend" },
    { value: "Tora Higher Secondary School, Tora", label: "Tora Higher Secondary School, Tora" },
    { value: "Bargarh Women's Higher Secondary School, Bargarh", label: "Bargarh Women's Higher Secondary School, Bargarh" },
    { value: "Panchayat Higher Secondary School, Bargarh", label: "Panchayat Higher Secondary School, Bargarh" },
    { value: "Trust Fund Higher Secondary School, Bargarh", label: "Trust Fund Higher Secondary School, Bargarh" },
    { value: "Jagabandhu Das Women's Higher Secondary School, Kadalipali", label: "Jagabandhu Das Women's Higher Secondary School, Kadalipali" },
    { value: "Prof. Ghanshyam Das Gramanchal Higher Secondary School, Katapali", label: "Prof. Ghanshyam Das Gramanchal Higher Secondary School, Katapali" },
    { value: "Satalma Higher Secondary School, Satalma", label: "Satalma Higher Secondary School, Satalma" },
    { value: "Barpali Higher Secondary School, Barpali", label: "Barpali Higher Secondary School, Barpali" },
    { value: "Dadhi Baman Higher Secondary School, Bhatli", label: "Dadhi Baman Higher Secondary School, Bhatli" },
    { value: "Kamgaon Higher Secondary School, Kamgaon", label: "Kamgaon Higher Secondary School, Kamgaon" },
    { value: "Panchayat Higher Secondary School, Goudgaon", label: "Panchayat Higher Secondary School, Goudgaon" },
    { value: "Bheden Anchalika Kisan Higher Secondary School, Bheden", label: "Bheden Anchalika Kisan Higher Secondary School, Bheden" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, RUSUDA", label: "GOVT HIGHER SECONDARY SCHOOL, RUSUDA" },
    { value: "Pallishree Higher Secondary School, Chichinda", label: "Pallishree Higher Secondary School, Chichinda" },
    { value: "Remunda Higher Secondary School, Remunda", label: "Remunda Higher Secondary School, Remunda" },
    { value: "Resham Anchalika Higher Secondary School, Resham", label: "Resham Anchalika Higher Secondary School, Resham" },
    { value: "Bijepur Higher Secondary School, Bijepur", label: "Bijepur Higher Secondary School, Bijepur" },
    { value: "Dora Higher Secondary School, Putukigrinjel", label: "Dora Higher Secondary School, Putukigrinjel" },
    { value: "Panchayat Higher Secondary School, Talpadar", label: "Panchayat Higher Secondary School, Talpadar" },
    { value: "Giridhari Higher Secondary School, Saradhapali", label: "Giridhari Higher Secondary School, Saradhapali" },
    { value: "Goutam Buddha Higher Secondary School, Ganiapali", label: "Goutam Buddha Higher Secondary School, Ganiapali" },
    { value: "Panchayat Samiti Higher Secondary School, Gaisilat", label: "Panchayat Samiti Higher Secondary School, Gaisilat" },
    { value: "Talpali Higher Secondary School, Talpali", label: "Talpali Higher Secondary School, Talpali" },
    { value: "CHANDRA SEKHAR GOVT HIGHER SECONDARY SCHOOL, JAGDALPUR", label: "CHANDRA SEKHAR GOVT HIGHER SECONDARY SCHOOL, JAGDALPUR" },
    { value: "Dava Higher Secondary School, Dava", label: "Dava Higher Secondary School, Dava" },
    { value: "Panchayat Samiti Higher Secondary School, Jharbandh", label: "Panchayat Samiti Higher Secondary School, Jharbandh" },
    { value: "Padampur Women's Higher Secondary School, Padampur", label: "Padampur Women's Higher Secondary School, Padampur" },
    { value: "Lakhmara Higher Secondary School, Lakhmara", label: "Lakhmara Higher Secondary School, Lakhmara" },
    { value: "Mandosil Higher Secondary School, Mandosil", label: "Mandosil Higher Secondary School, Mandosil" },
    { value: "Vindhya Vasini Higher Secondary School, Paikmal", label: "Vindhya Vasini Higher Secondary School, Paikmal" },
    { value: "Anchal Higher Secondary School, Padampur", label: "Anchal Higher Secondary School, Padampur" },
    { value: "Buddhadev Meher Higher Secondary School, Dahita", label: "Buddhadev Meher Higher Secondary School, Dahita" },
    { value: "Jamla Higher Secondary School, Jamla", label: "Jamla Higher Secondary School, Jamla" },
    { value: "Melchhamunda Higher Secondary School, Melchhamunda", label: "Melchhamunda Higher Secondary School, Melchhamunda" },
    { value: "Ghess Higher Secondary School, Ghess", label: "Ghess Higher Secondary School, Ghess" },
    { value: "Sohela Higher Secondary School, Sohela", label: "Sohela Higher Secondary School, Sohela" },
    { value: "Kartik Malati Mahila Higher Secondary School, Jagannathpur", label: "Kartik Malati Mahila Higher Secondary School, Jagannathpur" },
    { value: "Mandari Higher Secondary School, Mandari", label: "Mandari Higher Secondary School, Mandari" },
    { value: "Nabaghana Higher Secondary School , Karanjadia", label: "Nabaghana Higher Secondary School , Karanjadia" },
    { value: "Sahed Memorial Higher Secondary School, Eram", label: "Sahed Memorial Higher Secondary School, Eram" },
    { value: "Saheed Higher Secondary School, Barapur", label: "Saheed Higher Secondary School, Barapur" },
    { value: "Atal Bihari Higher Secondary School, Basudevpur", label: "Atal Bihari Higher Secondary School, Basudevpur" },
    { value: "Trupti Women's Higher Secondary School, Basudevpur", label: "Trupti Women's Higher Secondary School, Basudevpur" },
    { value: "Charampa Higher Secondary School, Charampa", label: "Charampa Higher Secondary School, Charampa" },
    { value: "Damodar Sanskrit Higher Secondary School", label: "Damodar Sanskrit Higher Secondary School" },
    { value: "Kamala Kishori Rout Mahila Higher Secondary School, Kusannagar", label: "Kamala Kishori Rout Mahila Higher Secondary School, Kusannagar" },
    { value: "Radhakanta Behera Higher Secondary School, Arnapala", label: "Radhakanta Behera Higher Secondary School, Arnapala" },
    { value: "Rameswar Higher Secondary School, Randia", label: "Rameswar Higher Secondary School, Randia" },
    { value: "Salandi Higher Secondary School, Uttarbahini", label: "Salandi Higher Secondary School, Uttarbahini" },
    { value: "Bhadrak Higher Secondary School, Bhadrak", label: "Bhadrak Higher Secondary School, Bhadrak" },
    { value: "Bhadrak Women's Higher Secondary School, Bhadrak", label: "Bhadrak Women's Higher Secondary School, Bhadrak" },
    { value: "Bhandaripokhari Higher Secondary School, Bhandaripokhari", label: "Bhandaripokhari Higher Secondary School, Bhandaripokhari" },
    { value: "Naami Higher Secondary School, Naami", label: "Naami Higher Secondary School, Naami" },
    { value: "Nayanmani Women's Higher Secondary School, Saradapur", label: "Nayanmani Women's Higher Secondary School, Saradapur" },
    { value: "NKP GOVT HIGHER SECONDARY SCHOOL, MANINATHPUR", label: "NKP GOVT HIGHER SECONDARY SCHOOL, MANINATHPUR" },
    { value: "Panchayat Higher Secondary School, Barikipur", label: "Panchayat Higher Secondary School, Barikipur" },
    { value: "Agarpara Higher Secondary School, Agarpara", label: "Agarpara Higher Secondary School, Agarpara" },
    { value: "Agarpara Women's Higher Secondary School, Agarpara", label: "Agarpara Women's Higher Secondary School, Agarpara" },
    { value: "Bant Anchalika Higher Secondary School, Bant", label: "Bant Anchalika Higher Secondary School, Bant" },
    { value: "Utkal Keshari Dr. Hare Krushna Mahatab Higher Secondary School, Kenduapara", label: "Utkal Keshari Dr. Hare Krushna Mahatab Higher Secondary School, Kenduapara" },
    { value: "Chandbali Higher Secondary School, Chandbali", label: "Chandbali Higher Secondary School, Chandbali" },
    { value: "Dhamrai Higher Secondary School, Narsinghpur", label: "Dhamrai Higher Secondary School, Narsinghpur" },
    { value: "Ghanteswar Higher Secondary School, Ghanteswar", label: "Ghanteswar Higher Secondary School, Ghanteswar" },
    { value: "Lalit Siba Sankar Higher Secondary School, Motto", label: "Lalit Siba Sankar Higher Secondary School, Motto" },
    { value: "Akhandalamani Higher Secondary School, Pallasahi", label: "Akhandalamani Higher Secondary School, Pallasahi" },
    { value: "Asurali Anchalika Mahila Higher Secondary School, Asurali", label: "Asurali Anchalika Mahila Higher Secondary School, Asurali" },
    { value: "Dhamnagar Higher Secondary School, Dhamnagar", label: "Dhamnagar Higher Secondary School, Dhamnagar" },
    { value: "Indira Gandhi Memorial Higher Secondary School of Science & Technology, Dhusuri", label: "Indira Gandhi Memorial Higher Secondary School of Science & Technology, Dhusuri" },
    { value: "Maa Sarada Devi Higher Secondary School, Kothar", label: "Maa Sarada Devi Higher Secondary School, Kothar" },
    { value: "Saheed Smruti Higher Secondary School, Saheednagar", label: "Saheed Smruti Higher Secondary School, Saheednagar" },
    { value: "Biranchi Narayan Madhab Arjun Higher Secondary School, Paliabindha", label: "Biranchi Narayan Madhab Arjun Higher Secondary School, Paliabindha" },
    { value: "Maniklal Women's Higher Secondary School, Talapada", label: "Maniklal Women's Higher Secondary School, Talapada" },
    { value: "Tihidi Higher Secondary School, Tihidi", label: "Tihidi Higher Secondary School, Tihidi" },
    { value: "Agalapur Panchayat Samiti Higher Secondary School, Roth", label: "Agalapur Panchayat Samiti Higher Secondary School, Roth" },
    { value: "Agalpur Science Higher Secondary School, Agalpur", label: "Agalpur Science Higher Secondary School, Agalpur" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KUTASINGHA", label: "GOVT HIGHER SECONDARY SCHOOL, KUTASINGHA" },
    { value: "Jalandhar Higher Secondary School, Bharsuja", label: "Jalandhar Higher Secondary School, Bharsuja" },
    { value: "Nagaon Higher Secondary School, Nagaon", label: "Nagaon Higher Secondary School, Nagaon" },
    { value: "Amar Jyoti Higher Secondary School, Kutumdola", label: "Amar Jyoti Higher Secondary School, Kutumdola" },
    { value: "Budhadangar Higher Secondary School, Kudasingha", label: "Budhadangar Higher Secondary School, Kudasingha" },
    { value: "Gopinath Higher Secondary School, Sahajbahal", label: "Gopinath Higher Secondary School, Sahajbahal" },
    { value: "Panchayat Higher Secondary School, Shibatala", label: "Panchayat Higher Secondary School, Shibatala" },
    { value: "Sudam Charan Higher Secondary School, Chandanbhati", label: "Sudam Charan Higher Secondary School, Chandanbhati" },
    { value: "Government Higher Secondary School, Bolangir", label: "Government Higher Secondary School, Bolangir" },
    { value: "Government Women's Higher Secondary School, Bolangir", label: "Government Women's Higher Secondary School, Bolangir" },
    { value: "Rajendra Higher Secondary School, Bolangir", label: "Rajendra Higher Secondary School, Bolangir" },
    { value: "Pallishree Higher Secondary School, Sindhekela", label: "Pallishree Higher Secondary School, Sindhekela" },
    { value: "Panchayat Samiti Higher Secondary School, Bangomunda", label: "Panchayat Samiti Higher Secondary School, Bangomunda" },
    { value: "Prasanna Pal Higher Secondary School, Bhalumunda", label: "Prasanna Pal Higher Secondary School, Bhalumunda" },
    { value: "Binapani Higher Secondary School, Dhumabhata", label: "Binapani Higher Secondary School, Dhumabhata" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, PARLIMAL", label: "GOVT HIGHER SECONDARY SCHOOL, PARLIMAL" },
    { value: "Panchayat Higher Secondary School, Sulekela", label: "Panchayat Higher Secondary School, Sulekela" },
    { value: "Panchayat Samiti Higher Secondary School, Belpara", label: "Panchayat Samiti Higher Secondary School, Belpara" },
    { value: "Shree Jagannath Dev Higher Secondary School, Mandal", label: "Shree Jagannath Dev Higher Secondary School, Mandal" },
    { value: "Dhruba Ananda Higher Secondary School, Kuturla", label: "Dhruba Ananda Higher Secondary School, Kuturla" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BANDHAPARA", label: "GOVT HIGHER SECONDARY SCHOOL, BANDHAPARA" },
    { value: "Jarasingha Higher Secondary School, Jarasingha", label: "Jarasingha Higher Secondary School, Jarasingha" },
    { value: "Panchayat Samiti Higher Secondary School, Deogaon", label: "Panchayat Samiti Higher Secondary School, Deogaon" },
    { value: "Anchalik Higher Secondary School, Rusuda", label: "Anchalik Higher Secondary School, Rusuda" },
    { value: "Gram Panchayat Higher Secondary School, Tentulikhunti", label: "Gram Panchayat Higher Secondary School, Tentulikhunti" },
    { value: "Tusra Higher Secondary School, Tusra", label: "Tusra Higher Secondary School, Tusra" },
    { value: "MLA Womens' Higher Secondary School, Kantabanji", label: "MLA Womens' Higher Secondary School, Kantabanji" },
    { value: "HARISHANKAR GOVT HIGHER SECONDARY SCHOOL, RENGALI", label: "HARISHANKAR GOVT HIGHER SECONDARY SCHOOL, RENGALI" },
    { value: "Harishankar Higher Secondary School, Khaprakhol", label: "Harishankar Higher Secondary School, Khaprakhol" },
    { value: "Jawaharlal Nehru Higher Secondary School, Dhandamunda", label: "Jawaharlal Nehru Higher Secondary School, Dhandamunda" },
    { value: "Panchayat Higher Secondary School, Lathor", label: "Panchayat Higher Secondary School, Lathor" },
    { value: "SARVODAYA GOVT HIGHER SECONDARY SCHOOL, LUHASINGHA", label: "SARVODAYA GOVT HIGHER SECONDARY SCHOOL, LUHASINGHA" },
    { value: "Harihar Higher Secondary School, Jogisarda", label: "Harihar Higher Secondary School, Jogisarda" },
    { value: "Kushang Anchalika Higher Secondary School, Kushang", label: "Kushang Anchalika Higher Secondary School, Kushang" },
    { value: "Loisingha Higher Secondary School, Loisingha", label: "Loisingha Higher Secondary School, Loisingha" },
    { value: "Panchayat Samiti Higher Secondary School, Muribahal", label: "Panchayat Samiti Higher Secondary School, Muribahal" },
    { value: "PATANESWARI GOVT HIGHER SECONDARY SCHOOL, LEBEDA", label: "PATANESWARI GOVT HIGHER SECONDARY SCHOOL, LEBEDA" },
    { value: "Jyoti Vikash Higher Secondary School, Bhainsa", label: "Jyoti Vikash Higher Secondary School, Bhainsa" },
    { value: "Panchayat Samiti Higher Secondary School, Ghasian", label: "Panchayat Samiti Higher Secondary School, Ghasian" },
    { value: "Rajendra Meher Higher Secondary School, Jogimunda", label: "Rajendra Meher Higher Secondary School, Jogimunda" },
    { value: "Jawaharlal Higher Secondary School, Patnagarh", label: "Jawaharlal Higher Secondary School, Patnagarh" },
    { value: "Patneswari Women's Higher Secondary School, Patnagarh", label: "Patneswari Women's Higher Secondary School, Patnagarh" },
    { value: "Jamgaon Anchalika Higher Secondary School, Jamgaon", label: "Jamgaon Anchalika Higher Secondary School, Jamgaon" },
    { value: "Judhisthir Higher Secondary School, Chhatamakhana", label: "Judhisthir Higher Secondary School, Chhatamakhana" },
    { value: "Mahimunda Higher Secondary School, Mahimunda", label: "Mahimunda Higher Secondary School, Mahimunda" },
    { value: "Radheshyam Anchalik Higher Secondary School, Bilaisarda", label: "Radheshyam Anchalik Higher Secondary School, Bilaisarda" },
    { value: "Padmalochan Higher Secondary School, Tikrapara", label: "Padmalochan Higher Secondary School, Tikrapara" },
    { value: "Panchayat Higher Secondary School, Ghunsar", label: "Panchayat Higher Secondary School, Ghunsar" },
    { value: "Panchayat Samiti Higher Secondary School, Saintala", label: "Panchayat Samiti Higher Secondary School, Saintala" },
    { value: "Utkalmani Gopabandhu Dash Higher Secondary School, Belgaon", label: "Utkalmani Gopabandhu Dash Higher Secondary School, Belgaon" },
    { value: "DAV Higher Secondary School, Titilagarh", label: "DAV Higher Secondary School, Titilagarh" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BINEKELA", label: "GOVT HIGHER SECONDARY SCHOOL, BINEKELA" },
    { value: "PANCHAYAT GOVT HIGHER SECONDARY SCHOOL ,KHOLAN", label: "PANCHAYAT GOVT HIGHER SECONDARY SCHOOL ,KHOLAN" },
    { value: "Government Women's Higher Secondary School, Titilagarh", label: "Government Women's Higher Secondary School, Titilagarh" },
    { value: "Kantabanji Vocational Higher Secondary School, Kantabanji", label: "Kantabanji Vocational Higher Secondary School, Kantabanji" },
    { value: "Rajiv Gandhi Panchayat Samiti Higher Secondary School, Turekela", label: "Rajiv Gandhi Panchayat Samiti Higher Secondary School, Turekela" },
    { value: "Gandhardi Higher Secondary School, Janhapank", label: "Gandhardi Higher Secondary School, Janhapank" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BRAHMANIPALI", label: "GOVT HIGHER SECONDARY SCHOOL, BRAHMANIPALI" },
    { value: "Maa Maheswari Higher Secondary School, Bausuni", label: "Maa Maheswari Higher Secondary School, Bausuni" },
    { value: "Boudh Panchayat Higher Secondary School, Boudh", label: "Boudh Panchayat Higher Secondary School, Boudh" },
    { value: "Boudh Women's Higher Secondary School, Boudh", label: "Boudh Women's Higher Secondary School, Boudh" },
    { value: "Bhairabi Higher Secondary School, Purunakatak", label: "Bhairabi Higher Secondary School, Purunakatak" },
    { value: "Harbhanga Anchalika Panchayat Higher Secondary School, Harbhanga", label: "Harbhanga Anchalika Panchayat Higher Secondary School, Harbhanga" },
    { value: "SADHU CHARAN GOVT HIGHER SECONDARY SCHOOL, BIRANARASINGHPUR", label: "SADHU CHARAN GOVT HIGHER SECONDARY SCHOOL, BIRANARASINGHPUR" },
    { value: "Panchayat Higher Secondary School, Kantamal", label: "Panchayat Higher Secondary School, Kantamal" },
    { value: "Panchayat Samiti Higher Secondary School, Palasagora", label: "Panchayat Samiti Higher Secondary School, Palasagora" },
    { value: "T.K.S.M.R.G. Higher Secondary School, Ghantapada", label: "T.K.S.M.R.G. Higher Secondary School, Ghantapada" },
    { value: "Choudwar Higher Secondary School, Choudwar", label: "Choudwar Higher Secondary School, Choudwar" },
    { value: "Choudwar Women's Higher Secondary School, Choudwar", label: "Choudwar Women's Higher Secondary School, Choudwar" },
    { value: "Gopabandhu Science Higher Secondary School, Athagarh", label: "Gopabandhu Science Higher Secondary School, Athagarh" },
    { value: "Gopabandhu Women's Higher Secondary School, Athagarh", label: "Gopabandhu Women's Higher Secondary School, Athagarh" },
    { value: "Radhanath Rath Vigyan Higher Secondary School, Khuntuni", label: "Radhanath Rath Vigyan Higher Secondary School, Khuntuni" },
    { value: "Sri Sri Dhabaleswar Higher Secondary School of Science & Technology, Bali", label: "Sri Sri Dhabaleswar Higher Secondary School of Science & Technology, Bali" },
    { value: "Sri Sri Dhabaleswar Higher Secondary School, Gurudijhatia", label: "Sri Sri Dhabaleswar Higher Secondary School, Gurudijhatia" },
    { value: "Ansupa Higher Secondary School of Education & Technology, Saranda", label: "Ansupa Higher Secondary School of Education & Technology, Saranda" },
    { value: "Baideswar Higher Secondary School, Baideswar", label: "Baideswar Higher Secondary School, Baideswar" },
    { value: "Kalapathar Dhalapathar Anchalika Higher Secondary School, Kalapathar", label: "Kalapathar Dhalapathar Anchalika Higher Secondary School, Kalapathar" },
    { value: "Banki Higher Secondary School, Banki", label: "Banki Higher Secondary School, Banki" },
    { value: "Maniabandha Higher Secondary School, Maniabandha", label: "Maniabandha Higher Secondary School, Maniabandha" },
    { value: "Mohan Subudhi Higher Secondary School, Baramba", label: "Mohan Subudhi Higher Secondary School, Baramba" },
    { value: "Sri Sri Swapneswar Deba Anchalika Higher Secondary School of Arts & Technology, Sankhamari", label: "Sri Sri Swapneswar Deba Anchalika Higher Secondary School of Arts & Technology, Sankhamari" },
    { value: "Brahmanajharilo Higher Secondary School, Brahmanajharilo", label: "Brahmanajharilo Higher Secondary School, Brahmanajharilo" },
    { value: "Prabha Routray Higher Secondary School, Godisahi", label: "Prabha Routray Higher Secondary School, Godisahi" },
    { value: "Biren Mitra Memorial Women's Higher Secondary School, Cuttack", label: "Biren Mitra Memorial Women's Higher Secondary School, Cuttack" },
    { value: "Christ Higher Secondary School, Cuttack", label: "Christ Higher Secondary School, Cuttack" },
    { value: "Dr. Keshaba Chandra Sahu Women's Higher Secondary School, Cuttack", label: "Dr. Keshaba Chandra Sahu Women's Higher Secondary School, Cuttack" },
    { value: "Emarti Devi Womens Higher Secondary School, Nayasarak", label: "Emarti Devi Womens Higher Secondary School, Nayasarak" },
    { value: "Indira Gandhi Womens Higher Secondary School, Cuttack", label: "Indira Gandhi Womens Higher Secondary School, Cuttack" },
    { value: "Mahanadi Vihar Women's Higher Secondary School, Cuttack", label: "Mahanadi Vihar Women's Higher Secondary School, Cuttack" },
    { value: "Maulan Abdul Kalam Azad Multipurpose Higher Secondary School, Cuttack", label: "Maulan Abdul Kalam Azad Multipurpose Higher Secondary School, Cuttack" },
    { value: "Netaji Subash Memorial City Higher Secondary School, Cuttack", label: "Netaji Subash Memorial City Higher Secondary School, Cuttack" },
    { value: "Raghunath Jew Higher Secondary School, Deulasahi", label: "Raghunath Jew Higher Secondary School, Deulasahi" },
    { value: "Ravenshaw Higher Secondary School, Cuttack", label: "Ravenshaw Higher Secondary School, Cuttack" },
    { value: "Shailabala Women's Higher Secondary School, Cuttack", label: "Shailabala Women's Higher Secondary School, Cuttack" },
    { value: "Stewart Science Higher Secondary School, Cuttack", label: "Stewart Science Higher Secondary School, Cuttack" },
    { value: "Ananta Balia Higher Secondary School, Nuagarh", label: "Ananta Balia Higher Secondary School, Nuagarh" },
    { value: "Cuttack Higher Secondary School, Nayabazar", label: "Cuttack Higher Secondary School, Nayabazar" },
    { value: "Jatiya Kabi Bira Kishore Government Higher Secondary School, Cuttack", label: "Jatiya Kabi Bira Kishore Government Higher Secondary School, Cuttack" },
    { value: "Kandarpur Higher Secondary School, Kandarpur", label: "Kandarpur Higher Secondary School, Kandarpur" },
    { value: "Kishore Nagar Higher Secondary School, Kishore Nagar", label: "Kishore Nagar Higher Secondary School, Kishore Nagar" },
    { value: "Kusum Devi Satsang Women's Higher Secondary School, Cuttack", label: "Kusum Devi Satsang Women's Higher Secondary School, Cuttack" },
    { value: "Laksheswar Women's Higher Secondary School, Phulnakhara", label: "Laksheswar Women's Higher Secondary School, Phulnakhara" },
    { value: "Sudarsan Higher Secondary School, 42 Mouza", label: "Sudarsan Higher Secondary School, 42 Mouza" },
    { value: "Domapara Anchalika Higher Secondary School, Dampara", label: "Domapara Anchalika Higher Secondary School, Dampara" },
    { value: "Rani Suka Dei Mahila Higher Secondary School, Banki", label: "Rani Suka Dei Mahila Higher Secondary School, Banki" },
    { value: "Govindpur Higher Secondary School, Govindpur", label: "Govindpur Higher Secondary School, Govindpur" },
    { value: "Govindpur Women's Higher Secondary School, Govindpur", label: "Govindpur Women's Higher Secondary School, Govindpur" },
    { value: "Udayanath Higher Secondary School of Science & Technology, Adaspur", label: "Udayanath Higher Secondary School of Science & Technology, Adaspur" },
    { value: "Durga Charan Nayak Memorial Higher Secondary School, Haladia", label: "Durga Charan Nayak Memorial Higher Secondary School, Haladia" },
    { value: "Jawaharlal Nehru Higher Secondary School, Kuanpal", label: "Jawaharlal Nehru Higher Secondary School, Kuanpal" },
    { value: "Jhadeswarpur Higher Secondary School, Jhadeswarpur", label: "Jhadeswarpur Higher Secondary School, Jhadeswarpur" },
    { value: "Mahanga Puspagiri Higher Secondary School, Erkana", label: "Mahanga Puspagiri Higher Secondary School, Erkana" },
    { value: "Mahanga Womens Higher Secondary School, Pallisahi", label: "Mahanga Womens Higher Secondary School, Pallisahi" },
    { value: "Champanatha Dev Higher Secondary School, Champeswar", label: "Champanatha Dev Higher Secondary School, Champeswar" },
    { value: "Kanpur Anchalika Higher Secondary School, Kanpur", label: "Kanpur Anchalika Higher Secondary School, Kanpur" },
    { value: "Narasinghpur Higher Secondary School, Narasinghpur", label: "Narasinghpur Higher Secondary School, Narasinghpur" },
    { value: "ZORUM GOVT HIGHER SECONDARY SCHOOL, ZILLINDA", label: "ZORUM GOVT HIGHER SECONDARY SCHOOL, ZILLINDA" },
    { value: "Devi Kandal Nityananda Higher Secondary School, Eranch", label: "Devi Kandal Nityananda Higher Secondary School, Eranch" },
    { value: "Dola Govinda Braja Kishore Higher Secondary School, Kasarda", label: "Dola Govinda Braja Kishore Higher Secondary School, Kasarda" },
    { value: "MADHABANANDAJEW GOVT HIGHER SECONDARY SCHOOL, MADHAB", label: "MADHABANANDAJEW GOVT HIGHER SECONDARY SCHOOL, MADHAB" },
    { value: "Niali Higher Secondary School, Niali", label: "Niali Higher Secondary School, Niali" },
    { value: "Prachi Women's Higher Secondary School, Niali", label: "Prachi Women's Higher Secondary School, Niali" },
    { value: "Ballavi Devi Mahila Higher Secondary School, Natakai", label: "Ballavi Devi Mahila Higher Secondary School, Natakai" },
    { value: "Mahapurusa Achyutananda Higher Secondary School, Nemala", label: "Mahapurusa Achyutananda Higher Secondary School, Nemala" },
    { value: "Panchayat Prahalad Higher Secondary School, Nischintakoili", label: "Panchayat Prahalad Higher Secondary School, Nischintakoili" },
    { value: "Subhadra Mahatab Higher Secondary School, Asureswar", label: "Subhadra Mahatab Higher Secondary School, Asureswar" },
    { value: "Bahugram Higher Secondary School, Bahugram", label: "Bahugram Higher Secondary School, Bahugram" },
    { value: "Mahanadi Higher Secondary School, Ratilo", label: "Mahanadi Higher Secondary School, Ratilo" },
    { value: "Reba Anchalika Higher Secondary School, Reba", label: "Reba Anchalika Higher Secondary School, Reba" },
    { value: "Salepur Higher Secondary School, Salepur", label: "Salepur Higher Secondary School, Salepur" },
    { value: "Women's Higher Secondary School, Japakuda", label: "Women's Higher Secondary School, Japakuda" },
    { value: "Biswa Nahakani Higher Secondary School, Biswanahakani", label: "Biswa Nahakani Higher Secondary School, Biswanahakani" },
    { value: "Gokhel Ideal Higher Secondary School, Sankarpur", label: "Gokhel Ideal Higher Secondary School, Sankarpur" },
    { value: "Kakhadi Higher Secondary School, Kakhadi", label: "Kakhadi Higher Secondary School, Kakhadi" },
    { value: "Lakshmi Narayan Sahu Higher Secondary School, Jagatpur", label: "Lakshmi Narayan Sahu Higher Secondary School, Jagatpur" },
    { value: "Tangi Higher Secondary School, Tangi", label: "Tangi Higher Secondary School, Tangi" },
    { value: "Chaitanya Sahu Higher Secondary School of Science & Arts, Nuapatna", label: "Chaitanya Sahu Higher Secondary School of Science & Arts, Nuapatna" },
    { value: "Kalinga Women's Higher Secondary School, Tigiria", label: "Kalinga Women's Higher Secondary School, Tigiria" },
    { value: "Prasana Purusotam Dev Higher Secondary School, Tigiria", label: "Prasana Purusotam Dev Higher Secondary School, Tigiria" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, DANTARIBAHAL", label: "GOVT HIGHER SECONDARY SCHOOL, DANTARIBAHAL" },
    { value: "Kandhal Higher Secondary School, Kandhal", label: "Kandhal Higher Secondary School, Kandhal" },
    { value: "PANCHAYAT GOVT HIGHER SECONDARY SCHOOL, KADOPADA , BARKOTE", label: "PANCHAYAT GOVT HIGHER SECONDARY SCHOOL, KADOPADA , BARKOTE" },
    { value: "Panchayat Higher Secondary School, Kalla", label: "Panchayat Higher Secondary School, Kalla" },
    { value: "Panchayat Samiti Higher Secondary School, Danra", label: "Panchayat Samiti Higher Secondary School, Danra" },
    { value: "Deogarh Higher Secondary School, Deogarh", label: "Deogarh Higher Secondary School, Deogarh" },
    { value: "Deogarh Women's Higher Secondary School, Deogarh", label: "Deogarh Women's Higher Secondary School, Deogarh" },
    { value: "Budhapal Anchalika Higher Secondary School, Budhapal", label: "Budhapal Anchalika Higher Secondary School, Budhapal" },
    { value: "Palsama Higher Secondary School, Palsama", label: "Palsama Higher Secondary School, Palsama" },
    { value: "PANCHAPALI GOVT HIGHER SECONDARY SCHOOL,NUADIHI ,REAMAL", label: "PANCHAPALI GOVT HIGHER SECONDARY SCHOOL,NUADIHI ,REAMAL" },
    { value: "Reamal Higher Secondary School, Reamal", label: "Reamal Higher Secondary School, Reamal" },
    { value: "Ekalabya Panchayat Samiti Higher Secondary School, Kansar", label: "Ekalabya Panchayat Samiti Higher Secondary School, Kansar" },
    { value: "JANATA GOVT HIGHER SECONDARY SCHOOL,LAIMURA", label: "JANATA GOVT HIGHER SECONDARY SCHOOL,LAIMURA" },
    { value: "Panchayat Samiti Higher Secondary School, Suguda", label: "Panchayat Samiti Higher Secondary School, Suguda" },
    { value: "Subash Naik Higher Secondary School, Ludhar", label: "Subash Naik Higher Secondary School, Ludhar" },
    { value: "Jiral Higher Secondary School, Jiral", label: "Jiral Higher Secondary School, Jiral" },
    { value: "Mathkargola Higher Secondary School, Mathkorgola", label: "Mathkargola Higher Secondary School, Mathkorgola" },
    { value: "Nuahat Anchalika Panchayat Higher Secondary School, Nuahat", label: "Nuahat Anchalika Panchayat Higher Secondary School, Nuahat" },
    { value: "Sri Sri Balunkeswar Higher Secondary School, Baruan", label: "Sri Sri Balunkeswar Higher Secondary School, Baruan" },
    { value: "Tapoban Higher Secondary School, Kunida", label: "Tapoban Higher Secondary School, Kunida" },
    { value: "Baji Rout Memorial Higher Secondary School, Bhuban", label: "Baji Rout Memorial Higher Secondary School, Bhuban" },
    { value: "Bhuban Women's Higher Secondary School, Bhuban", label: "Bhuban Women's Higher Secondary School, Bhuban" },
    { value: "Dhenkanal Evening Higher Secondary School, Dhenkanal", label: "Dhenkanal Evening Higher Secondary School, Dhenkanal" },
    { value: "Dhenkanal Higher Secondary School, Dhenkanal", label: "Dhenkanal Higher Secondary School, Dhenkanal" },
    { value: "Government Women's Higher Secondary School, Dhenkanal", label: "Government Women's Higher Secondary School, Dhenkanal" },
    { value: "Beltikiri Anchalika Higher Secondary School, Beltikiri", label: "Beltikiri Anchalika Higher Secondary School, Beltikiri" },
    { value: "Debendra Satapathy Memorial Higher Secondary School, Bhapur", label: "Debendra Satapathy Memorial Higher Secondary School, Bhapur" },
    { value: "Panchayat Higher Secondary School of Science & Technology, Gengutia", label: "Panchayat Higher Secondary School of Science & Technology, Gengutia" },
    { value: "Utkalmani Gopabandhu Higher Secondary School, Gobindapur", label: "Utkalmani Gopabandhu Higher Secondary School, Gobindapur" },
    { value: "Kapilash Higher Secondary School, Gondia", label: "Kapilash Higher Secondary School, Gondia" },
    { value: "Mahima Higher Secondary School, Joranda", label: "Mahima Higher Secondary School, Joranda" },
    { value: "Shree Jagannath Higher Secondary School, Pingua", label: "Shree Jagannath Higher Secondary School, Pingua" },
    { value: "SRI SRI CHANDRASEKHAR JEW GOVT HIGHER SECONDARY SCHOOL, DEOGAON", label: "SRI SRI CHANDRASEKHAR JEW GOVT HIGHER SECONDARY SCHOOL, DEOGAON" },
    { value: "Sridhar Swami Higher Secondary School of Education & Technology, Sadangi", label: "Sridhar Swami Higher Secondary School of Education & Technology, Sadangi" },
    { value: "Hindol Higher Secondary School, Khajuriakota", label: "Hindol Higher Secondary School, Khajuriakota" },
    { value: "Janata Higher Secondary School, Satamile", label: "Janata Higher Secondary School, Satamile" },
    { value: "Mahila Higher Secondary School, Rasol", label: "Mahila Higher Secondary School, Rasol" },
    { value: "Parikul Higher Secondary School, Paik purunakote", label: "Parikul Higher Secondary School, Paik purunakote" },
    { value: "Regional Higher Secondary School, Hindol", label: "Regional Higher Secondary School, Hindol" },
    { value: "Anchalika Higher Secondary School, Guneibil", label: "Anchalika Higher Secondary School, Guneibil" },
    { value: "Anchalika Higher Secondary School, Kurumuna", label: "Anchalika Higher Secondary School, Kurumuna" },
    { value: "Parimal Higher Secondary School, Pandua", label: "Parimal Higher Secondary School, Pandua" },
    { value: "Kamakshyanagar Higher Secondary School, Kamakshyanagar", label: "Kamakshyanagar Higher Secondary School, Kamakshyanagar" },
    { value: "Women's Higher Secondary School, Kamakshyanagar", label: "Women's Higher Secondary School, Kamakshyanagar" },
    { value: "Bapuji Higher Secondary School, Garhpalasuni", label: "Bapuji Higher Secondary School, Garhpalasuni" },
    { value: "Birasal Anchalika Higher Secondary School, Birasal", label: "Birasal Anchalika Higher Secondary School, Birasal" },
    { value: "Kankadahad Higher Secondary School, Kankadahad", label: "Kankadahad Higher Secondary School, Kankadahad" },
    { value: "Palasuni Bisa Mahima Higher Secondary School, Mahaviroad", label: "Palasuni Bisa Mahima Higher Secondary School, Mahaviroad" },
    { value: "Anchalika Higher Secondary School, Pragyan Vihar", label: "Anchalika Higher Secondary School, Pragyan Vihar" },
    { value: "Khadagaprasad Anchalika Higher Secondary School, Khadagaprasad", label: "Khadagaprasad Anchalika Higher Secondary School, Khadagaprasad" },
    { value: "Odapada Panchayat Samiti Higher Secondary School, Hindol Road", label: "Odapada Panchayat Samiti Higher Secondary School, Hindol Road" },
    { value: "Sachidananda Higher Secondary School, Indipur", label: "Sachidananda Higher Secondary School, Indipur" },
    { value: "Satyam Sivam Sundaram Higher Secondary School, Gauda Kateni", label: "Satyam Sivam Sundaram Higher Secondary School, Gauda Kateni" },
    { value: "Astasambhu Higher Secondary School, Kualo", label: "Astasambhu Higher Secondary School, Kualo" },
    { value: "Barihapur Higher Secondary School, Barihapur", label: "Barihapur Higher Secondary School, Barihapur" },
    { value: "Parjang Higher Secondary School, Parjang", label: "Parjang Higher Secondary School, Parjang" },
    { value: "Regional Higher Secondary School, Sanda", label: "Regional Higher Secondary School, Sanda" },
    { value: "Meena Ketan Higher Secondary School, Gurandi", label: "Meena Ketan Higher Secondary School, Gurandi" },
    { value: "Binodini Science Higher Secondary School, Padmapur", label: "Binodini Science Higher Secondary School, Padmapur" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, SERANGO", label: "GOVT HIGHER SECONDARY SCHOOL, SERANGO" },
    { value: "Sriram Higher Secondary School, Kasinagar", label: "Sriram Higher Secondary School, Kasinagar" },
    { value: "Hill Top Higher Secondary School, Mohana", label: "Hill Top Higher Secondary School, Mohana" },
    { value: "Indira Memorial Higher Secondary School, Chandiput", label: "Indira Memorial Higher Secondary School, Chandiput" },
    { value: "Baba Saheb Ambedkar Higher Secondary School, Khajuriapada", label: "Baba Saheb Ambedkar Higher Secondary School, Khajuriapada" },
    { value: "BADAPADA HIGHER SECONDARY SCHOOL, NUAGADA", label: "BADAPADA HIGHER SECONDARY SCHOOL, NUAGADA" },
    { value: "Sri Krushna Chandra Gajapati Higher Secondary School, Paralakhemundi", label: "Sri Krushna Chandra Gajapati Higher Secondary School, Paralakhemundi" },
    { value: "Women's Higher Secondary School, Paralakhemundi", label: "Women's Higher Secondary School, Paralakhemundi" },
    { value: "Mahendra Tanaya Higher Secondary School, R. Udayagiri", label: "Mahendra Tanaya Higher Secondary School, R. Udayagiri" },
    { value: "Mahendragiri Higher Secondary School, Ramagiri", label: "Mahendragiri Higher Secondary School, Ramagiri" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, DAMBAL", label: "GOVT HIGHER SECONDARY SCHOOL, DAMBAL" },
    { value: "Parsuram Gurukul Higher Secondary School, Sevakpur", label: "Parsuram Gurukul Higher Secondary School, Sevakpur" },
    { value: "Aska Science Higher Secondary School, Aska", label: "Aska Science Higher Secondary School, Aska" },
    { value: "Nimina Brundaban Chandra Higher Secondary School, Kendupadar", label: "Nimina Brundaban Chandra Higher Secondary School, Kendupadar" },
    { value: "Niranjan Government Higher Secondary School, Aska", label: "Niranjan Government Higher Secondary School, Aska" },
    { value: "Janata Bigyan Higher Secondary School, Beguniapada", label: "Janata Bigyan Higher Secondary School, Beguniapada" },
    { value: "Bellaguntha Women's Higher Secondary School, Bellaguntha", label: "Bellaguntha Women's Higher Secondary School, Bellaguntha" },
    { value: "Kshetriyabarapur Anchalika Science Higher Secondary School, Kshetriyabarapur", label: "Kshetriyabarapur Anchalika Science Higher Secondary School, Kshetriyabarapur" },
    { value: "Prafulla Kumari Women's Higher Secondary School, Gobara", label: "Prafulla Kumari Women's Higher Secondary School, Gobara" },
    { value: "Bellaguntha Science Higher Secondary School, Bellaguntha", label: "Bellaguntha Science Higher Secondary School, Bellaguntha" },
    { value: "Binayak Acharya Higher Secondary School, Berhampur", label: "Binayak Acharya Higher Secondary School, Berhampur" },
    { value: "City Higher Secondary School, Berhampur", label: "City Higher Secondary School, Berhampur" },
    { value: "Deccan Higher Secondary School, Berhampur", label: "Deccan Higher Secondary School, Berhampur" },
    { value: "Khallikote Higher Secondary School, Berhampur", label: "Khallikote Higher Secondary School, Berhampur" },
    { value: "Mahamaye Mahila Higher Secondary School, Gandhinagar", label: "Mahamaye Mahila Higher Secondary School, Gandhinagar" },
    { value: "Sashi Bhusan Rath Government Women's Higher Secondary School, Berhampur", label: "Sashi Bhusan Rath Government Women's Higher Secondary School, Berhampur" },
    { value: "Suprava Devi Women's Higher Secondary School, Berhampur", label: "Suprava Devi Women's Higher Secondary School, Berhampur" },
    { value: "Dandapani Maharatha Science Higher Secondary School, Gallery", label: "Dandapani Maharatha Science Higher Secondary School, Gallery" },
    { value: "GOVT HIGHER SECONDARY SCHOOL,MUJAGADA", label: "GOVT HIGHER SECONDARY SCHOOL,MUJAGADA" },
    { value: "Kabi Samrat Upendra Bhanja Higher Secondary School, Bhanjanagar", label: "Kabi Samrat Upendra Bhanja Higher Secondary School, Bhanjanagar" },
    { value: "Savitri Women's Higher Secondary School, Bhanjanagar", label: "Savitri Women's Higher Secondary School, Bhanjanagar" },
    { value: "Anchalika Science Higher Secondary School, Ballipadar", label: "Anchalika Science Higher Secondary School, Ballipadar" },
    { value: "Manitara Science Higher Secondary School, Manitara", label: "Manitara Science Higher Secondary School, Manitara" },
    { value: "SAKUNTALA GOVT HIGHER SECONDARY SCHOOL, KARACHULI", label: "SAKUNTALA GOVT HIGHER SECONDARY SCHOOL, KARACHULI" },
    { value: "People's Higher Secondary School, Buguda", label: "People's Higher Secondary School, Buguda" },
    { value: "Sri Baladev Jew Mahila Higher Secondary School, Buguda", label: "Sri Baladev Jew Mahila Higher Secondary School, Buguda" },
    { value: "Khetra Mohan Science Higher Secondary School, Narendrapur", label: "Khetra Mohan Science Higher Secondary School, Narendrapur" },
    { value: "Nursingha Nath Higher Secondary School, Mahanadpur", label: "Nursingha Nath Higher Secondary School, Mahanadpur" },
    { value: "Chhatrapur Women's Higher Secondary School, Chhatrapur", label: "Chhatrapur Women's Higher Secondary School, Chhatrapur" },
    { value: "Government Higher Secondary School, Chhatrapur", label: "Government Higher Secondary School, Chhatrapur" },
    { value: "Nuvapada Sri Balaji Higher Secondary School, Nuapada", label: "Nuvapada Sri Balaji Higher Secondary School, Nuapada" },
    { value: "Regional Science Higher Secondary School, Sorola", label: "Regional Science Higher Secondary School, Sorola" },
    { value: "Chikiti Higher Secondary School, Chikiti", label: "Chikiti Higher Secondary School, Chikiti" },
    { value: "Ananta Narayana Higher Secondary School, Dharakote", label: "Ananta Narayana Higher Secondary School, Dharakote" },
    { value: "Somanath Science Higher Secondary School, Mundamarai", label: "Somanath Science Higher Secondary School, Mundamarai" },
    { value: "Biju Patnaik Women's Higher Secondary School, Digapahandi", label: "Biju Patnaik Women's Higher Secondary School, Digapahandi" },
    { value: "Chidananda Saraswati Higher Secondary School, Bamkoi", label: "Chidananda Saraswati Higher Secondary School, Bamkoi" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BORIPADAR", label: "GOVT HIGHER SECONDARY SCHOOL, BORIPADAR" },
    { value: "Khemundi Higher Secondary School, Digapahandi", label: "Khemundi Higher Secondary School, Digapahandi" },
    { value: "Ramjee Higher Secondary School, Bhismagiri", label: "Ramjee Higher Secondary School, Bhismagiri" },
    { value: "Gopal Krushna Vigyan Higher Secondary School, Subalya", label: "Gopal Krushna Vigyan Higher Secondary School, Subalya" },
    { value: "Humma Salt Higher Secondary School, Humma", label: "Humma Salt Higher Secondary School, Humma" },
    { value: "Saheed Bhagat Singh Higher Secondary School, Khandadeuli", label: "Saheed Bhagat Singh Higher Secondary School, Khandadeuli" },
    { value: "Ganjam Higher Secondary School, Ganjam", label: "Ganjam Higher Secondary School, Ganjam" },
    { value: "Gopalpur Higher Secondary School, Gopalpur, Ganjam", label: "Gopalpur Higher Secondary School, Gopalpur, Ganjam" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KANCHURU", label: "GOVT HIGHER SECONDARY SCHOOL, KANCHURU" },
    { value: "Khambeya Dora Science Higher Secondary School, Pochilima", label: "Khambeya Dora Science Higher Secondary School, Pochilima" },
    { value: "Sri Beleswar Higher Secondary School, Gondala", label: "Sri Beleswar Higher Secondary School, Gondala" },
    { value: "Science Higher Secondary School, Hinjilicut", label: "Science Higher Secondary School, Hinjilicut" },
    { value: "ANA GOVT HIGHER SECONDARY SCHOOL , KALINGAPADAR", label: "ANA GOVT HIGHER SECONDARY SCHOOL , KALINGAPADAR" },
    { value: "Anchalika Higher Secondary School, Jagannathprasad", label: "Anchalika Higher Secondary School, Jagannathprasad" },
    { value: "Tentulia Sasan Debasthan Higher Secondary School, Bijaya Dhanurjaya Pur", label: "Tentulia Sasan Debasthan Higher Secondary School, Bijaya Dhanurjaya Pur" },
    { value: "Narayani Science Higher Secondary School, Athagadapatana", label: "Narayani Science Higher Secondary School, Athagadapatana" },
    { value: "SRI DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, BARIDAA", label: "SRI DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, BARIDAA" },
    { value: "Kabisurya Baladev Vigyan Higher Secondary School, Kabisuryanagar", label: "Kabisurya Baladev Vigyan Higher Secondary School, Kabisuryanagar" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KHOJAPALLI", label: "GOVT HIGHER SECONDARY SCHOOL, KHOJAPALLI" },
    { value: "K.P. Science Higher Secondary School, Langaleswar", label: "K.P. Science Higher Secondary School, Langaleswar" },
    { value: "Keshpur Higher Secondary School, Panditgaon", label: "Keshpur Higher Secondary School, Panditgaon" },
    { value: "Rama Chandra Mardaraj Science Higher Secondary School, Khallikote", label: "Rama Chandra Mardaraj Science Higher Secondary School, Khallikote" },
    { value: "Laxminarayan Higher Secondary School, Kodala", label: "Laxminarayan Higher Secondary School, Kodala" },
    { value: "Mahuri Kalua Higher Secondary School, Balipada", label: "Mahuri Kalua Higher Secondary School, Balipada" },
    { value: "Science Higher Secondary School, Kukudakhandi", label: "Science Higher Secondary School, Kukudakhandi" },
    { value: "Doki Sanyasi Higher Secondary School, Khariaguda", label: "Doki Sanyasi Higher Secondary School, Khariaguda" },
    { value: "Sri Bharatpati Higher Secondary School, Samantiapali", label: "Sri Bharatpati Higher Secondary School, Samantiapali" },
    { value: "Bartini Science Higher Secondary School, Bartini", label: "Bartini Science Higher Secondary School, Bartini" },
    { value: "Polasara Science Higher Secondary School, Polosara", label: "Polasara Science Higher Secondary School, Polosara" },
    { value: "Regional Women's Higher Secondary School, Polosara", label: "Regional Women's Higher Secondary School, Polosara" },
    { value: "Basudeba Sethy Science Higher Secondary School, Bhatakumarada", label: "Basudeba Sethy Science Higher Secondary School, Bhatakumarada" },
    { value: "Tara Tarini Higher Secondary School, Purusottampur", label: "Tara Tarini Higher Secondary School, Purusottampur" },
    { value: "Sri Jaganath Higher Secondary School, Rambha", label: "Sri Jaganath Higher Secondary School, Rambha" },
    { value: "Rama Narayan Higher Secondary School, Dura", label: "Rama Narayan Higher Secondary School, Dura" },
    { value: "Sidha Bhairabi Science Higher Secondary School, Konisi", label: "Sidha Bhairabi Science Higher Secondary School, Konisi" },
    { value: "Biswas Roy Science Higher Secondary School, Pattapur", label: "Biswas Roy Science Higher Secondary School, Pattapur" },
    { value: "Science Higher Secondary School, Konkorada", label: "Science Higher Secondary School, Konkorada" },
    { value: "Science Higher Secondary School, Pudamari", label: "Science Higher Secondary School, Pudamari" },
    { value: "Pitala Higher Secondary School, Pitalo", label: "Pitala Higher Secondary School, Pitalo" },
    { value: "Udaya Pratap Science Higher Secondary School, Sheragada", label: "Udaya Pratap Science Higher Secondary School, Sheragada" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BORADA , BADAGADA", label: "GOVT HIGHER SECONDARY SCHOOL, BORADA , BADAGADA" },
    { value: "JAWAHAR JYOTI GOVT HIGHER SECONDARY SCHOOL, SURAMANI, NUAGADA,", label: "JAWAHAR JYOTI GOVT HIGHER SECONDARY SCHOOL, SURAMANI, NUAGADA," },
    { value: "P.C.M. Women's Higher Secondary School, Surada", label: "P.C.M. Women's Higher Secondary School, Surada" },
    { value: "Rushikulya Higher Secondary School, Surada", label: "Rushikulya Higher Secondary School, Surada" },
    { value: "Balikuda Higher Secondary School, Balikuda", label: "Balikuda Higher Secondary School, Balikuda" },
    { value: "Balikuda Women's Higher Secondary School, Balikuda", label: "Balikuda Women's Higher Secondary School, Balikuda" },
    { value: "Basudev Mahapatra Smarahi Higher Secondary School, Talagaon", label: "Basudev Mahapatra Smarahi Higher Secondary School, Talagaon" },
    { value: "Harispur Baldev Higher Secondary School, Borikina", label: "Harispur Baldev Higher Secondary School, Borikina" },
    { value: "Alaka Higher Secondary School, Anantabata", label: "Alaka Higher Secondary School, Anantabata" },
    { value: "Baisi Mouza Higher Secondary School, Purana", label: "Baisi Mouza Higher Secondary School, Purana" },
    { value: "Dhyan Chand Higher Secondary School, Hazipur", label: "Dhyan Chand Higher Secondary School, Hazipur" },
    { value: "Brundaban Bihari Higher Secondary School, Goda", label: "Brundaban Bihari Higher Secondary School, Goda" },
    { value: "Grameswar Higher Secondary School, Panchapali", label: "Grameswar Higher Secondary School, Panchapali" },
    { value: "KUNJA BIHARI GOVT HIGHER SECONDARY SCHOOL, NUAGAOAN", label: "KUNJA BIHARI GOVT HIGHER SECONDARY SCHOOL, NUAGAOAN" },
    { value: "NILAKANTHESWAR GOVT HIGHER SECONDARY SCHOOL, KANAGULI", label: "NILAKANTHESWAR GOVT HIGHER SECONDARY SCHOOL, KANAGULI" },
    { value: "Sri Sri Jagannath Higher Secondary School, Krushnachandrapur", label: "Sri Sri Jagannath Higher Secondary School, Krushnachandrapur" },
    { value: "Ananta Sanskrit Higher Secondary School", label: "Ananta Sanskrit Higher Secondary School" },
    { value: "Biju Patnaik Higher Secondary School, Ashrampatna", label: "Biju Patnaik Higher Secondary School, Ashrampatna" },
    { value: "Gadibrahma Mahila Higher Secondary School, Kaduapada", label: "Gadibrahma Mahila Higher Secondary School, Kaduapada" },
    { value: "Sidha Baranga Higher Secondary School of Education & Technology, Punanga", label: "Sidha Baranga Higher Secondary School of Education & Technology, Punanga" },
    { value: "Swami Vivekananda Memorial Higher Secondary School, Jagatsinghpur", label: "Swami Vivekananda Memorial Higher Secondary School, Jagatsinghpur" },
    { value: "Kamala Devi Women's Higher Secondary School, Pankapal", label: "Kamala Devi Women's Higher Secondary School, Pankapal" },
    { value: "Kujanga Higher Secondary School, Kujanga", label: "Kujanga Higher Secondary School, Kujanga" },
    { value: "Narayan Birabar Samanta Higher Secondary School, Jhimani", label: "Narayan Birabar Samanta Higher Secondary School, Jhimani" },
    { value: "Panchayat Mahila Higher Secondary School, Balia", label: "Panchayat Mahila Higher Secondary School, Balia" },
    { value: "Sarala Higher Secondary School, Rahama", label: "Sarala Higher Secondary School, Rahama" },
    { value: "Maa Kutam Chandi Higher Secondary School, Devidol", label: "Maa Kutam Chandi Higher Secondary School, Devidol" },
    { value: "Sri Jagannath Higher Secondary School, Naugaonhat", label: "Sri Jagannath Higher Secondary School, Naugaonhat" },
    { value: "Sri Sri Moula Bhanja Higher Secondary School, Gangada", label: "Sri Sri Moula Bhanja Higher Secondary School, Gangada" },
    { value: "Paradeep Higher Secondary School, Paradeep", label: "Paradeep Higher Secondary School, Paradeep" },
    { value: "Bhagabati Women's Higher Secondary School, Manijanga", label: "Bhagabati Women's Higher Secondary School, Manijanga" },
    { value: "Brundaban Chandra Higher Secondary School, Redhua", label: "Brundaban Chandra Higher Secondary School, Redhua" },
    { value: "Chitrotpala Higher Secondary School of Education & Technology, Utarkul", label: "Chitrotpala Higher Secondary School of Education & Technology, Utarkul" },
    { value: "Naba Choudhury Institute Of Education & Vocational Studies Higher Secondary School, Tarikunda", label: "Naba Choudhury Institute Of Education & Vocational Studies Higher Secondary School, Tarikunda" },
    { value: "Swami Arupananda Higher Secondary School of Education & Technology, Kurtanga", label: "Swami Arupananda Higher Secondary School of Education & Technology, Kurtanga" },
    { value: "Adikabi Sarala Das Higher Secondary School, Tirtol", label: "Adikabi Sarala Das Higher Secondary School, Tirtol" },
    { value: "Baya Abadhuta Higher Secondary School, Kanimul", label: "Baya Abadhuta Higher Secondary School, Kanimul" },
    { value: "Laxmi Nrusingha Sanskrit Higher Secondary School", label: "Laxmi Nrusingha Sanskrit Higher Secondary School" },
    { value: "Shree Maa Mahila Higher Secondary School, Kollar", label: "Shree Maa Mahila Higher Secondary School, Kollar" },
    { value: "Utkal Bharati Higher Secondary School, Mahilo", label: "Utkal Bharati Higher Secondary School, Mahilo" },
    { value: "Baba Bhairabananda Higher Secondary School, Chandikhol", label: "Baba Bhairabananda Higher Secondary School, Chandikhol" },
    { value: "Barchana Women's Higher Secondary School, Barchana", label: "Barchana Women's Higher Secondary School, Barchana" },
    { value: "Bishnu Samantaray Higher Secondary School, Nuahat", label: "Bishnu Samantaray Higher Secondary School, Nuahat" },
    { value: "Buddha dev Higher Secondary School, Udayagiri", label: "Buddha dev Higher Secondary School, Udayagiri" },
    { value: "Mahapurusa Hadi Das Higher Secondary School, Chhatia", label: "Mahapurusa Hadi Das Higher Secondary School, Chhatia" },
    { value: "Mahapurush Banamali Higher Secondary School, Sailipara", label: "Mahapurush Banamali Higher Secondary School, Sailipara" },
    { value: "Pallii Shree Womens Higher Secondary School, Balichandrapur", label: "Pallii Shree Womens Higher Secondary School, Balichandrapur" },
    { value: "Sahaspur Higher Secondary School, Balichandrapur", label: "Sahaspur Higher Secondary School, Balichandrapur" },
    { value: "Abhimanyu Samant Singhar Higher Secondary School, Balia", label: "Abhimanyu Samant Singhar Higher Secondary School, Balia" },
    { value: "Gopabandhu Choudhury Higher Secondary School, Ramchandrapur", label: "Gopabandhu Choudhury Higher Secondary School, Ramchandrapur" },
    { value: "Kadambini Pal Women's Higher Secondary School, Rajatota", label: "Kadambini Pal Women's Higher Secondary School, Rajatota" },
    { value: "Kasinath Higher Secondary School, Kaipada", label: "Kasinath Higher Secondary School, Kaipada" },
    { value: "Lachhaman Balajew Higher Secondary School, Angalo", label: "Lachhaman Balajew Higher Secondary School, Angalo" },
    { value: "Santhan Higher Secondary School, Bainsiria", label: "Santhan Higher Secondary School, Bainsiria" },
    { value: "Anchalika Baladev Jew Womens Higher Secondary School, Alakund", label: "Anchalika Baladev Jew Womens Higher Secondary School, Alakund" },
    { value: "Baruneswar Higher Secondary School, Arei", label: "Baruneswar Higher Secondary School, Arei" },
    { value: "Braja Sundar Higher Secondary School, Sayedpur", label: "Braja Sundar Higher Secondary School, Sayedpur" },
    { value: "Janaki Madhusudan Women's Higher Secondary School, Mandhatapatna", label: "Janaki Madhusudan Women's Higher Secondary School, Mandhatapatna" },
    { value: "Junabhadra Higher Secondary School, Bitana", label: "Junabhadra Higher Secondary School, Bitana" },
    { value: "Kharasrota Higher Secondary School, Singhipur", label: "Kharasrota Higher Secondary School, Singhipur" },
    { value: "Jhadeswar Higher Secondary School, Tolkani", label: "Jhadeswar Higher Secondary School, Tolkani" },
    { value: "Manatira Higher Secondary School, Manatira", label: "Manatira Higher Secondary School, Manatira" },
    { value: "Biripat Higher Secondary School, Biripat", label: "Biripat Higher Secondary School, Biripat" },
    { value: "Chitalo Higher Secondary School, Chitalo", label: "Chitalo Higher Secondary School, Chitalo" },
    { value: "Dasarathpur Higher Secondary School, Dasarathpur", label: "Dasarathpur Higher Secondary School, Dasarathpur" },
    { value: "Gurukul Karunakar Beda Sanskrit Higher Secondary School", label: "Gurukul Karunakar Beda Sanskrit Higher Secondary School" },
    { value: "Jayachandi Higher Secondary School, Dubakana", label: "Jayachandi Higher Secondary School, Dubakana" },
    { value: "Mangalpur Women's Higher Secondary School, Mangalpur", label: "Mangalpur Women's Higher Secondary School, Mangalpur" },
    { value: "Rambag Women's Higher Secondary School, Rambag", label: "Rambag Women's Higher Secondary School, Rambag" },
    { value: "Regional Higher Secondary School, Rambag", label: "Regional Higher Secondary School, Rambag" },
    { value: "Sadhu Goureswar Higher Secondary School, Kanikapada", label: "Sadhu Goureswar Higher Secondary School, Kanikapada" },
    { value: "Bajragiri Higher Secondary School, Kotpur", label: "Bajragiri Higher Secondary School, Kotpur" },
    { value: "Dharmasala Higher Secondary School, Dharmasala", label: "Dharmasala Higher Secondary School, Dharmasala" },
    { value: "Dharmasala Mahila Higher Secondary School, Dharmasala", label: "Dharmasala Mahila Higher Secondary School, Dharmasala" },
    { value: "Jagannath Jew Higher Secondary School, Chadheidhara", label: "Jagannath Jew Higher Secondary School, Chadheidhara" },
    { value: "Jenapur Higher Secondary School, Jenapur", label: "Jenapur Higher Secondary School, Jenapur" },
    { value: "Mukundapatra Higher Secondary School, Balarampur", label: "Mukundapatra Higher Secondary School, Balarampur" },
    { value: "Anchalika Mahila Higher Secondary School, Bandhamunda", label: "Anchalika Mahila Higher Secondary School, Bandhamunda" },
    { value: "Ashok Kumar Rout Sanskrit Higher Secondary School", label: "Ashok Kumar Rout Sanskrit Higher Secondary School" },
    { value: "Baba Hare Krushna Das Higher Secondary School, Markandpur", label: "Baba Hare Krushna Das Higher Secondary School, Markandpur" },
    { value: "Nathasahi Anchalika Higher Secondary School, Nathasahi", label: "Nathasahi Anchalika Higher Secondary School, Nathasahi" },
    { value: "Sujanpur Anchalika Panchayat Higher Secondary School, Sujanpur", label: "Sujanpur Anchalika Panchayat Higher Secondary School, Sujanpur" },
    { value: "Biraja Women's Higher Secondary School, Jajpur", label: "Biraja Women's Higher Secondary School, Jajpur" },
    { value: "Narasingh Choudhury Higher Secondary School, Jajpur", label: "Narasingh Choudhury Higher Secondary School, Jajpur" },
    { value: "Hingula Higher Secondary School, Sankhachila", label: "Hingula Higher Secondary School, Sankhachila" },
    { value: "Kanhu Charan Higher Secondary School, Korei", label: "Kanhu Charan Higher Secondary School, Korei" },
    { value: "Maa Tarini Higher Secondary School, Panikoili", label: "Maa Tarini Higher Secondary School, Panikoili" },
    { value: "Prana Krushna Higher Secondary School, Baitarini", label: "Prana Krushna Higher Secondary School, Baitarini" },
    { value: "Saptaratna Sanskrit Higher Secondary School", label: "Saptaratna Sanskrit Higher Secondary School" },
    { value: "Brahmabarada Higher Secondary School, Baradavihar", label: "Brahmabarada Higher Secondary School, Baradavihar" },
    { value: "Madhuban Higher Secondary School, Madhubanhat", label: "Madhuban Higher Secondary School, Madhubanhat" },
    { value: "Madhupur Higher Secondary School, Kalan", label: "Madhupur Higher Secondary School, Kalan" },
    { value: "Upendranath Sarada Higher Secondary School, Mugapal", label: "Upendranath Sarada Higher Secondary School, Mugapal" },
    { value: "Bharati Vihar Higher Secondary School, Haripur", label: "Bharati Vihar Higher Secondary School, Haripur" },
    { value: "Kapileswar Higher Secondary School, Duburi", label: "Kapileswar Higher Secondary School, Duburi" },
    { value: "MAHAGIRI GOVT HIGHER SECONDARY SCHOOL, KUHIKA", label: "MAHAGIRI GOVT HIGHER SECONDARY SCHOOL, KUHIKA" },
    { value: "Sukinda Higher Secondary School, Sukinda", label: "Sukinda Higher Secondary School, Sukinda" },
    { value: "Indira Gandhi Mahila Higher Secondary School , Jajpur Road", label: "Indira Gandhi Mahila Higher Secondary School , Jajpur Road" },
    { value: "Vyasa Nagar Higher Secondary School, Jajpur Road", label: "Vyasa Nagar Higher Secondary School, Jajpur Road" },
    { value: "Belpahar Higher Secondary School, Belpahar", label: "Belpahar Higher Secondary School, Belpahar" },
    { value: "Brajarajnagar Higher Secondary School, Brajarajnagar", label: "Brajarajnagar Higher Secondary School, Brajarajnagar" },
    { value: "Indira Gandhi Women's Higher Secondary School, Brajarajnagar", label: "Indira Gandhi Women's Higher Secondary School, Brajarajnagar" },
    { value: "Pradosh Kumar Smruti Smaraki Higher Secondary School, H. Katapali", label: "Pradosh Kumar Smruti Smaraki Higher Secondary School, H. Katapali" },
    { value: "Salegram Sakunia Higher Secondary School, Talpatia", label: "Salegram Sakunia Higher Secondary School, Talpatia" },
    { value: "Jharsuguda Women's Higher Secondary School, Jharsuguda", label: "Jharsuguda Women's Higher Secondary School, Jharsuguda" },
    { value: "Laxmi Narayan Higher Secondary School, Jharsuguda", label: "Laxmi Narayan Higher Secondary School, Jharsuguda" },
    { value: "Arda Higher Secondary School, Arda", label: "Arda Higher Secondary School, Arda" },
    { value: "Sovan Memorial Panchayat Higher Secondary School, Kirmira", label: "Sovan Memorial Panchayat Higher Secondary School, Kirmira" },
    { value: "Basumati Science Higher Secondary School, Samasingha", label: "Basumati Science Higher Secondary School, Samasingha" },
    { value: "Dwarika Prasad Agrawalla Higher Secondary School, Bagmara", label: "Dwarika Prasad Agrawalla Higher Secondary School, Bagmara" },
    { value: "Panchayat Samiti Higher Secondary School, Kolabira", label: "Panchayat Samiti Higher Secondary School, Kolabira" },
    { value: "Bhatlaida Higher Secondary School, Bhatlaida", label: "Bhatlaida Higher Secondary School, Bhatlaida" },
    { value: "Kabi Buddharay Gountia Higher Secondary School, Salhetikra", label: "Kabi Buddharay Gountia Higher Secondary School, Salhetikra" },
    { value: "Panchayat Samiti Higher Secondary School, Laikera", label: "Panchayat Samiti Higher Secondary School, Laikera" },
    { value: "Talmunda Anchalika Mahila Higher Secondary School, Talmunda", label: "Talmunda Anchalika Mahila Higher Secondary School, Talmunda" },
    { value: "GOVT ANCHALIKA HIGHER SECONDARY SCHOOL, MURALIPALI", label: "GOVT ANCHALIKA HIGHER SECONDARY SCHOOL, MURALIPALI" },
    { value: "Mahima Higher Secondary School, Mahimapuram", label: "Mahima Higher Secondary School, Mahimapuram" },
    { value: "Panchayat Anchalik Higher Secondary School, Kumarbandh", label: "Panchayat Anchalik Higher Secondary School, Kumarbandh" },
    { value: "Chandrika Jain Higher Secondary School, Borda", label: "Chandrika Jain Higher Secondary School, Borda" },
    { value: "DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, DADPUR", label: "DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, DADPUR" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, SEINPUR", label: "GOVT HIGHER SECONDARY SCHOOL, SEINPUR" },
    { value: "Panchayat Samiti Higher Secondary School, Karlapada", label: "Panchayat Samiti Higher Secondary School, Karlapada" },
    { value: "Government Higher Secondary School, Bhawanipatna", label: "Government Higher Secondary School, Bhawanipatna" },
    { value: "Government Women's Higher Secondary School, Bhawanipatna", label: "Government Women's Higher Secondary School, Bhawanipatna" },
    { value: "J.P. Sandhya Higher Secondary School, Bhawanipatna", label: "J.P. Sandhya Higher Secondary School, Bhawanipatna" },
    { value: "Boarder Higher Secondary School, Kankeri", label: "Boarder Higher Secondary School, Kankeri" },
    { value: "Dharamgarh Women's Higher Secondary School, Dharamgarh", label: "Dharamgarh Women's Higher Secondary School, Dharamgarh" },
    { value: "Lakhi Ram Agrawal Higher Secondary School, Behera", label: "Lakhi Ram Agrawal Higher Secondary School, Behera" },
    { value: "Panchayat Higher Secondary School, Dharamgarh", label: "Panchayat Higher Secondary School, Dharamgarh" },
    { value: "Anchalika Bastarani Higher Secondary School, Sanchergaon", label: "Anchalika Bastarani Higher Secondary School, Sanchergaon" },
    { value: "Sarbamangala Higher Secondary School, Golamunda", label: "Sarbamangala Higher Secondary School, Golamunda" },
    { value: "Semlian Higher Secondary School, Chichia", label: "Semlian Higher Secondary School, Chichia" },
    { value: "Indrabati Higher Secondary School, Jaipatna", label: "Indrabati Higher Secondary School, Jaipatna" },
    { value: "Patitapaban Higher Secondary School, Arebeda", label: "Patitapaban Higher Secondary School, Arebeda" },
    { value: "BALAJEE GOVT HIGHER SECONDARY SCHOOL, MAHICHALA", label: "BALAJEE GOVT HIGHER SECONDARY SCHOOL, MAHICHALA" },
    { value: "Chichaiguda Higher Secondary School, Chichaiguda", label: "Chichaiguda Higher Secondary School, Chichaiguda" },
    { value: "Swami Chidananda Higher Secondary School, Karchala", label: "Swami Chidananda Higher Secondary School, Karchala" },
    { value: "Chamelidevi Women's Higher Secondary School, Junagarh (NAC)", label: "Chamelidevi Women's Higher Secondary School, Junagarh (NAC)" },
    { value: "Priyadarshini Indira Higher Secondary School, Junagarh", label: "Priyadarshini Indira Higher Secondary School, Junagarh" },
    { value: "Amohamani Higher Secondary School, Kalampur", label: "Amohamani Higher Secondary School, Kalampur" },
    { value: "Mahabharat Higher Secondary School, Bijamara", label: "Mahabharat Higher Secondary School, Bijamara" },
    { value: "Hara Gouri Higher Secondary School, Kusurla", label: "Hara Gouri Higher Secondary School, Kusurla" },
    { value: "Jagannath Kausalya Higher Secondary School, Risida", label: "Jagannath Kausalya Higher Secondary School, Risida" },
    { value: "Kashrupada Higher Secondary School, Kashrupada", label: "Kashrupada Higher Secondary School, Kashrupada" },
    { value: "Panchayat Higher Secondary School, Belkhandi", label: "Panchayat Higher Secondary School, Belkhandi" },
    { value: "Utkela Higher Secondary School, Utkela", label: "Utkela Higher Secondary School, Utkela" },
    { value: "Kesinga Higher Secondary School, Kesinga", label: "Kesinga Higher Secondary School, Kesinga" },
    { value: "Ladugaon Higher Secondary School, Ladugaon", label: "Ladugaon Higher Secondary School, Ladugaon" },
    { value: "Panchayat Samiti Higher Secondary School, Koksara", label: "Panchayat Samiti Higher Secondary School, Koksara" },
    { value: "Lanjigarh Road Higher Secondary School, Lanjigarh Road", label: "Lanjigarh Road Higher Secondary School, Lanjigarh Road" },
    { value: "Maa Heera Neela Higher Secondary School, Biswanathpur", label: "Maa Heera Neela Higher Secondary School, Biswanathpur" },
    { value: "Madanpur Rampur Higher Secondary School, Madanpur Rampur", label: "Madanpur Rampur Higher Secondary School, Madanpur Rampur" },
    { value: "Bijayananda Panchayat Higher Secondary School, Tulapada", label: "Bijayananda Panchayat Higher Secondary School, Tulapada" },
    { value: "GOVT HIGHER SECONDARY SCHOOL ULIKUPA", label: "GOVT HIGHER SECONDARY SCHOOL ULIKUPA" },
    { value: "Milita Panchayat Higher Secondary School, Muskuti", label: "Milita Panchayat Higher Secondary School, Muskuti" },
    { value: "Panchayat Samiti Higher Secondary School, Narla", label: "Panchayat Samiti Higher Secondary School, Narla" },
    { value: "RADHAKRISHNA GOVT HIGHER SECONDARY SCHOOL, SANTPUR", label: "RADHAKRISHNA GOVT HIGHER SECONDARY SCHOOL, SANTPUR" },
    { value: "GOVT HIGHER SECONDARY SCHOOL , MAHULPATNA", label: "GOVT HIGHER SECONDARY SCHOOL , MAHULPATNA" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KANIGUMA", label: "GOVT HIGHER SECONDARY SCHOOL, KANIGUMA" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KIAPADAR", label: "GOVT HIGHER SECONDARY SCHOOL, KIAPADAR" },
    { value: "Maa Manikeswari Panchayat Samiti Higher Secondary School, Thuamul Rampur", label: "Maa Manikeswari Panchayat Samiti Higher Secondary School, Thuamul Rampur" },
    { value: "Adibasi Higher Secondary School, Balliguda", label: "Adibasi Higher Secondary School, Balliguda" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BARAKHAMA", label: "GOVT HIGHER SECONDARY SCHOOL, BARAKHAMA" },
    { value: "Anchalika Higher Secondary School, Sankarakhol", label: "Anchalika Higher Secondary School, Sankarakhol" },
    { value: "Gurukul Sanskrit Higher Secondary School", label: "Gurukul Sanskrit Higher Secondary School" },
    { value: "Kuidana Indira Gandhi Memorial Higher Secondary School, Lilnepade", label: "Kuidana Indira Gandhi Memorial Higher Secondary School, Lilnepade" },
    { value: "Dr. Ambedkar National Higher Secondary School, Daringbadi", label: "Dr. Ambedkar National Higher Secondary School, Daringbadi" },
    { value: "Rusimal Higher Secondary School, Bamunigam", label: "Rusimal Higher Secondary School, Bamunigam" },
    { value: "Govt Higher Secondary School, Lingagada, GUdayagiri", label: "Govt Higher Secondary School, Lingagada, GUdayagiri" },
    { value: "Indira Priyadarshni Women's Higher Secondary School, G. Udayagiri", label: "Indira Priyadarshni Women's Higher Secondary School, G. Udayagiri" },
    { value: "Kalinga Higher Secondary School, G. Udayagiri", label: "Kalinga Higher Secondary School, G. Udayagiri" },
    { value: "Kandhamal Higher Secondary School, Sarangagada", label: "Kandhamal Higher Secondary School, Sarangagada" },
    { value: "Ambedkar Higher Secondary School, Khajuripada", label: "Ambedkar Higher Secondary School, Khajuripada" },
    { value: "Bapuji Higher Secondary School, Kotagarh", label: "Bapuji Higher Secondary School, Kotagarh" },
    { value: "BANABASI GOVT HIGHER SECONDARY SCHOOL, NUAPADAR", label: "BANABASI GOVT HIGHER SECONDARY SCHOOL, NUAPADAR" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BALANDAPADA", label: "GOVT HIGHER SECONDARY SCHOOL, BALANDAPADA" },
    { value: "Panchyat Higher Secondary School, Phiringa", label: "Panchyat Higher Secondary School, Phiringa" },
    { value: "Government Higher Secondary School, Phulbani", label: "Government Higher Secondary School, Phulbani" },
    { value: "Sanjaya Memorial Government Women's Higher Secondary School, Phulbani", label: "Sanjaya Memorial Government Women's Higher Secondary School, Phulbani" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BADABARABA", label: "GOVT HIGHER SECONDARY SCHOOL, BADABARABA" },
    { value: "Jeevan Jyoti Higher Secondary School, Raikia", label: "Jeevan Jyoti Higher Secondary School, Raikia" },
    { value: "AMCS Higher Secondary School, Tikaballi", label: "AMCS Higher Secondary School, Tikaballi" },
    { value: "Netaji Subash Boss Higher Secondary School, Tumudibandha", label: "Netaji Subash Boss Higher Secondary School, Tumudibandha" },
    { value: "Aul Higher Secondary School, Aul", label: "Aul Higher Secondary School, Aul" },
    { value: "Debaray Samarsingh Higher Secondary School, Ganeswarpur", label: "Debaray Samarsingh Higher Secondary School, Ganeswarpur" },
    { value: "Gandhi Memorial Higher Secondary School, Govindpur", label: "Gandhi Memorial Higher Secondary School, Govindpur" },
    { value: "Laxmi Barah Higher Secondary School, Ayatpur", label: "Laxmi Barah Higher Secondary School, Ayatpur" },
    { value: "Olaver Higher Secondary School, Olaver", label: "Olaver Higher Secondary School, Olaver" },
    { value: "Sushree Devi Women's Higher Secondary School, Aul", label: "Sushree Devi Women's Higher Secondary School, Aul" },
    { value: "Delta Higher Secondary School, Bhitarabampu", label: "Delta Higher Secondary School, Bhitarabampu" },
    { value: "Derabish Higher Secondary School, Derabish", label: "Derabish Higher Secondary School, Derabish" },
    { value: "Derabish Mahila Higher Secondary School, Derabish", label: "Derabish Mahila Higher Secondary School, Derabish" },
    { value: "Hrudananda Nayak Smaraki Higher Secondary School, Chandol", label: "Hrudananda Nayak Smaraki Higher Secondary School, Chandol" },
    { value: "Bijaya Higher Secondary School, Tyendukura", label: "Bijaya Higher Secondary School, Tyendukura" },
    { value: "Chitrotpala Women's Higher Secondary School, Korua", label: "Chitrotpala Women's Higher Secondary School, Korua" },
    { value: "Gopinathpur Sanskrit Higher Secondary School", label: "Gopinathpur Sanskrit Higher Secondary School" },
    { value: "Korua Women's Higher Secondary School, Korua", label: "Korua Women's Higher Secondary School, Korua" },
    { value: "Lokanath Higher Secondary School, Patkura", label: "Lokanath Higher Secondary School, Patkura" },
    { value: "Manab Sambal Vikas Mahila Higher Secondary School, Kalabuda", label: "Manab Sambal Vikas Mahila Higher Secondary School, Kalabuda" },
    { value: "Balia Women's Higher Secondary School, Balia", label: "Balia Women's Higher Secondary School, Balia" },
    { value: "Birupa Higher Secondary School, Indipur", label: "Birupa Higher Secondary School, Indipur" },
    { value: "Government Science Higher Secondary School, Ayeba", label: "Government Science Higher Secondary School, Ayeba" },
    { value: "Swami Vivekananda Manab Sambal Vikas Higher Secondary School, Chaudakulat", label: "Swami Vivekananda Manab Sambal Vikas Higher Secondary School, Chaudakulat" },
    { value: "Veer Hanumanjew Higher Secondary School, Nikirai", label: "Veer Hanumanjew Higher Secondary School, Nikirai" },
    { value: "Kendrapada Evening Higher Secondary School, Kendrapara", label: "Kendrapada Evening Higher Secondary School, Kendrapara" },
    { value: "Kendrapara Higher Secondary School, Kendrapara", label: "Kendrapara Higher Secondary School, Kendrapara" },
    { value: "Tulasi Women's Higher Secondary School, Kendrapara", label: "Tulasi Women's Higher Secondary School, Kendrapara" },
    { value: "Binapani Higher Secondary School, Gayaspur", label: "Binapani Higher Secondary School, Gayaspur" },
    { value: "Maa Tarini Higher Secondary School, Jayachandrapur", label: "Maa Tarini Higher Secondary School, Jayachandrapur" },
    { value: "RAMACHANDI BIJAYANANDA GOVT HIGHER SECONDARY SCHOOL, RAMNAGAR", label: "RAMACHANDI BIJAYANANDA GOVT HIGHER SECONDARY SCHOOL, RAMNAGAR" },
    { value: "Sri Sri Bayababa Higher Secondary School, Mahakalpar", label: "Sri Sri Bayababa Higher Secondary School, Mahakalpar" },
    { value: "Thakur Nigamananda Higher Secondary School, Nigamavihar", label: "Thakur Nigamananda Higher Secondary School, Nigamavihar" },
    { value: "Biju Patnaik Higher Secondary School, Antei", label: "Biju Patnaik Higher Secondary School, Antei" },
    { value: "Chitrotpola Higher Secondary School, Akhua Odanga", label: "Chitrotpola Higher Secondary School, Akhua Odanga" },
    { value: "Gandhi Uccha Madhyamik Higher Secondary School, Ayatpur", label: "Gandhi Uccha Madhyamik Higher Secondary School, Ayatpur" },
    { value: "Karilopatna Higher Secondary School, Karilopatna", label: "Karilopatna Higher Secondary School, Karilopatna" },
    { value: "Marshaghai Higher Secondary School, Marshaghai", label: "Marshaghai Higher Secondary School, Marshaghai" },
    { value: "Marshaghai Women's Higher Secondary School, Marshaghai", label: "Marshaghai Women's Higher Secondary School, Marshaghai" },
    { value: "Barpara Higher Secondary School, Barpara", label: "Barpara Higher Secondary School, Barpara" },
    { value: "Brahmani Higher Secondary School, Dandisahi", label: "Brahmani Higher Secondary School, Dandisahi" },
    { value: "U.K. Mahavir Higher Secondary School, Madanpur", label: "U.K. Mahavir Higher Secondary School, Madanpur" },
    { value: "Ushadevi Women's Higher Secondary School, Andara", label: "Ushadevi Women's Higher Secondary School, Andara" },
    { value: "Pattamundai Higher Secondary School, Pattamundai", label: "Pattamundai Higher Secondary School, Pattamundai" },
    { value: "Pattamundai Women's Higher Secondary School, Pattamundai", label: "Pattamundai Women's Higher Secondary School, Pattamundai" },
    { value: "Barha Regional Science Higher Secondary School, Hatasahi Katchery", label: "Barha Regional Science Higher Secondary School, Hatasahi Katchery" },
    { value: "Kapileswar Higher Secondary School, Katna", label: "Kapileswar Higher Secondary School, Katna" },
    { value: "Sailendra Narayan Higher Secondary School, Rajkanika", label: "Sailendra Narayan Higher Secondary School, Rajkanika" },
    { value: "NAGANARAYAN GOVT HIGHER SECONDARY SCHOOL, DANGAMAL", label: "NAGANARAYAN GOVT HIGHER SECONDARY SCHOOL, DANGAMAL" },
    { value: "Nalinikanta Higher Secondary School, Chandibaunsamul", label: "Nalinikanta Higher Secondary School, Chandibaunsamul" },
    { value: "Sri Sri Jagannath Higher Secondary School, Rajnagar", label: "Sri Sri Jagannath Higher Secondary School, Rajnagar" },
    { value: "Swapneswar Higher Secondary School, Barahpur", label: "Swapneswar Higher Secondary School, Barahpur" },
    { value: "Beleswar Higher Secondary School, Belbahali", label: "Beleswar Higher Secondary School, Belbahali" },
    { value: "Kantipal Anchalika Higher Secondary School, Anandapur", label: "Kantipal Anchalika Higher Secondary School, Anandapur" },
    { value: "LD GOVT HIGHER SECONDARY SCHOOL,KODAPADA", label: "LD GOVT HIGHER SECONDARY SCHOOL,KODAPADA" },
    { value: "Salbani G.P. Higher Secondary School, Salabani", label: "Salbani G.P. Higher Secondary School, Salabani" },
    { value: "Anandapur Higher Secondary School, Anandapur", label: "Anandapur Higher Secondary School, Anandapur" },
    { value: "Kanak Manjari Women's Higher Secondary School, Salapada", label: "Kanak Manjari Women's Higher Secondary School, Salapada" },
    { value: "BAITARANI GOVT HIGHER SECONDARY SCHOOL", label: "BAITARANI GOVT HIGHER SECONDARY SCHOOL" },
    { value: "PANCHAYAT GOVT HIGHER SECONDARY SCHOOL,TARAMAKANT", label: "PANCHAYAT GOVT HIGHER SECONDARY SCHOOL,TARAMAKANT" },
    { value: "Pateswar Higher Secondary School, Suakati", label: "Pateswar Higher Secondary School, Suakati" },
    { value: "Barbil Higher Secondary School, Barbil", label: "Barbil Higher Secondary School, Barbil" },
    { value: "Chandra Sekhar Higher Secondary School, Champua", label: "Chandra Sekhar Higher Secondary School, Champua" },
    { value: "Mahila Higher Secondary School, Champua", label: "Mahila Higher Secondary School, Champua" },
    { value: "Mohandas Karamchand Gandhi Higher Secondary School, Sarangi", label: "Mohandas Karamchand Gandhi Higher Secondary School, Sarangi" },
    { value: "Rimuli Higher Secondary School, Rimuli", label: "Rimuli Higher Secondary School, Rimuli" },
    { value: "Jagannath Higher Secondary School, Paramanandapur", label: "Jagannath Higher Secondary School, Paramanandapur" },
    { value: "Kushaleswar Anchalik Higher Secondary School, Rekutia", label: "Kushaleswar Anchalik Higher Secondary School, Rekutia" },
    { value: "Patita Paban Higher Secondary School, Sainkula", label: "Patita Paban Higher Secondary School, Sainkula" },
    { value: "Laxmi Narayan Higher Secondary School, Pipilia", label: "Laxmi Narayan Higher Secondary School, Pipilia" },
    { value: "Regional S.N. Higher Secondary School, Dhenkikote", label: "Regional S.N. Higher Secondary School, Dhenkikote" },
    { value: "Tarini Thakurani Higher Secondary School, Ghatagaon", label: "Tarini Thakurani Higher Secondary School, Ghatagaon" },
    { value: "Brajabandhu Higher Secondary School, Harichandanpur", label: "Brajabandhu Higher Secondary School, Harichandanpur" },
    { value: "Mahapat Higher Secondary School, Janghira", label: "Mahapat Higher Secondary School, Janghira" },
    { value: "Rangpat Higher Secondary School, Pandapara", label: "Rangpat Higher Secondary School, Pandapara" },
    { value: "Biswa Tarini Women's Higher Secondary School, Chhenapadi", label: "Biswa Tarini Women's Higher Secondary School, Chhenapadi" },
    { value: "Boula Higher Secondary School, Soso", label: "Boula Higher Secondary School, Soso" },
    { value: "Hatadihi Anchalika Higher Secondary School, Hatadihi", label: "Hatadihi Anchalika Higher Secondary School, Hatadihi" },
    { value: "Sadang Anchalika Higher Secondary School, Sadang", label: "Sadang Anchalika Higher Secondary School, Sadang" },
    { value: "Jhumpura Panchayat Samiti Higher Secondary School, Jhumpura", label: "Jhumpura Panchayat Samiti Higher Secondary School, Jhumpura" },
    { value: "Maa Gramyashree Higher Secondary School, Naradpur", label: "Maa Gramyashree Higher Secondary School, Naradpur" },
    { value: "Utkalmani Gopabandhu Higher Secondary School, Ukhunda", label: "Utkalmani Gopabandhu Higher Secondary School, Ukhunda" },
    { value: "SREE JAGANNATH GOVT HIGHER SECONDARY SCHOOL, JORALI", label: "SREE JAGANNATH GOVT HIGHER SECONDARY SCHOOL, JORALI" },
    { value: "Joda Women's Higher Secondary School, Joda", label: "Joda Women's Higher Secondary School, Joda" },
    { value: "Padmapur Anchalika Higher Secondary School, Padmapur", label: "Padmapur Anchalika Higher Secondary School, Padmapur" },
    { value: "Raisuan Higher Secondary School, Raisuan", label: "Raisuan Higher Secondary School, Raisuan" },
    { value: "Santosi Maa Regional Higher Secondary School, Jharbelda", label: "Santosi Maa Regional Higher Secondary School, Jharbelda" },
    { value: "Dharanidhar Higher Secondary School, Keonjhar", label: "Dharanidhar Higher Secondary School, Keonjhar" },
    { value: "Government Women's Higher Secondary School, Keonjhar", label: "Government Women's Higher Secondary School, Keonjhar" },
    { value: "Keonjhar Higher Secondary School, Keonjhar", label: "Keonjhar Higher Secondary School, Keonjhar" },
    { value: "PRAGATI GOVT HIGHER SECONDARY SCHOOL, MAIDANKEL", label: "PRAGATI GOVT HIGHER SECONDARY SCHOOL, MAIDANKEL" },
    { value: "Bhimkund Higher Secondary School, Dumuria", label: "Bhimkund Higher Secondary School, Dumuria" },
    { value: "Dadhi Baman Higher Secondary School, Turumunga", label: "Dadhi Baman Higher Secondary School, Turumunga" },
    { value: "Swampatna Anchalika Higher Secondary School, Swampatna", label: "Swampatna Anchalika Higher Secondary School, Swampatna" },
    { value: "Machhagarh Higher Secondary School, Machhagarh", label: "Machhagarh Higher Secondary School, Machhagarh" },
    { value: "Panchayat Samiti Higher Secondary School, Saharpara", label: "Panchayat Samiti Higher Secondary School, Saharpara" },
    { value: "Udayapur Anchalika Higher Secondary School, Udayapur", label: "Udayapur Anchalika Higher Secondary School, Udayapur" },
    { value: "Charigarh Higher Secondary School, Telkoi", label: "Charigarh Higher Secondary School, Telkoi" },
    { value: "Gopaljew Higher Secondary School, Benamunda", label: "Gopaljew Higher Secondary School, Benamunda" },
    { value: "SHREE JAGANATH GOVT HIGHER SECONDARY SCHOOL,GOLABANDHA", label: "SHREE JAGANATH GOVT HIGHER SECONDARY SCHOOL,GOLABANDHA" },
    { value: "Sirigida Anchalika Bigyan Higher Secondary School, Sirigida", label: "Sirigida Anchalika Bigyan Higher Secondary School, Sirigida" },
    { value: "Jawaharlal Nehru Higher Secondary School, Balianta", label: "Jawaharlal Nehru Higher Secondary School, Balianta" },
    { value: "Pratap Sasan Higher Secondary School, Balakati", label: "Pratap Sasan Higher Secondary School, Balakati" },
    { value: "Sri Sri Baneswar Higher Secondary School, Bentapur", label: "Sri Sri Baneswar Higher Secondary School, Bentapur" },
    { value: "Banamalipur Higher Secondary School, Banamalipur", label: "Banamalipur Higher Secondary School, Banamalipur" },
    { value: "Odakhanda Higher Secondary School, Odakhanda", label: "Odakhanda Higher Secondary School, Odakhanda" },
    { value: "Sishu Ananta Higher Secondary School, Balipatna", label: "Sishu Ananta Higher Secondary School, Balipatna" },
    { value: "Balugaon Higher Secondary School, Balugaon", label: "Balugaon Higher Secondary School, Balugaon" },
    { value: "BHETINATH DEV GOVT HIGHER SECONDARY SCHOOL, BHETESWAR", label: "BHETINATH DEV GOVT HIGHER SECONDARY SCHOOL, BHETESWAR" },
    { value: "Nachuni Higher Secondary School, Nachuni", label: "Nachuni Higher Secondary School, Nachuni" },
    { value: "Parsuram Higher Secondary School, Gambharimunda", label: "Parsuram Higher Secondary School, Gambharimunda" },
    { value: "Rural Women's Higher Secondary School, Banapur", label: "Rural Women's Higher Secondary School, Banapur" },
    { value: "Godavarish Higher Secondary School, Banapur", label: "Godavarish Higher Secondary School, Banapur" },
    { value: "Begunia Higher Secondary School, Begunia", label: "Begunia Higher Secondary School, Begunia" },
    { value: "Hattakeswar Mahila Higher Secondary School, Baghamari", label: "Hattakeswar Mahila Higher Secondary School, Baghamari" },
    { value: "Rama Chandi Higher Secondary School, Gadamanitri", label: "Rama Chandi Higher Secondary School, Gadamanitri" },
    { value: "Rama Mani Higher Secondary School, Kantabada", label: "Rama Mani Higher Secondary School, Kantabada" },
    { value: "Chandaka Higher Secondary School, Chandaka", label: "Chandaka Higher Secondary School, Chandaka" },
    { value: "Kunja Bihari Higher Secondary School, Baranga", label: "Kunja Bihari Higher Secondary School, Baranga" },
    { value: "Acharya Harihar Higher Secondary School, Chandrasekharpur", label: "Acharya Harihar Higher Secondary School, Chandrasekharpur" },
    { value: "Ambedkar Centenary Higher Secondary School of Education & Technology, Dumduma", label: "Ambedkar Centenary Higher Secondary School of Education & Technology, Dumduma" },
    { value: "Biju Pattnaik Higher Secondary School of Science & Education, Bhubaneswar", label: "Biju Pattnaik Higher Secondary School of Science & Education, Bhubaneswar" },
    { value: "Buxi Jagabandhu Bidyadhar Higher Secondary School, Bhubaneswar", label: "Buxi Jagabandhu Bidyadhar Higher Secondary School, Bhubaneswar" },
    { value: "City Women's Higher Secondary School, Siripur", label: "City Women's Higher Secondary School, Siripur" },
    { value: "Deb Ray Nayapalli Higher Secondary School, Bhubaneswar", label: "Deb Ray Nayapalli Higher Secondary School, Bhubaneswar" },
    { value: "Ekamra Higher Secondary School, Bhubaneswar", label: "Ekamra Higher Secondary School, Bhubaneswar" },
    { value: "Kamala Nehru Women's Higher Secondary School, Bhubaneswar", label: "Kamala Nehru Women's Higher Secondary School, Bhubaneswar" },
    { value: "Maharishi Higher Secondary School of Natural Law, Bhubaneswar", label: "Maharishi Higher Secondary School of Natural Law, Bhubaneswar" },
    { value: "Maharshi Women's Higher Secondary School, Sailashree Vihar", label: "Maharshi Women's Higher Secondary School, Sailashree Vihar" },
    { value: "Raja Madhusudan Dev Higher Secondary School of Science & Education, Patia", label: "Raja Madhusudan Dev Higher Secondary School of Science & Education, Patia" },
    { value: "Rajdhani Higher Secondary School, Bhubaneswar", label: "Rajdhani Higher Secondary School, Bhubaneswar" },
    { value: "Rama Devi Women's Higher Secondary School, Bhubaneswar", label: "Rama Devi Women's Higher Secondary School, Bhubaneswar" },
    { value: "Sri Jayadev Higher Secondary School of Education & Technology, Naharkanta", label: "Sri Jayadev Higher Secondary School of Education & Technology, Naharkanta" },
    { value: "Sri Satya Sai Higher Secondary School for Women, Pokhriput", label: "Sri Satya Sai Higher Secondary School for Women, Pokhriput" },
    { value: "Kali Charan Panchagarh Ananga Narendra Higher Secondary School, Bankoi", label: "Kali Charan Panchagarh Ananga Narendra Higher Secondary School, Bankoi" },
    { value: "Maa Sarada Women's Higher Secondary School, Tikatal", label: "Maa Sarada Women's Higher Secondary School, Tikatal" },
    { value: "Parama Nanda Higher Secondary School, Bolagarh", label: "Parama Nanda Higher Secondary School, Bolagarh" },
    { value: "Raghunath Higher Secondary School, Deuli", label: "Raghunath Higher Secondary School, Deuli" },
    { value: "Panchupalli Bhima Balabantaray Higher Secondary School, AnkulachatI", label: "Panchupalli Bhima Balabantaray Higher Secondary School, AnkulachatI" },
    { value: "Bauri Bandhu Higher Secondary School, Chhatabar", label: "Bauri Bandhu Higher Secondary School, Chhatabar" },
    { value: "Sanatan Harichandan Higher Secondary School, Madanpur", label: "Sanatan Harichandan Higher Secondary School, Madanpur" },
    { value: "Sarat Paikray Higher Secondary School, Argul", label: "Sarat Paikray Higher Secondary School, Argul" },
    { value: "Sri Somanath Balunkeswar Dev Mahila Higher Secondary School, Kantia", label: "Sri Somanath Balunkeswar Dev Mahila Higher Secondary School, Kantia" },
    { value: "Jatani Higher Secondary School, Jatni", label: "Jatani Higher Secondary School, Jatni" },
    { value: "Haladia Higher Secondary School, Haladia", label: "Haladia Higher Secondary School, Haladia" },
    { value: "Kabi Prasanna Patasani Anchalika Higher Secondary School, Malipada", label: "Kabi Prasanna Patasani Anchalika Higher Secondary School, Malipada" },
    { value: "Kerang Panchayat Higher Secondary School, Kerang", label: "Kerang Panchayat Higher Secondary School, Kerang" },
    { value: "Sri Jagannath Higher Secondary School, Kaipadar", label: "Sri Jagannath Higher Secondary School, Kaipadar" },
    { value: "Khurda Women's Higher Secondary School, Khurda", label: "Khurda Women's Higher Secondary School, Khurda" },
    { value: "Prananath Higher Secondary School, Khurda", label: "Prananath Higher Secondary School, Khurda" },
    { value: "Durga Charan Chilika Higher Secondary School, Tangi", label: "Durga Charan Chilika Higher Secondary School, Tangi" },
    { value: "Janata Higher Secondary School, Kuhudi", label: "Janata Higher Secondary School, Kuhudi" },
    { value: "Kshetrabasi Dayananda Anglovedic Higher Secondary School, Nirakarpur", label: "Kshetrabasi Dayananda Anglovedic Higher Secondary School, Nirakarpur" },
    { value: "Raghunath Adarsha Higher Secondary School, Olasingha", label: "Raghunath Adarsha Higher Secondary School, Olasingha" },
    { value: "Ramachandra Kalpana Higher Secondary School, Kamaguru", label: "Ramachandra Kalpana Higher Secondary School, Kamaguru" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BANDHUGAM", label: "GOVT HIGHER SECONDARY SCHOOL, BANDHUGAM" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KAKALPADA", label: "GOVT HIGHER SECONDARY SCHOOL, KAKALPADA" },
    { value: "Saheed Laxman Nayak Higher Secondary School, Boipariguda", label: "Saheed Laxman Nayak Higher Secondary School, Boipariguda" },
    { value: "Bhairaba Higher Secondary School, Borigumma", label: "Bhairaba Higher Secondary School, Borigumma" },
    { value: "Narasingha Higher Secondary School, Tarabhatta", label: "Narasingha Higher Secondary School, Tarabhatta" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, PODAGADA", label: "GOVT HIGHER SECONDARY SCHOOL, PODAGADA" },
    { value: "Radha Krishna Adivasi Higher Secondary School, Dasmanthpur", label: "Radha Krishna Adivasi Higher Secondary School, Dasmanthpur" },
    { value: "Government Women's Higher Secondary School, Jeypore", label: "Government Women's Higher Secondary School, Jeypore" },
    { value: "Vikram Deb Higher Secondary School, Jeypore", label: "Vikram Deb Higher Secondary School, Jeypore" },
    { value: "Dr. B.R.A. Higher Secondary School, Koraput", label: "Dr. B.R.A. Higher Secondary School, Koraput" },
    { value: "Government Higher Secondary School, Landiguda, Koraput", label: "Government Higher Secondary School, Landiguda, Koraput" },
    { value: "Government Women's Higher Secondary School, Koraput", label: "Government Women's Higher Secondary School, Koraput" },
    { value: "Kotpad Higher Secondary School, Kotpad", label: "Kotpad Higher Secondary School, Kotpad" },
    { value: "Biju Patnaik Higher Secondary School, Kundra", label: "Biju Patnaik Higher Secondary School, Kundra" },
    { value: "Dr. B.R.A. Higher Secondary School, Lamtaput", label: "Dr. B.R.A. Higher Secondary School, Lamtaput" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KAKIRIGUMMA", label: "GOVT HIGHER SECONDARY SCHOOL, KAKIRIGUMMA" },
    { value: "Laxmipur Higher Secondary School, Laxmipur", label: "Laxmipur Higher Secondary School, Laxmipur" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, PADWA", label: "GOVT HIGHER SECONDARY SCHOOL, PADWA" },
    { value: "Sindha Devi Higher Secondary School, Nandapur", label: "Sindha Devi Higher Secondary School, Nandapur" },
    { value: "Radha Krishna Higher Secondary School, Narayanpatana", label: "Radha Krishna Higher Secondary School, Narayanpatana" },
    { value: "Gangeswari Higher Secondary School, Pottangi", label: "Gangeswari Higher Secondary School, Pottangi" },
    { value: "Semiliguda Higher Secondary School, Seimiliguda", label: "Semiliguda Higher Secondary School, Seimiliguda" },
    { value: "Sunabedha Women's Higher Secondary School, Sunabeda", label: "Sunabedha Women's Higher Secondary School, Sunabeda" },
    { value: "Gopabandhu Anchalika Higher Secondary School, Kalimela", label: "Gopabandhu Anchalika Higher Secondary School, Kalimela" },
    { value: "MPV 21 GOVT HIGHER SECONDARY SCHOOL , KALIMELA", label: "MPV 21 GOVT HIGHER SECONDARY SCHOOL , KALIMELA" },
    { value: "Biju Patnaik Higher Secondary School of Education, Govindapali", label: "Biju Patnaik Higher Secondary School of Education, Govindapali" },
    { value: "Balimela Higher Secondary School of Technology, Niladrinagar", label: "Balimela Higher Secondary School of Technology, Niladrinagar" },
    { value: "CHITRAKONDA GOVT BOYS HIGHER SECONDARY SCHOOL", label: "CHITRAKONDA GOVT BOYS HIGHER SECONDARY SCHOOL" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KORUKONDA", label: "GOVT HIGHER SECONDARY SCHOOL, KORUKONDA" },
    { value: "Darwin Memorial Higher Secondary School, Kudulugumma", label: "Darwin Memorial Higher Secondary School, Kudulugumma" },
    { value: "Govt Higher Secondary School, Darlabeda", label: "Govt Higher Secondary School, Darlabeda" },
    { value: "BL GOVT HIGHER SECONDARY SCHOOL, SERPALLY", label: "BL GOVT HIGHER SECONDARY SCHOOL, SERPALLY" },
    { value: "Malkangiri Higher Secondary School, Malkangiri", label: "Malkangiri Higher Secondary School, Malkangiri" },
    { value: "Government Science Higher Secondary School, Malkanagiri", label: "Government Science Higher Secondary School, Malkanagiri" },
    { value: "Women's Higher Secondary School, Malkangiri", label: "Women's Higher Secondary School, Malkangiri" },
    { value: "BAPUJI GOVT HIGHER SECONDARY SCHOOL, ANLAPADAR", label: "BAPUJI GOVT HIGHER SECONDARY SCHOOL, ANLAPADAR" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, SALIMI", label: "GOVT HIGHER SECONDARY SCHOOL, SALIMI" },
    { value: "Utkalmani Gopabandhu Higher Secondary School, Mathili", label: "Utkalmani Gopabandhu Higher Secondary School, Mathili" },
    { value: "Dr. Shyam Prasad Higher Secondary School, MV-79", label: "Dr. Shyam Prasad Higher Secondary School, MV-79" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, URUBALLI", label: "GOVT HIGHER SECONDARY SCHOOL, URUBALLI" },
    { value: "Regional Higher Secondary School, Podia", label: "Regional Higher Secondary School, Podia" },
    { value: "Dhirajlal Higher Secondary School, Bahalda", label: "Dhirajlal Higher Secondary School, Bahalda" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, JHARADIHI", label: "GOVT HIGHER SECONDARY SCHOOL, JHARADIHI" },
    { value: "Binodini Mahila Higher Secondary School, Banakati", label: "Binodini Mahila Higher Secondary School, Banakati" },
    { value: "Haraprava Higher Secondary School, Kalabadia", label: "Haraprava Higher Secondary School, Kalabadia" },
    { value: "Laxmi Kanta Higher Secondary School, Bangriposi", label: "Laxmi Kanta Higher Secondary School, Bangriposi" },
    { value: "Baba Kakharua Baidyanath Higher Secondary School, Manatri", label: "Baba Kakharua Baidyanath Higher Secondary School, Manatri" },
    { value: "Barasahi Panchayat Samiti Higher Secondary School, Barasahi", label: "Barasahi Panchayat Samiti Higher Secondary School, Barasahi" },
    { value: "Shree Jagannath Higher Secondary School, Balijoda", label: "Shree Jagannath Higher Secondary School, Balijoda" },
    { value: "Baripada Higher Secondary School, Baripada", label: "Baripada Higher Secondary School, Baripada" },
    { value: "Krushna Chandrapur Higher Secondary School, Krushnachandrapur", label: "Krushna Chandrapur Higher Secondary School, Krushnachandrapur" },
    { value: "Sri Maa Mahila Higher Secondary School, Baripada", label: "Sri Maa Mahila Higher Secondary School, Baripada" },
    { value: "Sri Rama Chandra Bhanj Higher Secondary School, Ragdha", label: "Sri Rama Chandra Bhanj Higher Secondary School, Ragdha" },
    { value: "Maharaja Purna Chandra Higher Secondary School, Baripada", label: "Maharaja Purna Chandra Higher Secondary School, Baripada" },
    { value: "Anla Higher Secondary School, Anla", label: "Anla Higher Secondary School, Anla" },
    { value: "Betnoti Higher Secondary School, Betnoti", label: "Betnoti Higher Secondary School, Betnoti" },
    { value: "Mahatma Gandhi Higher Secondary School, Baisingha", label: "Mahatma Gandhi Higher Secondary School, Baisingha" },
    { value: "Kailash Chandra Dilip Kumar Higher Secondary School, Bijatola", label: "Kailash Chandra Dilip Kumar Higher Secondary School, Bijatola" },
    { value: "Rajanikanta Higher Secondary School, Luhasila", label: "Rajanikanta Higher Secondary School, Luhasila" },
    { value: "Gouri Shankar Higher Secondary School, Khadiasole", label: "Gouri Shankar Higher Secondary School, Khadiasole" },
    { value: "Kalinga Higher Secondary School, Manada", label: "Kalinga Higher Secondary School, Manada" },
    { value: "Anchalika Higher Secondary School, Puruna Baripada", label: "Anchalika Higher Secondary School, Puruna Baripada" },
    { value: "Saraswata Higher Secondary School, Kuamara", label: "Saraswata Higher Secondary School, Kuamara" },
    { value: "LSPS GOVT HIGHER SECONDARY SCHOOL, MORANDA", label: "LSPS GOVT HIGHER SECONDARY SCHOOL, MORANDA" },
    { value: "Saheed Birsa Munda Higher Secondary School, Jamda", label: "Saheed Birsa Munda Higher Secondary School, Jamda" },
    { value: "Jashipur Higher Secondary School, Jashipur", label: "Jashipur Higher Secondary School, Jashipur" },
    { value: "Ridayanath Higher Secondary School, Barbil", label: "Ridayanath Higher Secondary School, Barbil" },
    { value: "Kaptipada Higher Secondary School, Kaptipada", label: "Kaptipada Higher Secondary School, Kaptipada" },
    { value: "Kaptipada Higher Secondary School, Nuasahi", label: "Kaptipada Higher Secondary School, Nuasahi" },
    { value: "Meghasan Higher Secondary School, Nudadiha", label: "Meghasan Higher Secondary School, Nudadiha" },
    { value: "Pandit Raghunath Murmu Higher Secondary School, Sarat", label: "Pandit Raghunath Murmu Higher Secondary School, Sarat" },
    { value: "Deo Higher Secondary School, Tato", label: "Deo Higher Secondary School, Tato" },
    { value: "Raghunath Higher Secondary School, Kadadiha", label: "Raghunath Higher Secondary School, Kadadiha" },
    { value: "Karanjia Higher Secondary School, Karanjia", label: "Karanjia Higher Secondary School, Karanjia" },
    { value: "Panchapir Womens Higher Secondary School, Karanjia", label: "Panchapir Womens Higher Secondary School, Karanjia" },
    { value: "Bhanjabhumi Higher Secondary School, Dukura", label: "Bhanjabhumi Higher Secondary School, Dukura" },
    { value: "Dhanghera Higher Secondary School, Dhanghera", label: "Dhanghera Higher Secondary School, Dhanghera" },
    { value: "Khunta Higher Secondary School, Khunta", label: "Khunta Higher Secondary School, Khunta" },
    { value: "Panchapalli Higher Secondary School, Sainkula", label: "Panchapalli Higher Secondary School, Sainkula" },
    { value: "Baigan Badia Higher Secondary School, Baiganbadia", label: "Baigan Badia Higher Secondary School, Baiganbadia" },
    { value: "Maa Duarsuni Higher Secondary School, Kuabuda", label: "Maa Duarsuni Higher Secondary School, Kuabuda" },
    { value: "Badampahar Higher Secondary School, Badampahar", label: "Badampahar Higher Secondary School, Badampahar" },
    { value: "Janaki Balava Higher Secondary School, Hatabhadra", label: "Janaki Balava Higher Secondary School, Hatabhadra" },
    { value: "Baba Jateswar Higher Secondary School, Chhataraipur", label: "Baba Jateswar Higher Secondary School, Chhataraipur" },
    { value: "Chitrada Higher Secondary School, Chitrada", label: "Chitrada Higher Secondary School, Chitrada" },
    { value: "Gadia Anchalika Higher Secondary School, Gadia", label: "Gadia Anchalika Higher Secondary School, Gadia" },
    { value: "Gorumahisani Iron Higher Secondary School, Gorumahisani", label: "Gorumahisani Iron Higher Secondary School, Gorumahisani" },
    { value: "Mahila Higher Secondary School, Rairangpur", label: "Mahila Higher Secondary School, Rairangpur" },
    { value: "Rairangpur Higher Secondary School, Rairangpur", label: "Rairangpur Higher Secondary School, Rairangpur" },
    { value: "Angarpada Panchayat Higher Secondary School, Raruan", label: "Angarpada Panchayat Higher Secondary School, Raruan" },
    { value: "Biju Patnaik Higher Secondary School, Ghagarbeda", label: "Biju Patnaik Higher Secondary School, Ghagarbeda" },
    { value: "Chaitanya Prasad Higher Secondary School, Bhanjakia", label: "Chaitanya Prasad Higher Secondary School, Bhanjakia" },
    { value: "Binod Bihari Anchalik Higher Secondary School, Rasgovindpur", label: "Binod Bihari Anchalik Higher Secondary School, Rasgovindpur" },
    { value: "Radha Govinda Anchalik Higher Secondary School, Amarda", label: "Radha Govinda Anchalik Higher Secondary School, Amarda" },
    { value: "Sahid Memorial Higher Secondary School, Manida", label: "Sahid Memorial Higher Secondary School, Manida" },
    { value: "Upendra Nath Higher Secondary School, Nalagaja", label: "Upendra Nath Higher Secondary School, Nalagaja" },
    { value: "Banabhumi Higher Secondary School, Rangamatia", label: "Banabhumi Higher Secondary School, Rangamatia" },
    { value: "Chaitanya Prasad Higher Secondary School, Kendua", label: "Chaitanya Prasad Higher Secondary School, Kendua" },
    { value: "Jhansirani Women's Higher Secondary School, Padasitha", label: "Jhansirani Women's Higher Secondary School, Padasitha" },
    { value: "Saratpal Higher Secondary School, Palvihar", label: "Saratpal Higher Secondary School, Palvihar" },
    { value: "Seemanta Higher Secondary School, Jharpokharia", label: "Seemanta Higher Secondary School, Jharpokharia" },
    { value: "Biju Patnaik Higher Secondary School, Singda", label: "Biju Patnaik Higher Secondary School, Singda" },
    { value: "Maa Kitchakeswari Higher Secondary School, Khiching", label: "Maa Kitchakeswari Higher Secondary School, Khiching" },
    { value: "Sukruli Higher Secondary School, Sukruli", label: "Sukruli Higher Secondary School, Sukruli" },
    { value: "Goura Mohan Sathua Higher Secondary School, Kosta", label: "Goura Mohan Sathua Higher Secondary School, Kosta" },
    { value: "Panchayat Samiti Higher Secondary School, Dharampura", label: "Panchayat Samiti Higher Secondary School, Dharampura" },
    { value: "Utkal Banani Higher Secondary School, Chaksuliapada", label: "Utkal Banani Higher Secondary School, Chaksuliapada" },
    { value: "Fulamati Hembram Higher Secondary School, Padiabeda", label: "Fulamati Hembram Higher Secondary School, Padiabeda" },
    { value: "Maa Basuli Higher Secondary School, Thakurmunda", label: "Maa Basuli Higher Secondary School, Thakurmunda" },
    { value: "Government Science Higher Secondary School, Tiringi", label: "Government Science Higher Secondary School, Tiringi" },
    { value: "Luipa Higher Secondary School, Radho", label: "Luipa Higher Secondary School, Radho" },
    { value: "Rohi Das Soren Higher Secondary School, Kundabai", label: "Rohi Das Soren Higher Secondary School, Kundabai" },
    { value: "Indira Gandhi Mahila Higher Secondary School, Udala", label: "Indira Gandhi Mahila Higher Secondary School, Udala" },
    { value: "Udala Higher Secondary School, Udala", label: "Udala Higher Secondary School, Udala" },
    { value: "Panabedha Higher Secondary School, Chandahandi", label: "Panabedha Higher Secondary School, Chandahandi" },
    { value: "Bhairab Higher Secondary School, Dabugan", label: "Bhairab Higher Secondary School, Dabugan" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BORIGAM", label: "GOVT HIGHER SECONDARY SCHOOL, BORIGAM" },
    { value: "Jharigam Higher Secondary School, Jharigam", label: "Jharigam Higher Secondary School, Jharigam" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BANKULI", label: "GOVT HIGHER SECONDARY SCHOOL, BANKULI" },
    { value: "Raj Chaunria Higher Secondary School, Kodinga", label: "Raj Chaunria Higher Secondary School, Kodinga" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BHATIGAM", label: "GOVT HIGHER SECONDARY SCHOOL, BHATIGAM" },
    { value: "Nabarangpur Higher Secondary School, Nawarangpur", label: "Nabarangpur Higher Secondary School, Nawarangpur" },
    { value: "Nawarangpur Women's Higher Secondary School, Nawarangpur", label: "Nawarangpur Women's Higher Secondary School, Nawarangpur" },
    { value: "NANDAHANDI GOVT HIGHER SECONDARY SCHOOL", label: "NANDAHANDI GOVT HIGHER SECONDARY SCHOOL" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, CHERCHETTA", label: "GOVT HIGHER SECONDARY SCHOOL, CHERCHETTA" },
    { value: "Maidalpur Higher Secondary School, Maidalpur", label: "Maidalpur Higher Secondary School, Maidalpur" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, GONA", label: "GOVT HIGHER SECONDARY SCHOOL, GONA" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, TURUDIHI", label: "GOVT HIGHER SECONDARY SCHOOL, TURUDIHI" },
    { value: "Panchayat Samiti Higher Secondary School, Raighar", label: "Panchayat Samiti Higher Secondary School, Raighar" },
    { value: "Indrabati Project Higher Secondary School, Khatiguda", label: "Indrabati Project Higher Secondary School, Khatiguda" },
    { value: "SADASIBA HIGHER SECONDARY SCHOOL, DAHANA", label: "SADASIBA HIGHER SECONDARY SCHOOL, DAHANA" },
    { value: "Biju Pattnaik ST Women's Higher Secondary School, Umerkote", label: "Biju Pattnaik ST Women's Higher Secondary School, Umerkote" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, JAMURUNDA", label: "GOVT HIGHER SECONDARY SCHOOL, JAMURUNDA" },
    { value: "Pendrani Higher Secondary School, Umerkote", label: "Pendrani Higher Secondary School, Umerkote" },
    { value: "Bhapur Anchalik Higher Secondary School, Bhapur", label: "Bhapur Anchalik Higher Secondary School, Bhapur" },
    { value: "Prahallad Higher Secondary School, Padmavati", label: "Prahallad Higher Secondary School, Padmavati" },
    { value: "Brundabana Subudhi Higher Secondary School, Daspalla", label: "Brundabana Subudhi Higher Secondary School, Daspalla" },
    { value: "Krushna Priya Devi Women's Higher Secondary School, Daspalla", label: "Krushna Priya Devi Women's Higher Secondary School, Daspalla" },
    { value: "Maninag Bahumukhi Higher Secondary School, Takara", label: "Maninag Bahumukhi Higher Secondary School, Takara" },
    { value: "Banamali Barik Higher Secondary School, Adakata", label: "Banamali Barik Higher Secondary School, Adakata" },
    { value: "Shree Shree Raghunath Jew Higher Secondary School, Gania", label: "Shree Shree Raghunath Jew Higher Secondary School, Gania" },
    { value: "Nilamadhab Higher Secondary School, Kantilo", label: "Nilamadhab Higher Secondary School, Kantilo" },
    { value: "Pathani Samanta Higher Secondary School, Khandapara", label: "Pathani Samanta Higher Secondary School, Khandapara" },
    { value: "Women's Higher Secondary School, Khandapara", label: "Women's Higher Secondary School, Khandapara" },
    { value: "Higher Secondary Higher Secondary School, Boulasahi", label: "Higher Secondary Higher Secondary School, Boulasahi" },
    { value: "Itamati Higher Secondary School of Education & Technology, Itamati", label: "Itamati Higher Secondary School of Education & Technology, Itamati" },
    { value: "Naba Choudhury Higher Secondary School, Kendudhipi", label: "Naba Choudhury Higher Secondary School, Kendudhipi" },
    { value: "Nayagarh Higher Secondary School, Nayagarh", label: "Nayagarh Higher Secondary School, Nayagarh" },
    { value: "Nayagarh Prajamandal Mahila Higher Secondary School, Nayagarh", label: "Nayagarh Prajamandal Mahila Higher Secondary School, Nayagarh" },
    { value: "Dadhibamanjew Higher Secondary School , Bahadajhola", label: "Dadhibamanjew Higher Secondary School , Bahadajhola" },
    { value: "Gatiswar Higher Secondary School, Malisahi", label: "Gatiswar Higher Secondary School, Malisahi" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, MAHIPUR", label: "GOVT HIGHER SECONDARY SCHOOL, MAHIPUR" },
    { value: "Nuagaon Higher Secondary School, Nuagaon", label: "Nuagaon Higher Secondary School, Nuagaon" },
    { value: "Ananda Sahu Women's Higher Secondary School, Komanda", label: "Ananda Sahu Women's Higher Secondary School, Komanda" },
    { value: "Raghunath Samabaya Higher Secondary School, Odagaon", label: "Raghunath Samabaya Higher Secondary School, Odagaon" },
    { value: "Sarankul Higher Secondary School, Sarankul", label: "Sarankul Higher Secondary School, Sarankul" },
    { value: "Shree Ladukesh Anchalik Higher Secondary School, Godipada", label: "Shree Ladukesh Anchalik Higher Secondary School, Godipada" },
    { value: "Arjuna Rout Memorial Higher Secondary School, Mayurjhalia", label: "Arjuna Rout Memorial Higher Secondary School, Mayurjhalia" },
    { value: "Garhbanikilo Higher Secondary School, Garhbanikilo", label: "Garhbanikilo Higher Secondary School, Garhbanikilo" },
    { value: "Maa Maninag Durga Mahila Higher Secondary School, Ranpur", label: "Maa Maninag Durga Mahila Higher Secondary School, Ranpur" },
    { value: "Mohan Mahila Higher Secondary School, Chandpur", label: "Mohan Mahila Higher Secondary School, Chandpur" },
    { value: "Rajasunakhala Higher Secondary School, Rajasunakhala", label: "Rajasunakhala Higher Secondary School, Rajasunakhala" },
    { value: "Ranapur Higher Secondary School, Ranpur", label: "Ranapur Higher Secondary School, Ranpur" },
    { value: "BASTRAYANI GOVT HIGHER SECONDARY SCHOOL, DOMJHAR", label: "BASTRAYANI GOVT HIGHER SECONDARY SCHOOL, DOMJHAR" },
    { value: "Biju Pattnaik Higher Secondary School, Boden", label: "Biju Pattnaik Higher Secondary School, Boden" },
    { value: "Sri Jagannath Higher Secondary School, Karangamal", label: "Sri Jagannath Higher Secondary School, Karangamal" },
    { value: "Bibekananda Meher Higher Secondary School, Bhulia Sikuan", label: "Bibekananda Meher Higher Secondary School, Bhulia Sikuan" },
    { value: "JAI KISHAN GOVT HIGHER SECONDARY SCHOOL, BARGAON", label: "JAI KISHAN GOVT HIGHER SECONDARY SCHOOL, BARGAON" },
    { value: "Pallipragati Higher Secondary School, Dohelpada", label: "Pallipragati Higher Secondary School, Dohelpada" },
    { value: "Upendra Prabhakar Higher Secondary School, Tukla", label: "Upendra Prabhakar Higher Secondary School, Tukla" },
    { value: "Khadial Mahila Higher Secondary School, Khariar", label: "Khadial Mahila Higher Secondary School, Khariar" },
    { value: "Khariar Higher Secondary School, Khariar", label: "Khariar Higher Secondary School, Khariar" },
    { value: "JAI KISAN GOVT HIGHER SECONDARY SCHOOL, LAKHNA", label: "JAI KISAN GOVT HIGHER SECONDARY SCHOOL, LAKHNA" },
    { value: "Panchayat Higher Secondary School, Budhikomna", label: "Panchayat Higher Secondary School, Budhikomna" },
    { value: "Panchayat Samiti Higher Secondary School, Komna", label: "Panchayat Samiti Higher Secondary School, Komna" },
    { value: "Government Science Higher Secondary School, Nuapada", label: "Government Science Higher Secondary School, Nuapada" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, BHALESWAR", label: "GOVT HIGHER SECONDARY SCHOOL, BHALESWAR" },
    { value: "JANAMANGAL GOVT HIGHER SECONDARY SCHOOL, KULIABANDHA", label: "JANAMANGAL GOVT HIGHER SECONDARY SCHOOL, KULIABANDHA" },
    { value: "National Higher Secondary School, Nuapada", label: "National Higher Secondary School, Nuapada" },
    { value: "G.M. Higher Secondary School, Hatibandh", label: "G.M. Higher Secondary School, Hatibandh" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, PORTIPADA", label: "GOVT HIGHER SECONDARY SCHOOL, PORTIPADA" },
    { value: "Sinapali Higher Secondary School, Sinapali", label: "Sinapali Higher Secondary School, Sinapali" },
    { value: "Astaranga Higher Secondary School, Astaranga", label: "Astaranga Higher Secondary School, Astaranga" },
    { value: "Mahatma Gandhi Higher Secondary School of Education & Techchnology, Astaranga", label: "Mahatma Gandhi Higher Secondary School of Education & Techchnology, Astaranga" },
    { value: "Ratanpur Science Higher Secondary School, Ratanpur", label: "Ratanpur Science Higher Secondary School, Ratanpur" },
    { value: "Alarnath Dhandamulak Higher Secondary School, Brahmagiri", label: "Alarnath Dhandamulak Higher Secondary School, Brahmagiri" },
    { value: "ATIBADI JAGANNATH DAS GOVT HIGHER SECONDARY SCHOOL, KAPILESWARPUR", label: "ATIBADI JAGANNATH DAS GOVT HIGHER SECONDARY SCHOOL, KAPILESWARPUR" },
    { value: "Baxi Jagabandhu Bidyadhar Higher Secondary School, Gadaradang", label: "Baxi Jagabandhu Bidyadhar Higher Secondary School, Gadaradang" },
    { value: "Brahmeswar Higher Secondary School, Dharmakriti", label: "Brahmeswar Higher Secondary School, Dharmakriti" },
    { value: "Harachandi Mahila Higher Secondary School, Rebana", label: "Harachandi Mahila Higher Secondary School, Rebana" },
    { value: "Manein Higher Secondary School, Kandagoda", label: "Manein Higher Secondary School, Kandagoda" },
    { value: "Acharya Harihara Smruti Higher Secondary School, Indipur", label: "Acharya Harihara Smruti Higher Secondary School, Indipur" },
    { value: "Delanga Higher Secondary School, Delanga", label: "Delanga Higher Secondary School, Delanga" },
    { value: "Kalyanpur Science Higher Secondary School, Kalyanpur", label: "Kalyanpur Science Higher Secondary School, Kalyanpur" },
    { value: "Panchayat Higher Secondary School, Matiapada, Godiput", label: "Panchayat Higher Secondary School, Matiapada, Godiput" },
    { value: "Gop Higher Secondary School, Gop", label: "Gop Higher Secondary School, Gop" },
    { value: "Konark Women's Higher Secondary School, Sarada", label: "Konark Women's Higher Secondary School, Sarada" },
    { value: "Nayahat Higher Secondary School, Nayahat", label: "Nayahat Higher Secondary School, Nayahat" },
    { value: "Radhaballav Higher Secondary School, Bairipur", label: "Radhaballav Higher Secondary School, Bairipur" },
    { value: "Mangala Higher Secondary School, Kakatpur", label: "Mangala Higher Secondary School, Kakatpur" },
    { value: "Netrananda Sahu Women's Higher Secondary School, Kakatpur", label: "Netrananda Sahu Women's Higher Secondary School, Kakatpur" },
    { value: "Prachi Higher Secondary School, Bangurigaon", label: "Prachi Higher Secondary School, Bangurigaon" },
    { value: "Chouda Mouza Bidyut Higher Secondary School, Garhsanput", label: "Chouda Mouza Bidyut Higher Secondary School, Garhsanput" },
    { value: "Dayavihar Higher Secondary School, Kanas", label: "Dayavihar Higher Secondary School, Kanas" },
    { value: "Kanas Higher Secondary School, Kanas", label: "Kanas Higher Secondary School, Kanas" },
    { value: "Konark Bhagabati Higher Secondary School, Konark", label: "Konark Bhagabati Higher Secondary School, Konark" },
    { value: "Hariswar Dev Vocational Science Higher Secondary School, Panaspada", label: "Hariswar Dev Vocational Science Higher Secondary School, Panaspada" },
    { value: "Kandakhai Higher Secondary School of Science & Arts, Kandakhai", label: "Kandakhai Higher Secondary School of Science & Arts, Kandakhai" },
    { value: "Maa Ramachandi Chilika Women's Higher Secondary School, Charichhak, Titipa", label: "Maa Ramachandi Chilika Women's Higher Secondary School, Charichhak, Titipa" },
    { value: "Panchayat Higher Secondary School of Education & Technology, Satapada", label: "Panchayat Higher Secondary School of Education & Technology, Satapada" },
    { value: "Rukmani Devi Chilika Higher Secondary School, Nuapada", label: "Rukmani Devi Chilika Higher Secondary School, Nuapada" },
    { value: "Balanga Higher Secondary School, Balanga", label: "Balanga Higher Secondary School, Balanga" },
    { value: "Banishree Higher Secondary School, Kuanarpur", label: "Banishree Higher Secondary School, Kuanarpur" },
    { value: "Lankeswari Mahila Higher Secondary School, Beraboi, Balanga", label: "Lankeswari Mahila Higher Secondary School, Beraboi, Balanga" },
    { value: "Nigamananda Mahila Higher Secondary School, Chari Chhak", label: "Nigamananda Mahila Higher Secondary School, Chari Chhak" },
    { value: "Indira Gandhi Women's Higher Secondary School, Nimapara", label: "Indira Gandhi Women's Higher Secondary School, Nimapara" },
    { value: "Nimapada Higher Secondary School, Nimapada", label: "Nimapada Higher Secondary School, Nimapada" },
    { value: "Mahatma Gandhi Memorial Higher Secondary School of Education and Techchnology, Pubasasan", label: "Mahatma Gandhi Memorial Higher Secondary School of Education and Techchnology, Pubasasan" },
    { value: "Pipili Higher Secondary School, Pipili", label: "Pipili Higher Secondary School, Pipili" },
    { value: "Government Women's Higher Secondary School, Puri", label: "Government Women's Higher Secondary School, Puri" },
    { value: "Nilachal Narayan Ayurveda Chatuspathi Higher Secondary School", label: "Nilachal Narayan Ayurveda Chatuspathi Higher Secondary School" },
    { value: "Puri Women's Higher Secondary School, Narendrakona", label: "Puri Women's Higher Secondary School, Narendrakona" },
    { value: "Samanta Chandra Sekhar Higher Secondary School, Puri", label: "Samanta Chandra Sekhar Higher Secondary School, Puri" },
    { value: "Surajamala Saha Higher Secondary School, Saradhabali", label: "Surajamala Saha Higher Secondary School, Saradhabali" },
    { value: "Gopinath Dev Higher Secondary School, Pratap Purusottampur", label: "Gopinath Dev Higher Secondary School, Pratap Purusottampur" },
    { value: "Shastri Smruti Higher Secondary School, Baliput", label: "Shastri Smruti Higher Secondary School, Baliput" },
    { value: "Sri Sri Beleswar Gopinath Higher Secondary School, Balighai", label: "Sri Sri Beleswar Gopinath Higher Secondary School, Balighai" },
    { value: "Utkalmani Gopabandhu Smruti Higher Secondary School, Sakhigopal", label: "Utkalmani Gopabandhu Smruti Higher Secondary School, Sakhigopal" },
    { value: "Maa Markama Higher Secondary School, Bisam Cuttack", label: "Maa Markama Higher Secondary School, Bisam Cuttack" },
    { value: "PS GOVT HIGHER SECONDARY SCHOOL, DURGI", label: "PS GOVT HIGHER SECONDARY SCHOOL, DURGI" },
    { value: "CHANDRAPUR GOVT HIGHER SECONDARY SCHOOL", label: "CHANDRAPUR GOVT HIGHER SECONDARY SCHOOL" },
    { value: "Science Higher Secondary School, Gudari", label: "Science Higher Secondary School, Gudari" },
    { value: "Dr. B.R.N. Higher Secondary School, Dombosora", label: "Dr. B.R.N. Higher Secondary School, Dombosora" },
    { value: "Gunupur Higher Secondary School, Gunupur", label: "Gunupur Higher Secondary School, Gunupur" },
    { value: "Thyarama Women's Higher Secondary School, Gunupur", label: "Thyarama Women's Higher Secondary School, Gunupur" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, TIKIRI", label: "GOVT HIGHER SECONDARY SCHOOL, TIKIRI" },
    { value: "Manikeswari Adivasi Higher Secondary School, Kashipur", label: "Manikeswari Adivasi Higher Secondary School, Kashipur" },
    { value: "JAGADAMBA GOVT HIGHER SECONDARY SCHOOL, KOLNORA", label: "JAGADAMBA GOVT HIGHER SECONDARY SCHOOL, KOLNORA" },
    { value: "Ambodala Samant Higher Secondary School, Ambadola", label: "Ambodala Samant Higher Secondary School, Ambadola" },
    { value: "Muniguda Higher Secondary School, Gobardhana", label: "Muniguda Higher Secondary School, Gobardhana" },
    { value: "R.G. Higher Secondary School, Padmapur", label: "R.G. Higher Secondary School, Padmapur" },
    { value: "Droupadi Higher Secondary School, Gumuda", label: "Droupadi Higher Secondary School, Gumuda" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, RAMANAGUDA", label: "GOVT HIGHER SECONDARY SCHOOL, RAMANAGUDA" },
    { value: "Lakshmipati Singania Higher Secondary School, Jaykaypur", label: "Lakshmipati Singania Higher Secondary School, Jaykaypur" },
    { value: "Ugratara Higher Secondary School, Komtalpeta", label: "Ugratara Higher Secondary School, Komtalpeta" },
    { value: "Rayagada Higher Secondary School, Rayagada", label: "Rayagada Higher Secondary School, Rayagada" },
    { value: "Rayagada Women's Higher Secondary School, Rayagada", label: "Rayagada Women's Higher Secondary School, Rayagada" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, GARPOSH", label: "GOVT HIGHER SECONDARY SCHOOL, GARPOSH" },
    { value: "Parsuram Gountia Higher Secondary School, Jarabaga", label: "Parsuram Gountia Higher Secondary School, Jarabaga" },
    { value: "Prabhu Dayal Rural Higher Secondary School, Kesaibahal", label: "Prabhu Dayal Rural Higher Secondary School, Kesaibahal" },
    { value: "Trust Fund Higher Secondary School, Bamra", label: "Trust Fund Higher Secondary School, Bamra" },
    { value: "Burla N.A.C. Higher Secondary School, Burla", label: "Burla N.A.C. Higher Secondary School, Burla" },
    { value: "D.P.A. Higher Secondary School, Sason", label: "D.P.A. Higher Secondary School, Sason" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, CHIPILIMA", label: "GOVT HIGHER SECONDARY SCHOOL, CHIPILIMA" },
    { value: "Jai Durga Higher Secondary School, Padiabahal", label: "Jai Durga Higher Secondary School, Padiabahal" },
    { value: "Saraswat Higher Secondary School, Godbhaga", label: "Saraswat Higher Secondary School, Godbhaga" },
    { value: "V.S.S. Institute of Science Higher Secondary School, Dhankauda", label: "V.S.S. Institute of Science Higher Secondary School, Dhankauda" },
    { value: "Hirakud Higher Secondary School, Hirakud", label: "Hirakud Higher Secondary School, Hirakud" },
    { value: "B.R.G. Higher Secondary School, Bhojpur", label: "B.R.G. Higher Secondary School, Bhojpur" },
    { value: "Fashimal Anchalik Higher Secondary School, Fashimal", label: "Fashimal Anchalik Higher Secondary School, Fashimal" },
    { value: "Jamankira Higher Secondary School, Jamankira", label: "Jamankira Higher Secondary School, Jamankira" },
    { value: "Dr. J.K. Sahu Higher Secondary School, Parmanpur", label: "Dr. J.K. Sahu Higher Secondary School, Parmanpur" },
    { value: "Parbati Giri Arts Higher Secondary School, Mahulpali", label: "Parbati Giri Arts Higher Secondary School, Mahulpali" },
    { value: "V.S.S. Higher Secondary School, Jujomura", label: "V.S.S. Higher Secondary School, Jujomura" },
    { value: "Gokul Parvati Rural Higher Secondary School, Kuntara", label: "Gokul Parvati Rural Higher Secondary School, Kuntara" },
    { value: "Kutrachuan Higher Secondary School, Kutrachuan", label: "Kutrachuan Higher Secondary School, Kutrachuan" },
    { value: "Rajiv Gandhi Memorial Tribal Higher Secondary School, Kalheipali", label: "Rajiv Gandhi Memorial Tribal Higher Secondary School, Kalheipali" },
    { value: "Kuchinda Higher Secondary School, Kuchinda", label: "Kuchinda Higher Secondary School, Kuchinda" },
    { value: "Kuchinda Women's Higher Secondary School, Kuchinda", label: "Kuchinda Women's Higher Secondary School, Kuchinda" },
    { value: "D.P.A. Higher Secondary School, Mura", label: "D.P.A. Higher Secondary School, Mura" },
    { value: "Maa Jhadeswari Higher Secondary School, Dhama", label: "Maa Jhadeswari Higher Secondary School, Dhama" },
    { value: "Mandhata Baba Higher Secondary School, Maneswar", label: "Mandhata Baba Higher Secondary School, Maneswar" },
    { value: "Batgaon Higher Secondary School, Batgaon", label: "Batgaon Higher Secondary School, Batgaon" },
    { value: "Kisinda Higher Secondary School, Kisinda", label: "Kisinda Higher Secondary School, Kisinda" },
    { value: "Naktideul Higher Secondary School, Naktideul", label: "Naktideul Higher Secondary School, Naktideul" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KADALIGARH", label: "GOVT HIGHER SECONDARY SCHOOL, KADALIGARH" },
    { value: "Jai Jagannath Higher Secondary School, R.Badmal", label: "Jai Jagannath Higher Secondary School, R.Badmal" },
    { value: "Bhim Bhoi Higher Secondary School, Rairakhol", label: "Bhim Bhoi Higher Secondary School, Rairakhol" },
    { value: "Rairakhol Women's Higher Secondary School, Rairakhol", label: "Rairakhol Women's Higher Secondary School, Rairakhol" },
    { value: "Dutika Sahu Higher Secondary School, Laida", label: "Dutika Sahu Higher Secondary School, Laida" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, LAPANGA", label: "GOVT HIGHER SECONDARY SCHOOL, LAPANGA" },
    { value: "Netaji Subash Chandra Bose Higher Secondary School, Sambalpur", label: "Netaji Subash Chandra Bose Higher Secondary School, Sambalpur" },
    { value: "Surajmal Higher Secondary School, Rampella", label: "Surajmal Higher Secondary School, Rampella" },
    { value: "Gangadhar Meher Higher Secondary School, Sambalpur", label: "Gangadhar Meher Higher Secondary School, Sambalpur" },
    { value: "Government Women's Higher Secondary School, Sambalpur", label: "Government Women's Higher Secondary School, Sambalpur" },
    { value: "R.K.D.T. Higher Secondary School, Sambalpur", label: "R.K.D.T. Higher Secondary School, Sambalpur" },
    { value: "Samaleswari Higher Secondary School, Sambalpur", label: "Samaleswari Higher Secondary School, Sambalpur" },
    { value: "Binka Women’s Higher Secondary School, Phulmuthi", label: "Binka Women’s Higher Secondary School, Phulmuthi" },
    { value: "Shree Jagannath Higher Secondary School, Bausuni", label: "Shree Jagannath Higher Secondary School, Bausuni" },
    { value: "Siddhartha Higher Secondary School, Binka", label: "Siddhartha Higher Secondary School, Binka" },
    { value: "Birmaharajpur Higher Secondary School, Birmaharajpur", label: "Birmaharajpur Higher Secondary School, Birmaharajpur" },
    { value: "Parameswari Higher Secondary School, Bhutiapali", label: "Parameswari Higher Secondary School, Bhutiapali" },
    { value: "Subalaya Higher Secondary School, Subalaya", label: "Subalaya Higher Secondary School, Subalaya" },
    { value: "Babaji Sahu Higher Secondary School, Gajabandh", label: "Babaji Sahu Higher Secondary School, Gajabandh" },
    { value: "Dunguripali Higher Secondary School, Dunguripali", label: "Dunguripali Higher Secondary School, Dunguripali" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, SUKHA", label: "GOVT HIGHER SECONDARY SCHOOL, SUKHA" },
    { value: "Panchayat Women's Higher Secondary School, S. Rampur", label: "Panchayat Women's Higher Secondary School, S. Rampur" },
    { value: "Shreeram Higher Secondary School, S. Rampur", label: "Shreeram Higher Secondary School, S. Rampur" },
    { value: "Gram Panchayat Higher Secondary School, Lachhipur", label: "Gram Panchayat Higher Secondary School, Lachhipur" },
    { value: "Maa Maheswari Higher Secondary School, Khambeswaripali", label: "Maa Maheswari Higher Secondary School, Khambeswaripali" },
    { value: "Biju Pattnaik Women's Higher Secondary School, Sonepur", label: "Biju Pattnaik Women's Higher Secondary School, Sonepur" },
    { value: "Sonepur Higher Secondary School, Sonepur", label: "Sonepur Higher Secondary School, Sonepur" },
    { value: "M.B.R. Higher Secondary School, Menda", label: "M.B.R. Higher Secondary School, Menda" },
    { value: "Panchayat Higher Secondary School, Charbhata", label: "Panchayat Higher Secondary School, Charbhata" },
    { value: "A.E.S. Higher Secondary School, Tarbha", label: "A.E.S. Higher Secondary School, Tarbha" },
    { value: "Dharmasala Higher Secondary School, Dharmasala", label: "Dharmasala Higher Secondary School, Dharmasala" },
    { value: "Panchayat Samiti Higher Secondary School, Ullunda", label: "Panchayat Samiti Higher Secondary School, Ullunda" },
    { value: "Satyabadi Higher Secondary School, Kalapathar", label: "Satyabadi Higher Secondary School, Kalapathar" },
    { value: "Kinjirkela Higher Secondary School, Kinjirkela", label: "Kinjirkela Higher Secondary School, Kinjirkela" },
    { value: "Panchayat Samiti Higher Secondary School, Balisankara", label: "Panchayat Samiti Higher Secondary School, Balisankara" },
    { value: "Panchayat Higher Secondary School, Bargaon-Kachhar", label: "Panchayat Higher Secondary School, Bargaon-Kachhar" },
    { value: "Panchayat Samiti Higher Secondary School, Bargaon", label: "Panchayat Samiti Higher Secondary School, Bargaon" },
    { value: "Shrama Sakti Higher Secondary School, Biramitrapur", label: "Shrama Sakti Higher Secondary School, Biramitrapur" },
    { value: "Higher Secondary School of Arts, Science & Technology , Bondamunda", label: "Higher Secondary School of Arts, Science & Technology , Bondamunda" },
    { value: "Neelashaila Higher Secondary School, Jagada", label: "Neelashaila Higher Secondary School, Jagada" },
    { value: "Subodh Routray Higher Secondary School, Bisra", label: "Subodh Routray Higher Secondary School, Bisra" },
    { value: "Balanipat Higher Secondary School, Jhirdapali", label: "Balanipat Higher Secondary School, Jhirdapali" },
    { value: "Banshidhar Higher Secondary School, Kenaveta", label: "Banshidhar Higher Secondary School, Kenaveta" },
    { value: "Bonaigarh Higher Secondary School, Bonaigarh", label: "Bonaigarh Higher Secondary School, Bonaigarh" },
    { value: "Jadupati Higher Secondary School, Sihidia", label: "Jadupati Higher Secondary School, Sihidia" },
    { value: "AGM GOVT HIGHER SECONDARY SCHOOL, SOLE", label: "AGM GOVT HIGHER SECONDARY SCHOOL, SOLE" },
    { value: "Panchayat Samiti Higher Secondary School, Gurundia", label: "Panchayat Samiti Higher Secondary School, Gurundia" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KANIKA", label: "GOVT HIGHER SECONDARY SCHOOL, KANIKA" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, LUABAHAL", label: "GOVT HIGHER SECONDARY SCHOOL, LUABAHAL" },
    { value: "Manikeswari Higher Secondary School, Garh-Tumulia", label: "Manikeswari Higher Secondary School, Garh-Tumulia" },
    { value: "Panchayat Samiti Higher Secondary School, Hemgir", label: "Panchayat Samiti Higher Secondary School, Hemgir" },
    { value: "Vesaja Patel Higher Secondary School, Duduka", label: "Vesaja Patel Higher Secondary School, Duduka" },
    { value: "Koida Higher Secondary School, Koida", label: "Koida Higher Secondary School, Koida" },
    { value: "Dalmia Higher Secondary School, Jharbeda", label: "Dalmia Higher Secondary School, Jharbeda" },
    { value: "Government Science Higher Secondary School, Kutra", label: "Government Science Higher Secondary School, Kutra" },
    { value: "Veer Birsamunda Simanta Higher Secondary School,Gairbahal", label: "Veer Birsamunda Simanta Higher Secondary School,Gairbahal" },
    { value: "Baba Baneswar Higher Secondary School, Bilaipara", label: "Baba Baneswar Higher Secondary School, Bilaipara" },
    { value: "Lahunipara Higher Secondary School, Lahunipara", label: "Lahunipara Higher Secondary School, Lahunipara" },
    { value: "Gurukul Sanskrit Higher Secondary School", label: "Gurukul Sanskrit Higher Secondary School" },
    { value: "Priyadarshini Mahila Higher Secondary School, Jalda", label: "Priyadarshini Mahila Higher Secondary School, Jalda" },
    { value: "Vedvyas Higher Secondary School, Vedvyas", label: "Vedvyas Higher Secondary School, Vedvyas" },
    { value: "BASUDEV GOVT HIGHER SECONDARY SCHOOL, DUMABAHAL", label: "BASUDEV GOVT HIGHER SECONDARY SCHOOL, DUMABAHAL" },
    { value: "Damodar Naik Higher Secondary School, Darlipali", label: "Damodar Naik Higher Secondary School, Darlipali" },
    { value: "Lephripara Higher Secondary School, Lephripara", label: "Lephripara Higher Secondary School, Lephripara" },
    { value: "S.R.D.M.N. Panchayat Higher Secondary School, Sargipali", label: "S.R.D.M.N. Panchayat Higher Secondary School, Sargipali" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, HATIBARI", label: "GOVT HIGHER SECONDARY SCHOOL, HATIBARI" },
    { value: "GOVT HIGHER SECONDARY SCHOOL, KHUNTAGAON", label: "GOVT HIGHER SECONDARY SCHOOL, KHUNTAGAON" },
    { value: "Panchayat Samiti Higher Secondary School, Nuagaon", label: "Panchayat Samiti Higher Secondary School, Nuagaon" },
    { value: "Kansbahal Higher Secondary School, Laing", label: "Kansbahal Higher Secondary School, Laing" },
    { value: "Sarbati Devi Women's Higher Secondary School, Rajgangpur", label: "Sarbati Devi Women's Higher Secondary School, Rajgangpur" },
    { value: "Gandhi Higher Secondary School, Deogaon", label: "Gandhi Higher Secondary School, Deogaon" },
    { value: "Government Higher Secondary School, Rourkela", label: "Government Higher Secondary School, Rourkela" },
    { value: "Hrushikesh Ray Higher Secondary School, Chhend", label: "Hrushikesh Ray Higher Secondary School, Chhend" },
    { value: "Ispat Higher Secondary School, Rourkela", label: "Ispat Higher Secondary School, Rourkela" },
    { value: "Kalyani Ray Higher Secondary School, Hamirpur", label: "Kalyani Ray Higher Secondary School, Hamirpur" },
    { value: "Municipal Higher Secondary School, Rourkela", label: "Municipal Higher Secondary School, Rourkela" },
    { value: "Rourkela Higher Secondary School, Rourkela", label: "Rourkela Higher Secondary School, Rourkela" },
    { value: "Sushilabati Government Women's Higher Secondary School, Rourkela", label: "Sushilabati Government Women's Higher Secondary School, Rourkela" },
    { value: "Utkal Gourav Madhusudan Higher Secondary School, Rourkela", label: "Utkal Gourav Madhusudan Higher Secondary School, Rourkela" },
    { value: "New Orissa Higher Secondary School, Gaibira", label: "New Orissa Higher Secondary School, Gaibira" },
    { value: "Subdega Anchalika Sahayog Higher Secondary School, Subdega", label: "Subdega Anchalika Sahayog Higher Secondary School, Subdega" },
    { value: "Illa Memorial Panchayat Samiti Higher Secondary School, Kinjirma", label: "Illa Memorial Panchayat Samiti Higher Secondary School, Kinjirma" },
    { value: "Panchayat Samiti Science & Arts Higher Secondary School, Bhedabahal", label: "Panchayat Samiti Science & Arts Higher Secondary School, Bhedabahal" },
    { value: "Vesaja Rambhabati Higher Secondary School, Kundukela", label: "Vesaja Rambhabati Higher Secondary School, Kundukela" },
    { value: "Government Higher Secondary School, Sundargarh", label: "Government Higher Secondary School, Sundargarh" },
    { value: "Government Women's Higher Secondary School, Sundargarh", label: "Government Women's Higher Secondary School, Sundargarh" },
    { value: "Jasoda Bishnu N.M.P. Higher Secondary School, Jogimal", label: "Jasoda Bishnu N.M.P. Higher Secondary School, Jogimal" },
    { value: "Maharshi Dayanand Higher Secondary School, Garh-Mahulpali", label: "Maharshi Dayanand Higher Secondary School, Garh-Mahulpali" },
    { value: "Ujalpur Higher Secondary School, Ujalpur", label: "Ujalpur Higher Secondary School, Ujalpur" },
    {value:"SURAJ SHARMA TESTING",label:"SURAJ SHARMA TESTING"},
    
{value:"OAV KHANDAHATA", label:"OAV KHANDAHATA"},
{value:"OAV RANIAKATA", label:"OAV RANIAKATA"},
{value:"OAV SUBARNAPALI", label:"OAV SUBARNAPALI"},
{value:"OAV SUTEI", label:"OAV SUTEI"},
{value:"OAV GOVINDPUR", label:"OAV GOVINDPUR"},
{value:"OAV GAISILET", label:"OAV GAISILET"},
{value:"OAV FREZORPUR", label:"OAV FREZORPUR"},
{value:"OAV BANDHUPALI", label:"OAV BANDHUPALI"},
{value:"OAV PALLASGADIA", label:"OAV PALLASGADIA"},
{value:"OAV BHALUMUNDA", label:"OAV BHALUMUNDA"},
{value:"OAV PATHACHEPA", label:"OAV PATHACHEPA"},
{value:"OAV KHAPRAKHOL", label:"OAV KHAPRAKHOL"},
{value:"OAV JHARMUNDA", label:"OAV JHARMUNDA"},
{value:"OAV MURIBAHAL", label:"OAV MURIBAHAL"},
{value:"OAV BHAINSA", label:"OAV BHAINSA"},
{value:"OAV MAHIMUNDA", label:"OAV MAHIMUNDA"},
{value:"OAV BIBINA", label:"OAV BIBINA"},
{value:"OAV KUSRUD", label:"OAV KUSRUD"},
{value:"OAV JHARNI", label:"OAV JHARNI"},
{value:"OAV TETELENGA", label:"OAV TETELENGA"},
{value:"OAV MANIPUR", label:"OAV MANIPUR"},
{value:"OAV AINLACHUAN", label:"OAV AINLACHUAN"},
{value:"OAV JOKIDOLA", label:"OAV JOKIDOLA"},
{value:"OAV GOVINDPUR", label:"OAV GOVINDPUR"},
{value:"OAV KANDARKANA", label:"OAV KANDARKANA"},
{value:"OAV BARKOTE", label:"OAV BARKOTE"},
{value:"OAV BUDHAPAL", label:"OAV BUDHAPAL"},
{value:"OAV TILEIBENI", label:"OAV TILEIBENI"},
{value:"OAV JANTARIBOL", label:"OAV JANTARIBOL"},
{value:"OAV KANDHARA", label:"OAV KANDHARA"},
{value:"OAV LINGIPUR", label:"OAV LINGIPUR"},
{value:"OAV GUMMA", label:"OAV GUMMA"},
{value:"OAV ALADA", label:"OAV ALADA"},
{value:"OAV GUNDIMA", label:"OAV GUNDIMA"},
{value:"OAV PARIMALA", label:"OAV PARIMALA"},
{value:"OAV CHHELLIGADA", label:"OAV CHHELLIGADA"},
{value:"OAV KAITHAPADAR", label:"OAV KAITHAPADAR"},
{value:"OAV NIMINA", label:"OAV NIMINA"},
{value:"OAV RAJAPUR", label:"OAV RAJAPUR"},
{value:"OAV PRATAP LAXMANPUR", label:"OAV PRATAP LAXMANPUR"},
{value:"OAV GOLIA", label:"OAV GOLIA"},
{value:"OAV CHAMAKHANDI", label:"OAV CHAMAKHANDI"},
{value:"OAV PITATALI", label:"OAV PITATALI"},
{value:"OAV KUSAGUMA", label:"OAV KUSAGUMA"},
{value:"OAV SIDHESWAR", label:"OAV SIDHESWAR"},
{value:"OAV SATRUSOLE", label:"OAV SATRUSOLE"},
{value:"OAV SASANAMBAGAN", label:"OAV SASANAMBAGAN"},
{value:"OAV JAMAGARADA", label:"OAV JAMAGARADA"},
{value:"OAV BADAAGULA", label:"OAV BADAAGULA"},
{value:"OAV BAURIGANDPALI", label:"OAV BAURIGANDPALI"},
{value:"OAV KUSUMI", label:"OAV KUSUMI"},
{value:"OAV BADAPUR", label:"OAV BADAPUR"},
{value:"OAV HATIOTA", label:"OAV HATIOTA"},
{value:"OAV BHATAKUMARADA", label:"OAV BHATAKUMARADA"},
{value:"OAV KARAPALLI", label:"OAV KARAPALLI"},
{value:"OAV CHANAMERI", label:"OAV CHANAMERI"},
{value:"OAV PAKIDIHIL", label:"OAV PAKIDIHIL"},
{value:"OAV SURADA", label:"OAV SURADA"},
{value:"OAV SALAJANGA", label:"OAV SALAJANGA"},
{value:"OAV GOHIRAPATOLI", label:"OAV GOHIRAPATOLI"},
{value:"OAV MALLIKAPUR", label:"OAV MALLIKAPUR"},
{value:"OAV DEULIPAL", label:"OAV DEULIPAL"},
{value:"OAV JAMDHAR", label:"OAV JAMDHAR"},
{value:"OAV BEGANA", label:"OAV BEGANA"},
{value:"OAV MADHAPUR", label:"OAV MADHAPUR"},
{value:"OAV MUSIGUDA", label:"OAV MUSIGUDA"},
{value:"OAV PARLA", label:"OAV PARLA"},
{value:"OAV GOLAMUNDA", label:"OAV GOLAMUNDA"},
{value:"OAV CHANCHARAPADA", label:"OAV CHANCHARAPADA"},
{value:"OAV JUNAGARH", label:"OAV JUNAGARH"},
{value:"OAV KALAMPUR", label:"OAV KALAMPUR"},
{value:"OAV REGADA", label:"OAV REGADA"},
{value:"OAV MASANIMUNDA", label:"OAV MASANIMUNDA"},
{value:"OAV BONGOMUNDA", label:"OAV BONGOMUNDA"},
{value:"OAV DHANURBHATA", label:"OAV DHANURBHATA"},
{value:"OAV MADANPUR RAMPUR", label:"OAV MADANPUR RAMPUR"},
{value:"OAV CHAPATAKHANDA", label:"OAV CHAPATAKHANDA"},
{value:"OAV TH. RAMPUR", label:"OAV TH. RAMPUR"},
{value:"OAV DANDAPADAR", label:"OAV DANDAPADAR"},
{value:"OAV CHAKAPAD", label:"OAV CHAKAPAD"},
{value:"OAV KILABADI", label:"OAV KILABADI"},
{value:"OAV DUTIMENDI", label:"OAV DUTIMENDI"},
{value:"OAV KOTAGARH", label:"OAV KOTAGARH"},
{value:"OAV DINDIRAGAON", label:"OAV DINDIRAGAON"},
{value:"OAV DHOBATOTA", label:"OAV DHOBATOTA"},
{value:"OAV RAIKIA", label:"OAV RAIKIA"},
{value:"OAV SALAPGAM", label:"OAV SALAPGAM"},
{value:"OAV JALESPATTA", label:"OAV JALESPATTA"},
{value:"OAV TARANDO", label:"OAV TARANDO"},
{value:"OAV SALAPADA", label:"OAV SALAPADA"},
{value:"OAV TALACHAMPEI", label:"OAV TALACHAMPEI"},
{value:"OAV CHAMPUA", label:"OAV CHAMPUA"},
{value:"OAV SUANPADA", label:"OAV SUANPADA"},
{value:"OAV TIKIRA", label:"OAV TIKIRA"},
{value:"OAV HARICHANDANPUR", label:"OAV HARICHANDANPUR"},
{value:"OAV SUNDARAPAL", label:"OAV SUNDARAPAL"},
{value:"OAV KHENDRA", label:"OAV KHENDRA"},
{value:"OAV LAHANDA", label:"OAV LAHANDA"},
{value:"OAV SAHARAPADA", label:"OAV SAHARAPADA"},
{value:"OAV ORIA", label:"OAV ORIA"},
{value:"OAV BEGUNIA", label:"OAV BEGUNIA"},
{value:"OAV NILABADI (MUNIGUDA)", label:"OAV NILABADI (MUNIGUDA)"},
{value:"OAV GUMMA", label:"OAV GUMMA"},
{value:"OAV TARABHATTA", label:"OAV TARABHATTA"},
{value:"OAV PRAJAPUCCI", label:"OAV PRAJAPUCCI"},
{value:"OAV JAYANTIGIRI", label:"OAV JAYANTIGIRI"},
{value:"OAV MACHHARA (DURUGUDA)", label:"OAV MACHHARA (DURUGUDA)"},
{value:"OAV KOTPAD", label:"OAV KOTPAD"},
{value:"OAV GUNDAL", label:"OAV GUNDAL"},
{value:"OAV MESSINGPUT", label:"OAV MESSINGPUT"},
{value:"OAV GOUDAGUDA", label:"OAV GOUDAGUDA"},
{value:"OAV GANINAYAKPUT", label:"OAV GANINAYAKPUT"},
{value:"OAV PACHINGI", label:"OAV PACHINGI"},
{value:"OAV POTTANGI", label:"OAV POTTANGI"},
{value:"OAV PUNGAR", label:"OAV PUNGAR"},
{value:"OAV KANGURUKONDA", label:"OAV KANGURUKONDA"},
{value:"OAV PODAGHAT", label:"OAV PODAGHAT"},
{value:"OAV CHITRAKONDA", label:"OAV CHITRAKONDA"},
{value:"OAV GUNDURIGUDA", label:"OAV GUNDURIGUDA"},
{value:"OAV GONDHIPALLY", label:"OAV GONDHIPALLY"},
{value:"OAV JULUNIBAHAL", label:"OAV JULUNIBAHAL"},
{value:"OAV BAPANPALLI", label:"OAV BAPANPALLI"},
{value:"OAV BADASAHI", label:"OAV BADASAHI"},
{value:"OAV JHARGAN", label:"OAV JHARGAN"},
{value:"OAV RANIBHOL", label:"OAV RANIBHOL"},
{value:"OAV GORUDBASA", label:"OAV GORUDBASA"},
{value:"OAV LUHASILA", label:"OAV LUHASILA"},
{value:"OAV JAMIRDIHA", label:"OAV JAMIRDIHA"},
{value:"OAV TITIA", label:"OAV TITIA"},
{value:"OAV PASNA", label:"OAV PASNA"},
{value:"OAV MATIAGARH", label:"OAV MATIAGARH"},
{value:"OAV BHALUBASA", label:"OAV BHALUBASA"},
{value:"OAV BADDEULI", label:"OAV BADDEULI"},
{value:"OAV LAXMAN SAHI", label:"OAV LAXMAN SAHI"},
{value:"OAV CHANDUA", label:"OAV CHANDUA"},
{value:"OAV SANJAYDHANPOSI", label:"OAV SANJAYDHANPOSI"},
{value:"OAV MORADA", label:"OAV MORADA"},
{value:"OAV SANAMOUDA", label:"OAV SANAMOUDA"},
{value:"OAV TINGRIA", label:"OAV TINGRIA"},
{value:"OAV MAHULIA", label:"OAV MAHULIA"},
{value:"OAV SANSOLE", label:"OAV SANSOLE"},
{value:"OAV SHIRSA", label:"OAV SHIRSA"},
{value:"OAV KHICHING", label:"OAV KHICHING"},
{value:"OAV BHALIASOLE", label:"OAV BHALIASOLE"},
{value:"OAV DIGDHAR", label:"OAV DIGDHAR"},
{value:"OAV BADADALIMA", label:"OAV BADADALIMA"},
{value:"OAV JUALIA", label:"OAV JUALIA"},
{value:"OAV FATKI", label:"OAV FATKI"},
{value:"OAV DONGRIGUDA", label:"OAV DONGRIGUDA"},
{value:"OAV JHARIGAON", label:"OAV JHARIGAON"},
{value:"OAV MAJHIGUDA", label:"OAV MAJHIGUDA"},
{value:"OAV AGNIPUR (HIRLI)", label:"OAV AGNIPUR (HIRLI)"},
{value:"OAV PAPADAHANDI", label:"OAV PAPADAHANDI"},
{value:"OAV DUMARDIHI", label:"OAV DUMARDIHI"},
{value:"OAV LAKDIPAL", label:"OAV LAKDIPAL"},
{value:"OAV BANGARIPADA", label:"OAV BANGARIPADA"},
{value:"OAV NOTAR", label:"OAV NOTAR"},
{value:"OAV KESHRAJAPUR", label:"OAV KESHRAJAPUR"},
{value:"OAV BADI", label:"OAV BADI"},
{value:"OAV JHAGRAHI", label:"OAV JHAGRAHI"},
{value:"OAV NEGIPALLI", label:"OAV NEGIPALLI"},
{value:"OAV TIMANPUR", label:"OAV TIMANPUR"},
{value:"OAV BHALLERY", label:"OAV BHALLERY"},
{value:"OAV CHANDRAPUR", label:"OAV CHANDRAPUR"},
{value:"OAV GUDARI", label:"OAV GUDARI"},
{value:"OAV GUNUPUR", label:"OAV GUNUPUR"},
{value:"OAV KALYANSINGHPUR", label:"OAV KALYANSINGHPUR"},
{value:"OAV KASHIPUR", label:"OAV KASHIPUR"},
{value:"OAV KOLNARA", label:"OAV KOLNARA"},
{value:"OAV JAMARAGUDA", label:"OAV JAMARAGUDA"},
{value:"OAV BAHUPADAR", label:"OAV BAHUPADAR"},
{value:"OAV RAMANGUDA", label:"OAV RAMANGUDA"},
{value:"OAV TADAMA", label:"OAV TADAMA"},
{value:"OAV GOVINDPUR", label:"OAV GOVINDPUR"},
{value:"OAV RENGALI", label:"OAV RENGALI"},
{value:"OAV RATHAPUR", label:"OAV RATHAPUR"},
{value:"OAV PIPILIPALI", label:"OAV PIPILIPALI"},
{value:"OAV JAMKANI", label:"OAV JAMKANI"},
{value:"OAV JHARBAHALI", label:"OAV JHARBAHALI"},
{value:"OAV MAHIPANI", label:"OAV MAHIPANI"},
{value:"OAV BABUNUAGAON", label:"OAV BABUNUAGAON"},
{value:"OAV GURUNDIA", label:"OAV GURUNDIA"},
{value:"OAV KUSUMDIHI", label:"OAV KUSUMDIHI"},
{value:"OAV TELIPOSH", label:"OAV TELIPOSH"},
{value:"OAV PARAGAPOSH", label:"OAV PARAGAPOSH"},
{value:"OAV LATHIKATA", label:"OAV LATHIKATA"},
{value:"OAV JAHARITOLI", label:"OAV JAHARITOLI"},
{value:"OAV RAJGANGPUR", label:"OAV RAJGANGPUR"},
{value:"OAV SIMDEGA", label:"OAV SIMDEGA"},
{value:"OAV TALASANKARA", label:"OAV TALASANKARA"},
{value:"Angul", label:"Smt. Susmita Sahoo"},
{value:"Balasore", label:"Smt. Prativa Manjari Das"},
{value:"Bargarh", label:"Shri Mitra BhanuKachhap"},
{value:"Bhadrak", label:"Shri AkrurBarik"},
{value:"Bolangir", label:"Shri Dhruba Charan Behera"},
{value:"Boudh", label:"Shri Gendra Kujur"},
{value:"Cuttack", label:"Shri Krushna Chandra Nayak"},
{value:"Deogarh", label:"Shri Sachidananda Behera"},
{value:"Dhenkanal", label:"Smt. Binita Senapati"},
{value:"Gajapati", label:"Shri Pradosh Kumar Nayak"},
{value:"Ganjam", label:"Smt. AmitaPattanaik"},
{value:"Jagatsinghpur", label:"Shri Niranjan Behera"},
{value:"Jajpur", label:"Smt. NibeditaPani"},
{value:"Jharsuguda", label:"Smt. PuspaMinj"},
{value:"Kalahandi", label:"Shri Sushant Kumar Chopdar"},
{value:"Kandhamal", label:"Shri Pramod Kumar Sarangi"},
{value:"Kendrapada", label:"Smt. SubhalaxmiNayak, ADEO I/C"},
{value:"Keonjhar", label:"Smt Gouri Rani Naik"},
{value:"Khordha", label:"Shri BiswanathTarai"},
{value:"Koraput", label:"Shri Rama Chandra Nahak"},
{value:"Malkangiri", label:"Shri Manas Kumar Jena"},
{value:"Mayurbhanj", label:"Shri Purna Ch. Sethy"},
{value:"Nabarangapur", label:"Shri Pradeep Kumar Nag"},
{value:"Nayagarh", label:"Smt. Rajashree Pattanaik"},
{value:"Nuapada", label:"Shri Karunakar Bhue"},
{value:"Puri", label:"Shri Biswojit Ghose"},
{value:"Rayagada", label:"Shri Purna Ch. Bariha"},
{value:"Sambalpur", label:"Smt. Meenarani Mangal"},
{value:"Sonepur", label:"Shri LaxmanBhoi"},
{value:"Sundargarh", label:"Shri Amulya Kumar Pradhan"},


  ];
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredOptions(filtered);
  };
  const [role1, setRole1] = useState("");
  const RenderLinks = () => {
    console.log("role", role1);
    const tex1 = "District_officer";
    const tex2 = "State_Officer";
    const tex3 = "Institute";
    const tex4 = "";
    if (tex1.length == role1.length) {
      return (
        <>
          <Link to="/search">
            <button className={`mr-${!toggle ? 10 : 4}`}>District wise</button>
          </Link>
          <button className={`mr-${!toggle ? 10 : 4}`}> About us </button>
          {/* <button className={`mr-${!toggle?10:4}`}> Timeline </button> */}
          <Link to="/logout">
            <button> Logout </button>
          </Link>
        </>
      );
    } else if (tex2.length == role1.length) {
      // Render different links for other roles or no role
      return (
        <>
          <Link to="/search_so" className={`mr-${!toggle ? 10 : 4}`}>
            <button>State Wise</button>
          </Link>
          <button className={`mr-${!toggle ? 10 : 4}`} onClick={handleButtonClick}> About us </button>
          {/* <button className={`mr-${!toggle?10:4}`}> Timeline </button> */}
          <Link to="/logout">
            <button> Logout </button>
          </Link>
        </>
      );
    } else if (tex3.length == role1.length) {
      return (
        <>
          <Link to="/registeredteams">
            <button className={`mr-${!toggle ? 10 : 4}`}> Registered Teams </button>
          </Link>
          <button className={`mr-${!toggle ? 10 : 4}`} onClick={handleButtonClick}> About us </button>
          {/* <button className={`mr-${!toggle?10:4}`}> Timeline </button> */}
          <Link to="/logout">
            <button> Logout </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <button className={`mr-${!toggle ? 10 : 4}`} onClick={handleButtonClick}> About us </button>
          {/* <button className={`mr-${!toggle?10:4}`}> Timeline </button> */}
          <button className={`mr-${!toggle ? 10 : 4}`} onClick={handleLoginClick}>
            Login
          </button>
        </>
      );
    }
  };
  const setState = () => {
    const storedRole = localStorage.getItem("myState");
    if (storedRole === null) {
      setRole1("");
    } else {
      const len = storedRole.length;
      if (len == 2) setRole1("");
      else {
        const xin = storedRole.slice(1, len - 1);
        setRole1(xin);
      }
    }

  };
  useEffect(() => {
    setState();
    RenderLinks();
  }, [localStorage.getItem("myState")]);

  const [loading, setLoading] = useState(false);

  const invalidRegistration = (errorMessage) => {
    toast.error(`Wrong Credentials! ${errorMessage}`, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    });
};
  const RegistrationSuccessful = () => toast.success("Registration succesfful",
    {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  const wrongCredentials = () => toast.error("Wrong Credentials", {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
  const timedout = () => toast.error("Connection timedout try again", {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
  const loginSuccessfull = () => toast.success("Login Successfull", {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""

  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");
  const [signupRole, setSignupRole] = useState("");





  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const modalRef = useRef(null);

  const handleLoginClick = () => {
    setIsLoginFormVisible(true);
    setModal(true);
  };

  const handleModal = () => {
    setModal(false);
  };
  const [selectedSchool, setSelectedSchool] = useState(null);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  };

  const handleChange = (selectedOption) => {
    setSelectedSchool(selectedOption);
  };
  const handleSignupClick = () => {
    setIsLoginFormVisible(false);
    setModal(true);
    setUser({
      name: "",
      email: "",
      password: "",
      cpassword: ""
    });
  };

  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    const currentNavItem = navLinks.find(nav => nav.title === active);
    if (currentNavItem && currentNavItem.id === 'login') {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [active]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const PostData = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the fetch request
    const { name, email, password, cpassword } = user;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password, cpassword, role: signupRole
        })
      });

      const data = await res.json();
      console.log(data);

      if (data && data.error) {
        invalidRegistration(data.error);
        console.log("invalid registration");
      } else {
        RegistrationSuccessful();
        console.log(data.status);
        setIsLoginFormVisible(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Set loading back to false after the fetch request is complete
      }, 400);
      // Set loading back to false after the fetch request is complete
    }
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(loginPassword, loginEmail);

    try {
      const res = await Promise.race([
        fetch('/api/signin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
            role: role,
          }),
        }),
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (!resolved) {
              console.log('Request timed out. Please try again.');
              timedout();
              reject(new Error('Request timed out'));
            }
          }, 20000) // Adjust the timeout duration (in milliseconds) as needed
        ),
      ]);

      const data = await res.json();
      console.log(data);

      if (res.status === 400 || !data) {
        wrongCredentials();
        setLoading(false);
        console.log('Wrong credentials');
      } else {
        loginSuccessfull();
        setLoading(false);
        setModal(false);
        dispatch({ type: "USER", payload: data.message });
      }
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
    } finally {
      resolved = true;
    }
  };

  let resolved = false;



  return (

    <>
      <nav className={`w-full flex  justify-between items-center navbar ${modal ? "blur-background" : ""}`}
      >
        <img src={"/logo.png"} style={{marginTop:"5px"}} alt="hoobank" className="h-[55px] w-[200px] md:h-[80px] md:w-[360px]" />


        <ul className="list-none sm:flex hidden justify-end items-center flex-1" style={{ color: "white" }}>
          <RenderLinks />
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? "/close.svg" : "/menu.svg"}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col" style={{ color: "white" }}>
              <RenderLinks />
            </ul>
          </div>
        </div>
      </nav>
      {modal && (
        <div className="wrapper" style={{ color: "white" }}>
          {loading && <LoadingSpinner />}

          <div className="title-text">
            <div className={`title ${isLoginFormVisible ? 'login' : 'signup'}`} style={{ color: "white" }}>
              Account
            </div>
            <div className={`title ${!isLoginFormVisible ? 'login' : 'signup'}`} style={{ color: "white" }} >
              Account
            </div>
          </div>

          <div ref={modalRef} className="form-container">
            <div className="slide-controls">
              <input
                type="radio"
                name="slide"
                id="login"
                checked={isLoginFormVisible}
                onChange={handleLoginClick}
              />
              <input
                type="radio"
                name="slide"
                id="signup"
                checked={!isLoginFormVisible}
                onChange={handleSignupClick}
              />
              <label htmlFor="login" className={`slide ${isLoginFormVisible ? 'login' : 'signup'}`} style={{ color: "white" }}>
                Login
              </label>
              <label
                htmlFor="signup" style={{ color: "white" }}
                className={`slide ${!isLoginFormVisible ? 'login' : 'signup'}`}
              >
                SignUp
              </label>
              <div className="slider-tab"></div>
            </div>
            <div>
              <p className="text-[11.5px] text-red-400 ">N.B:<span className="text-amber-400"> For institute signup, use the SAMS code as the prefix in the email address, like SAMScode@gmail.com (e.g., 123456@gmail.com). For OAVs, the mail ID format is UDISECODE@gmail.com.</span></p>
            </div>
            <div className="form-inner">
              <form method="POST" className={`login ${isLoginFormVisible ? '' : 'hidden'}`}>
                <div className="field">
                  <input type="email" name="loginEmail" placeholder="Email Address" id="loginEmail"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required />
                </div>
                <div className="field">
                  <input type="password" name="loginPassword" placeholder="Password" id="loginPassword"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required />
                </div>
                <div className="field">
                  <select style={{ backgroundColor: "black" }} className="name_select" value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" required>
                    <option value="">Role</option>
                    <option value="Institute">Institute</option>
                    <option value="District_Officer">District Officer</option>
                    <option value="State_Officer">State Officer</option>
                    <option value="Super_Admin">Super-Admin</option>


                  </select>
                </div>


                {/* <div className="pass-link">
                <a href="#">Reset password?</a>
              </div> */}
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" name="signin" id="signin" value="Log In" onClick={loginUser} />
                </div>
                {/* <div className="signup-link">
                Don't Have Account? <a href="">Create A New</a>
              </div> */}
              </form>
              <form method="POST" id="registration-form" className={`signup ${!isLoginFormVisible ? '' : 'hidden'}`}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Search Institute..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="field">
                  <select style={{ backgroundColor: "black" }} className="name_select" value={user.name} onChange={handleInputs} name="name" id="name" required>
                    <option value="">Institute</option>
                    {filteredOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <select style={{ backgroundColor: "black" }} className="name_select" value={signupRole} onChange={(e) => setSignupRole(e.target.value)} name="signupRole" id="signupRole" required>
                    <option value="">Role</option>
                    <option value="Institute">Institute</option>
                    <option value="District_Officer">District Officer</option>
                    <option value="State_Officer">State Officer</option>
                    <option value="Super_Admin">Super-Admin</option>

                  </select>
                </div>
                {console.log(user.name)}

                <div className="field">
                  <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="Email Address" required />
                </div>
                <div className="field">
                  <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder="Password" required />
                </div>
                <div className="field">
                  <input
                    type="password"
                    name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="field btn">


                  <div className="btn-layer"></div>
                  <input type="submit" name="signup" id="signup" value="SignUp" onClick={PostData} />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {modal && <div className="overlay" onClick={closeModal}></div>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>

  );
};

export default Navbar;
