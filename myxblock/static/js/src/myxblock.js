/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $("#myDiv").click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

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

    $(function ($) {
        /* Here's where you'd do things on page load. */
        alert('This is myxblock.js')
        $(".xblock-display-name").text = "Xblock title ";
    });
}
