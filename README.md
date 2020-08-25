# Real-Time Spread Sheet Example

Project Spec.

_Server_

- [express](https://expressjs.com/ko/)
- [Pusher](https://pusher.com/channels?campaignid=916184871&utm_source=adwords&utm_medium=cpc&utm_campaign=Brand_Pusher_Exact&utm_term=pusher&utm_creative=264949032465&gclid=CjwKCAjwyo36BRAXEiwA24CwGfqvVfvQvyWOr9FGsADpsQ_Xk89XZuUJiugtrbBwc8LUQvR5Wz2UShoC0DwQAvD_BwE)

_Client_

- [Vue](https://kr.vuejs.org/v2/guide/index.html) (webpack)
- [Pusher](https://pusher.com/channels?campaignid=916184871&utm_source=adwords&utm_medium=cpc&utm_campaign=Brand_Pusher_Exact&utm_term=pusher&utm_creative=264949032465&gclid=CjwKCAjwyo36BRAXEiwA24CwGfqvVfvQvyWOr9FGsADpsQ_Xk89XZuUJiugtrbBwc8LUQvR5Wz2UShoC0DwQAvD_BwE)

# Getting Start

settings `server/.env` Pusher

settings `client/src/pages/home.vue`

```javascript
const PUSHER_APP_ID = "{{ PUSHER APP ID }}";
const PUSHER_CLUSTER_NAME = "{{ PUSHER CLUSTER NAME }}";
```
