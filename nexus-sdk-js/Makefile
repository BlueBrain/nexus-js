.PHONY: build test clean

install:
	@echo "Installing project's dependencies... 🚀"
	@docker-compose run --rm nexus-sdk install

build:
	@echo "Building project... 👷"
	@docker-compose run --rm nexus-sdk

test:
	@echo "Running tests... 🧪"
	@docker-compose run --rm nexus-sdk test

clean:
	@echo "Cleaning... 🧹"
	@docker-compose run --rm nexus-sdk run clean
	@sudo rm -fr node_modules/