const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authenticate=require("../middleware/authenticate");
const router=express.Router();
const cookieParser = require("cookie-parser");
const arr = {
    Sri_Sri_Jagannath_Higher_Secondary_School_Badakera:"01013101@gmail.com",
    Evening_Higher_Secondary_School_Angul:"01043101@gmail.com",
    Kashi_Bishwanath_Higher_Secondary_School_Paikasahi:"01053101@gmail.com",
    Satyabadi_Meher_Higher_Secondary_School_Madhapur:"01053102@gmail.com",
    Solapada_Higher_Secondary_School_Thakurgarh:"01053103@gmail.com",
    Anchalik_Higher_Secondary_School_Talmul:"01023101@gmail.com",
    Kumanda_Jarasingha_Anchalik_Panchayat_Higher_Secondary_School_Kumanda:"01023102@gmail.com",
    Nalco_Nagar_Regional_Higher_Secondary_School_Kulad:"01023103@gmail.com",
    Jagamohan_Higher_Secondary_School_Kuluma:"01093101@gmail.com",
    Anchalika_Higher_Secondary_School_Angapada:"01063101@gmail.com",
    Gadtal_Regional_Higher_Secondary_School_Gadtal:"01103101@gmail.com",
    Bahanaga_Higher_Secondary_School_Bahanaga:"02013101@gmail.com",
    Khantapara_Mahila_Higher_Secondary_School_Khantapara:"02018201@gmail.com",
    Satyanidhi_Womens_Higher_Secondary_School_Bishnupur:"02013202@gmail.com",
    Balangi_Higher_Secondary_School_Sunahat:"02023101@gmail.com",
    Golakmani_Mahila_Higher_Secondary_School_Uitikiri:"02023204@gmail.com",
    Nilakantheswar_Higher_Secondary_School_Bangara:"02023102@gmail.com",
    Judhisthir_Higher_Secondary_School_Kundali:"02038101@gmail.com",
    Laxmipriya_Mahila_Higher_Secondary_School_Baliapal:"02033202@gmail.com",
    Baikunthanath_Institute_of_Higher_Technical_Studies_Higher_Secondary_School_Kachuadi:"02053101@gmail.com",
    Chandaneswar_Higher_Secondary_School_Barbatia:"02053102@gmail.com",
    Chandaneswar_Higher_Secondary_School_Sahabazpur:"02054101@gmail.com",
    Womens_Higher_Secondary_School_Bhogarai:"02054202@gmail.com",
    Olamara_Simanta_Higher_Secondary_School_Olamara:"02063101@gmail.com",
    Sitala_Thakurani_Higher_Secondary_School_Khuluda:"02063102@gmail.com",
    Ustab_Charan_Gajiani_Chandi_Higher_Secondary_School_Bartana:"02063103@gmail.com",
    Agani_Narendra_Higher_Secondary_School_Antara:"02073101@gmail.com",
    Jambeswar_Higher_Secondary_School_Garsang:"02073102@gmail.com",
    Kamala_Arjuna_Higher_Secondary_School_Gandibed:"02073103@gmail.com",
    Panchayat_Samiti_Mahila_Higher_Secondary_School_Nahanga:"02073204@gmail.com",
    Nilagiri_Womens_Higher_Secondary_School_Nilagiri:"02163201@gmail.com",
    Baba_Panchalingeswar_Higher_Secondary_School_Santaragadia:"02154101@gmail.com",
    Laxmikanta_Memorial_Womens_Higher_Secondary_School_DakhiniNarasinghpur:"02153201@gmail.com",
    Bhimeswar_Higher_Secondary_School_Bhimeswar:"02083101@gmail.com",
    Remuna_Higher_Secondary_School_Remuna:"02083102@gmail.com",
    Shri_Jagannath_Educational_Foundation_Higher_Secondary_School_Barunsingh:"02083103@gmail.com",
    Gopaprana_Higher_Secondary_School_Khirakona:"02093101@gmail.com",
    Kuntala_Kumari_Mahila_Higher_Secondary_School_Bari:"02093202@gmail.com",
    Kudei_Womens_Higher_Secondary_School_Kudei:"02103202@gmail.com",
    Talanagar_Higher_Secondary_School_Talanagar:"02103101@gmail.com",
    Swami_Vivekananda_Higher_Secondary_School_Dungri:"03013101@gmail.com",
    Anchalika_Higher_Secondary_School_Paharsrigida:"03023101@gmail.com",
    Kadobahal_Higher_Secondary_School_Kadobahal:"03024101@gmail.com",
    Baba_Balunkeswar_Higher_Secondary_School_Khuntapali:"03033101@gmail.com",
    Gandhi_Memorial_Higher_Secondary_School_Kalapani:"03033102@gmail.com",
    Milita_Gram_Panchayat_Higher_Secondary_School_Sarsara:"03033103@gmail.com",
    Nabajoyti_Higher_Secondary_School_Chakarkend:"03033104@gmail.com",
    Tora_Higher_Secondary_School_Tora:"03033105@gmail.com",
    Jagabandhu_Das_Womens_Higher_Secondary_School_Kadalipali:"03043203@gmail.com",
    Prof_Ghanshyam_Das_Gramanchal_Higher_Secondary_School_Katapali:"03043101@gmail.com",
    Satalma_Higher_Secondary_School_Satalma:"03043102@gmail.com",
    Kamgaon_Higher_Secondary_School_Kamgaon:"03053101@gmail.com",
    Panchayat_Higher_Secondary_School_Goudgaon:"03053102@gmail.com",
    Resham_Anchalika_Higher_Secondary_School_Resham:"03063101@gmail.com",
    Dora_Higher_Secondary_School_Putukigrinjel:"03093101@gmail.com",
    Panchayat_Higher_Secondary_School_Talpadar:"03093102@gmail.com",
    Goutam_Buddha_Higher_Secondary_School_Ganiapali:"03104101@gmail.com",
    Talpali_Higher_Secondary_School_Talpali:"03103101@gmail.com",
    Dava_Higher_Secondary_School_Dava:"03113101@gmail.com",
    Lakhmara_Higher_Secondary_School_Lakhmara:"03123101@gmail.com",
    Vindhya_Vasini_Higher_Secondary_School_Paikmal:"03124101@gmail.com",
    Buddhadev_Meher_Higher_Secondary_School_Dahita:"03133101@gmail.com",
    Jamla_Higher_Secondary_School_Jamla:"03133102@gmail.com",
    Kartik_Malati_Mahila_Higher_Secondary_School_Jagannathpur:"04013203@gmail.com",
    Kamala_Kishori_Rout_Mahila_Higher_Secondary_School_Kusannagar:"04023203@gmail.com",
    Radhakanta_Behera_Higher_Secondary_School_Arnapala:"04023101@gmail.com",
    Rameswar_Higher_Secondary_School_Randia:"04023102@gmail.com",
    Bhandaripokhari_Higher_Secondary_School_Bhandaripokhari:"04033102@gmail.com",
    Nayanmani_Womens_Higher_Secondary_School_Saradapur:"04033203@gmail.com",
    Panchayat_Higher_Secondary_School_Barikipur:"04033101@gmail.com",
    Agarpara_Womens_Higher_Secondary_School_Agarpara:"04043202@gmail.com",
    Utkal_Keshari_Dr_Hare_Krushna_Mahatab_Higher_Secondary_School_Kenduapara:"04043101@gmail.com",
    Dhamrai_Higher_Secondary_School_Narsinghpur:"04053101@gmail.com",
    Ghanteswar_Higher_Secondary_School_Ghanteswar:"04053102@gmail.com",
    Lalit_Siba_Sankar_Higher_Secondary_School_Motto:"04053103@gmail.com",
    Asurali_Anchalika_Mahila_Higher_Secondary_School_Asurali:"04063202@gmail.com",
    Maniklal_Womens_Higher_Secondary_School_Talapada:"04073201@gmail.com",
    Jalandhar_Higher_Secondary_School_Bharsuja:"05013101@gmail.com",
    Amar_Jyoti_Higher_Secondary_School_Kutumdola:"05024101@gmail.com",
    Budhadangar_Higher_Secondary_School_Kudasingha:"05024102@gmail.com",
    Panchayat_Higher_Secondary_School_Shibatala:"05023101@gmail.com",
    Pallishree_Higher_Secondary_School_Sindhekela:"05123102@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Bangomunda:"05124101@gmail.com",
    Prasanna_Pal_Higher_Secondary_School_Bhalumunda:"05123101@gmail.com",
    Binapani_Higher_Secondary_School_Dhumabhata:"05083101@gmail.com",
    Panchayat_Higher_Secondary_School_Sulekela:"05083102@gmail.com",
    Shree_Jagannath_Dev_Higher_Secondary_School_Mandal:"05083103@gmail.com",
    Dhruba_Ananda_Higher_Secondary_School_Kuturla:"05034101@gmail.com",
    Anchalik_Higher_Secondary_School_Rusuda:"05044101@gmail.com",
    Gram_Panchayat_Higher_Secondary_School_Tentulikhunti:"05044102@gmail.com",
    MLA_Womens_Higher_Secondary_School_Kantabanji:"05173201@gmail.com",
    Harishankar_Higher_Secondary_School_Khaprakhol:"05093102@gmail.com",
    Jawaharlal_Nehru_Higher_Secondary_School_Dhandamunda:"05094101@gmail.com",
    Panchayat_Higher_Secondary_School_Lathor:"05093101@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Muribahal:"05134101@gmail.com",
    Rajendra_Meher_Higher_Secondary_School_Jogimunda:"05104101@gmail.com",
    Patneswari_Womens_Higher_Secondary_School_Patnagarh:"05113201@gmail.com",
    Jamgaon_Anchalika_Higher_Secondary_School_Jamgaon:"05063101@gmail.com",
    Judhisthir_Higher_Secondary_School_Chhatamakhana:"05064101@gmail.com",
    Radheshyam_Anchalik_Higher_Secondary_School_Bilaisarda:"05064102@gmail.com",
    Padmalochan_Higher_Secondary_School_Tikrapara:"05143101@gmail.com",
    Panchayat_Higher_Secondary_School_Ghunsar:"05144101@gmail.com",
    Utkalmani_Gopabandhu_Dash_Higher_Secondary_School_Belgaon:"05144102@gmail.com",
    Rajiv_Gandhi_Panchayat_Samiti_Higher_Secondary_School_Turekela:"05163101@gmail.com",
    Gandhardi_Higher_Secondary_School_Janhapank:"06013101@gmail.com",
    Maa_Maheswari_Higher_Secondary_School_Bausuni:"06013102@gmail.com",
    Boudh_Womens_Higher_Secondary_School_Boudh:"06043201@gmail.com",
    Harbhanga_Anchalika_Panchayat_Higher_Secondary_School_Harbhanga:"06023101@gmail.com",
    TKSMRG_Higher_Secondary_School_Ghantapada:"06033102@gmail.com",
    Choudwar_Womens_Higher_Secondary_School_Choudwar:"07173201@gmail.com",
    Radhanath_Rath_Vigyan_Higher_Secondary_School_Khuntuni:"07013101@gmail.com",
    Baideswar_Higher_Secondary_School_Baideswar:"07063101@gmail.com",
    Maniabandha_Higher_Secondary_School_Maniabandha:"07023101@gmail.com",
    Sri_Sri_Swapneswar_Deba_Anchalika_Higher_Secondary_School_of_Arts_and_Technology_Sankhamari:"07023102@gmail.com",
    Prabha_Routray_Higher_Secondary_School_Godisahi:"07093101@gmail.com",
    Dr_Keshaba_Chandra_Sahu_Womens_Higher_Secondary_School_Cuttack:"07183204@gmail.com",
    Mahanadi_Vihar_Womens_Higher_Secondary_School_Cuttack:"07183203@gmail.com",
    Maulan_Abdul_Kalam_Azad_Multipurpose_Higher_Secondary_School_Cuttack:"07188101@gmail.com",
    Raghunath_Jew_Higher_Secondary_School_Deulasahi:"07183101@gmail.com",
    Ananta_Balia_Higher_Secondary_School_Nuagarh:"07103101@gmail.com",
    Laksheswar_Womens_Higher_Secondary_School_Phulnakhara:"07103202@gmail.com",
    Domapara_Anchalika_Higher_Secondary_School_Dampara:"07073101@gmail.com",
    Rani_Suka_Dei_Mahila_Higher_Secondary_School_Banki:"07073202@gmail.com",
    Govindpur_Higher_Secondary_School_Govindpur:"07118101@gmail.com",
    Govindpur_Womens_Higher_Secondary_School_Govindpur:"07113201@gmail.com",
    Durga_Charan_Nayak_Memorial_Higher_Secondary_School_Haladia:"07123101@gmail.com",
    Champanatha_Dev_Higher_Secondary_School_Champeswar:"07033101@gmail.com",
    Prachi_Womens_Higher_Secondary_School_Niali:"07133201@gmail.com",
    Ballavi_Devi_Mahila_Higher_Secondary_School_Natakai:"07143201@gmail.com",
    Mahanadi_Higher_Secondary_School_Ratilo:"07153102@gmail.com",
    Reba_Anchalika_Higher_Secondary_School_Reba:"07153101@gmail.com",
    Biswa_Nahakani_Higher_Secondary_School_Biswanahakani:"07163102@gmail.com",
    Gokhel_Ideal_Higher_Secondary_School_Sankarpur:"07163103@gmail.com",
    Kakhadi_Higher_Secondary_School_Kakhadi:"07163104@gmail.com",
    Chaitanya_Sahu_Higher_Secondary_School_of_Science_and_Arts_Nuapatna:"07043101@gmail.com",
    Kalinga_Womens_Higher_Secondary_School_Tigiria:"07043202@gmail.com",
    Deogarh_Womens_Higher_Secondary_School_Deogarh:"08043201@gmail.com",
    Palsama_Higher_Secondary_School_Palsama:"08023102@gmail.com",
    Ekalabya_Panchayat_Samiti_Higher_Secondary_School_Kansar:"08033108@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Suguda:"08033109@gmail.com",
    Subash_Naik_Higher_Secondary_School_Ludhar:"08033110@gmail.com",
    Nuahat_Anchalika_Panchayat_Higher_Secondary_School_Nuahat:"09063101@gmail.com",
    Sri_Sri_Balunkeswar_Higher_Secondary_School_Baruan:"09063102@gmail.com",
    Tapoban_Higher_Secondary_School_Kunida:"09063103@gmail.com",
    Bhuban_Womens_Higher_Secondary_School_Bhuban:"09103201@gmail.com",
    Dhenkanal_Evening_Higher_Secondary_School_Dhenkanal:"09043101@gmail.com",
    Beltikiri_Anchalika_Higher_Secondary_School_Beltikiri:"09013101@gmail.com",
    Debendra_Satapathy_Memorial_Higher_Secondary_School_Bhapur:"09013102@gmail.com",
    Panchayat_Higher_Secondary_School_of_Science_and_Technology_Gengutia:"09013103@gmail.com",
    Utkalmani_Gopabandhu_Higher_Secondary_School_Gobindapur:"09013104@gmail.com",
    Kapilash_Higher_Secondary_School_Gondia:"09023103@gmail.com",
    Shree_Jagannath_Higher_Secondary_School_Pingua:"09023101@gmail.com",
    Sridhar_Swami_Higher_Secondary_School_of_Education_and_Technology_Sadangi:"09023102@gmail.com",
    Parikul_Higher_Secondary_School_Paikapurunakothi:"09053101@gmail.com",
    Regional_Higher_Secondary_School_Hindol:"09053102@gmail.com",
    Anchalika_Higher_Secondary_School_Guneibil:"09073102@gmail.com",
    Anchalika_Higher_Secondary_School_Kurumuna:"09073101@gmail.com",
    Womens_Higher_Secondary_School_Kamakshyanagar:"09113201@gmail.com",
    Bapuji_Higher_Secondary_School_Garhpalasuni:"09083102@gmail.com",
    Birasal_Anchalika_Higher_Secondary_School_Birasal:"09084102@gmail.com",
    Kankadahad_Higher_Secondary_School_Kankadahad:"09083103@gmail.com",
    Khadagaprasad_Anchalika_Higher_Secondary_School_Khadagaprasad:"09033101@gmail.com",
    Sachidananda_Higher_Secondary_School_Indipur:"09033102@gmail.com",
    Satyam_Sivam_Sundaram_Higher_Secondary_School_Gauda_Kateni:"09033103@gmail.com",
    Astasambhu_Higher_Secondary_School_Kualo:"09093101@gmail.com",
    Barihapur_Higher_Secondary_School_Barihapur:"09093102@gmail.com",
    Regional_Higher_Secondary_School_Sanda:"09093103@gmail.com",
    Binodini_Science_Higher_Secondary_School_Padmapur:"10028101@gmail.com",
    Hill_Top_Higher_Secondary_School_Mohana:"10048101@gmail.com",
    Baba_Saheb_Ambedkar_Higher_Secondary_School_Khajuriapada:"10053101@gmail.com",
    Mahendra_Tanaya_Higher_Secondary_School_R_Udayagiri:"10068101@gmail.com",
    Mahendragiri_Higher_Secondary_School_Ramagiri:"10068102@gmail.com",
    Parsuram_Gurukul_Higher_Secondary_School_Sevakpur:"10078101@gmail.com",
    Bellaguntha_Womens_Higher_Secondary_School_Bellaguntha:"11128201@gmail.com",
    Prafulla_Kumari_Womens_Higher_Secondary_School_Gobara:"11128202@gmail.com",
    Bellaguntha_Science_Higher_Secondary_School_Bellaguntha:"11208104@gmail.com",
    Deccan_Higher_Secondary_School_Berhampur:"11078101@gmail.com",
    Suprava_Devi_Womens_Higher_Secondary_School_Berhampur:"11078202@gmail.com",
    Anchalika_Science_Higher_Secondary_School_Ballipadar:"11148101@gmail.com",
    Manitara_Science_Higher_Secondary_School_Manitara:"11148102@gmail.com",
    Sri_Baladev_Jew_Mahila_Higher_Secondary_School_Buguda:"11223201@gmail.com",
    Nursingha_Nath_Higher_Secondary_School_Mahanadpur:"11248101@gmail.com",
    Chhatrapur_Womens_Higher_Secondary_School_Chhatrapur:"11328201@gmail.com",
    Regional_Science_Higher_Secondary_School_Sorola:"11018101@gmail.com",
    Ananta_Narayana_Higher_Secondary_School_Dharakote:"11158101@gmail.com",
    Somanath_Science_Higher_Secondary_School_Mundamarai:"11158102@gmail.com",
    Biju_Patnaik_Womens_Higher_Secondary_School_Digapahandi:"11028202@gmail.com",
    Chidananda_Saraswati_Higher_Secondary_School_Bamkoi:"11028101@gmail.com",
    Gopal_Krushna_Vigyan_Higher_Secondary_School_Subalya:"11258101@gmail.com",
    Humma_Salt_Higher_Secondary_School_Humma:"11258102@gmail.com",
    Khambeya_Dora_Science_Higher_Secondary_School_Pochilima:"11268101@gmail.com",
    Sri_Beleswar_Higher_Secondary_School_Gondala:"11268102@gmail.com",
    Narayani_Science_Higher_Secondary_School_Athagadapatana:"11278101@gmail.com",
    KP_Science_Higher_Secondary_School_Langaleswar:"11288101@gmail.com",
    Mahuri_Kalua_Higher_Secondary_School_Balipada:"11038101@gmail.com",
    Doki_Sanyasi_Higher_Secondary_School_Khariaguda:"11048101@gmail.com",
    Bartini_Science_Higher_Secondary_School_Bartini:"11308101@gmail.com",
    Regional_Womens_Higher_Secondary_School_Polosara:"11388201@gmail.com",
    Basudeba_Sethy_Science_Higher_Secondary_School_Bhatakumarada:"11318102@gmail.com",
    Sidha_Bhairabi_Science_Higher_Secondary_School_Konisi:"11058101@gmail.com",
    Science_Higher_Secondary_School_Pudamari:"11068101@gmail.com",
    Pitala_Higher_Secondary_School_Pitalo:"11178101@gmail.com",
    PCM_Womens_Higher_Secondary_School_Surada:"11188201@gmail.com",
    Balikuda_Womens_Higher_Secondary_School_Balikuda:"12013203@gmail.com",
    Basudev_Mahapatra_Smarahi_Higher_Secondary_School_Talagaon:"12013101@gmail.com",
    Harispur_Baldev_Higher_Secondary_School_Borikina:"12013102@gmail.com",
    Baisi_Mouza_Higher_Secondary_School_Purana:"12023101@gmail.com",
    Dhyan_Chand_Higher_Secondary_School_Hazipur:"12023102@gmail.com",
    Brundaban_Bihari_Higher_Secondary_School_Goda:"12033101@gmail.com",
    Grameswar_Higher_Secondary_School_Panchapali:"12033102@gmail.com",
    Biju_Patnaik_Higher_Secondary_School_Ashrampatna:"12043102@gmail.com",
    Sidha_Baranga_Higher_Secondary_School_of_Education_and_Technology_Punanga:"12043103@gmail.com",
    Narayan_Birabar_Samanta_Higher_Secondary_School_Jhimani:"12053101@gmail.com",
    Panchayat_Mahila_Higher_Secondary_School_Balia:"12053204@gmail.com",
    Maa_Kutam_Chandi_Higher_Secondary_School_Devidol:"12063101@gmail.com",
    Sri_Sri_Moula_Bhanja_Higher_Secondary_School_Gangada:"12063102@gmail.com",
    Bhagabati_Womens_Higher_Secondary_School_Manijanga:"12073204@gmail.com",
    Chitrotpala_Higher_Secondary_School_of_Education_and_Technology_Utarkul:"12073101@gmail.com",
    Naba_Choudhury_Institute_Of_Education_and_Vocational_Studies_Higher_Secondary_School_Tarikunda:"12073102@gmail.com",
    Swami_Arupananda_Higher_Secondary_School_of_Education_and_Technology_Kurtanga:"12073103@gmail.com",
    Shree_Maa_Mahila_Higher_Secondary_School_Kollar:"12083204@gmail.com",
    Utkal_Bharati_Higher_Secondary_School_Mahilo:"12083102@gmail.com",
    Barchana_Womens_Higher_Secondary_School_Barchana:"13013202@gmail.com",
    Buddha_dev_Higher_Secondary_School_Udayagiri:"13014101@gmail.com",
    Mahapurush_Banamali_Higher_Secondary_School_Sailipara:"13013101@gmail.com",
    Pallii_Shree_Womens_Higher_Secondary_School_Balichandrapur:"13013203@gmail.com",
    Santhan_Higher_Secondary_School_Bainsiria:"13023101@gmail.com",
    Janaki_Madhusudan_Womens_Higher_Secondary_School_Mandhatapatna:"13033201@gmail.com",
    Manatira_Higher_Secondary_School_Manatira:"13048101@gmail.com",
    Biripat_Higher_Secondary_School_Biripat:"13053101@gmail.com",
    Chitalo_Higher_Secondary_School_Chitalo:"13053102@gmail.com",
    Jayachandi_Higher_Secondary_School_Dubakana:"13053103@gmail.com",
    Rambag_Womens_Higher_Secondary_School_Rambag:"13053204@gmail.com",
    Dharmasala_Mahila_Higher_Secondary_School_Dharmasala:"13063203@gmail.com",
    Mukundapatra_Higher_Secondary_School_Balarampur:"13063101@gmail.com",
    Anchalika_Mahila_Higher_Secondary_School_Bandhamunda:"13073202@gmail.com",
    Baba_Hare_Krushna_Das_Higher_Secondary_School_Markandpur:"13073101@gmail.com",
    Hingula_Higher_Secondary_School_Sankhachila:"13083102@gmail.com",
    Maa_Tarini_Higher_Secondary_School_Panikoili:"13083103@gmail.com",
    Kapileswar_Higher_Secondary_School_Duburi:"13103101@gmail.com",
    Indira_Gandhi_Womens_Higher_Secondary_School_Brajarajnagar:"14073201@gmail.com",
    Pradosh_Kumar_Smruti_Smaraki_Higher_Secondary_School_H_Katapali:"14013101@gmail.com",
    Salegram_Sakunia_Higher_Secondary_School_Talpatia:"14013102@gmail.com",
    Arda_Higher_Secondary_School_Arda:"14023101@gmail.com",
    Basumati_Science_Higher_Secondary_School_Samasingha:"14033101@gmail.com",
    Dwarika_Prasad_Agrawalla_Higher_Secondary_School_Bagmara:"14033102@gmail.com",
    Bhatlaida_Higher_Secondary_School_Bhatlaida:"14043104@gmail.com",
    Kabi_Buddharay_Gountia_Higher_Secondary_School_Salhetikra:"14043105@gmail.com",
    Talmunda_Anchalika_Mahila_Higher_Secondary_School_Talmunda:"14043206@gmail.com",
    Mahima_Higher_Secondary_School_Mahimapuram:"14053101@gmail.com",
    Boarder_Higher_Secondary_School_Kankeri:"15103101@gmail.com",
    Dharamgarh_Womens_Higher_Secondary_School_Dharamgarh:"15103203@gmail.com",
    Lakhi_Ram_Agrawal_Higher_Secondary_School_Behera:"15103102@gmail.com",
    Anchalika_Bastarani_Higher_Secondary_School_Sanchergaon:"15113101@gmail.com",
    Patitapaban_Higher_Secondary_School_Arebeda:"15123101@gmail.com",
    Chichaiguda_Higher_Secondary_School_Chichaiguda:"15133101@gmail.com",
    Swami_Chidananda_Higher_Secondary_School_Karchala:"15133102@gmail.com",
    Chamelidevi_Womens_Higher_Secondary_School_Junagarh:"15163201@gmail.com",
    Mahabharat_Higher_Secondary_School_Bijamara:"15143101@gmail.com",
    Hara_Gouri_Higher_Secondary_School_Kusurla:"15023101@gmail.com",
    Kashrupada_Higher_Secondary_School_Kashrupada:"15033101@gmail.com",
    Utkela_Higher_Secondary_School_Utkela:"15033102@gmail.com",
    Lanjigarh_Road_Higher_Secondary_School_Lanjigarh_Road:"15043101@gmail.com",
    Bijayananda_Panchayat_Higher_Secondary_School_Tulapada:"15063101@gmail.com",
    Maa_Manikeswari_Panchayat_Samiti_Higher_Secondary_School_Thuamul_Rampur:"15073104@gmail.com",
    Ambedkar_Higher_Secondary_School_Khajuripada:"16118101@gmail.com",
    Anchalika_Higher_Secondary_School_Sankarakhol:"16028101@gmail.com",
    Dr_Ambedkar_National_Higher_Secondary_School_Daringbadi:"16038103@gmail.com",
    Indira_Priyadarshni_Womens_Higher_Secondary_School_G_Udayagiri:"16108201@gmail.com",
    Kandhamal_Higher_Secondary_School_Sarangagada:"16058101@gmail.com",
    Netaji_Subash_Boss_Higher_Secondary_School_Tumudibandha:"16098101@gmail.com",
    Panchyat_Higher_Secondary_School_Phiringa:"16128101@gmail.com",
    Rusimal_Higher_Secondary_School_Bamunigam:"16038104@gmail.com",
    SS_Asharamji_Bapu_Higher_Secondary_School_Kotogarh:"16063101@gmail.com",
    Debaray_Samarsingh_Higher_Secondary_School_Ganeswarpur:"17013101@gmail.com",
    Gandhi_Memorial_Higher_Secondary_School_Govindpur:"17013102@gmail.com",
    Sushree_Devi_Womens_Higher_Secondary_School_Aul:"17013203@gmail.com",
    Delta_Higher_Secondary_School_Bhitarabampu:"17023101@gmail.com",
    Derabish_Mahila_Higher_Secondary_School_Derabish:"17023203@gmail.com",
    Bijaya_Higher_Secondary_School_Tyendukura:"17033101@gmail.com",
    Balia_Womens_Higher_Secondary_School_Balia:"17043202@gmail.com",
    Swami_Vivekananda_Manab_Sambal_Vikas_Higher_Secondary_School_Chaudakulat:"17043101@gmail.com",
    Binapani_Higher_Secondary_School_Gayaspur:"17053101@gmail.com",
    Maa_Tarini_Higher_Secondary_School_Jayachandrapur:"17053102@gmail.com",
    Chitrotpola_Higher_Secondary_School_Akhua_Odanga:"17064101@gmail.com",
    Gandhi_Uccha_Madhyamik_Higher_Secondary_School_Ayatpur:"17063101@gmail.com",
    Marshaghai_Womens_Higher_Secondary_School_Marshaghai:"17063202@gmail.com",
    Nalinikanta_Higher_Secondary_School_Chandibaunsamul:"17094101@gmail.com",
    Swapneswar_Higher_Secondary_School_Barahpur:"17093101@gmail.com",
    Beleswar_Higher_Secondary_School_Belbahali:"18013102@gmail.com",
    Bhimkund_Higher_Secondary_School_Dumuria:"18143101@gmail.com",
    Gopaljew_Higher_Secondary_School_Benamunda:"18163102@gmail.com",
    Kantipal_Anchalika_Higher_Secondary_School_Anandapur:"18013101@gmail.com",
    Laxmi_Narayan_Higher_Secondary_School_Pipilia:"18113101@gmail.com",
    Maa_Gramyashree_Higher_Secondary_School_Naradpur:"18063101@gmail.com",
    Machhagarh_Higher_Secondary_School_Machhagarh:"18153101@gmail.com",
    Mahila_Higher_Secondary_School_Champua:"18053201@gmail.com",
    Pateswar_Higher_Secondary_School_Suakati:"18103101@gmail.com",
    Raisuan_Higher_Secondary_School_Raisuan:"18133101@gmail.com",
    Rangpat_Higher_Secondary_School_Pandapara:"18123101@gmail.com",
    Regional_SN_Higher_Secondary_School_Dhenkikote:"18113102@gmail.com",
    Sadang_Anchalika_Higher_Secondary_School_Sadang:"18033101@gmail.com",
    Salbani_GP_Higher_Secondary_School_Salabani:"18013103@gmail.com",
    Santosi_Maa_Regional_Higher_Secondary_School_Jharbelda:"18133102@gmail.com",
    Sirigida_Anchalika_Bigyan_Higher_Secondary_School_Sirigida:"18163101@gmail.com",
    Utkalmani_Gopabandhu_Higher_Secondary_School_Ukhunda:"18063102@gmail.com",
    Jawaharlal_Nehru_Higher_Secondary_School_Balianta:"19013101@gmail.com",
    Sri_Sri_Baneswar_Higher_Secondary_School_Bentapur:"19018101@gmail.com",
    Banamalipur_Higher_Secondary_School_Banamalipur:"19028101@gmail.com",
    Odakhanda_Higher_Secondary_School_Odakhanda:"19023101@gmail.com",
    Parsuram_Higher_Secondary_School_Gambharimunda:"19073101@gmail.com",
    Rural_Womens_Higher_Secondary_School_Banapur:"19073202@gmail.com",
    Hattakeswar_Mahila_Higher_Secondary_School_Baghamari:"19083201@gmail.com",
    Chandaka_Higher_Secondary_School_Chandaka:"19038101@gmail.com",
    Ambedkar_Centenary_Higher_Secondary_School_of_Education_and_Technology_Dumduma:"19053101@gmail.com",
    City_Womens_Higher_Secondary_School_Siripur:"19053204@gmail.com",
    Maharshi_Womens_Higher_Secondary_School_Sailashree_Vihar:"19053205@gmail.com",
    Raja_Madhusudan_Dev_Higher_Secondary_School_of_Science_and_Education_Patia:"19053102@gmail.com",
    Kali_Charan_Panchagarh_Ananga_Narendra_Higher_Secondary_School_Bankoi:"19098101@gmail.com",
    Maa_Sarada_Womens_Higher_Secondary_School_Tikatal:"19093201@gmail.com",
    Raghunath_Higher_Secondary_School_Deuli:"19098102@gmail.com",
    Panchupalli_Bhima_Balabantaray_Higher_Secondary_School_AnkulachatI:"19103101@gmail.com",
    Bauri_Bandhu_Higher_Secondary_School_Chhatabar:"19043101@gmail.com",
    Sanatan_Harichandan_Higher_Secondary_School_Madanpur:"19048101@gmail.com",
    Sarat_Paikray_Higher_Secondary_School_Argul:"19043102@gmail.com",
    Sri_Somanath_Balunkeswar_Dev_Mahila_Higher_Secondary_School_Kantia:"19043207@gmail.com",
    Kabi_Prasanna_Patasani_Anchalika_Higher_Secondary_School_Malipada:"19113101@gmail.com",
    Kerang_Panchayat_Higher_Secondary_School_Kerang:"19113102@gmail.com",
    Raghunath_Adarsha_Higher_Secondary_School_Olasingha:"19123101@gmail.com",
    Ramachandra_Kalpana_Higher_Secondary_School_Kamaguru:"19123102@gmail.com",
    Saheed_Laxman_Nayak_Higher_Secondary_School_Boipariguda:"20018101@gmail.com",
    Bhairaba_Higher_Secondary_School_Borigumma:"20028101@gmail.com",
    Radha_Krishna_Adivasi_Higher_Secondary_School_Dasmanthpur:"20098101@gmail.com",
    Dr_BRA_Higher_Secondary_School_Koraput:"20103101@gmail.com",
    Biju_Patnaik_Higher_Secondary_School_Kundra:"20058101@gmail.com",
    Dr_BRA_Higher_Secondary_School_Lamtaput:"20118101@gmail.com",
    Sindha_Devi_Higher_Secondary_School_Nandapur:"20138101@gmail.com",
    Radha_Krishna_Higher_Secondary_School_Narayanpatana:"20148101@gmail.com",
    Gangeswari_Higher_Secondary_School_Pottangi:"20158102@gmail.com",
    Sunabedha_Womens_Higher_Secondary_School_Sunabeda:"20188201@gmail.com",
    Gopabandhu_Anchalika_Higher_Secondary_School_Kalimela:"21018103@gmail.com",
    Biju_Patnaik_Higher_Secondary_School_of_Education_Govindapali:"21028101@gmail.com",
    Darwin_Memorial_Higher_Secondary_School_Kudulugumma:"21048101@gmail.com",
    Womens_Higher_Secondary_School_Malkangiri:"21098201@gmail.com",
    Utkalmani_Gopabandhu_Higher_Secondary_School_Mathili:"21063101@gmail.com",
    Dr_Shyam_Prasad_Higher_Secondary_School_MV79:"21078101@gmail.com",
    Regional_Higher_Secondary_School_Podia:"21078102@gmail.com",
    Binodini_Mahila_Higher_Secondary_School_Banakati:"22093101@gmail.com",
    Haraprava_Higher_Secondary_School_Kalabadia:"22093102@gmail.com",
    Baba_Kakharua_Baidyanath_Higher_Secondary_School_Manatri:"22103101@gmail.com",
    Shree_Jagannath_Higher_Secondary_School_Balijoda:"22103102@gmail.com",
    Krushna_Chandrapur_Higher_Secondary_School_Krushnachandrapur:"22113101@gmail.com",
    Sri_Rama_Chandra_Bhanj_Higher_Secondary_School_Ragdha:"22113102@gmail.com",
    Kailash_Chandra_Dilip_Kumar_Higher_Secondary_School_Bijatola:"22023101@gmail.com",
    Rajanikanta_Higher_Secondary_School_Luhasila:"22023102@gmail.com",
    Gouri_Shankar_Higher_Secondary_School_Khadiasole:"22033101@gmail.com",
    Kalinga_Higher_Secondary_School_Manada:"22033102@gmail.com",
    Saheed_Birsa_Munda_Higher_Secondary_School_Jamda:"22043101@gmail.com",
    Pandit_Raghunath_Murmu_Higher_Secondary_School_Sarat:"22213101@gmail.com",
    Deo_Higher_Secondary_School_Tato:"22263101@gmail.com",
    Raghunath_Higher_Secondary_School_Kadadiha:"22263102@gmail.com",
    Bhanjabhumi_Higher_Secondary_School_Dukura:"22223101@gmail.com",
    Dhanghera_Higher_Secondary_School_Dhanghera:"22223102@gmail.com",
    Panchapalli_Higher_Secondary_School_Sainkula:"22223103@gmail.com",
    Maa_Duarsuni_Higher_Secondary_School_Kuabuda:"22133101@gmail.com",
    Janaki_Balava_Higher_Secondary_School_Hatabhadra:"22053101@gmail.com",
    Baba_Jateswar_Higher_Secondary_School_Chhataraipur:"22143101@gmail.com",
    Gorumahisani_Iron_Higher_Secondary_School_Gorumahisani:"22063101@gmail.com",
    Biju_Patnaik_Higher_Secondary_School_Ghagarbeda:"22273101@gmail.com",
    Chaitanya_Prasad_Higher_Secondary_School_Bhanjakia:"22273102@gmail.com",
    Binod_Bihari_Anchalik_Higher_Secondary_School_Rasgovindpur:"22153101@gmail.com",
    Radha_Govinda_Anchalik_Higher_Secondary_School_Amarda:"22153102@gmail.com",
    Chaitanya_Prasad_Higher_Secondary_School_Kendua:"22163101@gmail.com",
    Jhansirani_Womens_Higher_Secondary_School_Padasitha:"22163202@gmail.com",
    Saratpal_Higher_Secondary_School_Palvihar:"22173101@gmail.com",
    Biju_Patnaik_Higher_Secondary_School_Singda:"22283101@gmail.com",
    Rohi_Das_Soren_Higher_Secondary_School_Kundabai:"22233102@gmail.com",
    Panabedha_Higher_Secondary_School_Chandahandi:"23018101@gmail.com",
    Jharigam_Higher_Secondary_School_Jharigam:"23038101@gmail.com",
    Raj_Chaunria_Higher_Secondary_School_Kodinga:"23048102@gmail.com",
    Nawarangpur_Womens_Higher_Secondary_School_Nawarangpur:"23118201@gmail.com",
    Maidalpur_Higher_Secondary_School_Maidalpur:"23073101@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Raighar:"23088101@gmail.com",
    Biju_Pattnaik_ST_Womens_Higher_Secondary_School_Umerkote:"23103201@gmail.com",
    Bhapur_Anchalik_Higher_Secondary_School_Bhapur:"24013101@gmail.com",
    Krushna_Priya_Devi_Womens_Higher_Secondary_School_Daspalla:"24023203@gmail.com",
    Maninag_Bahumukhi_Higher_Secondary_School_Takara:"24023101@gmail.com",
    Banamali_Barik_Higher_Secondary_School_Adakata:"24033101@gmail.com",
    Womens_Higher_Secondary_School_Khandapara:"24093201@gmail.com",
    Higher_Secondary_Higher_Secondary_School_Boulasahi:"24053101@gmail.com",
    Naba_Choudhury_Higher_Secondary_School_Kendudhipi:"24053102@gmail.com",
    Dadhibamanjew_Higher_Secondary_School__Bahadajhola:"24063101@gmail.com",
    Gatiswar_Higher_Secondary_School_Malisahi:"24063102@gmail.com",
    Nuagaon_Higher_Secondary_School_Nuagaon:"24063103@gmail.com",
    Ananda_Sahu_Womens_Higher_Secondary_School_Komanda:"24073202@gmail.com",
    Shree_Ladukesh_Anchalik_Higher_Secondary_School_Godipada:"24073101@gmail.com",
    Arjuna_Rout_Memorial_Higher_Secondary_School_Mayurjhalia:"24083101@gmail.com",
    Garhbanikilo_Higher_Secondary_School_Garhbanikilo:"24083102@gmail.com",
    Maa_Maninag_Durga_Mahila_Higher_Secondary_School_Ranpur:"24083205@gmail.com",
    Mohan_Mahila_Higher_Secondary_School_Chandpur:"24083206@gmail.com",
    Sri_Jagannath_Higher_Secondary_School_Karangamal:"25013101@gmail.com",
    Bibekananda_Meher_Higher_Secondary_School_Bhulia_Sikuan:"25023101@gmail.com",
    Pallipragati_Higher_Secondary_School_Dohelpada:"25023102@gmail.com",
    Khadial_Mahila_Higher_Secondary_School_Khariar:"25063201@gmail.com",
    Panchayat_Higher_Secondary_School_Budhikomna:"25033101@gmail.com",
    GM_Higher_Secondary_School_Hatibandh:"25053101@gmail.com",
    Acharya_Harihara_Smruti_Higher_Secondary_School_Indipur:"26033101@gmail.com",
    Banishree_Higher_Secondary_School_Kuanarpur:"26084101@gmail.com",
    Baxi_Jagabandhu_Bidyadhar_Higher_Secondary_School_Gadaradang:"26023101@gmail.com",
    Brahmeswar_Higher_Secondary_School_Dharmakriti:"26023102@gmail.com",
    Chouda_Mouza_Bidyut_Higher_Secondary_School_Garhsanput:"26063101@gmail.com",
    Dayavihar_Higher_Secondary_School_Kanas:"26063102@gmail.com",
    Gopinath_Dev_Higher_Secondary_School_Pratap_Purusottampur:"26103101@gmail.com",
    Harachandi_Mahila_Higher_Secondary_School_Rebana:"26023204@gmail.com",
    Kalyanpur_Science_Higher_Secondary_School_Kalyanpur:"26033102@gmail.com",
    Kanas_Higher_Secondary_School_Kanas:"26063103@gmail.com",
    Konark_Womens_Higher_Secondary_School_Sarada:"26043203@gmail.com",
    Lankeswari_Mahila_Higher_Secondary_School_Beraboi_Balanga:"26083202@gmail.com",
    Maa_Ramachandi_Chilika_Womens_Higher_Secondary_School_Charichhak_Titipa:"26073201@gmail.com",
    Mahatma_Gandhi_Higher_Secondary_School_of_Education_and_Techchnology_Astaranga:"26013101@gmail.com",
    Mahatma_Gandhi_Memorial_Higher_Secondary_School_of_Education_and_Techchnology_Pubasasan:"26094101@gmail.com",
    Manein_Higher_Secondary_School_Kandagoda:"26023103@gmail.com",
    Nayahat_Higher_Secondary_School_Nayahat:"26043101@gmail.com",
    Panchayat_Higher_Secondary_School_Matiapada_Godiput:"26033103@gmail.com",
    Prachi_Higher_Secondary_School_Bangurigaon:"26053101@gmail.com",
    Puri_Womens_Higher_Secondary_School_Narendrakona:"26153201@gmail.com",
    Radhaballav_Higher_Secondary_School_Bairipur:"26043102@gmail.com",
    Ratanpur_Science_Higher_Secondary_School_Ratanpur:"26013102@gmail.com",
    Shastri_Smruti_Higher_Secondary_School_Baliput:"26103102@gmail.com",
    Sri_Sri_Beleswar_Gopinath_Higher_Secondary_School_Balighai:"26103103@gmail.com",
    Dr_BRN_Higher_Secondary_School_Dombosora:"27048101@gmail.com",
    Thyarama_Womens_Higher_Secondary_School_Gunupur:"27048202@gmail.com",
    Manikeswari_Adivasi_Higher_Secondary_School_Kashipur:"27118101@gmail.com",
    Ambodala_Samant_Higher_Secondary_School_Ambadola:"27058101@gmail.com",
    RG_Higher_Secondary_School_Padmapur:"27068101@gmail.com",
    Ugratara_Higher_Secondary_School_Komtalpeta:"27138101@gmail.com",
    BRG_Higher_Secondary_School_Bhojpur:"28023101@gmail.com",
    Batgaon_Higher_Secondary_School_Batgaon:"28053101@gmail.com",
    DPA_Higher_Secondary_School_Mura:"28104101@gmail.com",
    DPA_Higher_Secondary_School_Sason:"28083103@gmail.com",
    Fashimal_Anchalik_Higher_Secondary_School_Fashimal:"28023102@gmail.com",
    Jai_Durga_Higher_Secondary_School_Padiabahal:"28083101@gmail.com",
    Jai_Jagannath_Higher_Secondary_School_R_Badmal:"28063104@gmail.com",
    Kisinda_Higher_Secondary_School_Kisinda:"28053102@gmail.com",
    Kuchinda_Womens_Higher_Secondary_School_Kuchinda:"28043201@gmail.com",
    Kutrachuan_Higher_Secondary_School_Kutrachuan:"28033101@gmail.com",
    Maa_Jhadeswari_Higher_Secondary_School_Dhama:"28108101@gmail.com",
    Mandhata_Baba_Higher_Secondary_School_Maneswar:"28103102@gmail.com",
    Parbati_Giri_Arts_Higher_Secondary_School_Mahulpali:"28093101@gmail.com",
    Parsuram_Gountia_Higher_Secondary_School_Jarabaga:"28013101@gmail.com",
    Prabhu_Dayal_Rural_Higher_Secondary_School_Kesaibahal:"28013102@gmail.com",
    RKDT_Higher_Secondary_School_Sambalpur:"28144101@gmail.com",
    Rairakhol_Womens_Higher_Secondary_School_Rairakhol:"28073201@gmail.com",
    Rajiv_Gandhi_Memorial_Tribal_Higher_Secondary_School_Kalheipali:"28033102@gmail.com",
    Samaleswari_Higher_Secondary_School_Sambalpur:"28143101@gmail.com",
    Saraswat_Higher_Secondary_School_Godbhaga:"28083104@gmail.com",
    VSS_Higher_Secondary_School_Jujomura:"28094101@gmail.com",
    VSS_Institute_of_Science_Higher_Secondary_School_Dhankauda:"28083105@gmail.com",
    Binka_Womens_Higher_Secondary_School_Phulmuthi:"29034201@gmail.com",
    Shree_Jagannath_Higher_Secondary_School_Bausuni:"29033103@gmail.com",
    Parameswari_Higher_Secondary_School_Bhutiapali:"29013101@gmail.com",
    Babaji_Sahu_Higher_Secondary_School_Gajabandh:"29043101@gmail.com",
    Panchayat_Womens_Higher_Secondary_School_S_Rampur:"29043202@gmail.com",
    Gram_Panchayat_Higher_Secondary_School_Lachhipur:"29053101@gmail.com",
    Maa_Maheswari_Higher_Secondary_School_Khambeswaripali:"29053102@gmail.com",
    Biju_Pattnaik_Womens_Higher_Secondary_School_Sonepur:"29083202@gmail.com",
    MBR_Higher_Secondary_School_Menda:"29063102@gmail.com",
    Panchayat_Higher_Secondary_School_Charbhata:"29063103@gmail.com",
    Satyabadi_Higher_Secondary_School_Kalapathar:"29023101@gmail.com",
    Kinjirkela_Higher_Secondary_School_Kinjirkela:"30113101@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Balisankara:"30113102@gmail.com",
    Panchayat_Higher_Secondary_School_BargaonKachhar:"30123101@gmail.com",
    Subodh_Ray_Higher_Secondary_School_Bisra:"30053101@gmail.com",
    Balanipat_Higher_Secondary_School_Jhirdapali:"30013101@gmail.com",
    Banshidhar_Higher_Secondary_School_Kenaveta:"30013102@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Gurundia:"30023104@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Hemgir:"30133101@gmail.com",
    Koida_Higher_Secondary_School_Koida:"30033103@gmail.com",
    Baba_Baneswar_Higher_Secondary_School_Bilaipara:"30043101@gmail.com",
    Damodar_Naik_Higher_Secondary_School_Darlipali:"30153101@gmail.com",
    Lephripara_Higher_Secondary_School_Lephripara:"30153102@gmail.com",
    SRDMN_Panchayat_Higher_Secondary_School_Sargipali:"30153103@gmail.com",
    Panchayat_Samiti_Higher_Secondary_School_Nuagaon:"30083101@gmail.com",
    Kansbahal_Higher_Secondary_School_Laing:"30163101@gmail.com",
    Kalyani_Ray_Higher_Secondary_School_Hamirpur:"30103101@gmail.com",
    Utkal_Gourav_Madhusudan_Higher_Secondary_School_Rourkela:"30103102@gmail.com",
    New_Orissa_Higher_Secondary_School_Gaibira:"30173102@gmail.com",
    Subdega_Anchalika_Sahayog_Higher_Secondary_School_Subdega:"30173101@gmail.com",
    Illa_Memorial_Panchayat_Samiti_Higher_Secondary_School_Kinjirma:"30183101@gmail.com",
    Panchayat_Samiti_Science_and_Arts_Higher_Secondary_School_Bhedabahal:"30184101@gmail.com",
    Vesaja_Rambhabati_Higher_Secondary_School_Kundukela:"30183102@gmail.com",
    Jasoda_Bishnu_NMP_Higher_Secondary_School_Jogimal:"30193101@gmail.com",
    Maharshi_Dayanand_Higher_Secondary_School_GarhMahulpali:"30193102@gmail.com",
    Ujalpur_Higher_Secondary_School_Ujalpur:"30193103@gmail.com",
    "suraj":"suraj@gmail.com",
    "purnendu":"purnendu@gmail.com"

  };
  const arr1 = {
    "suraj@gmail.com": "delhi",
    "purnendu@gmail.com": "bbsr",
    "rahul@gmail.com": "ctc",
  };
router.use(cookieParser());
require('../db/conn');
const User=require("../model/userSchema");
router.get('/',(req,res)=>{
    res.json({message : 'Hello this is from auth'});
})
router.post('/register', async (req,res)=>{
    const { name,email,password,cpassword,role}=req.body;
    if(!name||!email||!password||!cpassword){
        return res.status(422).json({error:"Fill the required fields"});
    }
   
    try {
        const userExist= await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email already exist"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"passwords are not matching"});
        }
        else if(!arr.hasOwnProperty(name)){
            return res.status(422).json({error:"Institute Name not found"});
        }
        else if(arr[name] !== email){
            return res.status(422).json({error:"Institute name & email not mathed"});

        }
        else{
            const user=new User({name,email,password,cpassword,role});
            await user.save();
            res.status(201).json({message:"user registered successfully"});
           

        }
        
    } catch (err) {
        
        console.log(err);
    }
   
    
})
router.post("/signin",async(req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email||!password||!role){
            return res.status(400).json({error:"Data not filled correctly"});
        }
        const userLogin=await User.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            const token=await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })
            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"});
            }
            if (role !== userLogin.role) {
                return res.status(400).json({ error: "Role entered incorrectly" });
            }
            else{
                res.json({message:role});
             
            }
        }else{
            res.status(400).json({error:"Invalid credentials"});

        }
       
    } catch (err) {
        console.log(err)
    }
})
  

router.get('/about',authenticate,(req,res)=>{
    console.log("hello ji from jwt login")
    res.send(req.rootUser);
});
router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User logout successfully");
});
router.get('/registeredteams',authenticate,(req,res)=>{
    console.log("hello ji from jwt registeredteams")
    res.send(req.rootUser);
});
router.get('/search', authenticate, async (req, res) => {
    console.log("hello ji from jwt search district");
    const dist = arr1[String(req.rootUser.email)];
    console.log(dist);
    try {
      const city = dist;
  
      // Use Mongoose to find all users
      const users = await User.find();
  
      // Extract messages that match the provided city and include specific fields
      const matchingMessages = users.flatMap((user) =>
        user.messages
          .filter((message) => message.district === city)
          .map((message) => ({
            name: message.name,
            email: message.email,
            teamName: message.teamName,
            leaderName: message.leaderName,
            leaderEmail: message.leaderEmail,
            district: message.district,
            block: message.block,
            schoolName: message.schoolName,
            topic: message.topic
          }))
      );
  
      // Send both matchingMessages and req.rootUser in the response
      res.json({
        matchingMessages,
        rootUser: req.rootUser,
        district:city
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/search_so', authenticate, async (req, res) => {
    console.log("hello ji from jwt search state");
    const dist = arr1[String(req.rootUser.email)];
    console.log(dist);
    try {
      const city = dist;
  
      // Use Mongoose to find all users
      const users = await User.find();
  
      // Extract messages that match the provided city and include specific fields
      const matchingMessages = users.flatMap((user) =>
      user.messages.map((message) => ({
    name: message.name,
    email: message.email,
    teamName: message.teamName,
    leaderName: message.leaderName,
    leaderEmail: message.leaderEmail,
    district: message.district,
    block: message.block,
    schoolName: message.schoolName,
    topic: message.topic
  }))
      );
  
      // Send both matchingMessages and req.rootUser in the response
      res.json({
        matchingMessages,
        rootUser: req.rootUser,
        district:city
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Assuming your authentication middleware sets user information on req.user
router.post('/publishstatus', authenticate, async (req, res) => {
    try {
        const { teamName, approvalStatus } = req.body;
        // Check if teamName and approvalStatus are provided
        if (!teamName || approvalStatus === undefined) {
            return res.status(400).json({ error: "teamName and approvalStatus are required" });
        }
       // Use req.user._id if your authentication middleware sets user information on req.user
        const user = await User.findOne({ _id: req.userID });
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Find the team in the messages array based on teamName
        const teamIndex = user.messages.findIndex(message => message.teamName === teamName);
        // Check if the team is found
        if (teamIndex === -1) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Update the approvalStatus for the team
        user.messages[teamIndex].approvalStatus = approvalStatus;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Approval status updated successfully" });
  

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/contact',authenticate,async (req,res)=>{
    console.log("hello ji from registration team")
    try{
const { name,
    email, 
    teamName,
    leaderName,
    leaderEmail,
    topic, 
    district,
    block, 
    schoolName,
    schoolCode,
    coordinatorName,
    member1,
    member2}=req.body;
    if( !name ||
        !email || 
        !teamName ||
        !leaderName ||
        !leaderEmail ||
        !topic || 
        !district ||
        !block || 
        !schoolName ||
        !schoolCode ||
        !coordinatorName ||
        !member1 ||
        !member2){
            console.log("error in the form itself");
            return res.json({error:"Fill the form"});
        }
        const userContact=await User.findOne({_id:req.userID});
        if(userContact){
            const userMessage=await userContact.addMessage( name,
                email, 
                teamName,
                leaderName,
                leaderEmail,
                topic, 
                district,
                block, 
                schoolName,
                schoolCode,
                coordinatorName,
                member1,
                member2);
        }
        await userContact.save();
        res.status(201).json({message:"Team registered successfully"});

    }catch(error){
console.log(error);
    }
});
module.exports=router;