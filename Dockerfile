FROM ubuntu:15.04

MAINTAINER Ashwin Thakur <athakur@lic.co.nz>

RUN echo "Setup proxy" \
  && echo " \
      use Socket;\n \
      my \$sock;\n \
      socket(\$sock, AF_INET, SOCK_STREAM, getprotobyname('tcp')) or exit(1);\n \
      setsockopt(\$sock, SOL_SOCKET, SO_SNDTIMEO, pack('l!l!', 2, 0)) or exit(3);\n \
      connect(\$sock , sockaddr_in(\$port, inet_aton(\$ip))) or exit(2);\n \
      close(\$sock);\n \
      exit(0);\n" > /tmp/c.pl \

  && if [ $(perl -s /tmp/c.pl -ip=10.0.2.2 -port=3128 && echo "open") ]; then \
       echo "Proxy detected" \
       && echo "export http_proxy=http://10.0.2.2:3128" >> /etc/proxyrc \
       && echo "export https_proxy=http://10.0.2.2:3128" >> /etc/proxyrc \
       && echo "export ftp_proxy=http://10.0.2.2:3128" >> /etc/proxyrc \
       && echo "export rsync_proxy=http://10.0.2.2:3128" >> /etc/proxyrc \
       && echo "export no_proxy=localhost,127.0.0.1,localaddress,.localdomain.com,.service.consul" >> /etc/proxyrc \
       && echo "export npm_config_proxy=http://10.0.2.2:3128" >> /etc/proxyrc \
       && echo "export npm_config_https_proxy=http://10.0.2.2:3128" >> /etc/proxyrc \
       && . /etc/proxyrc \

       && export APT_MIRROR=nz.archive.ubuntu.com \
       ; \
     fi \
  && rm /tmp/c.pl \

  && echo "Install packages" \
  && export DEBIAN_FRONTEND=noninteractive \
  && if [ -n "$APT_MIRROR" ]; then sed -i'' "s/archive.ubuntu.com/$APT_MIRROR/g" /etc/apt/sources.list; fi \
  && apt-get -y update \
  && apt-get install -y \
      locales \
      npm \

  && echo "Setup locales" \
  && localedef -c -i en_NZ -f UTF-8 en_NZ.UTF-8 \
  && update-locale LANG=en_NZ.UTF-8 \

  && echo "Setup timezone" \
  && echo "Pacific/Auckland" > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata \

  && echo "Create user" \
  && mkdir -p /opt/bcs-app/ \
  && groupadd --gid 1000 fpuser \
  && useradd -m --home /home/fpuser --uid 1000 --gid fpuser --shell /bin/sh fpuser \

  && echo "Cleaning up" \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

COPY . /opt/bcs-app/

RUN chown -R fpuser:fpuser /opt/bcs-app/

USER fpuser
ENV PORT 4403
ENV USERNAME ashesnz@gmail.com
ENV PASSWORD oplgjpiqbecfrimk

WORKDIR /opt/bcs-app/

ENTRYPOINT ["nodejs", "server.js"]

EXPOSE 4403
