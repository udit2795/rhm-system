# rhm-system
## Steps to start the project in local
- clone the repository
- run <b>npm i</b> in terminal
- run <b>npm start</b> to start the application

## CURL command to insert data in db
  1. To add a owner
  ```curl --location --request POST 'http://localhost:5000/addOwner' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Some Name",
    "email": "udit2795@gmail.com",
    "phone": "7760625652"
}'

```
  2. To add a Realtor
  ```curl --location --request POST 'http://localhost:5000/addRealtor' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Some Name",
    "email": "udit2795@gmail.com",
    "phone": "7760625652"
}'

```
  3. To add a House
  ```curl --location --request POST 'http://localhost:5000/addRealtor' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Some Name",
    "description": "A description of the house",
    "address": "Address to the house",
    "owner_id": "owner id from owner database"
}'

```curl --location --request POST 'http://localhost:5000/add_house_visibility_slot' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Some Name",
    "property_id": "house id from house database",
    "start_time": "11: 00",
    "duration": "45 min",
    "day_of_week": 0,
    "status": "Available",
    "realtor_id": "realtor id from realtor database"
}'

```
### Known bugs
Mongo cluster id and password are hardcoded in the code. 
solution: We can save this in env variable or in ansible.

realtor id is pre inserted in visitAvailability Schema.
solution: We can use a round robin approach for this.

### Area to improve
We can build more pages in UI to add owner, Realtor, house visit slots. To perform this some backend changes also required.
We can store details like house id, converted (true/false), feedback in the realtor database for each tenant he is meeting with. This will help in building a report on the lead/tenant conversion.
We can add chat support in the UI.
We can store more details of house, to provide filters in UI. 
