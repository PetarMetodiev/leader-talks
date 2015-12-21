(function() {
    $(document).ready(function() {
        $('#users-container').DataTable({
            "pagingType": "full_numbers",
            'createdRow': function(row, data, index) {
                // console.log(row);
                // console.log(data);
                // console.log(index);
                if (data[1] === 'admin') {
                    $('td', row).eq(1).addClass('alert-danger');
                }
                else if (data[1] === 'user') {
                    $('td', row).eq(1).addClass('alert-info');
                }
            }
        });
    });
}())