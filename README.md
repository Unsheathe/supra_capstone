# z-pre
## setup
clone
in backend, install all dependancies
`cd backend && npm i`
do the same thing for frontend
`cd ../client && npm i`
## run it
run a docker-compose of everything
`cd ../ && sudo docker-compose up --build`

at every build, the database is seeded with random information, except for two accounts `admin` and `bathowner` which are hardcoded so you can use the passwords for them to see what a user versus a priveledged user can do. Since the info is random except for what you put in while running the program, expect the data to not make sense (like an item "Car" with a photo of an apple, and description for a bike, or a business logo of a mountain, etc.)

view client on :3000
+ check out what you can do as a guest!
browse anything!
+ check out what you can do as a store owner! 
try out username: `bathowner` and password: `great` combo
what a guest could do, but also update your own inventory!
+ check out what you can do as the admin!
try out username: `admin` and password: `pword` combo
what a guest could do, but also update the list of inventory managers!

## ending it
kill the containers and volumes
`sudo docker-compose down -v`

## User stories (objectives)
1. As an inventory manager I want to be able to create an account so that I can track my inventory.
- I decided to make it so that only the admin account can do this, because it is bad practice to let just anyone make a business account.
+ sign in as admin (`admin` and `pword` credential combo) and the homepage suddenly has extra powers for your eyes only!

2. A. As an inventory manager I want to be able to log into my account so that I can see my inventory of items.
+ either create a manager account as admin, or log into a hardcoded one prebuild with `bathowner` and `great` credential combo

2. B. After logging in, the inventory manager should be redirected to their inventory of items.
+ whether you log in as admin or a manager, you will be directed to the page you own upon login

3. A. As an inventory manager I want to be able to create a new item so that I can share my item details with the world.
+ log in as a manager, and scroll to the bottom, under existing items

3. B. After the item is created, the inventory manager should be redirected to their inventory of items.
+ the page will refresh, showing your items with the new item

3. C. An item displays name, description, and quantity.
- click on the item to see full details

4. A. As an inventory manager I want to be able to see a my entire inventory of items.
+ log in as manager and it takes you there

4. B. The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.
+ NOT DONE YET

5. As an inventory manager I want to be able to see any individual item I have added. The full item information should be displayed.
+ click on the item to see full details


6. A. As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.
+ NOT DONE YET

6. B. When the user toggles edit mode, the page remains the same and the fields become editable.
+ NOT DONE YET

7. A. As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.
+ log in as a manager, and scroll to the bottom, under existing items

7. B. When the user deletes the item they should be redirected to their inventory of items.
+ the page will refresh, showing your items

8. As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.
+ click on "All Items" while logged out

9. A. As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.
+ click on the item to see full details

9. B. Unauthenticated users should be able to view all items, and any single item.
+ click on the item to see full details

10. As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.
+ navigate to the home page (by clicking the logo icon in the header) and you can see all other inventories by store