/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');



    /*
    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });
    */

    function getInit(result) {
         alert(" getInit()");
         alert('result title ='+result.titlename+",value ="+result.titlevalue);
    }

     $("#myDiv").click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    function init() {
        alert(" init*********() ");

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
        alert('This is myxblock.js')
        //$(".xblock-display-name").html("xblock title");
        $("#access_token").html(" access_token");
        $(".access_token_text").text(" access_token");
        init();

    });
}
