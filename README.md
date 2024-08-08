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
## cool features to see on the sites
view client on :3000
+ check out what you can do as a guest!
- 
+ check out what you can do as a store owner! 
try out username: `bathowner` and password: `great` combo
- 
+ check out what you can do as the admin!
try out username: `admin` and password: `pword` combo
- 

## ending it
kill the containers and volumes
`sudo docker-compose down -v`