export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      },
      admin: {
        firstName: "Special",
        lastName: "User",
        email: "admin@mail.com",
        password: "secret"
      }
    },

    places: {
        _model: "Place",
        meath: {
          name: "Meath",
          userid: "->users.bart"
        },
        sligo: {
          name: "Sligo",
          userid: "->users.homer"
          },
        roscommon: {
          name: "Roscommon",
          userid: "->users.marge"
          },
      },



      monuments: {
        _model : "Monument",
        monuments : {
          name: "Newgrange",
          description: "5,200 year old passage tomb located in the Boyne Valley in Ireland's Ancient East",
          location:
          {
            lat: 53,
            lng: -6,
          },
          cat: "Passage Tomb",
          placeid: "->places.meath"
        },
        monument2 : {
            name: " The Cairn of Queen Maeve ",
            description: "On the summit of Knocknarea Mountain (320 meters in height) in County Sligo, a large Cairn can be found known locally as Miosgan Meadhba (Maeves Cairn)",
            location:
            {
            lat: 54,
            lng: -8,
            },
            cat: "Cairn",
            placeid: "->places.sligo"
          },
            monument3 : {
            name: "Ballincool Standing Stone",
            description: "This enormous standing stone is very impressive and can be seen quite clearly from the road",
            location:
            {
            lat: 51,
            lng: 14,
            },
            cat: "Standing Stone",
            placeid: "->places.roscommon"
          },
      }
  };