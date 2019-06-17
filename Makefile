U := ingprog

ansible-development-setup:
	mkdir -p tmp
	echo 'pass' >> tmp/ansible-vault-password
	ansible-playbook ansible/development.yml -i ansible/development -vv

install:
	docker-compose -f docker-compose_dev.yml run node make install

migrate:
	docker-compose -f docker-compose_dev.yml run node npx knex migrate:latest

migrate-test:
	docker-compose -f docker-compose_dev.yml run node npx knex migrate:latest --env test

migrate-rollback:
	docker-compose -f docker-compose_dev.yml run node npx knex migrate:rollback

seed:
	docker-compose -f docker-compose_dev.yml run node npx knex seed:run

dev:
	docker-compose -f docker-compose_dev.yml up -d

test:
	docker-compose -f docker-compose_dev.yml run node npx mocha

kill:
	docker-compose -f docker-compose_dev.yml kill

reload: kill dev

ansible-vaults-encrypt:
	ansible-vault encrypt ansible/production/group_vars/all/vault.yml

ansible-vaults-decrypt:
	ansible-vault decrypt ansible/production/group_vars/all/vault.yml

.PHONY: test
