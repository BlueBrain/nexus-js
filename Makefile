.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚"
	@docker-compose run --rm --user ${ME} --entrypoint bash nexus-sdk

install:
	@echo "Installing project's dependencies... 🚀"
	@npm ci && npx lerna bootstrap

build:
	@echo "Building projects... 👷"
	@npx lerna run build

test:
	@echo "Running tests... 🛫🛬"
	@npm test -- --coverage

coverage:
	@echo "Running tests... 🛫🛬"
	@npx lerna run coverage

lint:
	@echo "Linting... ✨"
	@npm run lint

clean:
	@echo "Cleaning... 🗑"
	@ npx lerna clean && npm run clean