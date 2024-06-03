# copy env file (just use example)
cp .env.sample .env

# install stuff
npm install koffi # used for FFI
npm install newman # newman used in run-api-tests.sh
npm install

# starting the service
node . &
PID=($!)

sleep 5s

# run the tests
APIURL=http://localhost:5000/api ./run-api-tests.sh

# sending SIGINT (ctrl+c) to the process
kill -s SIGINT $PID

sleep 2s
pkill node