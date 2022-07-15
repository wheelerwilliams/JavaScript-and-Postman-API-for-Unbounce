  
  // Get access token
  var data = "username=swck%40camginc.com&password=UOZygkQWWLiUWQLK&grant_type=password&client_id=19&client_secret=vhQSbKI89XO9sjiLRNprNQAjQRufDYETyWDlSPcF";
  var access_token;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      access_token = JSON.parse(xhr.responseText).access_token + " " + JSON.parse(xhr.responseText).access_token
      console.log("access_token", access_token);
  }
  });

  xhr.open("POST", "https://pcdialer.camginc.com/oauth/token");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data); 

  // Post data
  var cpap_machine_used = document.getElementById("cpap_machine_used").value;
  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var email = document.getElementById("email").value;
  var phone_number = document.getElementById("phone_number").value;
  var date= new Date().toLocaleString('en-US', { timeZone: 'EST' });
  var user_ip, user_region;

  jQuery(document).ready(function () {
      jQuery.getJSON("http://ipinfo.io/?format=jsonp&callback=getIP", function (data) {
          user_ip = data.ip;
          user_region = data.region;
      });
  });

  var data = JSON.stringify({
    "campaign_id":"1119",
    "full_name": first_name+' '+last_name,
    "phone":phone_number,
    "email":email,
    "date":date,
    "questions":{
      "consent":"yes",
      "Business Name":business_name,
      "State":user_region,
      "User IP":data.ip,
      "Partner_Id":"test"
    }
  });

  console.log("data", data);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://pcdialer.camginc.com/api/leads/");
  xhr.setRequestHeader("Authorization", access_token);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');


  xhr.send(data);   


    
