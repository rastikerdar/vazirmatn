SHELL=/bin/bash

.PHONY : fonts rd-fonts zip test

fonts:
	@./scripts/make-fonts.sh

rd-fonts:
	@./scripts/make-fonts.sh --rd-font

zip:
	@./scripts/make-package.sh

all: 
	make fonts
	make rd-fonts
	make zip

test:
	@echo "Sorry not implemented yet"
