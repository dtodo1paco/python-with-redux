.PHONY: clean system-packages python-packages install tests run all

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

system-packages:
	sudo apt install python-pip -y

python-packages:
	pip install -r requirements.txt

install: system-packages python-packages

tests:
	python manage.py test

run:
	python manage.py run

db-clean:
	find . -type f -name '*.db' -delete
	rm -rf migrations

db-init:
	python manage.py db init

db-migrate:
	python manage.py db migrate

db-reset: db-clean db-init db-migrate

update-db:
	FLASK_APP=manage.py flask db migrate

all: clean install tests db-reset run
