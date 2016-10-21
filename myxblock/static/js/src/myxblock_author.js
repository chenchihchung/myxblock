/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {



    function getInit(result) {
         alert(" getInit()");
         alert('result title ='+result.listfiles);
    }

    function init() {
        alert(" init*********() ");
        var url = runtime.handlerUrl(element, 'list_files');
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
        init();

    });
}
