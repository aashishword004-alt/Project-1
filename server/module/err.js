function er ()
{
    return([{'error' : true},
        {
            'success' : false
        },
        {
            'message' : 'input is missing'
        }
    ])
}

module.exports.er=er