    var $table = $('#table');
    // custom your ajax request here
    function ajaxRequest(params) {
        // data you need
        console.log(params.data);
        // just use setTimeout
        setTimeout(function () {
            params.success({
                limit: 25,
                total: 100,
                rows: [{
                    "id": 0,
                    "name": "Item 0",
                    "price": "$0"
                }]
            });
            // hide loading
            params.complete();
        }, 1000);
    }
