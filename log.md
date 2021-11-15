# BeerApp Logs

## Nov 13

Implemented post creation in front end, issues with json parser. No fix yet.

## Nov 14

Fixed the issue regarding post creation. Was not an issue with json parser, but had to do with the no-cors header with the fetch api not sending the request body.

To fix - make sure it does not send a post request immediately (on initial render) - have it re render whenever a new beer is posted.

To do - UPDATE and DESTROY routes for CRUD.
