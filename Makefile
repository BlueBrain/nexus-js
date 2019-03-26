.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚"
	@docker-compose run --rm --user ${ME} --entrypoint bash nexus-sdk

install:
	@echo "Installing project's dependencies... 🚀"
	@npm i

build:
	@echo "Building project... 👷"
	@npm run build

test:
	@echo "Running tests... 🧪"
	@npm test

lint:
	@echo "Linting... ✨"
	@npm run lint

documentation:
	@echo "Generating documentation... 📑"
	@npm run documentation

clean:
	@echo "Cleaning... 🗑"
	@npm run clean
	@rm -fr node_modules/