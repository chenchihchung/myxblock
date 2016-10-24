/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {



    function listFiles(result) {
        access_token = result.returndata;
        console.log('access_log -->'+access_token);
        get_root_uri(access_token);
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
               'Accept': 'application/json'
               //'Access-Control-Allow-Origin':'*'
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

    $(function ($) {
        /* Here's where you'd do things on page load. */
        console.log('This is myxblock_author.js');
        author_init();
    });
}
