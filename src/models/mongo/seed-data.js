import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "$2a$10$hj0arwgT0fKlwmu8aR4ei.c6.LPO7fNEQwPvCenpzgIlNcjEWomdm"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "$2a$10$hj0arwgT0fKlwmu8aR4ei.c6.LPO7fNEQwPvCenpzgIlNcjEWomdm"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "$2a$10$hj0arwgT0fKlwmu8aR4ei.c6.LPO7fNEQwPvCenpzgIlNcjEWomdm"
      },
      admin: {
        firstName: "Special",
        lastName: "User",
        email: process.env.admin_email,
        password: process.env.admin_password
      }
    },
    places: {
        _model: "Place",
        meath: {
          name: "Meath",
          userid: "->users.bart"
        },
        kildare: {
          name: "Kildare",
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
    categories: {
      _model: "Category",
      cat1: {
        typeMonument: "Stone Circle"
      },
      cat2: {
        typeMonument: "Court Tomb"
      },
      cat3: {
        typeMonument: "Passage Tomb"
      },
      cat4: {
        typeMonument: "Wedge Tomb"
      },
      cat5: {
        typeMonument: "Stone Row"
      },
      cat6: {
        typeMonument: "Portal Tomb"
      },
      cat7: {
        typeMonument: "Cairn"
      },
      cat8: {
        typeMonument: "Standing Stone"
      },
    },
      monuments: {
        _model : "Monument",
        monuments : {
          name: "Newgrange",
          description: "5,200 year old passage tomb located in the Boyne Valley in Irelands Ancient East",
          location:
          {
            lat: 53.6899522402,
            lng: -6.47168,
          },
          category: "->categories.cat3",
          placeid: "->places.meath"
        },
        monument2 : {
            name: " The Cairn of Queen Maeve ",
            description: "On the summit of Knocknarea Mountain (320 meters in height) in County Sligo, a large Cairn can be found known locally as Miosgan Meadhba (Maeves Cairn)",
            location:
            {
            lat: 54.25820555556549,
            lng: -8.575172424316408,
            },
            category: "->categories.cat7",
            placeid: "->places.sligo"
          },
            monument3 : {
            name: "Ballincool Standing Stone",
            description: "This enormous standing stone is very impressive and can be seen quite clearly from the road",
            location:
            {
            lat: 53.831202,
            lng: -8.387562,
            },
            category: "->categories.cat8",
            placeid: "->places.roscommon"
          },
      }, 
  };
  