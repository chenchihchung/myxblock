/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {



    function getInit(result) {
        access_token = result.access_token;
        $('#access_token').text(result.returndata);
        //$('#access_token', element).text(result.returndata);
    }

    function author_init() {
        alert(" author_init() ");
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
        alert('This is myxblock_author.js')
        //$(".xblock-display-name").html("xblock title");
        //$('#access_token').text("abcef");

        author_init();

    });
}
