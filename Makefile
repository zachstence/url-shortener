.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	cd server; npm install;
	cd ui; npm install;

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any localhost:8081
server:
	cd server; npm run dev;

# starts the ui dev server on localhost:8080
ui:
	cd ui; npm start;

# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	cd server; npm run test;
	cd ../ui; npm run test;