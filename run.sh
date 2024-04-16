# copy env file (just use example)
cp .env.sample .env

# instrument
# TODO

# install stuff
npm install newman # newman used in run-api-tests.sh
npm install

# starting the service
npm start & 

sleep 5s

# run the tests
APIURL=http://localhost:5000/api ./run-api-tests.sh

# stopping the service (warning this will kill all node processes)
pkill node