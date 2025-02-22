Task1: (React)

o Create two pages /users and /products, these two pages will have the same re-usable
components.
o https://dummyjson.com/ is the API that you will use, you can check the docs from this link
https://dummyjson.com/docs to see what parameters you should send for filters and
pagination.
o Use the Axios library for fetching the data.
o Use Context API to manage the state.
o Use the following colors:
o Black: #322625
o Grey: #ebebeb
o Blue: #c0e3e5
o Yellow: #fdc936
o Filters:  
o Page size: the default value is 5, when click, it will open a dropdown that has the
options: 5,10,20,50. When changing the value, it will send a request to the API and
fetch the data based on the value that has been set. The pagination below the table
will change based on that too.
o Search icon: on click, it will show a text input beside it to enter the value, this will
filter that result on the client side (no need to send a request to the API to filter the
data). i.e. if you enter that value “19”, it will filter the data and show only the row
that contains the value “19”
o Other filters: will send a request to the API to fetch the data based on the value, the
API doesn’t filter more than one field so when typing a value inside one of the filters,
please reset the others.
o Data Table: please fill the table with the data fetched (12 columns are enough,
please include the fields mentioned in the filters)
o Pagination: when click on it, it will send a request to the API and fetch the data based on
that.
o Please include the font family: Neutra Text.
o Please repeat the steps for the products page (filters are: Title, Brand, and, Category and
tabs are: ALL and Laptops)
o Please combine the project files into one compressed file (.zip)
