PROJECT_ID ?= bhecschool
DIST       := dist
CHANNEL    ?= preview
PORT       ?= 5000
FIREBASE   := firebase --project $(PROJECT_ID)

.PHONY: help login build serve deploy preview open clean

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-10s %s\n", $$1, $$2}'

login: ## Authenticate the Firebase CLI
	firebase login

build: clean ## Stage the site into dist/
	@mkdir -p $(DIST)
	@cp index.html script.js styles.css $(DIST)/
	@rsync -a --exclude='.DS_Store' public $(DIST)/
	@echo "Built $(DIST)/ ($$(du -sh $(DIST) | cut -f1))"

serve: build ## Serve dist/ locally on $(PORT)
	@echo "http://localhost:$(PORT)"
	python3 -m http.server $(PORT) --directory $(DIST)

deploy: build ## Deploy to production (https://$(PROJECT_ID).web.app)
	$(FIREBASE) deploy --only hosting

preview: build ## Deploy to a temporary preview channel (CHANNEL=name)
	$(FIREBASE) hosting:channel:deploy $(CHANNEL) --expires 7d

open: ## Open the live site
	open https://$(PROJECT_ID).web.app

clean: ## Remove build output
	@rm -rf $(DIST)
