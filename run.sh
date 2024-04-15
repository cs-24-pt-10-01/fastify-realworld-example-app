# copy env file (just use example)
cp .env.sample .env

# instrument
# TODO

# install stuff
npm install newman # newman used in run-api-tests.sh
npm install

# run the app
npm start & 

# run the tests
APIURL=http://localhost:5000/api ./run-api-tests.sh

npm stop # test if this works
