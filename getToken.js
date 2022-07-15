    var data = "username=swck%40camginc.com&password=UOZygkQWWLiUWQLK&grant_type=password&client_id=19&client_secret=vhQSbKI89XO9sjiLRNprNQAjQRufDYETyWDlSPcF";
    var access_token;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        access_token = JSON.parse(xhr.responseText).access_token
        console.log(access_token);
    }
    });

    xhr.open("POST", "https://pcdialer.camginc.com/oauth/token");
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.send(data); 

    
