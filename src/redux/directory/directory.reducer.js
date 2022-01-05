const INTIIAL_STATE = {
    section: [
        {
            title: 'BOTTOM',
            imageUrl: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            id: 1,
            linkUrl: 'shop/bottom'
        },
        {
            title: 'OUTERWEAR',
            imageUrl: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
            id: 2,
            linkUrl: 'shop/outerwear'
        },
        {
            title: 'SHOES',
            imageUrl: 'https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            id: 3,
            linkUrl: 'shop/shoes'
        },
        {
            title: 'HATS',
            imageUrl: 'https://images.pexels.com/photos/1078975/pexels-photo-1078975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            id: 4,
            linkUrl: 'shop/hats'
        },
        {
            title: 'TOP',
            imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            id: 5,
            linkUrl: 'shop/top'
        },
    ]
}

const directoryReducer = (state = INTIIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default directoryReducer;