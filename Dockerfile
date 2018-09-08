FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    apt-transport-https \
    curl

RUN apt-get update -y && \
    apt-get install -y software-properties-common && \
    apt-add-repository -y ppa:brightbox/ruby-ng && \
    curl -sL https://deb.nodesource.com/setup_8.x | sh -
    
RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq \
    build-essential \
    ruby2.5 ruby2.5-dev \
    libpq-dev \
    zlib1g-dev \
    unattended-upgrades \
    git \
    update-notifier-common \
    tzdata \
    nodejs
 
RUN gem install bundler

RUN mkdir -p /src/gospeltoolbox/account

WORKDIR /src/gospeltoolbox/account

ADD Gemfile      .
ADD Gemfile.lock .

ADD . .

RUN bundle && npm install

ENV PORT 80
EXPOSE 80

ENTRYPOINT ["./docker/entrypoint.sh"]
CMD ["start"]