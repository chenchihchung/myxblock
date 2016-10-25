/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {


    /*******************************************************************
     * Utility Methods & Global Variables
     *******************************************************************/
    //jsonMediaServicesCtx: { accessToken:"",expiresIn:"" }
    //baseWAMSUrl = 'https://wamsbluclus001rest-hs.cloudapp.net/API/';
    //baseACSUrl = 'https://wamsprodglobal001acs.accesscontrol.windows.net/v2/OAuth2-13';









    function listFiles(result) {
        access_token = result.returndata;
        console.log('access_log -->'+access_token);
        //get_root_uri(access_token);
        //$('#access_token').text(result.returndata);
        $('#access_token', element).text(result.returndata);

    }

    /*def get_root_uri(self, token):
        r = requests.get(
            'https://media.windows.net/',
            headers = {
                'Authorization': 'Bearer ' + token,
                'x-ms-version': '2.11',
                'Accept': 'application/json'
            },
            proxies = self.proxies
        )
        return json.loads(r.text)['odata.metadata'].strip('$metadata')
    */

    function get_root_uri_data(result) {
        console.log("get_root_uri_data result.text -->"+result.text);
    }

    function get_root_uri(token) {
        url = 'https://media.windows.net/';
         $.ajax({
            type: "POST",
            url: url,
            headers : {
               'Authorization': 'Bearer ' + token,
               'x-ms-version': '2.11',
               'Accept': 'application/json',
               'Access-Control-Allow-Origin':'*'
            },
            success : get_root_uri_data
        });
    }

    function author_init() {
        var url = runtime.handlerUrl(element, 'get_token');
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({"hello": "world"}),
            success: listFiles
        });
    }

    function getAccessToken(result) {
        console.log(" getAccessToken -->"+result);
        //access_token = result.returndata;
        //console.log('access_log -->'+access_token);
        //get_root_uri(access_token);
        //$('#access_token').text(result.returndata);
        //$('#access_token', element).text(result.returndata);

    }

    function getToken() {

        var url = 'https://wamsprodglobal001acs.accesscontrol.windows.net/v2/OAuth2-13';
        headers = {'Content-Type ': 'application/x-www-form-urlencoded',
                   'Host': 'wamsprodglobal001acs.accesscontrol.windows.net',
                   'Content-Length': '120',
                   'Expect': '100-continue',
                   'Connection': 'Keep-Alive',
                   'Accept': 'application/json'};
        data ="grant_type=client_credentials&client_id=drcedx&scope=urn:WindowsAzureMediaServices&client_secret=oYVh8L+h8DieJ/HgEf6rNo4sohyxdGRV3SLP0oOBK5s=";
        //data = {
        //        'grant_type': 'client_credentials',
        //        'client_id': 'drcedx',
        //        'scope': 'urn:WindowsAzureMediaServices',
        //        'client_secret': 'oYVh8L+h8DieJ/HgEf6rNo4sohyxdGRV3SLP0oOBK5s='};
        $.support.cors = true;
        $.ajax({
            crossDomain:true,
            type: "POST",
            url: url,
            headers : headers,
            data : data,
            success : getAccessToken
        });
    }

    // function getAuthAccessToken() {
    //     var baseACSUrl = 'https://wamsprodglobal001acs.accesscontrol.windows.net/v2/OAuth2-13';
    //     var accountName = "drcedx";
    //     var encAcctKey  = encodeURIComponent("oYVh8L+h8DieJ/HgEf6rNo4sohyxdGRV3SLP0oOBK5s=");
    //     var scope       = encodeURIComponent("urn:WindowsAzureMediaServices");
    //
    //     $.ajax({
    //         url: baseACSUrl,
    //         method:"POST",
    //         data: "grant_type=client_credentials&client_id=" + accountName + "&client_secret=" + encAcctKey + "&scope="+scope,
    //         success: function (data) {
    //             console.log(" into success() ");
    //
    //         },
    //         error: function (req, type, ex) {
    //             console.log(" into error() ");
    //
    //         }
    //     });
    // }

    function expireToken(seconds) {
        var date = new Date();
        var s = seconds;
        date.setTime(date.getTime() + ( s * 1000));
        $.cookie("cookie", "access_token", { expires: date });
    }

    function getAuthAccessToken() {
        console.log("$.cookie('access_token')-->"+$.cookie('access_token'));
        if ($.cookie('access_token')== null) {
            var url = runtime.handlerUrl(element, 'get_token');
            $.ajax({
                url    : url,
                type   : 'POST',
                data   : JSON.stringify({"hello": "world"}),
                sucess : function (result) {
                    //console.log(" getAuthAccessToken sucess ...");
                    console.log(" token -- >"+result.access_token+",expired_in -->"+result.expires_in);
                    console.log(" token -- >"+result.access_token);
                    $.cookie('access_token', result.access_token);
                    expireToken(result.expires_in);
                },
                error :function (req,type,ex) {
                    console.log("error");
                }
            });
        }else {
            //nothing
        }



    }

    $(function ($) {
        /* Here's where you'd do things on page load. */
        console.log('This is myxblock_author.js');
        //author_init();
        //getToken();
        getAuthAccessToken();
    });
}
