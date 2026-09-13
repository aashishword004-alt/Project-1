let same = {
    er: () => {
        return ([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'input is missing'
        }
        ])
    },
    server: () => {
        return ([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'somthing wrong in server'
        }
        ])
    }

}

module.exports = same