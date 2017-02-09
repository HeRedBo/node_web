$(document).ready(function() 
{
    $('.comment').click(function(event) 
    {
        console.log('hello world');
        var a = $(this),
            b = a.data('cid'),
            c = a.data('cid');
        $('#toId').length > 0 ? $('toId').val(b) : $('<input>').attr({
            type : 'hidden',
            id : 'toID',
            name : "comment[tid]",
            value : b
        }).appendTo('#commentForm'), $('#commentId').length > 0 ? $('#commentId').val(c)
            : $('<input>').attr({
                type : 'hidden',
                id : '#commentId',
                name : 'comment[cid]',
                value : c
            }).appendTo('#commentForm');
    });
});