  
  var user_ip;
  var user_region;

  $.get("https://ipinfo.io", function(response) {
      user_ip = response.ip;
      user_region = response.region
      console.log(user_ip, user_region);
  }, "jsonp");

  $('form').submit(function(e){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone_number = document.getElementById("phone_number").value;
    var date= new Date().toLocaleString('en-US', { timeZone: 'EST' });
    var age = document.getElementById("age").value;
    
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
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.send(data); 

    // Post data
    

    var data = JSON.stringify({
      "campaign_id":"1118",
      "full_name": name,
      "phone":phone_number,
      "email":email,
      "date":date,
      "questions":{
        "consent":"yes",
        "State":user_region,
        "User IP":user_ip,
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
  });

    
