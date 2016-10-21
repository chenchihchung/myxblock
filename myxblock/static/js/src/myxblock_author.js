/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {



    function getInit(result) {
        access_token = result.returndata;
        console.log('access_log -->'+access_token);
        $('#access_token').text(result.returndata);
        //$('#access_token', element).text(result.returndata);
    }

    function author_init() {
        var url = runtime.handlerUrl(element, 'get_init');
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({"hello": "world"}),
            success: getInit
        });
    }



    $(function ($) {
        /* Here's where you'd do things on page load. */
        console.log('This is myxblock_author.js');
        author_init();
    });
}
