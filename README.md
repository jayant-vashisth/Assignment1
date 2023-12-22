## Tech Stack

Tech Stack used - NodeJs, ExpressJs, MongoDB Atlas, Docker

For installation either build the docker file in the code or take a pull from jayantvashisth/assignment1

I used an Express server because this project was small and flexible, making Express the right choice for it. Additionally, I have used MongoDB Atlas, a NoSQL database, as the fields used in this project might change in the future. Currently, I am using fields that were necessary for this task only. 

In this project, as mentioned in the explanation video, there is an endpoint api/card/get_card_status which takes either a phone number (ph) or cardId as query parameters. This allows the retrieval of the card status. Therefore, this endpoint can be accessed to get the status of our card.

## Improvement
In this, I have added a 'script' folder inside 'src' which contains the script to retrieve data from CSV files and add them to the database. Currently, I am calling this script when our app starts, which is not the optimal way. To improve this, we can create an endpoint where our partner company can upload the CSV, updating our database. This approach will not only keep our data up-to-date but also limit the resources being used.

We can also apply data cleaning before adding it to the database the way I did with the phone no. we can also add the limit to digits, column name formatting etc.

## Architectural Decisions
I have created two collections in the database: one is 'cardStatus,' and the other is 'users.' My plan is to consolidate all user-related data, such as PhoneNo, Name, and cardId, in the 'users' table. When querying using a phone number, we will first search for the user and then use referencing to the 'cardStatus' table to check the status of the card. Conversely, if a cardId is provided, we will directly check in the 'cardStatus' collection.


