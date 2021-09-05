export const schema = {
    "models": {
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "AWSPhone",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "pushToken": {
                    "name": "pushToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "friends": {
                    "name": "friends",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "availability": {
                    "name": "availability",
                    "isArray": false,
                    "type": {
                        "model": "Availability"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "userAvailabilityId"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPhoneNumber",
                        "fields": [
                            "phoneNumber"
                        ],
                        "queryField": "usersByPhoneNumber"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byEmail",
                        "fields": [
                            "email"
                        ],
                        "queryField": "usersByEmail"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byName",
                        "fields": [
                            "name"
                        ],
                        "queryField": "usersByName"
                    }
                }
            ]
        },
        "Availability": {
            "name": "Availability",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Sunday": {
                    "name": "Sunday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Monday": {
                    "name": "Monday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Tuesday": {
                    "name": "Tuesday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Wednesday": {
                    "name": "Wednesday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Thursday": {
                    "name": "Thursday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Friday": {
                    "name": "Friday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Saturday": {
                    "name": "Saturday",
                    "isArray": true,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            },
            "syncable": true,
            "pluralName": "Availabilities",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Plan": {
            "name": "Plan",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "placeID": {
                    "name": "placeID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "time": {
                    "name": "time",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "creatorID": {
                    "name": "creatorID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "creator": {
                    "name": "creator",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "creatorID"
                    }
                },
                "invitees": {
                    "name": "invitees",
                    "isArray": true,
                    "type": {
                        "model": "Invitee"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "plan"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Plans",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCreator",
                        "fields": [
                            "creatorID"
                        ],
                        "queryField": "plansByCreator"
                    }
                }
            ]
        },
        "Invitee": {
            "name": "Invitee",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "AWSPhone",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "Status"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "pushToken": {
                    "name": "pushToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "plan": {
                    "name": "plan",
                    "isArray": false,
                    "type": {
                        "model": "Plan"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "planID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Invitees",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPhoneNumber",
                        "fields": [
                            "phoneNumber"
                        ],
                        "queryField": "inviteeByPhoneNUmber"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPlan",
                        "fields": [
                            "planID"
                        ],
                        "queryField": "inviteesByPlan"
                    }
                }
            ]
        }
    },
    "enums": {
        "Status": {
            "name": "Status",
            "values": [
                "PENDING",
                "ACCEPTED",
                "DECLINED"
            ]
        }
    },
    "nonModels": {},
    "version": "20a64067603af71990a4acd480b2d9bd"
};