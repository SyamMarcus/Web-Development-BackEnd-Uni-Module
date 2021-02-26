module.exports = {
  "$schema":"http://json-schema.org/draft-04/schema#",
  "id":"/listings",
  "title":"Listings",
  "description":"A dog listing in the shelter",
  "type":"object",
  "properties":{
    "title":{
      "description":"Main title of the dog listing",
      "type":"string"
    },
    "breed":{
      "description":"Breed of the dog in the listing",
      "type":"string"
    },
    "summary":{
      "description":"Optional short text summary of listing",
      "type":"string"
    },
    "imageURL":{
      "description":"URL for main image to show in listing",
      "type":"uri"
    },
    "published":{
      "description":"Is the listing published or not",
      "type":"boolean"
    },
    "authorID":{
      "description":"User ID of the listing author",
      "type":"integer",
      "minimum":0
    }
  },
  "required":[
    "title",
    "breed",
    "authorID"
  ]
}