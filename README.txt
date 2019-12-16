André Rocha - 201706462 - 33.33%
João Matos - 201705471 - 33.33%
Tito Griné - 201706732 - 33.33%

To access all features you will need to try different accounts with different experiences.

Emails:
 joaonmatos@gmail.com
 GuilhermeGomesPereira@dayrep.com
 acelinedegrasse@rhyta.com


Password:
 lmao99

All users share this password.



A single library was used for this project and that was the Font Awesome vector icons library. It was used
to make the website more appealing to the user.

Moreover, several external APIs are called in our application, such as:
 - Google Maps API - https://developers.google.com/maps/documentation/javascript/tutorial
   This API is being used to display the houses' location as well as to give the users the ability to
   pinpoint where their houses are located. The selected location's coordinates are then stored.
 - Google Geocoding Service - https://developers.google.com/maps/documentation/javascript/geocoding
   This API is called in order to translate the latitude and longitude given by the map into an
   address of the person's house, being able to retrieve the region, the city and the country
   as well as the whole address from this API.
 - Rest Countries API - https://restcountries.eu/
   This API is used to translate user input of countries into their Alpha Codes. Since there can be several 
   designations for the same country, depending on the language as well, this information is then stored 
   using each country' Alpha Codes.