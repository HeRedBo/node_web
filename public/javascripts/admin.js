$(function() {
    $('.del').click(function  (e) {
        var target = $(e.target),
            id = target.data('id'),
            tr = $('.item-id-' + id);
        $.ajax({
            url: '/admin/list?id=' + id,
            type: 'DELETE',
        })
        .done(function(results) 
        {
            if(results.success === 1)
            {
                if(tr.length > 0) 
                {
                    tr.remove();
                }
            }
        })
        .fail(function() 
        {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });

    // delete User
    $('.delUser').click(function(event) {
        var target = $(event.target),
            id = target.data('id'),
            tr = $('.item-id-' + id);
        $.ajax({
            url: '/admin/userList?id=' + id,
            type: 'DELETE',
            dataType: 'JSON'
        })
        .done(function(results) {
            if(results.success === 1)
            {
                console.log('delete success!');
                if(tr.length > 0) 
                {
                    tr.remove();
                }
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
    
    // delete category 
    $('.delCate').click(function(event) {
        var target = $(event.target),
            id = target.data('id'),
            tr = $('.item-id-' + id);
        $.ajax({
            url: '/admin/category/list?id=' + id,
            type: 'DELETE',
            dataType: 'JSON'
        })
        .done(function(results) {
            if(results.success === 1)
            {
                console.log('delete success!');
                if(tr.length > 0) 
                {
                    tr.remove();
                }
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });

    $('#inputDouban').blur(function(e){
        var douban = $(this);
        var id     = douban.val();
        if(id)
        {
            $.ajax({
                url : 'https://api.douban.com/v2/movie/subject/' + id,
                cache : 'true',
                type : 'GET',
                dataType : 'jsonp',
                crossDomain : true,
                jsonp: 'callback',
                success:function(data) 
                {
                    if(data && !data.code)
                    {
                        $('#inputTitle').val(data.title);
                        $('#inputDoctor').val(data.directors[0].name);
                        $('#inputCountry').val(data.countries[0]);
                        $('#inputPoster').val(data.images.large);
                        $('#inputYear').val(data.year);
                        $('#inputSummary').val(data.summary);
                    }
                },
                error:function(xhr,textStatus)
                {
                    console.log('服务器错误，请稍后再试~！')
                },
                complete:function(){
                    console.log('结束')
                }

            });
        }
    });
});