# Author: chankruze (chankruze@geekofia.in)
# Created: Fri Sep 25 2020 16:52:15 GMT+0530 (India Standard Time)

# Copyright (c) Geekofia 2020 and beyond

FROM chankruze/nygf:latest

LABEL maintainer="chankruze@geekofia.in"

WORKDIR /usr/src/miss-nishita
COPY . .

RUN yarn install

CMD ["node", "index.js"]
