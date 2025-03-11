all:
	docker-compose up --build
	docker run --init --publish 5000:5000 my-tamagotchi-app:latest
build:
	docker compose build
up:
	docker compose up -d --build
logs:
	docker logs tamagachi-app -f
down:
	docker compose down
shell:
	docker exec -it tamagachi-app bash -i
