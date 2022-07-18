# Data fetch Agregation Per Type

This microservice does the following tasks in out SaaS:
- Getting the allready modified data from the [modify_aggr_generation_per_type](https://github.com/ntua/saas2022-24/tree/master/modify_aggr_generation_per_type) when informed by Kafka that the data is ready to be sent
- Saves them into a cloud based database.
- Listens to a port for POST requests from the [frontend](https://github.com/ntua/saas2022-24/tree/master/frontend/saas_24) microservice and serves the saved data