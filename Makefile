.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚"
	@docker-compose run --rm --user ${ME} --entrypoint bash nexus-sdk

install:
	@echo "Installing project's dependencies... 🚀"
	@npx lerna bootstrap

build:
	@echo "Building projects... 👷"
	@npx lerna run build --stream

test:
	@echo "Running tests... 🧪"
	@npm test

lint:
	@echo "Linting... ✨"
	@npx lerna run lint --stream

clean:
	@echo "Cleaning... 🗑"
	@ npx lerna clean && npm run clean