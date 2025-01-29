FROM oven/bun:debian

RUN apt update && apt upgrade
RUN apt install -y curl unzip
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt update && apt upgrade
RUN apt install -y nodejs

#RUN curl -fsSL https://bun.sh/install | bash
#RUN source /root/.bashrc 

RUN npm install vite -g
RUN npm install pino-pretty -g

ADD shared /app/shared/
ADD ui /app/ui/
ADD api /app/api/

ENV ENV=production

WORKDIR /app/ui/react-store
RUN npm install && npm run build

WORKDIR /app/api/bun-express
RUN bun install
RUN bun pm untrusted
RUN bun add -g pino-pretty 

EXPOSE 4200/tcp

# prod, json logging
#ENTRYPOINT [ "bun", "run", "index.ts" ]

# pre-prod
#ENTRYPOINT [ "bun", "run", "index.ts | pino-pretty", " | ", "pino-pretty" ]
ENTRYPOINT [ "bash", "./start" ]