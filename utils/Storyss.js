export const data = [
    {
      user_id: 1,
      user_image:
        'https://media.licdn.com/dms/image/C5603AQHkbZCEC0iFog/profile-displayphoto-shrink_800_800/0/1606647951584?e=2147483647&v=beta&t=obZduYzE3nG-PYxFkwG-vwXJU7sKsPeXPsRyA1QoXqM',
      user_name: 'v_v_vivek',
      
      stories: [
        {
          story_id: 1,
          story_image:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/SB_College%2C_Changanassery%2C_Kerala%2C_India.JPG',
          swipeText: 'Custom swipe text for this story',

        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
   
    {
      user_id: 3,
      user_image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      user_name: 'yadhu__',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
         
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
         
        },
        {
          story_id: 3,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    },
  ];