/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {


    /*******************************************************************
     * Utility Methods & Global Variables
     *******************************************************************/
    //jsonMediaServicesCtx: { accessToken:"",expiresIn:"" }
    //baseWAMSUrl = 'https://wamsbluclus001rest-hs.cloudapp.net/API/';
    //baseACSUrl = 'https://wamsprodglobal001acs.accesscontrol.windows.net/v2/OAuth2-13';


    $(function ($) {
        /* Here's where you'd do things on page load. */
        console.log('This is myxblock_author.js');
        //author_init();
        //getToken();
        getAuthAccessToken();
        $('#listfile').click(function() {
            get_root_uri();
        });

    });

    function get_root_uri_data(result) {
        console.log("get_root_uri_data result.text -->"+result.text);
    }

    function get_root_uri() {
        var url = 'https://media.windows.net/';
        var token = getAuthAccessToken();
        console.log('get_root_uri gettoken()-->'+token);
        $.ajax({
            type: "POST",
            url : url,
            headers : {
               'Authorization': 'Bearer ' + token,
               'x-ms-version': '2.11',
               'Accept': 'application/json'
            },
            data   : JSON.stringify({"hello": "world"}),
            success : function (data) {
                console.log('success.....');
            },
            error :function (req,type,ex) {
                console.log("error");
            }
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

    function expireToken(seconds) {
        var date = new Date();
        var s = seconds;
        date.setTime(date.getTime() + ( s * 1000));
        $.cookie("cookie", "access_token", { expires: date });
    }

    function getAuthAccessToken() {
        console.log("$.cookie('access_token')-->"+$.cookie('access_token'));
        if ($.cookie('access_token')== null) {
            console.log(" py --> get_token()");
            var url = runtime.handlerUrl(element, 'get_token');
            $.ajax({
                url    : url,
                type   : 'POST',
                data   : JSON.stringify({"hello": "world"}),
                success : function (data) {
                    $.cookie('access_token', data.access_token);
                    expireToken(data.expires_in);
                    return (data.access_token);
                },
                error :function (req,type,ex) {
                    console.log("error");
                }
            });
        }else {
            //nothing
            console.log(" else ");
            return ($.cookie('access_token'));
        }
    }


}
